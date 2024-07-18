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
                        @click="$emit('realizando-cadastro')"
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
            const usuarioLogado = {
                id: response.id,
                nome: response.nome,
                admin: response.admin
                // adicionar token de sessão aqui depois
            }
            if(response && response.admin){
                localStorage.setItem('usuarioLogado', JSON.stringify(usuarioLogado))
                setTimeout(() => {
                    this.$router.push({name: 'servicos'})
                }, 1000)
            }else{
                console.log('Implemente a tela de cliente!!')
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