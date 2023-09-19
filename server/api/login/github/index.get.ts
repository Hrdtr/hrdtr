export default defineEventHandler(async (event) => {
  const [url, state] = await authGh.getAuthorizationUrl();
  setCookie(event, "github_oauth_state", state, {
    httpOnly: true,
    secure: !process.dev,
    path: "/",
    maxAge: 60 * 60,
  });
  return sendRedirect(event, url.toString());
});
