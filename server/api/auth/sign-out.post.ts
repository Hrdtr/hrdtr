export default defineEventHandler(async (event) => {
  if (!event.context.auth.session) {
    throw createError({ statusCode: 401 })
  }

  await invalidateSession(event, event.context.auth.session)
  unsetSessionTokenCookie(event)
  return null
})
