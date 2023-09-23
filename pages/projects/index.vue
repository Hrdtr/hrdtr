<script setup lang="ts">
useSeoMeta({
  title: 'Projects',
});
</script>

<template>
  <div class="flex-1">
    <h1 class="text-3xl font-semibold mb-8 ml-[-1.25px]">
      Projects
    </h1>

    <ContentList path="/projects">
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
            <h2 class="text-lg mb-1 opacity-90 group-hover:opacity-100 transition-opacity">
              {{ article.title }}
            </h2>
            <p class="opacity-60">
              {{ article.description }}
            </p>
          </NuxtLink>
        </div>
      </template>
      <template #not-found>
        <p>No projects found.</p>
      </template>
    </ContentList>
  </div>
</template>
