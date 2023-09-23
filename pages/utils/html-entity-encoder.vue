<script setup lang="ts">
import { VueMonacoEditor } from '@guolao/vue-monaco-editor';

definePageMeta({
  layout: 'utils',
  title: 'HTML Entity Encoder'
})
useSeoMeta({
  title: 'HTML Entity Encoder'
})
const route = useRoute()
const meta = useUtilitiesMeta((metas) => metas.find(item => item.path === route.path))
const recentlyUsedUtilities = useRecentlyUsedUtilities()
const updateRecentlyUsedUtilities = () => {
  recentlyUsedUtilities.value = [route.path, ...recentlyUsedUtilities.value.filter(i => i !== route.path).slice(0, 4)]
}

const input = ref('')
const output = ref('')
const encode = () => {
  const textarea = document.createElement('textarea')
  textarea.textContent = input.value
  output.value = textarea.innerHTML
  updateRecentlyUsedUtilities()
}
const { copy } = useCopyToClipboard()
</script>


<template>
  <UtilsPageContainer>
    <template #default>
      <div class="flex flex-col gap-4">
        <div class="flex flex-col gap-2">
          <div class="flex flex-row justify-between items-center gap-2">
            <span class="text-sm opacity-75">Input</span>
          </div>
          <div class="h-72">
            <VueMonacoEditor
              v-model:value="input"
              theme="vs-dark"
              language="html"
              :options="{
                minimap: { enabled: false },
                lineNumbers: 'off',
              }"
            />
          </div>

          <div class="flex flex-row justify-end items-center gap-2">
            <UButton
              variant="ghost"
              @click="() => {
                output = ''
                input = ''
              }"
            >
              Reset
            </UButton>
            <UButton @click="encode">
              Encode
            </UButton>
          </div>
        </div>
        <div class="flex flex-col gap-2">
          <div class="flex flex-row justify-between items-center gap-2">
            <span class="text-sm opacity-75">Output</span>
            <UTooltip text="Copy to Clipboard">
              <div class="flex flex-row items-center gap-2">
                <UButton
                  color="gray"
                  icon="i-heroicons-clipboard-document"
                  square
                  variant="link"
                  :padded="false"
                  @click="copy(output, {
                    title: 'Text copied to clipboard'
                  })"
                />
              </div>
            </UTooltip>
          </div>
          <div class="h-72">
            <VueMonacoEditor
              v-model:value="output"
              theme="vs-dark"
              :options="{
                minimap: { enabled: false },
                lineNumbers: 'off',
                readOnly: true
              }"
            />
          </div>
        </div>
      </div>
    </template>
    <template #secondary>
      <div class="flex flex-col gap-4">
        <div class="prose dark:prose-invert">
          <p>An HTML Entity Encoder is a tool or software component that converts special characters and symbols used in HTML documents into their corresponding HTML entities.</p>
    
          <h2>Why It's Needed</h2>
          <p>In HTML, certain characters, such as less-than sign (&lt;), greater-than sign (&gt;), and ampersand (&amp;), have special meanings. Using these characters as is may break the HTML structure or display the content incorrectly in a web browser. To avoid this, HTML entities are used to represent these characters.</p>
    
          <h2>How It Works</h2>
          <p>The encoding process involves replacing special characters with their corresponding HTML entity codes. For example:</p>
          <ul>
            <li><code>&lt;</code> becomes <code>&amp;lt;</code></li>
            <li><code>&gt;</code> becomes <code>&amp;gt;</code></li>
            <li><code>&amp;</code> becomes <code>&amp;amp;</code></li>
          </ul>
    
          <h2>Common Uses</h2>
          <p>HTML Entity Encoding is commonly used in various scenarios, including:</p>
          <ul>
            <li>Displaying code snippets on web pages.</li>
            <li>Handling user-generated content to prevent cross-site scripting (XSS) attacks.</li>
            <li>Encoding characters in HTML emails to ensure proper rendering.</li>
            <li>Displaying mathematical symbols, emojis, and other special characters.</li>
          </ul>
    
          <p>HTML Entity Encoding is an important practice in web development to ensure proper rendering and security when working with HTML documents.</p>
        </div>
        <div>
          <span v-if="meta?.tags && meta.tags.length > 0"><span class="opacity-75">Tags:</span> {{ meta?.tags.join(', ') }}</span>
        </div>
      </div>
    </template>

    <template #related>
      <h5 class="font-semibold mb-2">
        Related Utilities
      </h5>
      <ul class="list-disc list-inside">
        <li class="ml-px">
          <UButton
            :padded="false"
            variant="link"
            to="/utils/html-entity-decoder/"
          >
            HTML Entity Decoder
          </UButton>
        </li>
      </ul>
    </template>
  </UtilsPageContainer>
</template>