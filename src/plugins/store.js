import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    usuarioLogin: {},
    infoAlert: {
      mostraAlert: false,
      mensagemAlert: '',
      colorAlert: '',
      iconAlert: 'mdi-check',
      tituloAlert: ''
    },
    idTimeoutAlert: null
  },
  getters: {
    getUsuarioLogin (state){
      try{
        return JSON.parse(state.usuarioLogin)
      } catch (e){
        return null
      }
    },
    getInfoAlert (state){
      return state.infoAlert
    }
  },
  mutations: {
    realizaLogin (state, usuarioLogin){
      state.usuarioLogin = usuarioLogin
      localStorage.setItem('usuarioLogin', JSON.stringify(usuarioLogin))
    },
    realizaLogout (state){
      state.usuarioLogin = {}
      localStorage.removeItem('usuarioLogin')
    },
    inicializaStore(state){
      if(localStorage.getItem('usuarioLogin')){
        state.usuarioLogin = localStorage.getItem('usuarioLogin')
      }
    },
    setInfoAlert(state, infoAlert){
      state.infoAlert.mensagemAlert = infoAlert.mensagemAlert
      state.infoAlert.colorAlert = infoAlert.colorAlert
      state.infoAlert.iconAlert = infoAlert.iconAlert
      state.infoAlert.tituloAlert = infoAlert.tituloAlert
    },
    mostraAlert(state, tempoAlert){
      state.infoAlert.mostraAlert = true
      state.idTimeoutAlert = setTimeout(() => {
        state.infoAlert.mostraAlert = false
      }, tempoAlert)
    },
    finalizaAlert(state){
      state.infoAlert.mostraAlert = false
      clearTimeout(state.idTimeoutAlert)
    }
  },
  actions: {
    atualizaStoreLogin({commit}){
      commit('inicializaStore')
    },
    setAndTriggerInfoAlert({commit}, infoAlert){
      commit('finalizaAlert')
      setTimeout(() => {
        commit('setInfoAlert', infoAlert)
        commit('mostraAlert', infoAlert.tempoAlert)
      }, 10)
    },
    finalizaAlert({commit}){
      commit('finalizaAlert')
    },
    realizaLogin({commit}, usuarioLogin){
      commit('realizaLogin', usuarioLogin)
    },
    realizaLogout({commit}){
      commit('realizaLogout')
    }
  },
  modules: {},
})
