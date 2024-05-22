<script setup>
import { useRouter } from 'vue-router'
import { useUserStore } from '@/stores/userStore'

const router = useRouter()
const useStore = useUserStore()

function signOut() {
  useStore.signOut()
  router.push({ path: '/auth' })
}
</script>

<template>
  <h1>Componente Dashboard</h1>
  <button @click="signOut">Log Out</button>
</template>

<style scoped></style>
