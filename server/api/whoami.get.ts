export default defineEventHandler(async (event) => {
  const user = event.context.auth.user
  if (!user) {
    throw createError({ statusCode: 401 })
  }

  return user
})
