export default defineNuxtRouteMiddleware(async () => {
  const authenticatedUser = useAuthenticatedUser()
  try {
    const user = await $fetch('/api/whoami', { headers: import.meta.server ? useRequestHeaders() : undefined })
    authenticatedUser.value = user
  }
  catch {
    authenticatedUser.value = null
  }
})
