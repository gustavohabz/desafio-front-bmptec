<template>
    <section style="height: 95%;">
        <v-card elevation="24" class="fundo-login">
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
        <v-footer 
            padless
            absolute
            style="background-color: transparent">
            <v-col
                class="text-center"
                cols="12"
            >
                FULLTECHPRO ©
            </v-col>
        </v-footer>
    </section>
</template>
<script>
import FormLogin from './../components/FormLogin.vue'
import FormCadastro from './../components/FormCadastro.vue'
export default {
    components: {
        FormLogin,
        FormCadastro
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