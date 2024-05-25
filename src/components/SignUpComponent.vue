<template>
  <div class="d-flex align-items-center justify-content-center vh-100">
    <section class="container">
      <div class="row justify-content-center">
        <div class="col-lg-6">
          <h1 class="text-center">Sign Up</h1>
          <form @submit.prevent="signUpWithEmail" class="w-100">
            <div class="mb-3">
              <label for="email-signup" class="form-label">Email</label>
              <input
                :class="errorEmail"
                v-model="email"
                type="text"
                class="form-control"
                id="email-signup"
              />
            </div>
            <div class="mb-3">
              <label for="password-signup" class="form-label">Password</label>
              <input
                v-model="passwordSignUp1"
                type="password"
                class="form-control"
                id="password-signup"
              />
            </div>
            <div class="mb-3">
              <label for="password" class="form-label">Confirm Password</label>
              <input
                v-model="passwordSignUp2"
                type="password"
                class="form-control"
                id="confirm-password"
              />
            </div>
            <button type="submit" class="btn btn-primary w-100">Sign Up</button>
          </form>
        </div>
      </div>
    </section>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { useUserStore } from '@/stores/userStore'

const router = useRouter()
const useStore = useUserStore()

const email = ref('')
const passwordSignUp1 = ref('')
const passwordSignUp2 = ref('')
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

function isPasswordsEqual(password, confirmPassword) {
  return password === confirmPassword
}

async function signUpWithEmail() {
  if (!isFormValidated()) {
    alert('Please enter a valid email.')
    return false
  }
  if (!isPasswordsEqual(passwordSignUp1.value, passwordSignUp2.value)) {
    alert('Passwords must match.')
    return false
  }
  const result = await useStore.signUp(email.value, passwordSignUp1.value)
  if (result.success) {
    await useStore.signInWithEmail(email.value, passwordSignUp1.value)
    router.push({ path: '/' })
  } else {
    console.log(result.error)
  }
}
</script>

<style scoped>
.errorMsg {
  border: 3px solid red;
}
</style>
