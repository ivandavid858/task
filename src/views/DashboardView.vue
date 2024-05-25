<template>
  <div class="d-flex flex-column min-vh-100">
    <Header></Header>
    <div class="container flex-grow-1">
      <h1 class="mt-4">Add a new Task</h1>
      <NewTaskComponent @new-task-event="addTask"></NewTaskComponent>

      <ListTaskComponent :openModal="openModal" :tasks="taskStore.tasks" :deleteTask="deleteTask">
      </ListTaskComponent>

      <EditTaskModalComponent
        v-if="isModalOpen"
        :show="isModalOpen"
        :task="selectedTask"
        @close="isModalOpen = false"
        @update="updateTaskEdit"
      ></EditTaskModalComponent>
      <button class="btn btn-primary mt-5 mb-5" @click="signOut">Sign Out</button>
    </div>
    <Footer class="mt-auto"></Footer>
  </div>
</template>

<script setup>
import { onMounted, onUpdated, ref } from 'vue'
import { useRouter } from 'vue-router'
import { useUserStore } from '../stores/userStore'
import { useTaskStore } from '../stores/taskStore'
import NewTaskComponent from '../components/NewTaskComponent.vue'
import EditTaskModalComponent from '../components/EditTaskModalComponent.vue'
import ListTaskComponent from '../components/ListTaskComponent.vue'
import Header from '../components/Header.vue'
import Footer from '../components/Footer.vue'

const router = useRouter()
const useStore = useUserStore()
const taskStore = useTaskStore()

const isModalOpen = ref(false)
const selectedTask = ref(null)

const openModal = (task) => {
  selectedTask.value = task
  isModalOpen.value = true
}

function signOut() {
  useStore.signOut()
  router.push({ path: '/auth' })
}

async function addTask({ title, description }) {
  try {
    // Add the task
    await taskStore.addtask(title, description)
    // Reload tasks after adding the new task
    await taskStore.fetchTasks()
  } catch (error) {
    console.error('Error adding task: ', error)
  }
}

async function updateTaskEdit(editTask) {
  await taskStore.updateTaskEdit(editTask.id, editTask.title, editTask.description)
  taskStore.fetchTasks()
}

async function deleteTask(taskId) {
  try {
    await taskStore.deleteTask(taskId)
    taskStore.fetchTasks()
  } catch (error) {
    console.error('Error deleting task: ', error)
  }
}

onMounted(() => {
  taskStore.fetchTasks()
})
onUpdated(() => {
  taskStore.fetchTasks()
})
</script>

<style scoped></style>
