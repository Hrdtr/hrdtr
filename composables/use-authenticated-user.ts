import type { User } from 'lucia';

export const useAuthenticatedUser = () => {
  const user = useState<User | null>('user', () => null);
  return user;
};
