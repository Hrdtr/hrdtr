<template>
  <NuxtLayout>
    <NuxtLoadingIndicator color="#14b8a6" />
    <NuxtRouteAnnouncer />
    <NuxtPage />
  </NuxtLayout>
</template>

<style>
:root {
  font-family:
    'Plus Jakarta', ui-sans-serif, system-ui, sans-serif, 'Apple Color Emoji', 'Segoe UI Emoji', 'Segoe UI Symbol',
    'Noto Color Emoji';
}

.layout-enter-active,
.layout-leave-active {
  transition: all 0.3s;
}
.layout-enter-from,
.layout-leave-to {
  opacity: 0;
  filter: blur(1rem);
}

.page-enter-active,
.page-leave-active {
  transition: all 0.15s;
}
.page-enter-from {
  opacity: 0;
  transform: translateY(1rem);
}
.page-leave-to {
  opacity: 0;
  transform: translateY(-1rem);
}

.prose h1 > a,
.prose h2 > a,
.prose h3 > a,
.prose h4 > a,
.prose h5 > a,
.prose h6 > a {
  text-decoration-line: none;
}
</style>
