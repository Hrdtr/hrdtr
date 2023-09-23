<script setup lang="ts">
definePageMeta({
  layout: 'utils',
  title: 'WiFi QR Code Generator'
})
useSeoMeta({
  title: 'WiFi QR Code Generator'
})
const route = useRoute()
const meta = useUtilitiesMeta((metas) => metas.find(item => item.path === route.path))
const recentlyUsedUtilities = useRecentlyUsedUtilities()
const updateRecentlyUsedUtilities = () => {
  recentlyUsedUtilities.value = [route.path, ...recentlyUsedUtilities.value.filter(i => i !== route.path).slice(0, 4)]
}

const ssid = ref('')
const password = ref('')
const hidden = ref(false)
const encryption = ref('WPA/WPA2')
const errorCorrectionLevel = ref('M')
const output = ref('')

const toast = useToast()
const generate = () => {
  if (ssid.value.length === 0 || password.value.length === 0) {
    toast.add({
      title: 'Error',
      description: 'Please fill Network Name and Password fields',
      color: 'red'
    })
    return
  }
  const encryptionValue =
    encryption.value === 'WPA/WPA2'
      ? 'WPA'
      : encryption.value === 'WEP'
        ? 'WEP'
        : 'nopass'
  output.value = `https://chart.googleapis.com/chart?cht=qr&chl=${encodeURIComponent(
    `WIFI:T:${encryptionValue};S:${ssid.value};P:${password.value};H:${
      hidden.value ? 'true' : 'false'
    }`
  )}&chs=180x180&choe=UTF-8&chld=${errorCorrectionLevel.value}|2`
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
          <div class="flex flex-wrap gap-2">
            <UFormGroup label="SSID">
              <UInput v-model="ssid" />
            </UFormGroup>
            <UFormGroup label="Password">
              <UInput v-model="password" />
            </UFormGroup>
          </div>
          <div class="flex flex-wrap gap-2">
            <UFormGroup label="Encryption">
              <USelectMenu
                v-model="encryption"
                label="Encryption"
                :options="['None', 'WPA', 'WEP']"
              />
            </UFormGroup>
            <UFormGroup label="Hidden">
              <UCheckbox v-model="hidden" />
            </UFormGroup>
          </div>

          <div class="flex flex-row justify-between items-center gap-2">
            <USelectMenu
              v-model="errorCorrectionLevel"
              :options="['L', 'M', 'Q', 'H']"
            >
              <template #label>
                Error Correction Level: {{ errorCorrectionLevel }}
              </template>
            </USelectMenu>
            <div class="flex flex-row justify-end items-center gap-2">
              <UButton
                variant="ghost"
                @click="() => {
                  output = ''
                  ssid = ''
                  password = ''
                  hidden = false
                  encryption = 'WPA/WPA2'
                }"
              >
                Reset
              </UButton>
              <UButton @click="generate">
                Generate
              </UButton>
            </div>
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
          <p>A QR Code Generator is a tool or software utility designed to create Quick Response (QR) codes. QR codes are two-dimensional barcodes that can store various types of information, such as URLs, text, contact details, and more. They are widely used for sharing data quickly and efficiently using a smartphone or QR code scanner.</p>
    
          <h2>How It Works</h2>
          <p>The QR Code Generation process involves the following steps:</p>
          <ol>
            <li>Accepts input data, which can include URLs, text, contact information, Wi-Fi credentials, and more, depending on the intended use of the QR code.</li>
            <li>Encodes the input data into a QR code pattern using a QR code encoding algorithm.</li>
            <li>Generates the QR code image, which consists of black squares on a white background, following the QR code standard.</li>
            <li>Provides the generated QR code image for download, printing, or sharing.</li>
          </ol>
          
          <h2>Common Uses</h2>
          <p>QR Code Generators are commonly used in various scenarios, including:</p>
          <ul>
            <li>Website Links: Generating QR codes for URLs, allowing users to scan and visit websites easily.</li>
            <li>Contact Information: Creating QR codes with contact details for sharing business cards and personal information.</li>
            <li>Product Packaging: Adding QR codes to product packaging for quick access to product information or promotions.</li>
            <li>Event Tickets: Generating QR codes for event tickets or boarding passes for quick and paperless check-in.</li>
            <li>Authentication: QR codes are used for two-factor authentication and secure login processes.</li>
          </ul>
          
          <p>QR Code Generators provide a convenient way to encode and share information digitally, making it accessible to users with smartphones and QR code scanning capabilities.</p>
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
            to="/utils/qr-code-generator/"
          >
            QR Code Generator
          </UButton>
        </li>
      </ul>
    </template>
  </UtilsPageContainer>
</template>