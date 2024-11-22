import { OAuth2RequestError } from 'arctic'

export default defineEventHandler(async (event) => {
  const db = useDBClient()
  const githubOAuth2 = useGithubOAuth2(event)

  const {
    code = null,
    state = null,
  } = getQuery(event)

  const redirectPath = getCookie(event, 'redirected_from')
  const storedState = getCookie(event, 'github_oauth_state') ?? null
  if (!code || !state || !storedState || state !== storedState) {
    throw createError({ status: 400 })
  }

  try {
    const tokens = await githubOAuth2.validateAuthorizationCode(String(code))
    const githubUser = await $fetch<GitHubUser>('https://api.github.com/user', {
      headers: {
        'Accept': 'application/vnd.github+json',
        'Authorization': `Bearer ${tokens.accessToken()}`,
        'X-GitHub-Api-Version': '2022-11-28',
        'User-Agent': 'hrdtr.dev',
      },
    })
    const existingUser = await db.query.user.findFirst({ where: field => eq(field.githubUserId, String(githubUser.id)) })

    if (existingUser) {
      const sessionToken = createSessionToken()
      const session = await createSession(event, sessionToken, existingUser)
      setSessionTokenCookie(event, sessionToken, session)
      deleteCookie(event, 'redirected_from')
      deleteCookie(event, 'github_oauth_state')
      return sendRedirect(event, redirectPath ?? '/')
    }

    const userId = createId()
    await db.insert(schema.user).values({
      id: userId,
      email: githubUser.email,
      name: githubUser.name,
      avatar: githubUser.avatar_url,
      githubUserId: String(githubUser.id),
    })

    const sessionToken = createSessionToken()
    const session = await createSession(event, sessionToken, { id: userId })
    setSessionTokenCookie(event, sessionToken, session)
    deleteCookie(event, 'redirected_from')
    deleteCookie(event, 'github_oauth_state')
    return sendRedirect(event, redirectPath ?? '/')
  }
  catch (e) {
    if (e instanceof OAuth2RequestError) {
      throw createError({ status: 400 })
    }
    throw createError({ status: 500 })
  }
})

// ref: https://docs.github.com/en/rest/users/users?apiVersion=2022-11-28#get-the-authenticated-user
interface GitHubUser {
  id: number
  name: string
  email: string
  avatar_url: string
}
