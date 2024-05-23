<script setup>
import { ref } from 'vue'
import { defineEmits } from 'vue'

const taskTitle = ref('')
const taskDescription = ref('')

// constant to save a variable that defines the custom event that will be emitted to the DashboardView
const emit = defineEmits(['new-task'])

const newTaskEmit = () => {
  if (taskTitle.value.length === 0 || taskDescription.value.length === 0) {
    /*errorMsg.value = 'Please fill in a title and a description'
    showError.value = true
    setTimeout(() => {
      showError.value = false
    }, 5000)*/
    console.log('El titulo o la descripción están vacíos')
  } else {
    const newTask = {
      title: taskTitle.value,
      description: taskDescription.value
    }
    emit('new-task', newTask)
    taskTitle.value = ''
    taskDescription.value = ''
    //showAddForm.value = !showAddForm.value
  }
}
</script>

<template>
  <form @submit.prevent="newTaskEmit">
    <div>
      <input v-model="taskTitle" type="text" placeholder="Task Title" />
      <br />
      <textarea v-model="taskDescription" type="text" placeholder="Task description"></textarea>
    </div>
    <button type="submit">Add</button>
  </form>
</template>
