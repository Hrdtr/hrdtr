import { lucia } from 'lucia';
import { h3 } from 'lucia/middleware';
import { pg } from '@lucia-auth/adapter-postgresql';
import { github } from '@lucia-auth/oauth/providers';
import 'lucia/polyfill/node';

const runtimeConfig = useRuntimeConfig();

export const auth = lucia({
  adapter: pg(db.pool, {
    user: 'user',
    session: 'user_session',
    key: 'user_key',
  }),
  env: process.dev ? 'DEV' : 'PROD',
  middleware: h3(),

  getUserAttributes: (data) => {
    return {
      id: data.id,
      name: data.name,
      email: data.email,
      avatar: data.avatar,
      githubUserId: data.github_user_id,
    };
  },
});

export type Auth = typeof auth;

export const authGh = github(auth, {
  clientId: runtimeConfig.ghClientId,
  clientSecret: runtimeConfig.ghClientSecret,
});
