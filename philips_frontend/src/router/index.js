import Vue from 'vue'
import store from '../store/index'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'
import Lessons from '../views/Lesson.vue'
import Questions from '../views/Questions.vue'
import Dashboard from '../views/Dashboard.vue'
import Game from '../views/Game.vue'

Vue.use(VueRouter)

const Teacher = () => {return store.state.user.role === 'Teacher'}
const Admin = () => {return store.state.user.role === 'Admin'}

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/Lessons',
    name: 'Lessons',
    component: Lessons,
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
    component: Questions,
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
    component: Dashboard,
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
    component: Game,
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
  routes
})

export default router
