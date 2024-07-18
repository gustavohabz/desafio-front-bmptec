<template>
    <section style="height: 95%;">
        <v-card elevation="24" class="fundo-login rounded-0">
            <v-row class="d-flex justify-center posicionamento-card-login">
                <v-col md="4" lg="3" sm="3" xs="3">
                    <v-card class="px-12 rounded-xl" elevation="6">
                        <form-login 
                            @realizando-cadastro="realizandoLogin = false" 
                            v-show="realizandoLogin"
                        />
                        <form-cadastro 
                            @realizando-login="realizandoLogin = true" 
                            v-show="!realizandoLogin"
                        />
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
    data() {
        return {
            realizandoLogin: true
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