import Vue from 'vue'
import VueRouter from 'vue-router'
import loader from './loader'
import modules from './modules'

Vue.use(VueRouter)

const routes = [
  {
    path: '/app',
    component: () => import('@/layout/default/Auth.vue'),
    children: [...loader(modules)],
  },
  {
    path: '/404',
    name: '404',
    component: () => import('@/views/404'),
  },
  
  {
    path: '/403',
    name: '403',
    component: () => import('@/views/403'),
  },
  {
    path: '*',
    redirect: '/404',
  },
]

const router = new VueRouter({
  routes,
})

export default router
