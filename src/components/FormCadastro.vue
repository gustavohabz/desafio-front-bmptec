<template>
    <v-form v-model="formValido" @submit.prevent="validaCadastro" ref="formCadastro">
        <section class="py-6">
            <v-row>
                <v-col cols="11">
                    <h3 style="padding-top: 16px" class="text-center">
                        CADASTRO DE {{isUsuarioAdmin ? 'ADMIN' : 'CLIENTE'}}
                    </h3>
                </v-col>
                <v-col cols="1">
                    <h3 class="text-right">
                        <v-icon 
                            x-large 
                            title="Voltar" 
                            @click="$emit('realizando-login')">
                            mdi-close-circle-outline
                        </v-icon>
                    </h3>
                </v-col>
            </v-row>
            <v-col md="12" lg="12" class="mb-n6">
                <v-text-field
                    label="Nome do Cliente"
                    placeholder="Nome do Cliente"
                    outlined
                    :rules="$formRules.nomeCliente"
                    v-model="usuario.nome"
                />
            </v-col>
            <v-col md="12" lg="12" class="mb-n6">
                <v-text-field
                    v-mask="'###.###.###-##'"
                    label="CPF"
                    placeholder="000.000.000-00"
                    outlined
                    :rules="$formRules.cpf"
                    v-model="usuario.cpf"
                />
            </v-col>
            <v-col md="12" lg="12" class="mb-n6">
                <v-text-field
                    label="E-mail"
                    placeholder="email@gmail.com"
                    outlined
                    :rules="$formRules.email"
                    v-model="usuario.email"
                />
            </v-col>
            <v-col md="12" lg="12">
                <v-text-field
                    v-mask="'(##) #####-####'"
                    label="Telefone"
                    placeholder="(99) 99999-9999"
                    outlined
                    :rules="$formRules.telefone"
                    v-model="usuario.telefone"
                />
            </v-col>
        </section>
        <v-card-actions class="py-6">
            <v-row>
                <v-col cols="10" offset="1">
                    <v-btn 
                        color="success"
                        block
                        type="submit"
                    >
                        Cadastrar
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
    mounted(){
        this.isUsuarioAdmin = this.$store.getters.getUsuarioLogin.admin
        if(this.isUsuarioAdmin){
            this.usuario.admin = true
        }
    },
    methods: {
        async validaExistenciaCpf(){
            const response = await this.$api.Usuario.GetByCpf(this.usuario.cpf)
            if(!response){
                this.doCadastro()
            }else{
                this.triggerAlert(this.alertErroCadastro)
            }
        },
        async doCadastro() {
            this.loading = true
            const response = await this.$api.Usuario.Post(this.usuario)
            if(response){
                this.triggerAlert(this.alertSucessoCadastro)
                this.$emit('realizando-login')
            }
            this.loading = false
        },
        validaCadastro(){
            if(this.$refs.formCadastro.validate()){
                this.validaExistenciaCpf()
            }
        },
        triggerAlert(alerta){
            this.$store.dispatch('setAndTriggerInfoAlert', alerta) 
        }
    },
    data() {
        return {
            usuario: {
                telefone: '',
                email: '',
                nome: '',
                cpf: '',
                admin: false
            },
            isUsuarioAdmin: false,
            formValido: false,
            loading: false,
            alertErroCadastro: this.$constants.getAlert('erro', 'Já existe um usuário com este CPF.', 5000),
            alertSucessoCadastro: this.$constants.getAlert('sucesso', 'Usuário criado com sucesso.', 5000)
        }
    }
}
</script>