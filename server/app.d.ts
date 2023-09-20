/// <reference types="lucia" />
declare namespace Lucia {
  type Auth = import('./utils/auth').Auth;
  type DatabaseUserAttributes = {
    name: string;
    email: string | null;
    avatar: string | null;
    github_user_id: number | null;
  };
  type DatabaseSessionAttributes = {};
}
