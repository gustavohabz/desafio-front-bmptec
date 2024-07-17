<template>
    <v-app-bar
        color="white"
        elevation="0">
        <v-toolbar-title>
            <strong class="ml-6">
                <img class="mr-3" height="32px" src="../assets/logo.png" /> 
                AUTO ELÉTRICA FULLTECH
            </strong>
        </v-toolbar-title>
        <v-spacer></v-spacer>
        <strong>
            ADMIN
            <v-icon>mdi-logout</v-icon>
        </strong>
    </v-app-bar>
</template>
<script>
import store from './../plugins/store.js'
export default {
    mounted(){
        const usuarioLogado = localStorage.getItem('usuarioLogado')
        if(!usuarioLogado || !usuarioLogado.admin || usuarioLogado){
            this.$router.push('')
        }
    },
    methods: {
        logout() {
            store.dispatch('setUsuario', null)
        }
    },
    data: () => ({
        usuarioLogado: {}
    })
}
</script>