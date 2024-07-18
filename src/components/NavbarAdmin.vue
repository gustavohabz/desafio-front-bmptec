<template>
    <v-app-bar
        color="white"
        elevation="12"
        style="z-index: 1">
        <v-toolbar-title @click="$router.push('/servicos')" class="hover-title">
            <strong class="ml-6" >
                <img class="mr-3" height="32px" src="../assets/logo.png" /> 
                AUTO ELÉTRICA FULLTECH
            </strong>
        </v-toolbar-title>
        <v-spacer></v-spacer>
        <strong>
            {{usuarioLogado.nome}}
            <v-icon 
                @click="doLogout"
                class="ml-12 mr-6"
            >
                mdi-logout
            </v-icon>
        </strong>
    </v-app-bar>
</template>
<script>
export default {
    computed: {
        usuarioLogado() {
            return this.$store.getters.getUsuarioLogin
        }
    },
    methods: {
        doLogout() {
            this.$store.commit('usuarioLogout', null)
            this.$router.push({name: 'home'})
        }
    }
}
</script>
<style scoped>
.hover-title:hover{
    cursor: pointer;
}
</style>