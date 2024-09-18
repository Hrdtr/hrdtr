<script setup lang="ts">
useSeoMeta({
  title: 'Guestbook',
})

const page = ref(1)
const limit = ref(20)
const {
  data: guestbook,
} = useFetch('/api/guestbook', {
  query: {
    page: page.value,
    limit: limit.value,
  },
})

const authenticatedUser = useAuthenticatedUser()
const route = useRoute()

const signIn = () => {
  location.href = `/api/oauth/github/redirect?from=${route.fullPath}`
}

const signOut = async () => {
  await $fetch('/api/auth/sign-out', { method: 'POST' })
  authenticatedUser.value = null
}

const message = ref('')
const submit = async () => {
  if (!guestbook.value || !authenticatedUser.value) return
  const response = await $fetch('/api/guestbook', {
    method: 'POST',
    body: { sign: message.value },
  })
  guestbook.value = {
    data: [response, ...guestbook.value.data],
    meta: guestbook.value.meta,
  }
  message.value = ''
}

const loadingMore = ref(false)
const loadMore = async () => {
  if (!guestbook.value) return
  loadingMore.value = true
  page.value += 1
  const response = await $fetch('/api/guestbook', {
    query: {
      page: page.value,
      limit: limit.value,
    },
  })
  guestbook.value = {
    data: [...guestbook.value.data, ...response.data],
    meta: response.meta,
  }
  loadingMore.value = false
}
</script>

<template>
  <div class="flex-1">
    <h1 class="text-3xl font-semibold mb-8 ml-[-1px]">
      Guestbook
    </h1>

    <button
      v-if="!authenticatedUser"
      class="inline-flex items-center text-teal-500"
      @click="signIn"
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="24"
        height="24"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        stroke-width="2"
        stroke-linecap="round"
        stroke-linejoin="round"
        class="lucide lucide-move-right w-4 h-4 mr-2"
      ><path d="M18 8L22 12L18 16" /><path d="M2 12H22" /></svg>
      Sign In With Github
    </button>
    <div
      v-else
      class="max-w-screen-sm"
    >
      <form
        class="w-full max-w-lg"
        @submit.prevent="submit"
      >
        <div
          class="w-full flex flex-row gap-2"
        >
          <div class="w-full -mt-px">
            <input
              v-model="message"
              type="text"
              placeholder="Write your message..."
              class="w-full py-1 bg-transparent border-b border-neutral-100 dark:border-neutral-900 hover:border-neutral-200 dark:hover:border-neutral-800 focus-visible:outline-none focus-visible:border-teal-500 focus-visible:hover:border-teal-500 transition-colors"
              required
            >
          </div>
          <button
            type="submit"
            class="px-4 -my-[0.5px] bg-neutral-100 dark:bg-neutral-900 hover:bg-neutral-200 dark:hover:bg-neutral-800 transition-colors rounded text-sm"
          >
            Sign
          </button>
        </div>
      </form>

      <button
        class="inline-flex opacity-60 hover:opacity-75 text-xs"
        @click="signOut"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          stroke-width="2"
          stroke-linecap="round"
          stroke-linejoin="round"
          class="lucide lucide-move-right w-4 h-4 mr-2"
        ><path d="M18 8L22 12L18 16" /><path d="M2 12H22" /></svg>
        Sign Out
      </button>
    </div>

    <div class="max-w-screen-sm flex flex-col gap-3 mt-6">
      <div
        v-for="item in guestbook?.data"
        :key="item.id"
      >
        <p><span class="opacity-60">{{ item.user.name }}:</span> <span class="opacity-90">{{ item.sign }}</span></p>
      </div>

      <button
        v-if="loadingMore || (guestbook?.meta && (page < guestbook.meta.page.count))"
        :padded="false"
        :loading="loadingMore"
        variant="link"
        trailing
        @click="loadMore"
      >
        Load more
      </button>
    </div>
  </div>
</template>
