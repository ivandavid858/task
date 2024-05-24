<template>
  <div v-for="task in filteredTasks" :key="task.id">
    <div>
      <h2>{{ task.title }}</h2>
      <p>{{ task.description }}</p>
      <button @click="openModal(task)">Edit</button>
      <button @click="deleteTask(task.id)">Delete</button>
    </div>
  </div>
</template>

<script setup>
import { useUserStore } from '../stores/userStore'
import { computed } from 'vue'

// Define props to receive data and methods from parent component
const props = defineProps({
  tasks: Array,
  openModal: Function,
  deleteTask: Function
})

// Filtrar tareas por user_id del usuario autenticado
const filteredTasks = computed(() => {
  // Obtener el user_id del usuario autenticado
  const userId = useUserStore().user?.id
  // Filtrar las tareas por user_id
  return props.tasks.filter((task) => task.user_id === userId)
})
</script>

<style scoped></style>
