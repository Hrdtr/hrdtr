<script setup lang="ts">
import type { QueryBuilderParams } from '@nuxt/content/dist/runtime/types'

useSeoMeta({
  title: 'Blog',
});

const query: QueryBuilderParams = { path: '/blog', limit: 99, sort: [{ published_at: -1 }] }
</script>

<template>
  <div class="flex-1">
    <h1 class="text-3xl font-semibold mb-8 ml-[-1.25px]">
      Blog
    </h1>

    <ContentList :query="query">
      <template #default="{ list }">
        <div
          v-for="article in list"
          :key="article._path"
          class="mb-4"
        >
          <NuxtLink
            :to="`${article._path}/`"
            class="group"
          >
            <h2 class="text-lg mb-1 opacity-90 group-hover:opacity-100">
              {{ article.title }}
            </h2>
            <p class="opacity-60">
              {{ new Date(article.published_at).toLocaleDateString() }} - {{ article.description }}
            </p>
          </NuxtLink>
        </div>
      </template>
      <template #not-found>
        <p>No articles found.</p>
      </template>
    </ContentList>
  </div>
</template>