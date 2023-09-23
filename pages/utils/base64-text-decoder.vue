<script setup lang="ts">
definePageMeta({
  layout: 'utils',
  title: 'Base64 Text Decoder'
})
useSeoMeta({
  title: 'Base64 Text Decoder'
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
  output.value = atob(input.value)
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
          <p>A Base64 text decoder is a tool or software component that reverses the process of Base64 encoding. It takes a Base64-encoded string as input and converts it back into its original binary or text data format.</p>
    
          <h2>How It Works</h2>
          <p>The decoding process involves the following steps:</p>
          <ol>
            <li>The input is a string of characters that have been encoded using the Base64 encoding scheme.</li>
            <li>The decoder processes the input string, recognizing the Base64 characters and their positions.</li>
            <li>It reverses the encoding by converting each set of four Base64 characters back into the original binary data they represent.</li>
            <li>The output is the original binary or text data that was encoded using Base64.</li>
          </ol>
          
          <h2>Common Uses</h2>
          <p>Base64 text decoding is commonly used in various scenarios, including:</p>
          <ul>
            <li>Email attachments, where attachments are encoded to include them in email messages.</li>
            <li>Data transfer in web applications, where binary data is encoded and sent in web requests or responses.</li>
            <li>Storing binary data in structured data formats like XML or JSON.</li>
            <li>Handling binary data in text-based network protocols.</li>
          </ul>
          
          <p>Base64 text decoding is an essential operation in software development when you need to retrieve the original data from a Base64-encoded string.</p>
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
            to="/utils/base64-text-encoder/"
          >
            Base64 Text Encoder
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
        <li class="ml-px">
          <UButton
            :padded="false"
            variant="link"
            to="/utils/base64-image-encoder/"
          >
            Base64 Image Encoder
          </UButton>
        </li>
      </ul>
    </template>
  </UtilsPageContainer>
</template>