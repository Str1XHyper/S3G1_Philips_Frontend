import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    lessonID: "",
  },
  mutations: {
    setLessonId(state, lessonId){
      state.lessonID = lessonId
    },
    clearLessonId(state){
      state.lessonID = ""
    }
  },
  actions: {
  },
  modules: {
  }
})
