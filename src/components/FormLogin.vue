<template>
    <v-form v-model="formValido" @submit.prevent="doLogin">
        <section class="py-12">
            <v-img class="mx-auto" max-height="64px" max-width="64px" src="../assets/logo.png" />
            <h3 class="text-center" style="padding-top: 32px">AUTO ELÉTRICA FULLTECH</h3>
            <v-col md="12" lg="12">
                <v-text-field
                    v-mask="'###.###.###-##'"
                    label="CPF"
                    outlined
                    placeholder="000.000.000-00"
                    v-model="cpf"
                    :rules="$formRules.cpf"
                    style="padding-top: 64px"
                    :loading="loading"
                />
            </v-col>
        </section>
        <v-card-actions class="py-6">
            <v-row>
                <v-col md="6" lg="6" sm="6" xs="6">
                    <v-btn 
                        color="success"
                        block
                        @click="$emit('realizando-cadastro', null)"
                    >
                        Cadastrar
                    </v-btn>
                </v-col>
                <v-col md="6" lg="6" sm="6" xs="6">
                    <v-btn 
                        color="success"
                        block
                        type="submit"
                    >
                        Entrar
                    </v-btn>
                </v-col>
            </v-row>
        </v-card-actions>
    </v-form>
</template>
<script>
import {mask} from 'vue-the-mask'
export default {
    directives: {mask},
    methods: {
        async doLogin() {
            this.loading = true
            const response = await this.$api.Usuario.GetByCpf(this.cpf)
            if(response){
                const usuarioLogado = {
                    id: response.id,
                    nome: response.nome,
                    admin: response.admin
                }
                this.$store.commit('usuarioLogin', usuarioLogado)
                this.$router.push({name: 'servicos'})
            }else{
                const infoAlert = {
                    mostraAlert: true,
                    mensagemAlert: 'Erro realizar login!',
                    colorAlert: 'error',
                    iconAlert: 'mdi-check'
                }
                this.$emit('realizando-login', infoAlert)
            }
            this.loading = false
        }
    },
    data() {
        return {
            cpf: '',
            formValido: false,
            loading: false
        }
    }
}
</script>