<script setup lang="ts">
useHead({
  templateParams: {
    separator: '—'
  }
})
defineOgImage({
  component: 'Default',
});
</script>

<template>
  <NuxtLayout>
    <NuxtLoadingIndicator color="#14b8a6" />
    <NuxtPage />
    <UNotifications />
  </NuxtLayout>
</template>

<style lang="postcss">
html, body {
  font-family: 'Hanken Grotesk', system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;
  @apply min-h-screen text-gray-800 dark:text-gray-200 bg-gray-50 dark:bg-gray-950;
}
.prose h2 > a {
  @apply no-underline;
}
</style>