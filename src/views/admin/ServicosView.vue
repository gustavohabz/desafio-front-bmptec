<template>
    <section style="height: 87%;">
        <v-card elevation="24" class="fundo-servicos rounded-0">
            <v-row class="d-flex justify-center posicionamento-card-servicos">
                <v-col class="text-center" md="6" lg="6" sm="12" xs="12">
                    <v-btn
                        x-large
                        color="success"
                        outlined
                        class="white"
                        @click="$router.push({name: 'servicosSolicitar'})"
                    >
                        Solicitar Serviço
                    </v-btn>
                    <v-btn
                        x-large
                        color="success"
                        outlined
                        class="white ml-12"
                        @click="$router.push({name: 'servicosListar'})"
                    >
                        Lista de Serviços
                    </v-btn>
                </v-col>
            </v-row>
        </v-card>
    </section>
</template>
<script>
export default{
    computed: {
        usuarioLogado() {
            return this.$store.getters.getUsuarioLogin
        }
    }
}
</script>

<style scoped>
.posicionamento-card-servicos{
    padding-top: 25%;
    bottom: auto;
}
.fundo-servicos{
    background-image: url("../../assets/background.png");
    background-size: cover;
    background-position: center;
    background-attachment: fixed;
    height: 100%;
}
.servico-btn{
    backrgound-color: #ffffff !important;
}
</style>