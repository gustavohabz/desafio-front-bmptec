<template>
  <v-app>
    <v-main>
      <NavbarAdmin v-if="isUsuarioLogado"/>
      <router-view />
      <AppFooter/>
    </v-main>
  </v-app>
</template>

<script>
import NavbarAdmin from './components/NavbarAdmin.vue'
import AppFooter from './components/AppFooter.vue'
export default {
  components: {
    NavbarAdmin,
    AppFooter
  },
  name: 'App',
  computed: {
      usuarioLogado() {
          return this.$store.getters.getUsuarioLogin
      }
  },
  updated() {
    this.$store.commit('inicializaStore')
    if(this.usuarioLogado){
      this.isUsuarioLogado = (this.usuarioLogado.hasOwnProperty('id'))
      this.isUsuarioAdmin = this.usuarioLogado.admin        
    }else{
      this.isUsuarioAdmin = false
      this.isUsuarioLogado = false
    }
  },
  data: () => ({
    isUsuarioLogado: false,
    isUsuarioAdmin: false
  }),
}
</script>
<style>
.v-main {
  background-color: #e6e6e6;
}
</style>
