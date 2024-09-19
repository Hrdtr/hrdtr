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
    const tokens = await auth.github.validateAuthorizationCode(String(code))
    const githubUser = await $fetch<GitHubUser>('https://api.github.com/user', {
      headers: { Authorization: `Bearer ${tokens.accessToken}` },
    })
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
