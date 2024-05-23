<script setup>
import { onMounted, ref, watch } from 'vue'
import { useUserStore } from '@/stores/userStore'

const useStore = useUserStore()

const email = ref(localStorage.getItem('email') || '')
const password = ref(localStorage.getItem('password') || '')

// watch is here to save the values in the localStorage when they change
watch(email, (newEmail) => {
  localStorage.setItem('email', newEmail)
})
watch(password, (newPassword) => {
  localStorage.setItem('password', newPassword)
})

// Limpiar localStorage cuando el usuario cierra sesión
onMounted(() => {
  useStore.$onAction(({ name }) => {
    if (name === 'signOut') {
      localStorage.removeItem('email')
      localStorage.removeItem('password')
    }
  })
})
</script>

<template>
  <router-view></router-view>
</template>

<style scoped>
label {
  display: block;
}
.center {
  background-color: rgb(159, 194, 224);
  display: flex;
  flex-direction: column;
  align-items: center;
}
.login {
  height: 200px;
  width: 400px;
}
.errorMsg {
  border: 3px solid red;
}
</style>
