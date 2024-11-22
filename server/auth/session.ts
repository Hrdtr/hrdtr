import type { H3Event } from 'h3'
import type { InferSelectModel } from 'drizzle-orm'
import { sha256 } from '@oslojs/crypto/sha2'
import { encodeBase32LowerCaseNoPadding, encodeHexLowerCase } from '@oslojs/encoding'
import { setCookie } from 'h3'

export const sessionTokenCookieLifetimeInMilliseconds = 1000 * 60 * 60 * 24 * 30
export const sessionTokenCookieName = 'session'

export const createSessionToken = () => {
  const bytes = new Uint8Array(20)
  crypto.getRandomValues(bytes)
  return encodeBase32LowerCaseNoPadding(bytes)
}

export const createSession = async (event: H3Event, token: string, user: Pick<InferSelectModel<typeof schema.user>, 'id'>) => {
  const db = useDBClient()
  const sessionId = encodeHexLowerCase(sha256(new TextEncoder().encode(token)))
  const session = await db.insert(schema.userSession).values({
    id: sessionId,
    expiresAt: new Date(Date.now() + sessionTokenCookieLifetimeInMilliseconds).getTime(),
    userId: user.id,
  }).returning()
  return session[0]
}

export function setSessionTokenCookie(event: H3Event, token: string, session: Pick<InferSelectModel<typeof schema.userSession>, 'expiresAt'>): void {
  setCookie(event, sessionTokenCookieName, token, {
    httpOnly: true,
    path: '/',
    secure: !import.meta.dev,
    sameSite: 'lax',
    expires: new Date(session.expiresAt),
  })
}

export function unsetSessionTokenCookie(event: H3Event): void {
  setCookie(event, sessionTokenCookieName, '', {
    httpOnly: true,
    path: '/',
    secure: !import.meta.dev,
    sameSite: 'lax',
    maxAge: 0,
  })
}

export const validateSessionToken = async (event: H3Event, token: string) => {
  const db = useDBClient()
  const sessionId = encodeHexLowerCase(sha256(new TextEncoder().encode(token)))
  const sessionWithUser = await db.query.userSession.findFirst({
    where: field => eq(field.id, sessionId),
    with: { user: true },
  })
  if (!sessionWithUser) {
    return { session: null, user: null }
  }

  const { user, ...session } = sessionWithUser
  if (Date.now() >= session.expiresAt) {
    await db.delete(schema.userSession).where(eq(schema.userSession.id, sessionId))
    return { session: null, user: null }
  }
  if (Date.now() >= session.expiresAt - sessionTokenCookieLifetimeInMilliseconds / 2) {
    session.expiresAt = new Date(Date.now() + sessionTokenCookieLifetimeInMilliseconds).getTime()
    await db.update(schema.userSession)
      .set({ expiresAt: session.expiresAt })
      .where(eq(schema.userSession.id, sessionId))
    return { session: { ...session, fresh: true }, user }
  }

  return { session: { ...session, fresh: false }, user }
}

export const invalidateSession = async (event: H3Event, session: Pick<InferSelectModel<typeof schema.userSession>, 'id'>) => {
  const db = useDBClient()
  await db.delete(schema.userSession).where(eq(schema.userSession.id, session.id))
}

export const invalidateUserSessions = async (
  event: H3Event,
  user: Pick<InferSelectModel<typeof schema.user>, 'id'>,
  { excludeIds }: { excludeIds?: string[] } = {},
) => {
  const db = useDBClient()
  await db.delete(schema.userSession).where(and(eq(schema.userSession.userId, user.id), notInArray(schema.userSession.id, excludeIds ?? [])))
}
