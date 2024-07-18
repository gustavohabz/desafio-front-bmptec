<template>
    <section style="height: 95%;">
        <v-card elevation="24" class="fundo-login rounded-0">
            <v-row class="d-flex justify-center posicionamento-card-login">
                <v-col md="4" lg="3" sm="3" xs="3">
                    <v-card class="px-12 rounded-xl" elevation="6">
                        <form-login 
                            @realizando-cadastro="realizarLogin(false, infoAlert)" 
                            v-show="isLogin"
                        />
                        <form-cadastro 
                            @realizando-login="realizarLogin(true, infoAlert)" 
                            v-show="!isLogin"
                        />
                        <v-row>
                            <v-col cols="12">
                                <v-alert 
                                    v-model="infoAlert.mostraAlert"
                                    :color="infoAlert.colorAlert"
                                    :icon="infoAlert.iconAlert"
                                    dark
                                    >
                                    {{infoAlert.mensagemAlert}}
                                </v-alert>
                            </v-col>
                        </v-row>
                    </v-card>
                </v-col>
            </v-row>
        </v-card>
        <AppFooter />
    </section>
</template>
<script>
import FormLogin from './../components/FormLogin.vue'
import FormCadastro from './../components/FormCadastro.vue'
import AppFooter from './../components/AppFooter.vue'
export default {
    components: {
        FormLogin,
        FormCadastro,
        AppFooter
    },
    methods: {
        realizarLogin(isLogin, infoAlert){
            console.log('blabla')
            this.isLogin = isLogin
            this.infoAlert = infoAlert
        }
    },
    data() {
        return {
            isLogin: true,
            infoAlert: {
                mostraAlert: false,
                mensagemAlert: '',
                colorAlert: 'success',
                iconAlert: 'mdi-check'
            }
        }
    }
}
</script>
<style scoped>
.posicionamento-card-login{
    padding-top: 10em;
    bottom: auto;
}
.fundo-login{
    background-image: url("../assets/background.png");
    background-size: cover;
    background-position: center;
    background-attachment: fixed;
    height: 100%;
}
</style>