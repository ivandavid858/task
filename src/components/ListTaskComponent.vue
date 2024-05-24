<template>
  <div v-for="task in tasks" :key="task.id">
    <div>
      <h2>{{ task.title }}</h2>
      <p>{{ task.description }}</p>
      <button @click="openModal(task)">Edit</button>
      <button @click="deleteTask(task.id)">Delete</button>
    </div>
  </div>
</template>

<script setup>
const props = defineProps({
  tasks: Array,
  openModal: Function,
  deleteTask: Function
})
</script>

<style scoped></style>
