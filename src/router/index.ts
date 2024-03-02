import { createRouter, createWebHistory } from 'vue-router'
import SignIn from '@/components/OAuth/SignIn.vue';
import UserHome from '@/components/UserHome.vue';
import Inventory from '@/components/InventoryManagement/Inventory.vue';
import GroceryList from '@/components/GroceryList/GroceryList.vue';
import { checkSignIn } from '@/components/OAuth/OAuth';

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: "Sign In",
      component: SignIn 
    },
    {
      path: '/inventory',
      name: "Inventory",
      component: Inventory 
    },
    {
      path: '/list',
      name: "List",
      component: GroceryList 
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
