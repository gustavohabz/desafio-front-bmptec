import Vue from 'vue'
import App from './App.vue'
import router from './plugins/router'
import store from './plugins/store'
import vuetify from './plugins/vuetify'
import api from './plugins/_api'
import './plugins/axios'
import VueTheMask from 'vue-the-mask'
import formRules from './plugins/formRules'
import constants from './plugins/constants'
import mensagemAlert from './plugins/mensagemAlert'

Vue.prototype.$api = api
Vue.prototype.$formRules = formRules
Vue.prototype.$constants = constants
Vue.prototype.$alerts = mensagemAlert.mensagens
Vue.config.productionTip = false

new Vue({
  router,
  store,
  vuetify,
  VueTheMask,
  render: (h) => h(App),
}).$mount('#app')
