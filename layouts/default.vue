<template>
  <UContainer class="py-32 max-w-5xl">
    <div class="flex flex-col md:flex-row gap-8">
      <div
        class="static md:sticky top-0 md:top-32 md:self-start bg-gray-50 dark:bg-gray-950 z-20 pt-4 md:pt-0 -mx-4 md:mx-0 px-4 md:px-0"
      >
        <div class="mb-6 md:-ml-2">
          <UKbd size="md">
            H
          </UKbd>
        </div>

        <nav
          class="md:w-36 flex flex-row md:flex-col gap-4 pb-4 overflow-x-auto"
        >
          <NuxtLink
            class="opacity-60 hover:opacity-100 transition-opacity"
            href="/"
            exact
          >
            Home
          </NuxtLink>
          <NuxtLink
            class="opacity-60 hover:opacity-100 transition-opacity"
            href="/about/"
          >
            About
          </NuxtLink>
          <NuxtLink
            class="opacity-60 hover:opacity-100 transition-opacity"
            href="/projects/"
          >
            Projects
          </NuxtLink>
          <NuxtLink
            class="opacity-60 hover:opacity-100 transition-opacity"
            href="/blog/"
          >
            Blog
          </NuxtLink>
          <NuxtLink
            class="opacity-60 hover:opacity-100 transition-opacity"
            href="/guestbook/"
          >
            Guestbook
          </NuxtLink>
          <NuxtLink
            class="opacity-60 hover:opacity-100 transition-opacity inline-flex items-center"
            href="/resume/"
            target="_blank"
          >
            Resume
            <span class="i-heroicons-arrow-up-right ml-2 opacity-75 -mb-px" />
          </NuxtLink>
          <NuxtLink
            class="opacity-60 hover:opacity-100 transition-opacity inline-flex items-center"
            href="/utils/"
          >
            Utils
            <span class="i-heroicons-arrow-up-right ml-2 opacity-75 -mb-px" />
          </NuxtLink>
          <ClientOnly>
            <Transition
              name="fade"
              appear
            >
              <label
                class="opacity-60 hover:opacity-100 transition-opacity flex flex-row items-center gap-2 cursor-pointer"
              >
                <span>Theme</span>
                <DarkModeToggle
                  id="theme-toggle"
                  size="2xs"
                />
              </label>
            </Transition>
          </ClientOnly>
        </nav>
      </div>
      <slot />
    </div>
  </UContainer>
</template>

<style scoped lang="postcss">
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
</style>