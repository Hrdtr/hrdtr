<script setup lang="ts">
useSeoMeta({
  title: 'Blog',
})
</script>

<template>
  <div class="flex-1">
    <h1 class="text-3xl font-semibold mb-8 ml-[-1.25px]">
      Projects
    </h1>

    <ContentList
      path="/projects"
      :query="{ limit: 99, sort: [{ published_at: -1 }] }"
    >
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
            <h2 class="text-lg opacity-90 group-hover:opacity-100">
              {{ article.title }}
            </h2>
            <p class="opacity-60">
              {{ article.description }}
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
