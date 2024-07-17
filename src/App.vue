<template>
  <v-app>
    <v-main>
      <NavbarAdmin v-if="isUsuarioLogado && isUsuarioAdmin"/>
      <router-view />
    </v-main>
  </v-app>
</template>

<script>
import NavbarAdmin from './components/NavbarAdmin.vue'
import store from './plugins/store.js'
export default {
  components: {
    NavbarAdmin
  },
  name: 'App',
  mounted() {
    const usuarioLogado = localStorage.getItem('usuarioLogado')
    this.isUsuarioLogado = (usuarioLogado)
  },
  data: () => ({
    isUsuarioLogado: false,
    isUsuarioAdmin: false
  }),
}
</script>
