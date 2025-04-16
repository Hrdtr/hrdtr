<script setup lang="ts">
useSeoMeta({
  title: 'Projects',
})

const { data: contents } = await useAsyncData(() => queryCollection('projects')
  .select('title', 'description', 'path')
  .all(),
)
prerenderRoutes(contents.value?.map(content => `${content.path}/`) ?? [])
</script>

<template>
  <div class="flex-1">
    <h1 class="text-3xl font-semibold mb-8 ml-[-1.25px]">
      Projects
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
          {{ article.title }}
        </h2>
        <p class="opacity-60">
          {{ article.description }}
        </p>
      </NuxtLink>
    </div>
  </div>
</template>
