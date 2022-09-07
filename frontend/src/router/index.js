import { createRouter, createWebHistory } from 'vue-router'
import Home from '../views/Home.vue'
import Entrar from '../views/Entrar.vue'
import Registrar from '../views/Registrar.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    { path: '/', name: 'home', component: Home },
    { path: '/entrar', name: 'entrar', component: Entrar },
    { path: '/registrar', name: 'registrar', component: Registrar },
  ]
})

export default router
