<script setup lang="ts">
useSeoMeta({
  title: 'Blog',
})

const { data: contents } = await useAsyncData('blog', () => queryCollection('blog')
  .where('published_at', 'IS NOT NULL')
  .select('title', 'path', 'published_at', 'description')
  .order('published_at', 'DESC')
  .all(),
)

const groupedByYear = computed(() => {
  if (!contents.value) return {}

  return contents.value.reduce((acc, article) => {
    const year = new Date(article.published_at!).getFullYear()
    if (!acc[year]) acc[year] = []
    acc[year].push(article)
    return acc
  }, {} as Record<number, typeof contents.value>)
})
</script>

<template>
  <div class="flex-1">
    <h1 class="text-3xl font-semibold mb-8 ml-[-1.25px]">
      Blog
    </h1>

    <div
      v-for="[year, articles] in Object.entries(groupedByYear).sort((a, b) => Number(b[0]) - Number(a[0]))"
      :key="year"
      class="mb-10"
    >
      <h2 class="text-7xl font-bold mb-4 opacity-20 -ml-0.5">
        {{ year }}
      </h2>

      <div
        v-for="article in articles"
        :key="article.path"
        class="mb-6"
      >
        <NuxtLink
          :to="`${article.path}/`"
          class="group"
        >
          <h3 class="text-lg opacity-90 group-hover:opacity-100 transition font-medium">
            {{ article.title }}
          </h3>
          <span class="text-background-content-muted text-sm leading-none">
            — {{ new Date(article.published_at!).toDateString().replace(year, '').trim() }}
          </span>
          <!-- <p class="opacity-60 group-hover:opacity-80 line-clamp-2 mt-1 transition">
            {{ article.description }}
          </p> -->
        </NuxtLink>
      </div>
    </div>
  </div>
</template>
