import type { User } from 'lucia'

export const useAuthenticatedUser = () => {
  return useState<User | null>('user', () => null)
}
