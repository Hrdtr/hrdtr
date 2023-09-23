<script setup lang="ts">
definePageMeta({
  layout: 'utils',
  title: 'JSON Formatter'
})
useSeoMeta({
  title: 'JSON Formatter'
})
const route = useRoute()
const meta = useUtilitiesMeta((metas) => metas.find(item => item.path === route.path))
const recentlyUsedUtilities = useRecentlyUsedUtilities()
const updateRecentlyUsedUtilities = () => {
  recentlyUsedUtilities.value = [route.path, ...recentlyUsedUtilities.value.filter(i => i !== route.path).slice(0, 4)]
}

const input = ref('')
const space = ref('4')
const output = ref('')
const toast = useToast()
const format = () => {
  try {
    output.value = JSON.stringify(JSON.parse(input.value), null, Number(space.value))
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

          <div class="flex flex-row justify-between items-center gap-2">
            <div class="flex flex-row items-center gap-2">
              <USelectMenu
                v-model="space"
                :options="['2', '3', '4']"
                placeholder="Space"
              >
                <template #label>
                  Space: {{ space }}
                </template>
              </USelectMenu>
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
              <UButton @click="format">
                Format
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
              language="json"
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
          <p>A JSON Formatter is a tool or software utility designed to improve the readability and structure of JSON (JavaScript Object Notation) data. JSON is a popular data interchange format used to represent structured data, often used in web applications and APIs.</p>
    
          <h2>How It Works</h2>
          <p>The primary function of a JSON Formatter is to:</p>
          <ol>
            <li>Accept JSON data as input, which may be minified or poorly formatted, making it challenging for humans to read.</li>
            <li>Process the input JSON and format it in a way that is visually organized, easy to understand, and properly indented.</li>
            <li>Optionally provide syntax highlighting or color coding to distinguish different parts of the JSON data (e.g., keys, values, objects, arrays).</li>
            <li>Offer features such as collapsing or expanding sections of the JSON for better navigation.</li>
          </ol>
          
          <h2>Common Uses</h2>
          <p>JSON Formatters are commonly used in various scenarios, including:</p>
          <ul>
            <li>Debugging: Developers use JSON Formatters to view and analyze JSON responses from APIs or data sources.</li>
            <li>Improved Readability: Formatting JSON makes it easier to understand the structure and content of complex data.</li>
            <li>Data Transformation: Formatted JSON can be copied and pasted into code or configuration files.</li>
            <li>Validating JSON: JSON Formatters can help identify syntax errors in JSON data.</li>
          </ul>
          
          <p>Overall, JSON Formatters play a valuable role in simplifying the handling and manipulation of JSON data, making it more accessible to developers and analysts.</p>
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
            to="/utils/json-minifier/"
          >
            JSON Minifier
          </UButton>
        </li>
      </ul>
    </template>
  </UtilsPageContainer>
</template>