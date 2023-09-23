<script setup lang="ts">
useSeoMeta({
  title: 'Guestbook',
});

const page = ref(1)
const limit = ref(20)
const { data: signs } = useFetch('/api/guestbook', {
  query: { page: page.value, limit: limit.value },
})

const user = useAuthenticatedUser()
const route = useRoute()

const login = () => {
  location.href = `/api/login/github?redirected_from=${route.fullPath}`
}
const logout = async () => {
  await $fetch('/api/logout', { method: 'POST' })
  user.value = null
}

const message = ref('')
const submit = async () => {
  if (!user.value) return
  const result = await $fetch('/api/guestbook', {
    method: 'POST',
    body: {
      sign: message.value
    }
  })
  if (signs.value) {
    signs.value = {
      data: [{...result, user: user.value}, ...signs.value.data],
      meta: signs.value.meta
    }
  }

  message.value = ''
}

const loadingMore = ref(false)
const loadMore = async () => {
  loadingMore.value = true
  page.value += 1
  const result = await $fetch('/api/guestbook', {
    query: { page: page.value, limit: limit.value }
  })
  if (result && signs.value) {
    signs.value = {
      data: [...signs.value.data, ...result.data],
      meta: result.meta
    }
  }
  loadingMore.value = false
}
</script>

<template>
  <div class="flex-1">
    <h1 class="text-3xl font-semibold mb-8 ml-[-1px]">
      Guestbook
    </h1>

    <UButton
      v-if="!user"
      size="xl"
      icon="i-heroicons-arrow-long-right"
      variant="link"
      class="!ml-[-0.095rem]"
      :padded="false"
      @click="login"
    >
      Sign In With Github
    </UButton>
    <div
      v-else
      class="max-w-screen-sm"
    >
      <form
        class="w-full max-w-lg"
        @submit.prevent="submit"
      >
        <UButtonGroup
          orientation="horizontal"
          size="md"
          class="w-full"
        >
          <UInput
            v-model="message"
            type="text"
            :ui="{
              wrapper: 'w-full',
              color: {
                white: {
                  outline: 'focus:ring-1 focus:ring-inset'
                }
              }
            }"
            placeholder="Write your message..."
            required
          />
          <UButton
            variant="solid"
            type="submit"
            class="px-4"
          >
            Sign
          </UButton>
        </UButtonGroup>
      </form>
      <UButton
        variant="link"
        color="gray"
        class="opacity-60 hover:opacity-75 !ml-[-0.7rem] text-xs mt-1"
        icon="i-heroicons-arrow-long-right"
        @click="logout"
      >
        Sign Out
      </UButton>
    </div>

    <div class="max-w-screen-sm flex flex-col gap-3 mt-6">
      <div
        v-for="item in (signs?.data || [])"
        :key="item.id"
      >
        <p><span class="opacity-60">{{ item.user.name }}:</span> <span class="opacity-90">{{ item.sign }}</span></p>
      </div>

      <UButton
        v-if="loadingMore || (signs?.meta && (page < signs.meta.page.total))"
        :padded="false"
        :loading="loadingMore"
        variant="link"
        trailing
        @click="loadMore"
      >
        Load more
      </UButton>
    </div>
  </div>
</template>