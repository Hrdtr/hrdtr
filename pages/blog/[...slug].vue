<script setup lang="ts">
const route = useRoute()
const { data: pageview, pending } = useFetch('/api/pageview', {
  method: 'POST',
  body: { path: route.fullPath }
})
</script>

<template>
  <div class="flex-1">
    <div class="prose dark:prose-invert">
      <ContentDoc v-slot="{ doc }">
        <div class="mb-8">
          <h1 class="text-3xl font-semibold mb-2 ml-[-0.25px]">
            {{ doc.title }}
          </h1>
          <span class="opacity-60">{{ new Date(doc.published_at).toDateString() }}{{ !pending && pageview ? '&nbsp;&nbsp;·&nbsp;&nbsp;' : '' }}<span>{{ pageview?.count ? pageview.count.toLocaleString() : '' }}{{ !pageview?.count ? '' : pageview.count > 1 ? ' views' : ' view' }}</span></span>
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
      </ContentDoc>
    </div>
  </div>
</template>