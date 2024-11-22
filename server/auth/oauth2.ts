import type { H3Event } from 'h3'
import { GitHub } from 'arctic'

export const useGithubOAuth2 = (event: H3Event) => {
  const config = useRuntimeConfig(event)

  return new GitHub(
    config.oauth.github.clientId,
    config.oauth.github.clientSecret,
    config.public.app.baseUrl + '/api/oauth/github/callback',
  )
}
