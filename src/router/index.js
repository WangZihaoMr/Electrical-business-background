import Vue from 'vue'
import VueRouter from 'vue-router'
import Login from '../views/login'

Vue.use(VueRouter)

const routes = [
  {
    path: '/login',
    name: 'login',
    component: Login
  },
  {
    path: '/layout',
    name: 'layout',
    // redirect: '/home',
    component: () => import('../layout')
  }
]

const router = new VueRouter({
  routes
})

export default router
