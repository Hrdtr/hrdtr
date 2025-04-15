<script setup lang="ts">
const runtimeConfig = useRuntimeConfig()
const route = useRoute()

const { data: doc } = await useAsyncData(route.path, () => {
  return queryCollection('blog').path(route.path).first()
})

const fullUrl = computed(() => `${runtimeConfig.public.app.baseUrl}${route.path}`)

const blueskyLink = computed(() =>
  `https://bsky.app/intent/compose?text=${encodeURIComponent(`Reading @hrdtr.bsky.social's ${fullUrl.value}\n\nI think...`)}`,
)
const twitterLink = computed(() =>
  `https://twitter.com/intent/tweet?text=${encodeURIComponent(`Reading @Hrdtr_'s ${fullUrl.value}\n\nI think...`)}`,
)
</script>

<template>
  <div>
    <article
      v-if="doc"
      class="prose dark:prose-invert"
    >
      <div class="mb-8">
        <h1 class="mb-2">
          {{ doc.title }}
        </h1>
        <span class="opacity-60">{{ new Date(doc.published_at!).toDateString() }}</span>
      </div>
      <template v-if="doc.cover_image && doc.cover_image.trim() !== '-'">
        <div class="not-prose w-full">
          <NuxtImg
            :src="doc.cover_image"
            :alt="`${doc.path}-cover_image`"
            width="600px"
            format="webp"
            class="w-full object-contain object-center"
          />
        </div>
      </template>
      <ContentRenderer :value="doc" />
    </article>

    <div
      role="separator"
      class="flex-shrink-0 w-px h-4 my-auto md:w-4 md:h-px bg-neutral-400 dark:bg-neutral-600"
    />

    <div class="mt-12 flex gap-4">
      <p>
        <span class="text-background-content-muted">Share your thoughts on </span>
        <a
          :href="blueskyLink"
          target="_blank"
          rel="noopener noreferrer"
          class="text-background-content"
        >Bluesky</a><span class="text-background-content-muted"> / </span><a
          :href="twitterLink"
          target="_blank"
          rel="noopener noreferrer"
          class="text-background-content"
        >X (Twitter)</a>
      </p>
    </div>
  </div>
</template>
