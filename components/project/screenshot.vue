<script setup lang="ts">
const props = defineProps<{
  src: string
  alt: string
}>()

const mounted = ref(false)
onMounted(() => (mounted.value = true))

const loaded = ref(false)
const onLoad = () => setTimeout(() => (loaded.value = true), 200)
</script>

<template>
  <div class="w-auto h-[400px] flex-shrink-0 relative">
    <ClientOnly>
      <NuxtImg
        v-if="mounted"
        :src="props.src"
        :alt="props.alt"
        :class="loaded ? 'opacity-100' : 'opacity-0'"
        class="absolute inset-0 h-full object-contain object-center transition-opacity duration-300 z-10"
        format="webp"
        height="400px"
        fit="contain"
        loading="lazy"
        @load="onLoad"
      />
      <NuxtImg
        :src="props.src"
        :alt="props.alt"
        :modifiers="{ blur: 5 }"
        class="h-full object-contain object-center"
        format="webp"
        height="10px"
        fit="contain"
        preload
      />

      <template #fallback>
        <NuxtImg
          :src="props.src"
          :alt="props.alt"
          class="absolute inset-0 h-full object-contain object-center z-10"
          format="webp"
          height="400px"
          fit="contain"
          loading="lazy"
        />
        <NuxtImg
          :src="props.src"
          :alt="props.alt"
          :modifiers="{ blur: 5 }"
          class="h-full object-contain object-center"
          format="webp"
          height="10px"
          fit="contain"
          preload
        />
      </template>
    </ClientOnly>
  </div>
</template>
