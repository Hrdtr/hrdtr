<script setup lang="ts">
definePageMeta({
  layout: 'utils',
  title: 'URL Encoder'
})
useSeoMeta({
  title: 'URL Encoder'
})
const route = useRoute()
const meta = useUtilitiesMeta((metas) => metas.find(item => item.path === route.path))
const recentlyUsedUtilities = useRecentlyUsedUtilities()
const updateRecentlyUsedUtilities = () => {
  recentlyUsedUtilities.value = [route.path, ...recentlyUsedUtilities.value.filter(i => i !== route.path).slice(0, 4)]
}

const input = ref('')
const component = ref(true)
const output = ref('')
const encode = () => {
  output.value = component.value ? encodeURIComponent(input.value) : encodeURI(input.value)
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

          <div class="flex flex-row justify-between items-center gap-2">
            <div class="flex flex-row items-center gap-2">
              <UCheckbox
                v-model="component"
                name="component"
                label="Component"
              />
            </div>
            <div class="flex flex-row items-center gap-2">
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
          <p>A URL Encoder is a tool or software utility that is used to encode Uniform Resource Locators (URLs) or other URI (Uniform Resource Identifier) components to ensure that they are transmitted correctly over the internet. URL encoding converts characters in a URL into a format that is safe for transmission and can be correctly interpreted by web browsers and servers.</p>
    
          <h2>How It Works</h2>
          <p>The URL Encoding process involves the following steps:</p>
          <ol>
            <li>Accepts a URL or URI component as input, which may contain characters that are not safe for use in URLs.</li>
            <li>Iterates through each character in the input and replaces characters that are not URL-safe with a percent sign ("%") followed by a two-digit hexadecimal representation of the character's ASCII value.</li>
            <li>Produces an encoded URL or URI component that can be safely included in web requests, links, or other internet-related operations.</li>
          </ol>
    
          <h2>Common Uses</h2>
          <p>URL Encoders are commonly used in various scenarios, including:</p>
          <ul>
            <li>Web Form Data: When submitting data via web forms, special characters (e.g., spaces, ampersands, and special symbols) are encoded to prevent errors and ensure data integrity.</li>
            <li>Query Parameters: URL encoding is used to encode query parameters in URLs so that they can be correctly interpreted by web servers.</li>
            <li>Link Generation: When generating dynamic links in web applications, URL encoding ensures that the links contain valid and safe characters.</li>
            <li>API Requests: URL encoding is essential when constructing URLs for API requests to avoid issues with reserved characters.</li>
          </ul>
    
          <p>A URL Encoder is a crucial tool for web developers and applications to handle and transmit URLs and URI components safely and efficiently over the internet.</p>
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
            to="/utils/url-decoder/"
          >
            URL Decoder
          </UButton>
        </li>
      </ul>
    </template>
  </UtilsPageContainer>
</template>