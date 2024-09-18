<template>
  <ContentDoc v-slot="{ doc }">
    <article class="prose dark:prose-invert">
      <div class="mb-8">
        <h1 class="mb-2">
          {{ doc.title }}
        </h1>
        <span class="opacity-60">{{ new Date(doc.published_at).toDateString() }}</span>
      </div>
      <template v-if="doc.cover_image">
        <div class="not-prose w-full">
          <NuxtImg
            :src="doc.cover_image"
            :alt="`${doc._path}-cover_image`"
            width="600px"
            format="webp"
            class="w-full object-contain object-center"
          />
        </div>
      </template>
      <ContentRenderer :value="doc" />
    </article>
  </ContentDoc>
</template>
