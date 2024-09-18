export default defineEventHandler(async (event) => {
  const user = event.context.auth?.user
  if (!user) {
    throw createError({ statusCode: 401 })
  }

  const db = useDBClient()
  const body = await readBody<{ sign: string }>(event)
  if (!body.sign || body.sign.length === 0) {
    throw createError({ statusCode: 400 })
  }
  const item = await db
    .insert(schema.guestbook)
    .values({
      id: createId(),
      userId: user.id,
      sign: body.sign,
      createdAt: Date.now(),
    })
    .returning()
    .then(result => result[0] as typeof schema.guestbook.$inferSelect)

  return {
    ...item,
    user: {
      id: user.id,
      name: user.name,
      avatar: user.avatar,
    },
  }
})
