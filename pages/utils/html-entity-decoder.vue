<script setup lang="ts">
definePageMeta({
  layout: 'utils',
  title: 'HTML Entity Decoder'
})
useSeoMeta({
  title: 'HTML Entity Decoder'
})
const route = useRoute()
const meta = useUtilitiesMeta((metas) => metas.find(item => item.path === route.path))
const recentlyUsedUtilities = useRecentlyUsedUtilities()
const updateRecentlyUsedUtilities = () => {
  recentlyUsedUtilities.value = [route.path, ...recentlyUsedUtilities.value.filter(i => i !== route.path).slice(0, 4)]
}

const input = ref('')
const output = ref('')
const decode = () => {
  const textarea = document.createElement('textarea')
  textarea.innerHTML = input.value
  output.value = textarea.textContent || ''
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
            <UButton @click="decode">
              Decode
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
              language="html"
              :options="{
                minimap: { enabled: false },
                lineNumbers: 'off',
                readOnly: true,
              }"
            />
          </div>
        </div>
      </div>
    </template>
    <template #secondary>
      <div class="flex flex-col gap-4">
        <div class="prose dark:prose-invert">
          <p>An HTML Entity Decoder is a tool or software component that reverses the process of HTML entity encoding. It takes a string that contains HTML entities as input and converts them back into their corresponding characters or symbols.</p>
    
          <h2>How It Works</h2>
          <p>The decoding process involves the following steps:</p>
          <ol>
            <li>The input is a string that may contain HTML entities, such as &amp;amp; (ampersand entity) or &amp;lt; (less-than entity).</li>
            <li>The decoder processes the input string and identifies the HTML entities.</li>
            <li>It replaces each HTML entity with its corresponding character or symbol.</li>
            <li>The output is the original string with HTML entities decoded into readable characters.</li>
          </ol>
    
          <h2>Common Uses</h2>
          <p>HTML Entity Decoding is commonly used in various scenarios, including:</p>
          <ul>
            <li>Displaying HTML content: When rendering HTML content from a database or external source, entities need to be decoded to display the correct characters.</li>
            <li>Handling user input: User-generated content may contain HTML entities that need to be decoded to prevent security issues.</li>
            <li>Working with XML or HTML documents: When parsing or processing XML or HTML documents programmatically, entities must be decoded to access the original content.</li>
          </ul>
    
          <p>HTML Entity Decoding is an essential operation in web development to ensure that HTML entities are correctly interpreted and displayed as intended.</p>
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
            to="/utils/html-entity-encoder/"
          >
            HTML Entity Encoder
          </UButton>
        </li>
      </ul>
    </template>
  </UtilsPageContainer>
</template>