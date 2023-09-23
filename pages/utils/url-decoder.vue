<script setup lang="ts">
definePageMeta({
  layout: 'utils',
  title: 'URL Decoder'
})
useSeoMeta({
  title: 'URL Decoder'
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
const decode = () => {
  output.value = component.value ? decodeURIComponent(input.value) : decodeURI(input.value)
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
              <UButton @click="decode">
                Decode
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
          <p>A URL Decoder is a tool or software utility that is used to decode Uniform Resource Locators (URLs) or other URI (Uniform Resource Identifier) components. URL decoding reverses the URL encoding process and converts encoded characters back to their original form, making URLs and URI components human-readable and interpretable.</p>
    
          <h2>How It Works</h2>
          <p>The URL Decoding process involves the following steps:</p>
          <ol>
            <li>Accepts a URL or URI component as input, which may contain percent-encoded characters (e.g., "%20" for space, "%3A" for a colon).</li>
            <li>Identifies percent-encoded sequences in the input and replaces them with the original character represented by the hexadecimal value.</li>
            <li>Produces a decoded URL or URI component that is human-readable and can be understood by web browsers and applications.</li>
          </ol>
    
          <h2>Common Uses</h2>
          <p>URL Decoders are commonly used in various scenarios, including:</p>
          <ul>
            <li>Web Browsing: Web browsers automatically decode URLs to display human-readable web addresses in the address bar.</li>
            <li>URL Parsing: In web development, URL decoding is used to extract and interpret parameters and components from URLs for processing.</li>
            <li>Link Handling: When receiving or processing URLs in web applications, URL decoding is necessary to interpret and act on the information contained in the URLs.</li>
            <li>API Responses: When consuming APIs, URL decoding may be needed to interpret URL-encoded data returned in API responses.</li>
          </ul>
    
          <p>A URL Decoder is a fundamental tool for handling URLs and URI components in a way that allows humans and applications to understand and interact with web addresses and data contained within them.</p>
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
            to="/utils/url-encoder/"
          >
            URL Encoder
          </UButton>
        </li>
      </ul>
    </template>
  </UtilsPageContainer>
</template>