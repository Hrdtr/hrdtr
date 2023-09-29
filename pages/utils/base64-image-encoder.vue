<script setup lang="ts">
definePageMeta({
  layout: 'utils',
  title: 'Base64 Image Encoder'
})
useSeoMeta({
  title: 'Base64 Image Encoder'
})
const route = useRoute()
const meta = useUtilitiesMeta((metas) => metas.find(item => item.path === route.path))
const recentlyUsedUtilities = useRecentlyUsedUtilities()
const updateRecentlyUsedUtilities = () => {
  recentlyUsedUtilities.value = [route.path, ...recentlyUsedUtilities.value.filter(i => i !== route.path).slice(0, 4)]
}

const onChange = (event: Event) => {
  const target = event.target as HTMLInputElement
  const selectedfiles = target.files
  if (selectedfiles && selectedfiles.length > 0) {
    const fileReader = new FileReader()
    fileReader.onload = () => {
      const srcData = fileReader.result
      previewDataURL.value = srcData as string
    }
    fileReader.readAsDataURL(selectedfiles[0])
  }
}
const previewDataURL = ref()
const input = ref()
const asDataURL = ref(true)
const output = ref('')
const encode = () => {
  output.value = asDataURL.value ? previewDataURL.value : previewDataURL.value.split(',')[1]
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
          <div class="flex flex-col gap-2">
            <UInput
              ref="input"
              type="file"
              class="sm:w-1/2"
              @change="onChange"
            />
            <img
              class="object-contain sm:max-w-[50%]"
              :src="previewDataURL"
            >
          </div>

          <div class="flex flex-row justify-between items-center gap-2">
            <UCheckbox
              v-model="asDataURL"
              name="as-data-url"
              label="As Data Url"
            />
            <div class="flex flex-row items-center justify-between gap-2">
              <UButton
                variant="ghost"
                @click="() => {
                  if (input) input.input.value = ''
                  previewDataURL = ''
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
          <p>A Base64 image encoder is a tool or software component that converts image files into a special text-based format known as Base64 encoding.</p>
    
          <h2>How It Works</h2>
          <p>The process of encoding an image into Base64 format involves the following steps:</p>
          <ol>
            <li>The input to the encoder is an image file, typically in binary format (e.g., JPEG, PNG).</li>
            <li>The encoder reads the binary data of the image and converts it into a series of ASCII text characters.</li>
            <li>The output is a text string that represents the image's binary data in a format that can be embedded in HTML, CSS, or other text-based documents.</li>
          </ol>
    
          <h2>Common Uses</h2>
          <p>Base64 image encoding is commonly used in various scenarios, including:</p>
          <ul>
            <li>Embedding images directly in HTML using Data URLs (e.g., `&lt;img src="data:image/png;base64,..."&gt;`).</li>
            <li>Inlining images in CSS stylesheets.</li>
            <li>Transmitting images as text in web applications.</li>
            <li>Storing images as text in configuration files or databases.</li>
          </ul>
    
          <p>Base64 image encoding is a convenient way to work with images in contexts where binary data is not directly supported.</p>
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
            to="/utils/base64-image-decoder/"
          >
            Base64 Image Decoder
          </UButton>
        </li>
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
            to="/utils/base64-text-decoder/"
          >
            Base64 Text Decoder
          </UButton>
        </li>
      </ul>
    </template>
  </UtilsPageContainer>
</template>