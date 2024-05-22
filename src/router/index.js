import { createRouter, createWebHistory } from 'vue-router'
import Dashboard from '../views/DashboardView.vue'
import Auth from '../views/AuthView.vue'
import SignInComponent from '@/components/SignInComponent.vue'
import SignUpComponent from '@/components/SignUpComponent.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: () => import('../views/DashboardView.vue')
    },
    {
      path: '/auth',
      name: 'auth',
      // route level code-splitting
      // this generates a separate chunk (About.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import('../views/AuthView.vue'),
      children: [
        { path: '', component: SignInComponent },
        { path: '', component: SignUpComponent }
      ]
    }
  ]
})

export default router
