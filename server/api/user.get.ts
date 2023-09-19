export default defineEventHandler(async (event) => {
  const authRequest = auth.handleRequest(event);
  const session = await authRequest.validate();
  if (!session?.user) {
    throw createError({ statusCode: 401 });
  }
  return session.user;
});
