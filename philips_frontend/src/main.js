import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import vuetify from './plugins/vuetify';
import cookie from 'vue-cookie'
import axios from 'axios'

axios.defaults.baseURL = "https://api.str1xhyper.nl"
// axios.defaults.baseURL = "http://localhost:3000"

Vue.use(cookie)
Vue.config.productionTip = false
Vue.prototype.$axios = axios

new Vue({
  router,
  store,
  vuetify,
  render: h => h(App)
}).$mount('#app')
