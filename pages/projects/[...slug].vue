<template>
  <div class="flex-1">
    <div class="prose dark:prose-invert">
      <ContentDoc v-slot="{ doc }">
        <h1 class="text-3xl font-medium leading-tight mb-2">
          {{ doc.title }} <span
            class="px-2 py-1 text-xs tracking-wider bg-zinc-100 dark:bg-zinc-900 rounded-md opacity-75"
          >{{ doc.state }}</span>
        </h1>
        <ContentRenderer :value="doc" />
        <template v-if="doc.icon || doc.screenshots">
          <div class="not-prose">
            <h2 class="mt-12 mb-2">
              Screenshots
            </h2>
            <div class="flex flex-row items-center overflow-x-auto pb-4 gap-4">
              <template v-if="doc.icon">
                <ProjectScreenshot
                  :src="doc.icon"
                  :alt="`${doc._path}-cover`"
                />
              </template>
              <ProjectScreenshot
                v-for="(screenshot, i) in doc.screenshots"
                :key="screenshot"
                :src="screenshot"
                :alt="`${doc._path}-screenshot-${i + 1}`"
              />
            </div>
          </div>
        </template>
        <template v-if="doc.tech">
          <div class="not-prose">
            <h2 class="mt-12 mb-2">
              Tech & Frameworks
            </h2>
            <div class="flex flex-wrap gap-2">
              <div
                v-for="tech in doc.tech"
                :key="tech"
              >
                <img
                  v-if="tech.split(': ')[0].startsWith('https://')"
                  :src="tech.split(': ')[0]"
                  :alt="`${tech.split(': ')[1]}`"
                  class="h-[24px]"
                >
                <div
                  v-else
                  class="h-[24px] bg-zinc-200 dark:bg-zinc-800 text-[0.60rem] leading-none tracking-wider uppercase font-ssemibold px-2 flex items-center justify-center"
                >
                  {{ tech.split(': ')[0] }}
                </div>
              </div>
            </div>
          </div>
        </template>
        <template v-if="doc.wdid">
          <div class="not-prose">
            <h2 class="mt-12 mb-2">
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
            <h2 class="mt-12 mb-2">
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
                >{{ link }} <span class="i-heroicons-arrow-top-right-on-square opacity-75" /></a>
              </li>
            </ul>
          </div>
        </template>
      </ContentDoc>
    </div>
  </div>
</template>
