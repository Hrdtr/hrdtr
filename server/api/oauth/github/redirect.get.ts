import { generateState } from 'arctic'

export default defineEventHandler(async (event) => {
  const { from } = getQuery(event)
  setCookie(event, 'redirected_from', from ? String(from) : '/', {
    path: '/',
    secure: !import.meta.dev,
    httpOnly: true,
    maxAge: 60 * 10,
    sameSite: 'lax',
  })

  const auth = useAuth()
  const state = generateState()
  setCookie(event, 'github_oauth_state', state, {
    path: '/',
    secure: !import.meta.dev,
    httpOnly: true,
    maxAge: 60 * 10,
    sameSite: 'lax',
  })

  const url = await auth.github.createAuthorizationURL(state)
  return sendRedirect(event, url.toString())
})
