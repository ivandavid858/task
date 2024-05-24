<template>
  <section>
    <router-view />
  </section>
</template>

<script setup>
import { onMounted } from 'vue'
import { storeToRefs } from 'pinia'
import { useRouter } from 'vue-router'
import { useUserStore } from './stores/userStore.js'

const router = useRouter()
const userStore = useUserStore()
const { user } = storeToRefs(userStore)

onMounted(async () => {
  try {
    await userStore.fetchUser()

    // If the current route requires auth and the user is not authenticated, redirect to /auth
    const requiresAuth = router.currentRoute.value.matched.some(
      (record) => record.meta.requiresAuth
    )
    if (requiresAuth && !userStore.isAuthenticated) {
      router.push({ path: '/auth' })
    }
  } catch (error) {
    console.error('Error fetching user:', error)
  }
})
</script>
