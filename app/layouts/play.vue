<script setup lang="ts">
const route = useRoute()

const mobileNavigationVisible = useState('layout:play:mobileNavigationVisible', () => false)
</script>

<template>
  <div class="relative overflow-hidden">
    <div
      class="absolute inset-0 right-auto z-10 flex flex-col items-center gap-2 w-14 h-full py-2 bg-background border-r border-background-content/5 transition-all"
      :class="mobileNavigationVisible ? 'ml-0' : '-ml-14 sm:ml-0'"
    >
      <!-- <div class="flex items-center justify-center w-full h-14">
        <Logo class="w-6 h-6" />
      </div> -->

      <div class="flex-1 flex flex-col gap-2">
        <NuxtLink
          v-for="item in [
            {
              name: 'Javascript',
              icon: 'simple-icons:javascript',
              path: '/play/js',
            },
            {
              name: 'HTML',
              icon: 'simple-icons:html5',
              path: '/play/html',
            },
          ]"
          :key="item.path"
          :to="item.path"
          :aria-label="item.name"
          :class="(route.path.endsWith('/') ? route.path.slice(0, -1) : route.path) === item.path ? 'bg-background-content/10' : 'bg-background-content/5 hover:bg-background-content/10'"
          class="group w-10 h-10 rounded-md flex flex-row items-center justify-center transition-colors"
        >
          <Icon
            :name="item.icon"
            class="w-5 h-5 transition-opacity"
            :class="(route.path.endsWith('/') ? route.path.slice(0, -1) : route.path) === item.path ? 'opacity-100' : 'opacity-50 group-hover:opacity-100'"
          />
        </NuxtLink>
      </div>

      <div>
        <div />
      </div>
    </div>

    <div
      class="flex flex-col w-dvw h-dvh transition-all"
      :class="mobileNavigationVisible ? '-mr-14 pl-14' : 'mr-0 sm:pl-14 sm:-mr-14'"
    >
      <div class="flex-1">
        <slot />
      </div>
    </div>
  </div>
</template>
