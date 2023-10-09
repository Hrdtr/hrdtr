<script setup lang="ts">
useHead({
  titleTemplate: '%s %separator .dev/utils',
})

const metas = useUtilitiesMeta()
const metaTags = [...new Set(metas.map(item => item.tags))].flat()
const metasByTag = metas.reduce((acc, item) => {
  item.tags.forEach((tag) => {
    if (!acc[tag]) acc[tag] = [];
    acc[tag].push(item);
  });
  return acc;
}, {} as Record<typeof metaTags[number], typeof metas>)

const { metaSymbol } = useShortcuts()
const commandPaletteVisible = ref(false)
defineShortcuts({
  meta_k: {
    usingInput: true,
    handler: () => {
      commandPaletteVisible.value = !commandPaletteVisible.value
    }
  }
})
const recentlyUsedUtilities = useRecentlyUsedUtilities()

const sidebarVisible = ref(false)
const route = useRoute()
</script>

<template>
  <div class="w-full flex flex-col">
    <UModal v-model="commandPaletteVisible">
      <UCommandPalette
        nullable
        :groups="[
          {
            key: 'recently-used-utilities',
            label: 'Recently Used',
            commands: metas.filter(item => recentlyUsedUtilities.includes(item.path)).map((item) => ({...item, id: item.path, label: item.name})) },
          {
            key: 'utils',
            commands: metas.map((item) => ({...item, id: item.path, label: item.name}))
          }
        ]"
      />
    </UModal>

    <div
      v-if="sidebarVisible"
      class="fixed inset-0 z-10"
      @click="sidebarVisible = false"
    />
    <div
      class="fixed left-0 top-0 w-64 h-screen flex bg-gray-100/75 dark:bg-gray-900/75 flex-col backdrop-blur-lg transition-all duration-300 z-20 md:translate-x-0"
      :class="!sidebarVisible ? '-translate-x-64' : 'translate-x-0'"
    >
      <div class="p-4">
        <div class="flex flex-row items-center justify-between">
          <UtilsLogo />
          <button
            class="w-5 h-5 opacity-75 -mr-1 block md:hidden"
            @click="sidebarVisible = false"
          >
            <span class="i-heroicons-chevron-left inline-block w-full h-full" />
          </button>
        </div>
      </div>
      <UButton
        color="gray"
        variant="link"
        :ui="{ rounded :'rounded-none', padding: { sm:'px-0 py-3' }, color: { gray: { link: 'hover:no-underline text-gray-900/80 dark:text-gray-100/80 border-b border-gray-100 dark:border-gray-900 group' } } }"
        class="mx-4"
        @click="commandPaletteVisible = true"
      >
        <template #leading>
          <UIcon
            name="i-heroicons-magnifying-glass"
            class="w-4 h-4 transform transition-transform duration-200 opacity-80"
          />
        </template>
        <span class="text-sm capitalize font-medium truncate">Search</span>
        <template #trailing>
          <div class="inline-flex gap-1 ml-auto opacity-0 group-hover:opacity-100 transition-opacity">
            <UKbd>{{ metaSymbol }}</UKbd>
            <UKbd>K</UKbd>
          </div>
        </template>
      </UButton>

      <div class="flex-1 py-2 overflow-y-auto">
        <UTabs
          :items="[{ label: 'All' }, { label: 'By Tag', }]"
          :default-index="0"
          :ui="{ wrapper: 'px-3.5' }"
        >
          <template #item="{ item: tabItem }">
            <template v-if="tabItem.label === 'All'">
              <UVerticalNavigation
                :links="metas.map((item) => ({ label: item.name, to: item.path }))"
                :ui="{
                  wrapper: 'pt-2',
                  base: 'group block before:hidden',
                  padding: 'px-0.5 py-2',
                  rounded: '',
                  font: '',
                  ring: '',
                  active: 'text-primary-500 dark:text-primary-400 font-semibold',
                  inactive: 'border-transparent hover:border-gray-400 dark:hover:border-gray-500 text-gray-700 hover:text-gray-900 dark:text-gray-400 dark:hover:text-gray-300'
                }"
              />
            </template>
            <template v-if="tabItem.label === 'By Tag'">
              <UAccordion
                :items="Object.entries(metasByTag).map(([tag, v], i) => ({ label: tag, defaultOpen: /* i === 0 */false, items: v }))"
                :ui="{ wrapper: 'pt-2', item: { base: 'px-0.5' } }"
                multiple
              >
                <template #default="{ item, open }">
                  <UButton
                    color="gray"
                    variant="link"
                    :ui="{ rounded :'rounded-none', padding: { sm:'px-0.5 py-2' }, color: { gray: { link: 'hover:no-underline text-gray-900/80 dark:text-gray-100/80' } } }"
                  >
                    <span class="text-sm capitalize font-medium truncate">{{ item.label }}</span>
                    <template #trailing>
                      <UIcon
                        name="i-heroicons-chevron-right-20-solid"
                        class="w-4 h-4 ml-auto -mr-1 transform transition-transform duration-200 opacity-75"
                        :class="[open && 'rotate-90']"
                      />
                    </template>
                  </UButton>
                </template>
      
                <template #item="{ item }">
                  <UVerticalNavigation
                    :links="item.items?.map((item: typeof metasByTag['base64'][number]) => ({ label: item.name, to: item.path }))"
                    :ui="{
                      wrapper: 'border-l border-gray-200 dark:border-gray-800 space-y-2',
                      base: 'group block border-l -ml-px lg:leading-6 before:hidden',
                      padding: 'p-0 pl-4',
                      rounded: '',
                      font: '',
                      ring: '',
                      active: 'text-primary-500 dark:text-primary-400 border-current font-semibold',
                      inactive: 'border-transparent hover:border-gray-400 dark:hover:border-gray-500 text-gray-700 hover:text-gray-900 dark:text-gray-400 dark:hover:text-gray-300'
                    }"
                  />
                </template>
              </UAccordion>
            </template>
          </template>
        </UTabs>
      </div>
    </div>
    <div class="h-screen flex flex-col md:ml-64 transition-all duration-300">
      <!-- <div class="flex flex-col gap-4 p-4 bg-gray-100/75 dark:bg-gray-900/75 md:bg-gray-50 md:dark:bg-gray-950 transition-colors delay-300 duration-300"> -->
      <div class="flex flex-col gap-4 p-4 lg:px-6 xl:px-8">
        <div class="flex flex-row items-center gap-4 md:hidden">
          <button
            class="w-5 h-5 flex-shrink-0 opacity-75 ml-[-0.145rem]"
            @click="sidebarVisible = true"
          >
            <span class="i-heroicons-bars-2 inline-block w-full h-full" />
          </button>
          <UtilsLogo />
        </div>
        <h1 class="font-bold text-2xl sm:text-3xl">
          {{ route.meta.title }}
        </h1>
      </div>
      <div class="flex-1 overflow-y-auto">
        <slot />
      </div>
    </div>
  </div>
</template>