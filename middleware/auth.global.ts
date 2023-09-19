export default defineNuxtRouteMiddleware(async () => {
  const user = useAuthenticatedUser();
  const { data, error } = await useFetch("/api/user");
  if (!error.value) {
    user.value = data.value ?? null;
  }
});
