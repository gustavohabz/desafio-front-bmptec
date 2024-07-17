import Vue from 'vue'
import App from './App.vue'
import router from './plugins/router'
import store from './plugins/store'
import vuetify from './plugins/vuetify'
import api from './plugins/_api'
import './plugins/axios'
import VueTheMask from 'vue-the-mask'

Vue.prototype.$api = api
Vue.config.productionTip = false

new Vue({
  router,
  store,
  vuetify,
  VueTheMask,
  render: (h) => h(App),
}).$mount('#app')
