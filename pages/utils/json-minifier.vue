<script setup lang="ts">
definePageMeta({
  layout: 'utils',
  title: 'JSON Minifier'
})
useSeoMeta({
  title: 'JSON Minifier'
})
const route = useRoute()
const meta = useUtilitiesMeta((metas) => metas.find(item => item.path === route.path))
const recentlyUsedUtilities = useRecentlyUsedUtilities()
const updateRecentlyUsedUtilities = () => {
  recentlyUsedUtilities.value = [route.path, ...recentlyUsedUtilities.value.filter(i => i !== route.path).slice(0, 4)]
}

const input = ref('')
const output = ref('')
const toast = useToast()
const minify = () => {
  try {
    output.value = JSON.stringify(JSON.parse(input.value), null, 0)
    updateRecentlyUsedUtilities()
  } catch (error) {
    toast.add({
      title: 'Error',
      description: error as string,
      color: 'red'
    })
  }
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
              language="json"
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
            <UButton @click="minify">
              Minify
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
              language="json"
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
          <p>A JSON Minifier is a tool or software utility designed to reduce the size of JSON (JavaScript Object Notation) data by removing unnecessary whitespace, line breaks, and other formatting. It transforms JSON from a human-readable format into a more compact form, often referred to as "minified" JSON.</p>
    
          <h2>How It Works</h2>
          <p>The primary function of a JSON Minifier is to:</p>
          <ol>
            <li>Accept JSON data as input, which may be formatted with indentation and line breaks to enhance human readability.</li>
            <li>Process the input JSON and remove all unnecessary whitespace, including spaces, tabs, and line breaks, while preserving the integrity of the JSON structure.</li>
            <li>Produce a minified JSON output that is more efficient for data transmission and storage, especially in scenarios where every byte of data matters.</li>
          </ol>
    
          <h2>Common Uses</h2>
          <p>JSON Minifiers are commonly used in various scenarios, including:</p>
          <ul>
            <li>Web Development: Minified JSON is often used in web applications and APIs to reduce data transfer times and improve page load performance.</li>
            <li>Network Efficiency: Minified JSON reduces the amount of data sent over networks, which can be crucial for mobile applications with limited bandwidth.</li>
            <li>Configuration Files: Minified JSON is used in configuration files for web servers, databases, and other software systems.</li>
            <li>Resource Optimization: It is employed to optimize the size of JSON data stored in databases or caches.</li>
          </ul>
    
          <p>JSON Minifiers help improve the efficiency of data transmission and storage while sacrificing human readability in favor of compactness.</p>
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
            to="/utils/json-formatter/"
          >
            JSON Formatter
          </UButton>
        </li>
      </ul>
    </template>
  </UtilsPageContainer>
</template>