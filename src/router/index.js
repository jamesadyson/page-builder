import Vue from 'vue'
import VueRouter from 'vue-router'
import PageBuilder from '../components/PageBuilder.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'PageBuilder',
    component: PageBuilder
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router