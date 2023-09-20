export default defineEventHandler(async (event) => {
  const authRequest = auth.handleRequest(event);
  const session = await authRequest.validate();
  if (!session) {
    throw createError({
      statusCode: 401,
    });
  }
  await auth.invalidateSession(session.sessionId);
  authRequest.setSession(null);
  return sendNoContent(event);
});
