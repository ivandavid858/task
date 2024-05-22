<script setup>
import { onMounted, ref, watch } from 'vue'
import { useRouter } from 'vue-router'
import { useUserStore } from '@/stores/userStore'
//import SignUpComponent from '../components/SignUpComponent.vue'
//import SignInComponent from '../components/SignInComponent.vue'

const router = useRouter()
const useStore = useUserStore()

const email = ref(localStorage.getItem('email') || '')
const emailSignUp = ref('')
const password = ref(localStorage.getItem('password') || '')
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

function isPasswordsEqual(passwordSignUp1, passwordSignUp2) {
  return passwordSignUp1 == passwordSignUp2
}

function signOut() {
  useStore.signOut()
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
  <!--
  <SignUpComponent></SignUpComponent>
  <signInWithEmail></signInWithEmail>
-->
  <!--
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
  </section>

  <section>
    <h1>Sign Up</h1>
    <form @submit.prevent="signUpWithEmail" class="center" action="">
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
    <button @click="signOut">Sign Out</button>
  </section>
  -->
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
