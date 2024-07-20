<template>
  <v-app>
    <v-main>
      <NavbarAdmin v-if="$route.name != 'home' && usuarioLogado"/>
      <router-view />
      <AppFooter/>
    </v-main>
  </v-app>
</template>

<script>
import NavbarAdmin from './components/NavbarAdmin.vue'
import AppFooter from './components/AppFooter.vue'
import { mapActions, mapGetters } from 'vuex'
export default {
  components: {
    NavbarAdmin,
    AppFooter
  },
  name: 'App',
  computed: {
      ...mapGetters([
          'getUsuarioLogin'
      ])
  },
  async updated() {
    await this.atualizaStoreLogin()
    this.usuarioLogado = this.$store.getters.getUsuarioLogin
    if(this.usuarioLogado){
      this.isUsuarioAdmin = this.usuarioLogado.admin        
    }else{
      this.isUsuarioAdmin = false
    }
  },
  methods: {
    ...mapActions([
        'atualizaStoreLogin'
    ]),
  },
  data: () => ({
    isUsuarioAdmin: false,
    usuarioLogado: {}
  }),
}
</script>
<style>
.v-main {
  background-color: #e6e6e6;
}
</style>
