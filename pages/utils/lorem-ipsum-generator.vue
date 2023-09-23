<script setup lang="ts">
import { VueMonacoEditor } from '@guolao/vue-monaco-editor';

definePageMeta({
  layout: 'utils',
  title: 'Lorem Ipsum Generator'
})
useSeoMeta({
  title: 'Lorem Ipsum Generator'
})
const route = useRoute()
const meta = useUtilitiesMeta((metas) => metas.find(item => item.path === route.path))
const recentlyUsedUtilities = useRecentlyUsedUtilities()
const updateRecentlyUsedUtilities = () => {
  recentlyUsedUtilities.value = [route.path, ...recentlyUsedUtilities.value.filter(i => i !== route.path).slice(0, 4)]
}

const numberOfParagraph = ref(3)
const outputType = ref('Plain Text')
const input = ref()
const output = ref('')
const generate = () => {
  const sentences = [
    'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
    'Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.',
    'Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.',
    'Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.',
    'Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam.',
    'Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit aut fugit, sed quia consequuntur magni dolores eos qui ratione voluptatem sequi nesciunt.'
  ]

  let result = ''
  for (let i = 0; i < numberOfParagraph.value; i++) {
    const numSentences = Math.floor(Math.random() * 3) + 4 // Random number of sentences between 4 and 6
    result += outputType.value === 'HTML' ? '<p>' : ''
    for (let j = 0; j < numSentences; j++) {
      if (i === 0 && j === 0) {
        result += sentences[0]
      } else {
        result += generateRandomSentence()
      }
      if (j !== numSentences - 1) {
        result += ' '
      }
    }
    result += outputType.value  === 'HTML'? '</p>\n' : '\n'
  }

  output.value = result
  updateRecentlyUsedUtilities()
}

// Generate a random sentence from the sentences array
const generateRandomSentence = () => {
  const sentences = [
    'Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.',
    'Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.',
    'Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.',
    'Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam.',
    'Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit aut fugit, sed quia consequuntur magni dolores eos qui ratione voluptatem sequi nesciunt.'
  ]

  const randomIndex = Math.floor(Math.random() * sentences.length)
  return sentences[randomIndex]
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
          <UFormGroup label="Number of Paragraph">
            <UInput
              v-model="numberOfParagraph"
              type="number"
            />
          </UFormGroup>
          <UFormGroup label="Output Type">
            <USelectMenu
              v-model="outputType"
              :options="['Plain Text', 'HTML']"
            />
          </UFormGroup>
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
              :language="outputType === 'HTML' ? 'html' : undefined"
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
          <p>A Lorem Ipsum Generator is a tool or software utility that automatically generates placeholder text in the form of Latin-like text known as "Lorem Ipsum." This type of text is often used in the design and typesetting industry to simulate the appearance of real written content when the actual content is not available or finalized.</p>
    
          <h2>How It Works</h2>
          <p>The Lorem Ipsum Generator:</p>
          <ol>
            <li>Accepts input parameters such as the desired length of the generated text or the number of paragraphs or sentences needed.</li>
            <li>Automatically generates Lorem Ipsum text based on the input parameters, typically following standard Lorem Ipsum patterns.</li>
            <li>Provides the generated text in plain text format, which can be easily copied and pasted into design mockups, websites, or documents.</li>
          </ol>
    
          <h2>Common Uses</h2>
          <p>Lorem Ipsum Generators are commonly used in various scenarios, including:</p>
          <ul>
            <li>Graphic Design: Placeholder text is used in graphic design projects to visualize the layout of text elements within a design or template.</li>
            <li>Web Development: Developers use Lorem Ipsum to fill in content areas of web pages during the design and development phase.</li>
            <li>Print Layout: It's used in print publishing and typesetting to plan the layout of books, magazines, and other printed materials.</li>
            <li>Content Prototyping: When content for a project is not yet available, Lorem Ipsum serves as a temporary stand-in for realistic content.</li>
          </ul>
    
          <p>Lorem Ipsum Generators save time and effort in the design and development process by providing realistic-looking text placeholders.</p>
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
            to="/utils/uuid-generator/"
          >
            UUID Generator
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