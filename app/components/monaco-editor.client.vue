<script setup lang="ts">
import type { EditorProps } from '@guolao/vue-monaco-editor'
import { defu } from 'defu'

const props = withDefaults(defineProps<{
  theme?: EditorProps['theme']
  options?: EditorProps['options']
}>(), {
  theme: 'vs-dark',
})

const options = defu(props.options, {
  automaticLayout: true,
} as Partial<EditorProps['options']>)

const model = defineModel<string>()
const editor = shallowRef()

defineExpose({ editor })
</script>

<template>
  <VueMonacoEditor
    v-model:value="model"
    :theme="props.theme"
    :options="options"
    @mount="instance => (editor = instance)"
  />
</template>
