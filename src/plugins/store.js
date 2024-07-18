import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

const jsonRegex = /^[\],:{}\s]*$/

export default new Vuex.Store({
  state: {
    usuarioLogin: {}
  },
  getters: {
    getUsuarioLogin (state){
      try{
        return JSON.parse(state.usuarioLogin)
      } catch (e){
        return null
      }
    }
  },
  mutations: {
    usuarioLogin (state, usuarioLogin){
      state.usuarioLogin = usuarioLogin
      localStorage.setItem('usuarioLogin', JSON.stringify(usuarioLogin))
    },
    usuarioLogout (state){
      state.usuarioLogin = {}
      localStorage.removeItem('usuarioLogin')
    },
    inicializaStore(state){
      if(localStorage.getItem('usuarioLogin')){
        state.usuarioLogin = localStorage.getItem('usuarioLogin')
      }
    }
  },
  actions: {},
  modules: {},
})
