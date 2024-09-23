import { DrizzleSQLiteAdapter } from '@lucia-auth/adapter-drizzle'
import { GitHub } from 'arctic'
import { Lucia, TimeSpan } from 'lucia'
import type { H3Event, EventHandlerRequest } from 'h3'

export const useAuth = (event: H3Event<EventHandlerRequest>) => {
  const config = useRuntimeConfig(event)
  const db = useDBClient()
  const adapter = new DrizzleSQLiteAdapter(db, schema.userSession, schema.user)
  const lucia = new Lucia(adapter, {
    sessionExpiresIn: new TimeSpan(1, 'd'),
    sessionCookie: {
      attributes: {
        secure: !import.meta.dev,
        domain: 'hrdtr.dev',
      },
    },
    getUserAttributes: attributes => attributes,
  })
  const auth = lucia as typeof lucia & {
    lucia: typeof lucia
    github: InstanceType<typeof GitHub>
  }
  auth.github = new GitHub(config.oauth.github.clientId, config.oauth.github.clientSecret)

  return auth
}

declare module 'lucia' {
  interface Register {
    Lucia: ReturnType<typeof useAuth>['lucia']
    DatabaseUserAttributes: typeof schema.user.$inferSelect
  }
}
