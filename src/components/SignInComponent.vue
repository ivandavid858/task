<template>
  <main class="form-signin m-auto">
    <form @submit.prevent="signInWithEmail">
      <h1 class="h3 mb-3 fw-normal">Please sign in</h1>

      <div class="form-floating">
        <input
          type="text"
          :class="inputClasses"
          v-model="email"
          id="floatingInput"
          placeholder="name@example.com"
        />
        <label for="email">Email address</label>
      </div>
      <div class="form-floating">
        <input
          v-model="password"
          type="password"
          class="form-control"
          id="floatingPassword"
          placeholder="Password"
        />
        <label for="password">Password</label>
      </div>

      <div class="checkbox mb-3">
        <label> <input type="checkbox" value="remember-me" /> Remember me </label>
      </div>
      <button class="w-100 btn btn-lg btn-primary" type="submit">Sign in</button>
    </form>
    <p class="text-center mt-3">
      Don't have an account? <router-link to="/auth/sign-up">Sign Up</router-link>
    </p>
  </main>
</template>

<script setup>
import { ref, computed } from 'vue'
import { useRouter } from 'vue-router'
import { useUserStore } from '@/stores/userStore'
import Header from '../components/Header.vue'

const router = useRouter()
const useStore = useUserStore()

const email = ref('')
const password = ref('')
const errorEmail = ref(false)

function tieneArroba(text) {
  return !text.toString().includes('@')
}

function isFormValidated() {
  errorEmail.value = tieneArroba(email.value)
  return !errorEmail.value
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

// Objeto computado para calcular las clases del campo de correo electrónico
const inputClasses = computed(() => {
  return {
    'form-control': true, // Agregar la clase form-control siempre
    errorMsg: errorEmail.value // Agregar la clase errorMsg si hay un error en el correo electrónico
  }
})
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

.bd-placeholder-img {
  font-size: 1.125rem;
  text-anchor: middle;
  -webkit-user-select: none;
  -moz-user-select: none;
  user-select: none;
}

@media (min-width: 768px) {
  .bd-placeholder-img-lg {
    font-size: 3.5rem;
  }
}

.b-example-divider {
  height: 3rem;
  background-color: rgba(0, 0, 0, 0.1);
  border: solid rgba(0, 0, 0, 0.15);
  border-width: 1px 0;
  box-shadow:
    inset 0 0.5em 1.5em rgba(0, 0, 0, 0.1),
    inset 0 0.125em 0.5em rgba(0, 0, 0, 0.15);
}

.b-example-vr {
  flex-shrink: 0;
  width: 1.5rem;
  height: 100vh;
}

.bi {
  vertical-align: -0.125em;
  fill: currentColor;
}

.nav-scroller {
  position: relative;
  z-index: 2;
  height: 2.75rem;
  overflow-y: hidden;
}

.nav-scroller .nav {
  display: flex;
  flex-wrap: nowrap;
  padding-bottom: 1rem;
  margin-top: -1px;
  overflow-x: auto;
  text-align: center;
  white-space: nowrap;
  -webkit-overflow-scrolling: touch;
}
</style>
