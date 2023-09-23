<template>
  <div class="flex flex-col lg:flex-row">
    <div class="py-4 px-4 lg:px-6 xl:px-8 flex-1 lg:min-w-[28rem] lg:flex-shrink-0">
      <slot />
      <div class="mt-8 hidden lg:flex lg:flex-col">
        <slot name="related" />
      </div>
    </div>
    <div class="py-8 lg:pt-0 px-4 lg:px-6 xl:px-8 border-t lg:border-t-0 lg:border-l border-gray-200 dark:border-gray-800">
      <slot name="secondary" />
      <div class="mt-8 flex flex-col lg:hidden">
        <slot name="related" />
      </div>
    </div>
  </div>
</template>