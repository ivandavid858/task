<script setup>
import { defineProps, defineEmits } from 'vue'

const taskTitle = ref('')
const taskDescription = ref('')

//we define the emits that are passed on to the father and that
//we are going to use to trigger the different functionalities
const emit = defineEmits(['update-task-edit-event'])

//we define here the prop that is going to be used
//in the father to store each task from the array
const props = defineProps(['task'])

//function to edit a task's title and description. We will
//have to create an object with the object's id and the
//title and description value coming from the edit inputs
const updateTaskEdit = () => {
  if (taskTitle.value.length === 0 || taskDescription.value.length === 0) {
    /*errorMsg.value = "What's the task you wanna save ?(-ᴥ-ʋ)"
    showError.value = true
    setTimeout(() => {
      showError.value = false
    }, 5000)*/
    console.log('El titulo o la descripción están vacíos')
  } else {
    const newTask = {
      id: props.task.id,
      title: taskTitle.value,
      description: taskDescription.value
    }
    emit('update-task-edit-event', newTask)
    taskTitle.value = ''
    taskDescription.value = ''
    //showEditBar.value = !showEditBar.value
  }
}
</script>

<template>
  <!--
  <div>
    <h2>{{ task.title }}</h2>
    <p>{{ task.description }}</p>
    <button @click="updateTaskEdit">Update task</button>
  </div>
  -->
</template>

<style scoped></style>
