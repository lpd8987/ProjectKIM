import { createRouter, createWebHistory } from 'vue-router'
import SignIn from '@/components/OAuth/SignIn.vue';
import UserHome from '@/components/UserHome.vue';

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      component: UserHome 
    },
    {
      path: '/signIn',
      component: SignIn 
    },
  ]
})

export default router
