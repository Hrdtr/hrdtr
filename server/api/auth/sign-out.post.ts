export default defineEventHandler(async (event) => {
  if (!event.context.auth) {
    throw createError({ statusCode: 401 })
  }

  const auth = useAuth(event)
  await auth.invalidateSession(event.context.auth.session.id)
  appendHeader(event, 'Set-Cookie', auth.createBlankSessionCookie().serialize())
  return null
})
