<script setup lang="ts">
const user = useAuthenticatedUser();

onMounted(() => {
  console.log({ user: user.value });
});
</script>

<template>
  <div>
    <NuxtWelcome />
  </div>
</template>
