import type { InferSelectModel } from 'drizzle-orm'

export type AuthState = {
  session: InferSelectModel<typeof schema.userSession>
  user: InferSelectModel<typeof schema.user>
} | {
  session: null
  user: null
}

export default defineEventHandler(async (event) => {
  // This need to be placed on top to prevent build fails
  if (import.meta.prerender || !event.path.startsWith('/api/_hub')) {
    event.context.auth = { session: null, user: null }
    return
  }

  const token = getCookie(event, sessionTokenCookieName) ?? null
  if (!token) {
    event.context.auth = { session: null, user: null }
    return
  }

  const { session, user } = await validateSessionToken(event, token)
  if (!session) {
    unsetSessionTokenCookie(event)
  }
  else {
    if (session.fresh) {
      setSessionTokenCookie(event, token, session)
    }
  }
  if (!session || !user) {
    event.context.auth = { session: null, user: null }
    return
  }

  event.context.auth = { session, user }
})

declare module 'h3' {
  interface H3EventContext {
    auth: AuthState
  }
}
