<script setup lang="ts">
const route = useRoute()

const { data: doc } = await useAsyncData(route.path, () => {
  return queryCollection('projects').path(route.path).first()
})
</script>

<template>
  <article
    v-if="doc"
    class="prose dark:prose-invert"
  >
    <div class="mb-8">
      <h1 class="mb-2">
        {{ doc.title }} <span
          class="px-2 py-1 text-xs tracking-wider bg-neutral-100 dark:bg-neutral-900 rounded-md opacity-75"
        >{{ doc.state }}</span>
      </h1>
    </div>

    <ContentRenderer :value="doc" />

    <template v-if="doc.cover_image || doc.visuals">
      <div class="not-prose">
        <h2 class="mt-10 mb-2">
          Visuals
        </h2>
        <div class="flex flex-row items-center overflow-x-auto pb-4 gap-4">
          <template v-if="doc.cover_image">
            <NuxtImg
              :src="doc.cover_image"
              :alt="`${doc.path}-cover`"
              class="flex-shrink-0 w-auto h-[400px] object-contain object-center border border-neutral-200 dark:border-neutral-800"
              format="webp"
              height="400px"
              fit="contain"
              loading="lazy"
              placeholder
            />
          </template>
          <NuxtImg
            v-for="(visual, i) in doc.visuals"
            :key="visual"
            :src="visual"
            :alt="`${doc.path}-visual-${i + 1}`"
            class="flex-shrink-0 w-auto h-[400px] object-contain object-center border border-zinc-200 dark:border-zinc-800"
            format="webp"
            height="400px"
            fit="contain"
            loading="lazy"
            placeholder
          />
        </div>
      </div>
    </template>
    <template v-if="doc.tech">
      <div class="not-prose">
        <h2 class="mt-10 mb-2">
          Tech & Frameworks
        </h2>
        <div class="flex flex-wrap gap-2">
          <div
            v-for="tech in doc.tech"
            :key="tech"
          >
            <img
              v-if="tech.split(': ')[0]!.startsWith('https://')"
              :src="tech.split(': ')[0]"
              :alt="`${tech.split(': ')[1]}`"
              class="h-[24px]"
            >
            <div
              v-else
              class="h-[24px] bg-zinc-200 dark:bg-zinc-800 text-[0.60rem] leading-none tracking-wider uppercase font-semibold px-2 flex items-center justify-center"
            >
              {{ tech.split(': ')[0] }}
            </div>
          </div>
        </div>
      </div>
    </template>
    <template v-if="doc.wdid">
      <div class="not-prose">
        <h2 class="mt-10 mb-2">
          What do I did?
        </h2>
        <ul class="flex flex-col">
          <li
            v-for="what in doc.wdid"
            :key="what"
          >
            {{ what }}
          </li>
        </ul>
      </div>
    </template>
    <template v-if="doc.links">
      <div class="not-prose">
        <h2 class="mt-10 mb-2">
          Links
        </h2>
        <ul class="flex flex-col">
          <li
            v-for="link in doc.links"
            :key="link"
          >
            <a
              :href="link"
              target="_blank"
              class="inline-flex items-center gap-1"
            >{{ link }} <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              stroke-width="2"
              stroke-linecap="round"
              stroke-linejoin="round"
              class="lucide lucide-arrow-up-right w-4 h-4 opacity-50"
            ><path d="M7 7h10v10" /><path d="M7 17 17 7" /></svg></a>
          </li>
        </ul>
      </div>
    </template>
  </article>
</template>
