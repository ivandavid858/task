<template>
  <div class="container">
    <div class="row justify-content-center">
      <div v-for="task in filteredTasks" :key="task.id" class="col-md-6 mb-3">
        <div class="card">
          <div class="card-body">
            <h2 class="card-title">{{ task.title }}</h2>
            <p class="card-text">{{ task.description }}</p>
            <button @click="openModal(task)" class="btn btn-primary">Edit</button>
            <button @click="deleteTask(task.id)" class="btn btn-danger">Delete</button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { useUserStore } from '../stores/userStore.js'
import { computed, defineProps } from 'vue'

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
  //const userId = useUserStore().user?.data.user.id
  console.log(userId)
  // Filtrar las tareas por user_id
  return props.tasks?.filter((task) => task.user_id === userId)
})
</script>

<style scoped>
.card {
  margin-bottom: 20px;
}
</style>
