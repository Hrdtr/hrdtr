import type { InferSelectModel } from 'drizzle-orm'

export const useAuthenticatedUser = () => {
  return useState<InferSelectModel<typeof schema.user> | null>('user', () => null)
}
