<template>
  <v-app>
    <v-main v-if="isUsuarioLogado">
      <NavbarAdmin v-if="isUsuarioAdmin"/>
      <router-view />
      <AppFooter/>
    </v-main>
    <v-main v-if="!isUsuarioLogado">
      <router-view />
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
  mounted() {
    // const usuarioLogado = localStorage.getItem('usuarioLogado')
    // this.isUsuarioLogado = (usuarioLogado)
  },
  data: () => ({
    isUsuarioLogado: true,
    isUsuarioAdmin: true
  }),
}
</script>
<style>
.v-main {
  background-color: #e6e6e6;
}
</style>
