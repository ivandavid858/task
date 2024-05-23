<script setup>
import { onMounted, onUpdated, ref } from 'vue'
import { useRouter } from 'vue-router'
import { useUserStore } from '../stores/userStore'
import { useTaskStore } from '../stores/taskStore'
import NewTaskComponent from '../components/NewTaskComponent.vue'
import TaskItemComponent from '../components/TaskItemComponent.vue'
import EditTaskModalComponent from '../components/EditTaskModalComponent.vue'

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
    await taskStore.addtask(title, description)
  } catch (error) {
    console.error('Error adding task: ', error)
  }
}

async function updateTaskEdit(newTask) {
  debugger
  console.log('NewTask: ', newTask)
  await taskStore.updateTaskEdit(newTask.id, newTask.title, newTask.description)
  taskStore.fetchTasks()
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
  <!--@new-task-event:evento, addTask:handler-->
  <!--
  <TaskItemComponent
    :task="task"
    v-for="task in taskStore.tasks"
    @update-task-edit-event="updateTaskEdit"
  ></TaskItemComponent>
  -->
  <div v-for="task in taskStore.tasks">
    <div>
      <h2>{{ task.title }}</h2>
      <p>{{ task.description }}</p>
      <button @click="openModal(task)">Edit</button>
    </div>
  </div>

  <EditTaskModalComponent
    v-if="isModalOpen"
    :show="isModalOpen"
    :task="selectedTask"
    @close="isModalOpen = false"
    @update="updateTaskEdit"
  ></EditTaskModalComponent>

  <button @click="signOut">Log Out</button>
</template>

<style scoped></style>
