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
    await userStore.fetchUser() // here we call fetch user
    //console.log('User: ', user.value.data.user)
    //userStore.signInWithEmail()
    //userStore.signOut()
    if (!user.value.user) {
      // redirect them to logout if the user is not there
      router.push({ path: '/auth' })
    } else {
      // continue to dashboard
      router.push({ path: '/' })
    }
  } catch (e) {
    console.log(e)
  }
})
</script>
