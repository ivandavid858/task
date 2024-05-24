<template>
  <section>
    <h1>Sign In</h1>
    <form @submit.prevent="signInWithEmail" class="center" action="">
      <div>
        <label for="email">Email</label>
        <input :class="errorEmail" v-model="email" type="text" />
      </div>
      <div>
        <label for="password">Password</label>
        <input v-model="password" type="password" />
      </div>
      <button type="submit">Sign In</button>
    </form>
    <p>Don't have an account? <router-link to="/auth/sign-up">Sign Up</router-link></p>
  </section>
</template>

<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { useUserStore } from '@/stores/userStore'

const router = useRouter()
const useStore = useUserStore()

const email = ref()
const password = ref()
const errorEmail = ref('')

function tieneArroba(text) {
  return !text.toString().includes('@')
}

function isFormValidated() {
  let emailTieneError = tieneArroba(email.value)
  if (emailTieneError) {
    errorEmail.value = 'errorMsg'
    return false
  }
  return true
}

async function signInWithEmail() {
  if (isFormValidated()) {
    const result = await useStore.signInWithEmail(email.value, password.value)
    if (result.success) {
      router.push({ path: '/' })
    } else {
      console.log(result.error)
    }
  }
}
</script>

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
