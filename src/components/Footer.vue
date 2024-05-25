<template>
  <footer class="bg-secondary text-white">
    <div class="container">
      <div class="row justify-content-center">
        <div class="col-auto">
          <a class="d-block pt-4" href="#">
            <router-link class="d-flex align-items-center" to="/">
              <img
                :src="miniLogo"
                class="me-3 h-6 sm:h-9"
                width="20"
                height="auto"
                alt="Tasks App"
              />
            </router-link>
          </a>
        </div>
      </div>
    </div>
    <div class="container">
      <p class="py-4 md:py-5 text-center mb-0">© {{ time }} Credits</p>
    </div>
  </footer>
</template>

<script setup>
import moment from 'moment'

// Print Date
const time = moment().format('YYYY')

// Mini Logo
const miniLogo =
  'https://static.vecteezy.com/system/resources/previews/009/315/297/non_2x/white-clipboard-task-management-todo-check-list-efficient-work-on-project-plan-fast-progress-level-up-concept-assignment-and-exam-productivity-solution-icon-3d-check-list-render-png.png'
</script>

<style scoped></style>
