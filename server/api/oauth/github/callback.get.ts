import { OAuth2RequestError } from 'arctic'

export default defineEventHandler(async (event) => {
  const auth = useAuth(event)
  const db = useDBClient()

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
    console.info('code', code)
    const tokens = await auth.github.validateAuthorizationCode(String(code))
    console.info('accessToken', tokens.accessToken)
    const githubUserResponse = await fetch('https://api.github.com/user', {
      headers: {
        'Accept': 'application/vnd.github+json',
        'Authorization': `Bearer ${tokens.accessToken}`,
        'X-GitHub-Api-Version': '2022-11-28',
        'User-Agent': 'hrdtr.dev',
      },
    })
    console.info('githubUserResponse', JSON.stringify(githubUserResponse, null, 2))
    console.info('githubUserResponse.headers', JSON.stringify(githubUserResponse.headers, null, 2))
    const cloned = githubUserResponse.clone()
    console.info('resp.text()', await cloned.text())
    const githubUser = await githubUserResponse.json<GitHubUser>()
    const existingUser = await db.query.user.findFirst({ where: field => eq(field.githubUserId, String(githubUser.id)) })

    if (existingUser) {
      const session = await auth.createSession(existingUser.id, {})
      const sessionCookie = auth.createSessionCookie(session.id)
      appendResponseHeaders(event, { 'Set-Cookie': sessionCookie.serialize() })
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

    const session = await auth.createSession(userId, {})
    const sessionCookie = auth.createSessionCookie(session.id)
    appendResponseHeaders(event, { 'Set-Cookie': sessionCookie.serialize() })
    deleteCookie(event, 'redirected_from')
    deleteCookie(event, 'github_oauth_state')
    return sendRedirect(event, redirectPath ?? '/')
  }
  catch (e) {
    console.error(e)
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
