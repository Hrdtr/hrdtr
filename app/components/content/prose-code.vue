<script setup lang="ts">
import MDCProseCode from '@nuxtjs/mdc/dist/runtime/components/prose/ProseCode.vue'
</script>

<template>
  <MDCProseCode class="not-prose text-sm/6">
    <slot />
  </MDCProseCode>
</template>
