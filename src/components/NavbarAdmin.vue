<template>
    <v-app-bar
        color="white"
        elevation="12"
        style="z-index: 1">
        <v-toolbar-title @click="$router.push({name: 'servicos'})" class="hover-click">
            <strong class="ml-6" >
                <img class="mr-3" height="32px" src="../assets/logo.png" style="vertical-align: middle"/> 
                AUTO ELÉTRICA FULLTECH
            </strong>
        </v-toolbar-title>
        <v-spacer></v-spacer>
        <strong>
            {{usuarioLogado.nome}} 
            <span class="ml-2 amber--text" v-show="usuarioLogado.admin">
                (ADMIN)
            </span>
            <v-btn 
                v-show="usuarioLogado.admin" 
                @click="$router.push({name: 'cadastroAdmin'})" 
                class="hover-click ml-6"
                fab
                text
                title="Cadastrar Usuários">
                <v-icon>
                    mdi-account-plus
                </v-icon>
            </v-btn>
            <v-btn
                @click="doLogout"
                class="ml-12 mr-6"
                fab
                text
                >
                <v-icon>
                    mdi-logout
                </v-icon>
            </v-btn>
        </strong>
    </v-app-bar>
</template>
<script>
import { mapActions, mapGetters } from 'vuex'
export default {
    computed: {
        ...mapGetters([
            'getUsuarioLogin'
        ])
    },
    async mounted(){
        await this.atualizaStoreLogin()
        this.usuarioLogado = this.$store.getters.getUsuarioLogin
        if(this.usuarioLogado == null){
            this.usuarioLogado = {
                nome: null,
                admin: false
            }
        }
    },
    data() {
        return {
            usuarioLogado: {}
        }
    },
    methods: {
        doLogout() {
            this.$store.dispatch('realizaLogout', null)
            this.$router.push({name: 'home'})
        },
        ...mapActions([
            'atualizaStoreLogin'
        ])
    }
}
</script>
<style scoped>
.hover-click:hover{
    cursor: pointer;
}
</style>