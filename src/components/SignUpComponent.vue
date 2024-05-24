<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { useUserStore } from '@/stores/userStore'

const router = useRouter()
const useStore = useUserStore()

const emailSignUp = ref('')
const passwordSignUp1 = ref(localStorage.getItem('passwordSignUp1') || '')
const passwordSignUp2 = ref(localStorage.getItem('passwordSignUp2') || '')
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

async function signUpWithEmail() {
  if (!isFormValidated()) {
    alert('Ingrese un email valido')
    return false
  }
  if (!isPasswordsEqual(passwordSignUp1.value, passwordSignUp2.value)) {
    alert('Los passwords deben coincidir')
  }
  const result = await useStore.signUp(emailSignUp.value, passwordSignUp1.value)
  if (result.success) {
    await useStore.signInWithEmail(emailSignUp.value, passwordSignUp1.value)
    router.push({ path: '/' })
  } else {
    console.log(result.error)
  }
}
</script>

<template>
  <section>
    <h1>Sign Up</h1>
    <form @submit.prevent="signUpWithEmail" class="center">
      <div>
        <label for="email-signup">Email</label>
        <input :class="errorEmail" v-model="emailSignUp" type="text" />
      </div>
      <div>
        <label for="password-signup">Password</label>
        <input v-model="passwordSignUp1" type="password" />
      </div>
      <div>
        <label for="password">Confirm Password</label>
        <input v-model="passwordSignUp2" type="password" />
      </div>
      <button type="submit">Sign Up</button>
    </form>
  </section>
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
