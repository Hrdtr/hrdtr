<script setup lang="ts">
definePageMeta({
  layout: 'utils',
  title: 'Base64 Image Decoder'
})
useSeoMeta({
  title: 'Base64 Image Decoder'
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
  if (!input.value || input.value.length === 0) return
  if (input.value.startsWith('data:image/')) {
    output.value = input.value
  } else {
    output.value = 'data:image/png,' + input.value
  }
  updateRecentlyUsedUtilities()
}
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
        <div
          v-if="output.length > 0"
          class="flex flex-col gap-2"
        >
          <div class="flex flex-row justify-between items-center gap-2">
            <span class="text-sm opacity-75">Output</span>
            <UTooltip text="Download">
              <div class="flex flex-row items-center gap-2">
                <a
                  :href="output"
                  target="_blank"
                  download
                >
                  <UButton
                    color="gray"
                    icon="i-heroicons-arrow-down-tray"
                    square
                    variant="link"
                    :padded="false"
                  />
                </a>
              </div>
            </UTooltip>
          </div>
          <div>
            <img
              class="object-contain w-full sm:max-w-[50%]"
              :src="output"
            >
          </div>
        </div>
      </div>
    </template>
    <template #secondary>
      <div class="flex flex-col gap-4">
        <div class="prose dark:prose-invert">
          <p>A Base64 image decoder is a tool or software component that reverses the process of Base64 encoding for image data. It takes a Base64-encoded string representing an image and converts it back into its original binary image format.</p>
          
          <h2>How It Works</h2>
          <p>The decoding process for a Base64-encoded image involves the following steps:</p>
          <ol>
            <li>The input is a Base64-encoded string representing the image's binary data.</li>
            <li>The decoder processes the input string, recognizing the Base64 characters and their positions.</li>
            <li>It reverses the encoding by converting the Base64 characters back into the original binary data of the image.</li>
            <li>The output is the original image in its binary format (e.g., JPEG, PNG).</li>
          </ol>
          
          <h2>Common Uses</h2>
          <p>Base64 image decoding is commonly used in various scenarios, including:</p>
          <ul>
            <li>Displaying images on web pages that are delivered in Base64-encoded form.</li>
            <li>Processing image data received from APIs or data sources.</li>
            <li>Storing images in databases or file systems after decoding from Base64.</li>
            <li>Converting Base64-encoded images into downloadable files.</li>
          </ul>
          
          <p>A Base64 image decoder is a useful tool for working with image data that has been encoded in Base64 format, allowing you to retrieve the original image for various purposes.</p>
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
            to="/utils/base64-image-encoder/"
          >
            Base64 Image Encoder
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
        <li class="ml-px">
          <UButton
            :padded="false"
            variant="link"
            to="/utils/base64-text-encoder/"
          >
            Base64 Text Encoder
          </UButton>
        </li>
      </ul>
    </template>
  </UtilsPageContainer>
</template>