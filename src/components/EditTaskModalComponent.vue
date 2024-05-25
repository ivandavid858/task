<template>
  <div v-if="show" class="modal-overlay">
    <div class="modal-content">
      <h2>Edit Task</h2>
      <form @submit.prevent="updateTaskEdit">
        <div>
          <label for="title">Title:</label>
          <input type="text" v-model="editedTask.title" class="form-control" id="title" required />
        </div>
        <div>
          <label for="description">Description:</label>
          <textarea
            v-model="editedTask.description"
            class="form-control"
            id="description"
            required
          ></textarea>
        </div>
        <button type="submit" class="btn btn-primary">Save</button>
        <button type="button" class="btn btn btn-danger" @click="closeModal">Cancel</button>
      </form>
    </div>
  </div>
</template>

<script setup>
import { ref, watch } from 'vue'

// Props to receive the task to edit and visibility state
const props = defineProps({
  show: Boolean,
  task: Object
})

// Emit event to notify parent about closing the modal
const emit = defineEmits(['close', 'update'])

// Data for edited task
const editedTask = ref({ ...props.task })

// Watch for changes in props.task to update editedTask
watch(
  () => props.task,
  (newTask) => {
    editedTask.value = { ...newTask }
  }
)

// Methods to handle modal actions
const closeModal = () => {
  emit('close')
}

//function to edit a task's title and description. We will
//have to create an object with the object's id and the
//title and description value coming from the edit inputs
const updateTaskEdit = () => {
  if (editedTask.value.title.length === 0 || editedTask.value.description.length === 0) {
    console.log('El titulo o la descripción están vacíos')
  } else {
    const taskEdit = {
      id: editedTask.value.id,
      title: editedTask.value.title,
      description: editedTask.value.description
    }
    emit('update', taskEdit)
    closeModal()
  }
}
</script>

<style scoped>
.modal-overlay {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
}

.modal-content {
  background: white;
  padding: 20px;
  border-radius: 5px;
  width: 300px;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
}
</style>
