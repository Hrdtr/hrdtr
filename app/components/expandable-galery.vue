<script lang="ts" setup>
import type { HTMLAttributes } from 'vue'
import type { NuxtImg } from '#components'

interface Props {
  images: string[]
  class?: HTMLAttributes['class']
  img?: Omit<InstanceType<typeof NuxtImg>['$props'], 'alt'> & {
    alt?: ((src: string, index: number) => string) | string
    class?: HTMLAttributes['class']
  }
}

const props = defineProps<Props>()
</script>

<template>
  <div :class="['flex w-full gap-2', props.class]">
    <div
      v-for="(image, idx) in images"
      :key="image"
      class="relative flex h-full flex-1 cursor-pointer overflow-hidden transition-all duration-500 ease-in-out hover:flex-[var(--flex)]"
      :style="`--flex: ${images.length}`"
    >
      <NuxtImg
        class="relative"
        :src="image"
        v-bind="{
          ...props.img,
          alt: !props.img?.alt ? undefined : typeof props.img.alt === 'function' ? props.img.alt(image, idx) : props.img.alt,
        }"
      />
    </div>
  </div>
</template>
