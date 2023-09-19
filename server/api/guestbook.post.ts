export default defineEventHandler(async (event) => {
  const authRequest = auth.handleRequest(event);
  const session = await authRequest.validate();
  if (!session?.user) {
    throw createError({
      statusCode: 401,
    });
  }

  const body: { sign: string } = await readBody(event);
  if (!body?.sign || body.sign.length === 0) {
    throw createError({
      statusCode: 400,
    });
  }
  const [result] = await db.client
    .insert(db.schema.guestbook)
    .values({
      userId: session.user.id,
      sign: body.sign,
    })
    .returning();

  return result;
});
