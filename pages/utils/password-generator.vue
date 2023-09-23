<script setup lang="ts">
import { VueMonacoEditor } from '@guolao/vue-monaco-editor';

definePageMeta({
  layout: 'utils',
  title: 'Password Generator'
})
useSeoMeta({
  title: 'Password Generator'
})
const route = useRoute()
const meta = useUtilitiesMeta((metas) => metas.find(item => item.path === route.path))
const recentlyUsedUtilities = useRecentlyUsedUtilities()
const updateRecentlyUsedUtilities = () => {
  recentlyUsedUtilities.value = [route.path, ...recentlyUsedUtilities.value.filter(i => i !== route.path).slice(0, 4)]
}

const length = ref(14)
const includeNumericChars = ref(true)
const includeSpecialChars = ref(true)
const excludeSimilarChars = ref(true)
const input = ref()
const output = ref('')
const generate = () => {
  let charset = 'abcdefghijkmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ'
  if (includeNumericChars.value) {
    charset += '0123456789'
  }
  if (includeSpecialChars.value) {
    charset += '!@#$%^&*()-_=+[]{}<>?'
  }
  if (excludeSimilarChars.value) {
    charset = charset.replace(/[0OIl1|]/g, '')
  }

  let password = ''
  for (let i = 0; i < length.value; i++) {
    const randomIndex = Math.floor(Math.random() * charset.length)
    password += charset.charAt(randomIndex)
  }

  output.value = password
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
        <div class="flex flex-col gap-2 max-w-xs">
          <UFormGroup label="Length">
            <UInput
              v-model="length"
              type="number"
            />
          </UFormGroup>
          <UFormGroup label="Options">
            <div class="flex flex-col gap-1">
              <UCheckbox
                v-model="includeNumericChars"
                name="include-numeric-chars"
                label="Include Numeric Characters"
              />
              <UCheckbox
                v-model="includeSpecialChars"
                name="include-special-chars"
                label="Include Special Characters"
              />
              <UCheckbox
                v-model="excludeSimilarChars"
                name="exclude-similar-chars"
                label="Exclude Similar Characters"
              />
            </div>
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
          <p>A Password Generator is a tool or software utility designed to generate strong and secure passwords for various purposes, such as online accounts, applications, and systems. It helps users create passwords that are difficult to guess and enhance overall security.</p>
    
          <h2>Key Features</h2>
          <p>A Password Generator typically offers the following key features:</p>
          <ul>
            <li><strong>Randomization:</strong> It generates passwords with a high degree of randomness to make them resistant to attacks.</li>
            <li><strong>Password Length:</strong> Users can specify the desired length of the generated password, making it suitable for different security requirements.</li>
            <li><strong>Inclusion of Numeric Characters:</strong> Users can choose to include numeric digits (0-9) in the password for added complexity.</li>
            <li><strong>Inclusion of Special Characters:</strong> Users can opt to include special characters (e.g., !, @, #, $) to further increase password strength.</li>
            <li><strong>Exclusion of Similar Characters:</strong> Some Password Generators offer an option to exclude characters that can be easily confused (e.g., '1' and 'l', '0' and 'O') to prevent user errors.</li>
          </ul>
    
          <h2>Common Uses</h2>
          <p>Password Generators are widely used in various scenarios, including:</p>
          <ul>
            <li>Account Registration: Users can generate strong passwords when signing up for online services or creating new accounts.</li>
            <li>Password Resets: Password Generators assist in creating new passwords when users forget their existing ones.</li>
            <li>Security Best Practices: Organizations and individuals use them to follow best practices for password security.</li>
            <li>Secure Systems: Passwords generated by these tools help secure access to systems, databases, and sensitive information.</li>
          </ul>
    
          <p>A Password Generator with options to include numeric characters, special characters, and exclude similar characters provides flexibility in creating strong and customized passwords, contributing to improved online security.</p>
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
            to="/utils/lorem-ipsum-generator/"
          >
            Lorem Ipsum Generator
          </UButton>
        </li>
      </ul>
    </template>
  </UtilsPageContainer>
</template>