import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    lessonID: "",
    loggedIn: false,
    user: {},
    unityInstance: null,
  },
  mutations: {
    setLessonId(state, lessonId){
      state.lessonID = lessonId
    },
    clearLessonId(state){
      state.lessonID = ""
    },
    setLoggedIn(state){
      state.loggedIn = true
    },
    setLoggedOut(state){
      state.loggedIn = false
    },
    setUser(state, user) {
      state.user = user
    },
    clearUser(state){
      state.user = {}
    },
    setInstance(state, instance){
      state.unityInstance = instance
    }
  },
  actions: {
  },
  modules: {
  }
})
