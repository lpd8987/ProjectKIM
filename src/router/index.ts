import { createRouter, createWebHistory } from 'vue-router'
import SignIn from '@/components/OAuth/SignIn.vue';
import UserHome from '@/components/UserHome.vue';
import { checkSignIn } from '@/components/OAuth/OAuth';

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: "Home",
      component: UserHome,
    },
    {
      path: '/signIn',
      name: "Sign In",
      component: SignIn 
    },
  ]
})

router.beforeEach((to, from) => {
  if(to.path !== '/signIn') {
    if (!checkSignIn()){
      return { name: 'Sign In'}
    }
  }
})

export default router
