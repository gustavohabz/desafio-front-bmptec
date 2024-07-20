<template>
    <v-form v-model="formValido" @submit.prevent="validaCadastro" ref="formCadastro">
        <section class="py-6">
            <v-row v-show="$route.name == 'cadastroAdmin' && isUsuarioAdmin" class="mb-n12">
                <v-col cols="3">
                    <v-switch
                        v-model="switchUsuarioAdmin"
                        color="success"
                        inset
                        @change="modificouSwitch('admin')"
                        label="Admin"
                    />
                </v-col>
                <v-col cols="3">
                    <v-switch
                        v-model="switchUsuarioCliente"
                        color="success"
                        inset
                        @change="modificouSwitch('cliente')"
                        label="Cliente"
                    />
                </v-col>
            </v-row>
            <v-row>
                <v-col cols="11">
                    <h3 style="padding-top: 16px" class="text-center ml-6" v-show="!existemSwitches">
                        CADASTRO DE CLIENTE
                    </h3>
                    <h3 style="padding-top: 16px" class="text-center ml-6" v-show="existemSwitches">
                        CADASTRO DE {{ switchUsuarioAdmin ? 'ADMIN' : 'CLIENTE' }}
                    </h3>
                </v-col>
                <v-col cols="1">
                    <v-icon
                        x-large 
                        title="Voltar" 
                        @click="acaoFecharCadastro"
                        >
                        mdi-close-circle-outline
                    </v-icon>
                </v-col>
            </v-row>
            <v-col md="12" lg="12" class="mb-n6 mt-3">
                <v-text-field
                    label="Nome do Cliente"
                    placeholder="Nome do Cliente"
                    outlined
                    :rules="$formRules.nomeCliente"
                    v-model="usuario.nome"
                    v-show="!existemSwitches"
                />
                <v-text-field
                    :label="(switchUsuarioAdmin ? 'Nome do Admin' : 'Nome do Cliente')"
                    :placeholder="(switchUsuarioAdmin ? 'Nome do Admin' : 'Nome do Cliente')"
                    outlined
                    :rules="$formRules.nomeCliente"
                    v-model="usuario.nome"
                    v-show="existemSwitches"
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
                        :disabled="loading"
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
        if(this.$store.getters.getUsuarioLogin){
            this.isUsuarioAdmin = this.$store.getters.getUsuarioLogin.admin
            if(this.isUsuarioAdmin && this.$route.name == 'cadastroAdmin'){
                this.usuario.admin = true
                this.switchUsuarioAdmin = true
                this.switchUsuarioCliente = false
                this.existemSwitches = true
            }
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
                this.resetaForm()
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
        },
        acaoFecharCadastro(){
            if(this.$route.name == 'cadastroAdmin'){
                this.$router.back()
            }else{
                this.$emit('realizando-login')
            }
        },
        resetaForm(){
            this.usuario = {
                telefone: '',
                email: '',
                nome: '',
                cpf: '',
                admin: false
            }
            this.$refs.formCadastro.resetValidation()
        },
        modificouSwitch(tipoUsuario) {
            if(tipoUsuario == 'admin'){
                this.switchUsuarioCliente = !this.switchUsuarioAdmin
                this.usuario.admin = true
            }else{
                this.switchUsuarioAdmin = !this.switchUsuarioCliente
                this.usuario.admin = false
            }
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
            switchUsuarioAdmin: false,
            switchUsuarioCliente: false,
            existemSwitches: false,
            isUsuarioAdmin: false,
            formValido: false,
            loading: false,
            alertErroCadastro: this.$alerts.alertErroCadastroUsuario,
            alertSucessoCadastro: this.$alerts.alertSucessoCadastroUsuario
        }
    }
}
</script>