<script setup>
import { onMounted, ref } from 'vue'
import { useRouter } from 'vue-router'
import { useUserStore } from '@/stores/userStore'
import { useTaskStore } from '@/stores/taskStore'

const router = useRouter()
const useStore = useUserStore()
const taskStore = useTaskStore()

const taskName = ref('')
const taskDescription = ref('')

function signOut() {
  useStore.signOut()
  router.push({ path: '/auth' })
}

async function addTask() {
  try {
    await taskStore.addtask(taskName.value, taskDescription.value)
    taskName.value = ''
    taskDescription.value = ''
  } catch (error) {
    console.error('Error adding task: ', error)
  }
}

onMounted(() => {
  taskStore.fetchTasks()
})
</script>

<template>
  <h1>Add a new Task</h1>
  <form @submit.prevent="addTask">
    <div>
      <input v-model="taskName" type="text" placeholder="Task Name" />
      <br />
      <textarea v-model="taskDescription" type="text" placeholder="Task description"></textarea>
    </div>
    <button type="submit">Add</button>
  </form>
  <div v-for="task in taskStore.tasks" :key="task.id">
    <h2>{{ task.title }}</h2>
    <p>{{ task.description }}</p>
  </div>

  <button @click="signOut">Log Out</button>
</template>

<style scoped></style>
