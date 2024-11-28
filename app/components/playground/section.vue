<script setup lang="ts">
const props = defineProps<{
  withMobileNavigationToggle?: boolean
}>()

const mobileNavigationVisible = useState('layout:play:mobileNavigationVisible', () => false)
</script>

<template>
  <div class="flex flex-col">
    <div class="flex flex-row items-center border-b border-background-content/5">
      <button
        v-if="props.withMobileNavigationToggle"
        class="inline-flex sm:hidden items-center justify-center p-2"
        @click="mobileNavigationVisible = !mobileNavigationVisible"
      >
        <Icon
          name="lucide:menu"
          class="w-5 h-5"
        />
      </button>
      <div class="flex-1 overflow-x-auto p-2">
        <slot name="toolbar" />
      </div>
    </div>
    <slot />
  </div>
</template>
