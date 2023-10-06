<template>
  <div class="flex-1">
    <h1 class="text-3xl font-semibold ml-[-1.25px]">
      <span>Herdi Tr.</span><br><span class="opacity-60 font-medium">Software Engineer</span>
    </h1>
    <p class="opacity-90 mt-6">
      Hey, I'm Herdi. Skilled at transforming ideas into impactful code. Adept at designing
      robust solutions and optimizing performance. Passionate about pushing
      boundaries in the ever-evolving tech landscape.
    </p>

    <NuxtImg
      src="/avatar.webp"
      alt="Herdi Tr's avatar"
      width="128"
      height="128"
      class="rounded-md mt-8"
    />

    <h2 class="mt-12 mb-2">
      Let's Connect
    </h2>
    <div class="flex flex-row items-center gap-2">
      <NuxtLink
        target="_blank"
        external
        to="https://github.com/Hrdtr"
      >
        <UButton
          variant="soft"
          icon="i-heroicons-arrow-top-right-on-square scale-75 -ml-0.5"
          class="border border-primary/20"
        >
          Github
        </UButton>
      </NuxtLink>
      <NuxtLink
        target="_blank"
        external
        to="https://twitter.com/hrdtr_"
      >
        <UButton
          variant="soft"
          icon="i-heroicons-arrow-top-right-on-square scale-75 -ml-0.5"
          class="border border-primary/20"
        >
          X
        </UButton>
      </NuxtLink>
      <NuxtLink
        target="_blank"
        external
        to="https://www.linkedin.com/in/herdi-tr-778142170"
      >
        <UButton
          variant="soft"
          icon="i-heroicons-arrow-top-right-on-square scale-75 -ml-0.5"
          class="border border-primary/20"
        >
          Linkedin
        </UButton>
      </NuxtLink>
    </div>

    <h2 class="mt-8 mb-2">
      Contact
    </h2>
    <div class="flex flex-row gap-4">
      <div class="w-14 opacity-60">
        Email
      </div>
      <a
        href="mailto:iam@icm.hrdtr.dev"
        class="flex flex-row items-center group"
      >
        <span class="opacity-90 group-hover:opacity-100 transition-opacity">iam@icm.hrdtr.dev</span>
        <span class="i-heroicons-arrow-top-right-on-square ml-2 opacity-75" />
      </a>
    </div>
  </div>
</template>
