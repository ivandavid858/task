import { createRouter, createWebHistory } from 'vue-router'
import SignInComponent from '../components/SignInComponent.vue'
import SignUpComponent from '../components/SignUpComponent.vue'
import ProfileView from '../views/ProfileView.vue'
import EditProfileView from '../views/EditProfileView.vue'

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
      //name: 'auth',
      // route level code-splitting
      // this generates a separate chunk (About.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import('../views/AuthView.vue'),
      children: [
        { path: '', component: SignInComponent },
        { path: 'sign-up', component: SignUpComponent }
      ]
    },
    { path: '/profile', component: ProfileView },
    { path: '/edit', component: EditProfileView }
  ]
})

export default router
