<script setup lang="ts">
useSeoMeta({
  title: 'Blog',
})

const { data: contents } = await useAsyncData(() => queryCollection('blog').where('published_at', 'IS NOT NULL').select('title', 'path', 'published_at').all())
</script>

<template>
  <div class="flex-1">
    <h1 class="text-3xl font-semibold mb-8 ml-[-1.25px]">
      Blog
    </h1>

    <div
      v-for="article in contents"
      :key="article.path"
      class="mb-4"
    >
      <NuxtLink
        :to="`${article.path}/`"
        class="group"
      >
        <h2 class="text-lg opacity-90 group-hover:opacity-100">
          {{ article.title }} <span class="opacity-60 text-sm leading-none">{{ new Date(article.published_at!).toLocaleDateString() }}</span>
        </h2>
      </NuxtLink>
    </div>
  </div>
</template>
