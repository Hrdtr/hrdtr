import { install as VueMonacoEditorPlugin } from '@guolao/vue-monaco-editor'
import type { VueMonacoDiffEditor, VueMonacoEditor } from '@guolao/vue-monaco-editor'

export default defineNuxtPlugin((nuxtApp) => {
  nuxtApp.vueApp.use(VueMonacoEditorPlugin, {
    paths: {
      vs: 'https://cdn.jsdelivr.net/npm/monaco-editor@0.38.0/min/vs'
    },
  })
})

declare module '@vue/runtime-core' {
  export interface GlobalComponents {
    VueMonacoEditor: typeof VueMonacoEditor,
    VueMonacoDiffEditor: typeof VueMonacoDiffEditor
  }
}