import type { Session, User } from 'lucia'
import { verifyRequestOrigin } from 'lucia'

export default defineEventHandler(async (event) => {
  // Skip this middleware when prerendering contents
  if (import.meta.prerender) return

  // CSRF protection. Only required in non-GET requests (POST, PUT, DELETE, PATCH, etc)
  if (event.method !== 'GET' && !event.path.startsWith('/api/_hub')) {
    const originHeader = getHeader(event, 'Origin') ?? null
    const hostHeader = getHeader(event, 'Host') ?? null // Might need to use `X-Forwarded-Host` instead
    if (!originHeader || !hostHeader || !verifyRequestOrigin(originHeader, [hostHeader])) {
      throw createError({ statusCode: 403, message: 'Invalid origin' })
    }
  }

  const auth = useAuth(event)
  const sessionId = getCookie(event, auth.sessionCookieName) ?? null
  if (!sessionId) {
    event.context.auth = null
    return
  }

  const {
    session,
    user,
  } = await auth.validateSession(sessionId)
  if (!session) {
    appendResponseHeader(event, 'Set-Cookie', auth.createBlankSessionCookie().serialize())
    return
  }
  if (session.fresh) {
    appendResponseHeader(event, 'Set-Cookie', auth.createSessionCookie(session.id).serialize())
  }
  event.context.auth = {
    session,
    user,
  }
})

declare module 'h3' {
  interface H3EventContext {
    auth: {
      session: Session
      user: User
    } | null
  }
}
