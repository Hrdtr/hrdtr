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
    <div class="flex flex-row items-center gap-4 [&_a]:border-b [&_a]:border-neutral-500/50 hover:[&_a]:border-teal-500 [&_a]:transition-colors">
      <NuxtLink
        target="_blank"
        external
        to="https://github.com/Hrdtr"
        class="inline-flex items-center gap-1"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="32"
          height="32"
          viewBox="0 0 256 256"
          class="w-4 h-4"
        ><path
          fill="currentColor"
          d="M208.31 75.68A59.78 59.78 0 0 0 202.93 28a8 8 0 0 0-6.93-4a59.75 59.75 0 0 0-48 24h-24a59.75 59.75 0 0 0-48-24a8 8 0 0 0-6.93 4a59.78 59.78 0 0 0-5.38 47.68A58.14 58.14 0 0 0 56 104v8a56.06 56.06 0 0 0 48.44 55.47A39.8 39.8 0 0 0 96 192v8H72a24 24 0 0 1-24-24a40 40 0 0 0-40-40a8 8 0 0 0 0 16a24 24 0 0 1 24 24a40 40 0 0 0 40 40h24v16a8 8 0 0 0 16 0v-40a24 24 0 0 1 48 0v40a8 8 0 0 0 16 0v-40a39.8 39.8 0 0 0-8.44-24.53A56.06 56.06 0 0 0 216 112v-8a58.14 58.14 0 0 0-7.69-28.32M200 112a40 40 0 0 1-40 40h-48a40 40 0 0 1-40-40v-8a41.74 41.74 0 0 1 6.9-22.48a8 8 0 0 0 1.1-7.69a43.8 43.8 0 0 1 .79-33.58a43.88 43.88 0 0 1 32.32 20.06a8 8 0 0 0 6.71 3.69h32.35a8 8 0 0 0 6.74-3.69a43.87 43.87 0 0 1 32.32-20.06a43.8 43.8 0 0 1 .77 33.58a8.09 8.09 0 0 0 1 7.65a41.7 41.7 0 0 1 7 22.52Z"
        /></svg>
        Github
      </NuxtLink>
      <NuxtLink
        target="_blank"
        external
        to="https://twitter.com/hrdtr_"
        class="inline-flex items-center gap-1"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="32"
          height="32"
          viewBox="0 0 256 256"
          class="w-4 h-4"
        ><path
          fill="currentColor"
          d="m214.75 211.71l-62.6-98.38l61.77-67.95a8 8 0 0 0-11.84-10.76l-58.84 64.72l-40.49-63.63A8 8 0 0 0 96 32H48a8 8 0 0 0-6.75 12.3l62.6 98.37l-61.77 68a8 8 0 1 0 11.84 10.76l58.84-64.72l40.49 63.63A8 8 0 0 0 160 224h48a8 8 0 0 0 6.75-12.29M164.39 208L62.57 48h29l101.86 160Z"
        /></svg>
        X
      </NuxtLink>
      <NuxtLink
        target="_blank"
        external
        to="https://www.linkedin.com/in/herdi-tr-778142170"
        class="inline-flex items-center gap-1"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="32"
          height="32"
          viewBox="0 0 256 256"
          class="w-4 h-4"
        ><path
          fill="currentColor"
          d="M216 24H40a16 16 0 0 0-16 16v176a16 16 0 0 0 16 16h176a16 16 0 0 0 16-16V40a16 16 0 0 0-16-16m0 192H40V40h176zM96 112v64a8 8 0 0 1-16 0v-64a8 8 0 0 1 16 0m88 28v36a8 8 0 0 1-16 0v-36a20 20 0 0 0-40 0v36a8 8 0 0 1-16 0v-64a8 8 0 0 1 15.79-1.78A36 36 0 0 1 184 140m-84-56a12 12 0 1 1-12-12a12 12 0 0 1 12 12"
        /></svg>
        Linkedin
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
        <Icon
          name="heroicons:arrow-top-right-on-square"
          class="ml-2 opacity-75"
        />
      </a>
    </div>
  </div>
</template>
