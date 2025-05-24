<script setup lang="ts">
const route = useRoute()
const themeToggleHovered = ref(false)

const colorMode = useColorMode()
const theme = computed(() => colorMode.value)
const dark = computed({
  get: () => colorMode.value === 'dark',
  set: () => colorMode.preference = colorMode.value === 'dark' ? 'light' : 'dark',
})
</script>

<template>
  <div class="w-full min-h-dvh relative selection:bg-teal-200 dark:selection:bg-teal-800">
    <!-- <NuxtImg
      src="/background.webp"
      alt=""
      class="absolute object-cover -top-20 w-screen h-screen z-0 pointer-events-none opacity-35"
      format="webp"
      preload
    /> -->
    <div class="fixed w-screen h-screen z-[-1] pointer-events-none">
      <!-- Original Source: https://bg.ibelick.com/ -->
      <div class="relative h-full w-full">
        <div class="absolute h-full w-full bg-[radial-gradient(#e5e7eb_1px,transparent_1px)] dark:bg-[radial-gradient(#161616_1px,transparent_1px)] [background-size:16px_16px] [mask-image:radial-gradient(ellipse_50%_50%_at_50%_50%,#000_70%,transparent_100%)]" />
      </div>
    </div>

    <div class="w-full max-w-5xl mx-auto px-4 py-32 z-10">
      <div class="flex flex-col md:flex-row gap-8">
        <div
          class="flex-shrink-0 static md:sticky top-0 md:top-32 md:self-start z-20 pt-4 md:pt-0 -mx-4 md:mx-0 px-4 md:px-0"
          :class="route.name === 'blog-slug' ? 'opacity-50 hover:opacity-100 transition-opacity' : ''"
        >
          <div class="mb-6 md:pt-1.5">
            <Logo class="w-8 h-8" />
          </div>

          <nav
            class="md:w-36 flex flex-row md:flex-col gap-4 pb-4 overflow-x-auto"
          >
            <NuxtLink
              class="opacity-60 hover:opacity-100 transition-opacity"
              to="/"
              exact
            >
              Home
            </NuxtLink>
            <NuxtLink
              class="opacity-60 hover:opacity-100 transition-opacity inline-flex items-center"
              to="/resume/"
              target="_blank"
            >
              Resume
              <Icon
                name="heroicons:arrow-top-right-on-square"
                class="ml-2 opacity-75"
              />
            </NuxtLink>
            <!-- <NuxtLink
              class="opacity-60 hover:opacity-100 transition-opacity"
              to="/projects/"
            >
              Projects
            </NuxtLink> -->
            <NuxtLink
              class="opacity-60 hover:opacity-100 transition-opacity"
              to="/blog/"
            >
              Blog
            </NuxtLink>
            <NuxtLink
              class="opacity-60 hover:opacity-100 transition-opacity"
              to="/guestbook/"
            >
              Guestbook
            </NuxtLink>
            <div
              role="separator"
              class="flex-shrink-0 w-px h-4 my-auto md:w-4 md:h-px bg-neutral-400 dark:bg-neutral-600"
            />
            <NuxtLink
              class="opacity-60 hover:opacity-100 transition-opacity inline-flex items-center"
              to="/play/js/"
              target="_blank"
            >
              Play
              <Icon
                name="heroicons:arrow-top-right-on-square"
                class="ml-2 opacity-75"
              />
            </NuxtLink>
            <ClientOnly>
              <Transition
                name="fade"
                appear
              >
                <button
                  class="opacity-60 hover:opacity-100 transition-opacity flex flex-row items-center cursor-pointer"
                  @click="dark = !dark"
                  @mouseenter="themeToggleHovered = true"
                  @mouseleave="themeToggleHovered = false"
                >
                  <span class="capitalize">{{ themeToggleHovered ? theme : 'Theme' }}</span>
                </button>
              </Transition>
            </ClientOnly>
          </nav>
        </div>
        <main class="flex-1">
          <slot />
        </main>
      </div>
    </div>
  </div>
</template>

<style lang="postcss">
.router-link-exact-active {
  @apply opacity-100;
}
.router-link-active {
  @apply opacity-100;
}

.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.5s ease;
}
.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}

.prose a {
  @apply no-underline text-teal-500 border-b border-transparent hover:border-teal-500 transition-colors duration-300;
}
.prose p {
  @apply text-background-content/80;
}
.prose li {
  @apply text-background-content/80;
}
.prose h1 > a,
.prose h2 > a,
.prose h3 > a,
.prose h4 > a,
.prose h5 > a,
.prose h6 > a {
  @apply no-underline text-background-content border-b-0;
}
.prose h1 {
  @apply font-semibold;
}
</style>
