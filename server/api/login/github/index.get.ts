export default defineEventHandler(async (event) => {
  const q = getQuery(event);
  setCookie(event, 'redirect_target_path', q.redirected_from ? q.redirected_from.toString() : '/', {
    httpOnly: true,
    secure: !process.dev,
    path: '/',
    maxAge: 60 * 60,
  });

  const [url, state] = await authGh.getAuthorizationUrl();
  setCookie(event, 'github_oauth_state', state, {
    httpOnly: true,
    secure: !process.dev,
    path: '/',
    maxAge: 60 * 60,
  });

  return sendRedirect(event, url.toString());
});
