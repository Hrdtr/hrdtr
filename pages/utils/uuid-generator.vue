<script setup lang="ts">
definePageMeta({
  layout: 'utils',
  title: 'UUID Generator'
})
useSeoMeta({
  title: 'UUID Generator'
})
const route = useRoute()
const meta = useUtilitiesMeta((metas) => metas.find(item => item.path === route.path))
const recentlyUsedUtilities = useRecentlyUsedUtilities()
const updateRecentlyUsedUtilities = () => {
  recentlyUsedUtilities.value = [route.path, ...recentlyUsedUtilities.value.filter(i => i !== route.path).slice(0, 4)]
}

const version = ref('4')
const input = ref()
const output = ref('')
const generate = () => {
  let uuid = ''
  const characters = 'abcdef0123456789'

  for (let i = 0; i < 32; i++) {
    if (i === 8 || i === 12 || i === 16 || i === 20) {
      uuid += '-'
    } else {
      const randomIndex = Math.floor(Math.random() * characters.length)
      uuid += characters.charAt(randomIndex)
    }
  }
  output.value = uuid
  updateRecentlyUsedUtilities()
}

const { copy } = useCopyToClipboard()
</script>


<template>
  <UtilsPageContainer>
    <template #default>
      <div class="flex flex-col gap-4">
        <div class="flex flex-row justify-between items-center gap-2">
          <span class="text-sm opacity-75">Input</span>
        </div>
        <div class="flex flex-wrap gap-2">
          <USelectMenu
            v-model="version"
            :options="['4']"
          >
            <template #label>
              UUID v{{ version }}
            </template>
          </USelectMenu>
        </div>
        <div class="flex flex-row justify-end items-center gap-2">
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
            <UButton @click="generate">
              Generate
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
          <p>A UUID Generator is a tool or software utility designed to generate Universally Unique Identifiers (UUIDs), which are unique 128-bit identifiers used in various software applications and systems to ensure uniqueness across different devices and environments.</p>
    
          <h2>UUID Versions</h2>
          <p>UUIDs come in different versions, including version 4. Version 4 UUIDs are randomly generated UUIDs and are characterized by:</p>
          <ul>
            <li><strong>128-Bit Length:</strong> Version 4 UUIDs are 128 bits in length, ensuring a high degree of uniqueness.</li>
            <li><strong>Randomness:</strong> They are generated using a secure random number generator, providing a high degree of randomness.</li>
            <li><strong>Universality:</strong> Version 4 UUIDs are not bound to a specific machine or time, making them suitable for generating unique identifiers in distributed systems.</li>
          </ul>
    
          <h2>How It Works</h2>
          <p>A UUID Generator typically works by:</p>
          <ol>
            <li>Generating 128 bits of data using a secure random number generator.</li>
            <li>Formatting the generated data into a standard UUID format, including the version number (e.g., 4) and variant bits.</li>
            <li>Providing the generated UUID, which can be used as a unique identifier in various applications.</li>
          </ol>
    
          <h2>Common Uses</h2>
          <p>UUID Generators are commonly used in various scenarios, including:</p>
          <ul>
            <li>Database Records: UUIDs can be used as primary keys for database records, ensuring uniqueness in distributed databases.</li>
            <li>Session Management: UUIDs are employed to create session identifiers for web applications.</li>
            <li>Distributed Systems: They help maintain uniqueness in distributed systems, such as microservices architectures.</li>
            <li>Unique Identifiers: UUIDs serve as unique identifiers in various applications and contexts where uniqueness is essential.</li>
          </ul>
    
          <p>A UUID Generator is a valuable tool for ensuring uniqueness and generating random identifiers in a wide range of applications and systems.</p>
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
            to="/utils/lorem-ipsum-generator/"
          >
            Lorem Ipsum Generator
          </UButton>
        </li>
        <li class="ml-px">
          <UButton
            :padded="false"
            variant="link"
            to="/utils/password-generator/"
          >
            Password Generator
          </UButton>
        </li>
      </ul>
    </template>
  </UtilsPageContainer>
</template>