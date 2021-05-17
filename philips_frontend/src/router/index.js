import Vue from 'vue'
import store from '../store/index'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

const Teacher = () => {return store.state.user.role === 'Teacher'}
const Admin = () => {return store.state.user.role === 'Admin'}
const Scheduler = () => {return store.state.user.role == "Scheduler"}

const routes = [
  {
    path: '/',
    name: 'Home',
    component: () => import('../views/Home.vue')
  },
  {
    path: '/Lessons',
    name: 'Lessons',
    component: () => import('../views/Lesson.vue'),
    beforeEnter:(to, from, next) => {
      if(store.state.loggedIn){
        if((Teacher || Admin)){
          next()
        }
        else{
          next('/Dashboard')
        }
      } else
      {
        next('/')
      }
    }
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
    path: '/Dashboard',
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
    path: '/Game',
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
  {
    path: '/Classes',
    name: 'Classes',
    component: () => import('../views/Classes.vue'),
    beforeEnter:(to, from, next) => {
      if(store.state.loggedIn){
        if((Scheduler || Teacher)) {
          next()
        }
        else {
          next('/')
        }
      }
      else
      {
        next('/')
      }
    }
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
