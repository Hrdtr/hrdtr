<script setup lang="ts">
import MDCProsePre from '@nuxtjs/mdc/dist/runtime/components/prose/ProsePre.vue'
</script>

<template>
  <MDCProsePre class="not-prose text-sm/6 overflow-x-auto">
    <slot />
  </MDCProsePre>
</template>
