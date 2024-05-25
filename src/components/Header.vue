<template>
  <nav class="navbar navbar-expand-lg navbar-dark bg-secondary">
    <div class="container-fluid">
      <!-- LEFT SIDE -->
      <div class="navbar-brand">
        <router-link class="navbar-brand" to="/">
          <img class="navbar-brand" :src="miniLogo" alt="" width="30" height="30" />
          <span class="font-body text-white text-sm ms-2">Tasks</span>
        </router-link>
      </div>

      <!-- TOGGLE BUTTON FOR MOBILE -->
      <button class="navbar-toggler" type="button" @click="changeClickBurger">
        <span class="navbar-toggler-icon"></span>
      </button>

      <!-- NAVIGATION LINKS -->
      <div class="collapse navbar-collapse" :class="{ show: clickBurger }">
        <ul class="navbar-nav me-auto mb-2 mb-lg-0">
          <li class="nav-item">
            <router-link class="nav-link" to="/">Home</router-link>
          </li>
          <li class="nav-item">
            <router-link class="nav-link" to="/clock">Clock</router-link>
          </li>
          <li class="nav-item">
            <router-link class="nav-link" to="/profile">Profile</router-link>
          </li>
        </ul>

        <!-- RIGHT SIDE -->
        <div class="navbar-text">
          <span class="me-2 text-white">Welcome back</span>
          <span class="text-yellow-500">{{ user }}</span>
          <button class="btn btn-warning ms-4" type="button" @click="signOut">Log Out</button>
        </div>
      </div>
    </div>
  </nav>
</template>

<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { useUserStore } from '../stores/userStore'

const miniLogo =
  'https://static.vecteezy.com/system/resources/previews/009/315/297/non_2x/white-clipboard-task-management-todo-check-list-efficient-work-on-project-plan-fast-progress-level-up-concept-assignment-and-exam-productivity-solution-icon-3d-check-list-render-png.png'
const userStore = useUserStore()
const user = userStore.user?.email.split('@')[0]
const clickBurger = ref(false)
const redirect = useRouter()

const changeClickBurger = () => {
  clickBurger.value = !clickBurger.value
}

const signOut = async () => {
  try {
    await useUserStore().signOut()
    redirect.push({ path: '/auth' })
  } catch (error) {
    console.error(error)
  }
}
</script>
