<script setup lang="ts">
import { VueMonacoEditor } from '@guolao/vue-monaco-editor';

definePageMeta({
  layout: 'utils',
  title: 'Base64 Text Encoder'
})
useSeoMeta({
  title: 'Base64 Text Encoder'
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
  output.value = btoa(input.value)
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
                wordWrap: 'on'
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
                readOnly: true,
                wordWrap: 'on'
              }"
            />
          </div>
        </div>
      </div>
    </template>
    <template #secondary>
      <div class="flex flex-col gap-4">
        <div class="prose dark:prose-invert">
          <p>A Base64 text encoder is a tool or software component that converts binary data or text into a special format called Base64 encoding.</p>
    
          <h2>How It Works</h2>
          <p>Base64 encoding represents binary data using a set of 64 different characters, which are safe for transmission in text-based formats. It works as follows:</p>
          <ul>
            <li>The input data, which can be binary (e.g., images) or text (e.g., strings), is taken as input.</li>
            <li>The encoder converts the data into a series of characters from the Base64 character set.</li>
            <li>The output is a text string that represents the input data in a format that can be safely transmitted or stored as text.</li>
          </ul>
    
          <h2>Common Uses</h2>
          <p>Base64 text encoding is commonly used in various scenarios, including:</p>
          <ul>
            <li>Email attachments, where attachments are encoded to include them in email messages.</li>
            <li>Data transfer in web applications, where binary data is encoded and sent in web requests or responses.</li>
            <li>Storing binary data in structured data formats like XML or JSON.</li>
            <li>Handling binary data in text-based network protocols.</li>
          </ul>
    
          <p>Base64 encoding is a widely used technique for representing binary data in a text-friendly way.</p>
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
            to="/utils/base64-text-decoder/"
          >
            Base64 Text Decoder
          </UButton>
        </li>
        <li class="ml-px">
          <UButton
            :padded="false"
            variant="link"
            to="/utils/base64-image-encoder/"
          >
            Base64 Image Encoder
          </UButton>
        </li>
        <li class="ml-px">
          <UButton
            :padded="false"
            variant="link"
            to="/utils/base64-image-decoder/"
          >
            Base64 Image Decoder
          </UButton>
        </li>
      </ul>
    </template>
  </UtilsPageContainer>
</template>