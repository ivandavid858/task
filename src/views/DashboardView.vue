<script setup>
import { onMounted, onUpdated, ref } from 'vue'
import { useRouter } from 'vue-router'
import { useUserStore } from '@/stores/userStore'
import { useTaskStore } from '@/stores/taskStore'
import NewTaskComponent from '@/components/NewTaskComponent.vue'

const router = useRouter()
const useStore = useUserStore()
const taskStore = useTaskStore()

function signOut() {
  useStore.signOut()
  router.push({ path: '/auth' })
}

async function addTask({ title, description }) {
  try {
    await taskStore.addtask(title, description)
  } catch (error) {
    console.error('Error adding task: ', error)
  }
}

onMounted(() => {
  taskStore.fetchTasks()
})
onUpdated(() => {
  taskStore.fetchTasks()
})
</script>

<template>
  <h1>Add a new Task</h1>
  <NewTaskComponent @new-task-event="addTask"></NewTaskComponent>
  <!--@new-task:evento, addTask:handler-->
  <div v-for="task in taskStore.tasks" :key="task.id">
    <h2>{{ task.title }}</h2>
    <p>{{ task.description }}</p>
  </div>

  <button @click="signOut">Log Out</button>
</template>

<style scoped></style>
