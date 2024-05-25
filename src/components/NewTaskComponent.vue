<template>
  <form @submit.prevent="newTaskEmit">
    <div class="mb-3">
      <label for="exampleFormControlInput1" class="form-label">Email address</label>
      <input
        v-model="taskTitle"
        type="text"
        class="form-control"
        id="exampleFormControlInput1"
        placeholder="Task Title"
      />
    </div>
    <div class="mb-3">
      <label for="exampleFormControlTextarea1" class="form-label">Example textarea</label>
      <textarea
        v-model="taskDescription"
        type="text"
        placeholder="Task description"
        class="form-control"
        id="exampleFormControlTextarea1"
        rows="3"
      ></textarea>
    </div>
    <button class="btn btn-primary mb-5" type="submit">Add</button>
  </form>
</template>

<script setup>
import { ref } from 'vue'
import { defineEmits } from 'vue'

const taskTitle = ref('')
const taskDescription = ref('')

// constant to save a variable that defines the custom event that will be emitted to the DashboardView
const emit = defineEmits(['new-task-event'])

const newTaskEmit = () => {
  if (taskTitle.value.length === 0 || taskDescription.value.length === 0) {
    console.log('El titulo o la descripción están vacíos')
  } else {
    const newTask = {
      title: taskTitle.value,
      description: taskDescription.value
    }
    emit('new-task-event', newTask)
    taskTitle.value = ''
    taskDescription.value = ''
  }
}
</script>
