import Vue from 'vue'
import store from '../store/index'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

const lessonPath = '/Lessons'
const questionPath = '/Questions'
const dashboardPath = '/Dashboard'
const gamePath = '/Game'

const Teacher = () => {return store.state.user.role === 'Teacher'}
const Admin = () => {return store.state.user.role === 'Admin'}

const routes = [
  {
    path: '/',
    name: 'Home',
    component: () => import('../views/Home.vue')
  },
  {
    path: lessonPath,
    name: 'Lessons',
    component: () => import('../views/Lesson.vue'),
    beforeEnter:(to, from, next) => {
      if(store.state.loggedIn){
        if((Teacher || Admin)){
          next()
        }
        else{
          next(dashboardPath)
        }
      } else
      {
        next('/')
      }
    }
  },
  {
    path: questionPath,
    name: 'Questions',
    component: () => import('../views/Questions.vue'),
    beforeEnter:(to, from, next) => {
      if(store.state.lessonID == ""){
        next(lessonPath)
      } else
      {
        next()
      }
    }
  },
  {
    path: dashboardPath,
    name: 'Dashboard',
    component: () => import('../views/Dashboard.vue'),
    beforeEnter:(to, from, next) => {
      if(store.state.loggedIn){
        next()
      } else
      {
        next('/')
      }
    }
  },
  {
    path: gamePath,
    name: 'Game',
    component: () => import('../views/Game.vue'),
    // beforeEnter:(to, from, next) => {
    //   if(store.state.loggedIn){
    //     next()
    //   } else
    //   {
    //     next('/')
    //   }
    // }
  },
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
