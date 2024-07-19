<template>
    <section style="height: 95%;">
        <v-card elevation="24" class="fundo-login rounded-0">
            <v-row class="d-flex justify-center posicionamento-card-login">
                <v-col md="5" lg="5" sm="3" xs="12">
                    <v-card class="px-12 rounded-xl" elevation="6">
                        <form-login 
                            @realizando-cadastro="isLogin = false" 
                            v-show="isLogin"
                        />
                        <form-cadastro 
                            @realizando-login="isLogin = true" 
                            v-show="!isLogin"
                        />
                    </v-card>
                </v-col>
            </v-row>
            <v-row>
                <v-col cols="8" offset="2">
                    <AlertComponente />
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
import AlertComponente from './../components/AlertComponente.vue'
export default {
    components: {
        FormLogin,
        FormCadastro,
        AppFooter,
        AlertComponente
    },
    data() {
        return {
            isLogin: true
        }
    }
}
</script>
<style scoped>
.posicionamento-card-login{
    padding-top: 9em;
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