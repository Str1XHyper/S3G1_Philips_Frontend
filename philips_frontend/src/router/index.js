import Vue from 'vue'
import store from '../store/index'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Home',
    component: () => import('../views/Home.vue')
  },
  {
    path: '/Lessons',
    name: 'Lessons',
    component: () => import('../views/Lesson.vue')
  },
  {
    path: '/Questions',
    name: 'Questions',
    component: () => import('../views/Questions.vue'),
    beforeEnter:(to, from, next) => {
      if(store.state.lessonID == ""){
        next('/Lessons')
      } else
      {
        next()
      }
    }
  },
  {
    path: '/Game',
    name: 'Game',
    component: () => import('../views/Game.vue')
  },
  {
    path: '/Login',
    name: 'Login',
    component: () => import('../views/Login.vue')
  },
  {
    path: '/Register',
    name: 'Register',
    component: () => import('../views/Register.vue')
  },
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
