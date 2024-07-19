<template>
    <v-card class="px-6 py-6" elevation="24" style="height: 85%">
        <v-row class="py-12">
            <v-col cols="12">
                <TituloCardAtendimento />
            </v-col>
            <v-col cols="8" offset-xs="0" offset="2">
                <v-stepper
                    v-model="passos"
                >
                    <v-stepper-header>
                        <v-stepper-step
                            step="1"
                            color="success"
                            edit-icon="mdi-close-circle-outline"
                        >
                            Cliente
                        </v-stepper-step>
                        <v-divider></v-divider>
                        <v-stepper-step
                            step="2"
                            color="success"
                        >
                            Serviço
                        </v-stepper-step>
                    </v-stepper-header>
                    <v-stepper-items>
                        <v-stepper-content step="1">
                            <v-row>
                                <v-col lg="6" md="6" sm="12" xs="12" offset-lg="3" offset-md="3">
                                    <v-form 
                                        v-model="formClienteValido"
                                        ref="formClienteRef"
                                        >
                                        <v-menu offset-y>
                                            <template v-slot:activator="{ on, attrs}">
                                                <v-text-field
                                                    v-mask="'###.###.###-##'"
                                                    v-on="on"
                                                    v-bind="attrs"
                                                    v-model="pesquisaCpf"
                                                    maxlength="14"
                                                    outlined
                                                    label="CPF"
                                                    required
                                                    :rules="$formRules.cpf"
                                                    :loading="loadingCpf"
                                                    placeholder="000.000.000-00"
                                                    style="padding-top: 16px"
                                                ></v-text-field>
                                            </template>
                                            <v-list>
                                                <v-list-item v-show="usuarios.length == 0">
                                                    <v-list-title>
                                                        Nenhum usuário encontrado
                                                    </v-list-title>
                                                </v-list-item>
                                                <v-list-item v-show="usuarios.length > 0"
                                                    v-for="(usuario, index) in usuarios" :key="index"
                                                    link
                                                    @click="setCliente(usuario)">
                                                    <v-list-title>
                                                        {{usuario.nome}} - {{usuario.cpf}}
                                                    </v-list-title>
                                                </v-list-item>
                                            </v-list>
                                        </v-menu>
                                    </v-form>
                                </v-col>
                            </v-row>
                            <v-row class="text-right">
                                <v-col cols="12">
                                    <v-btn
                                        color="success"
                                        @click="validaFormCpf"
                                    >
                                        Continuar
                                    </v-btn>
                                </v-col>
                            </v-row>
                        </v-stepper-content>
                        <v-stepper-content step="2">

                            <FormAtendimentoServico @set-passo-1="passos = 1" @criar-ordem="criarOrdem"/>

                        </v-stepper-content>
                    </v-stepper-items>
                </v-stepper>
            </v-col>
        </v-row>
    </v-card>
</template>
<script>
import {mask} from 'vue-the-mask'
import FormAtendimentoServico from './../components/FormAtendimentoServico.vue'
import TituloCardAtendimento from './../components/TituloCardAtendimento.vue'
export default {
    components: {
        FormAtendimentoServico,
        TituloCardAtendimento
    },
    directives: {mask},
    methods: {
        async criarOrdem(atendimentoServico) {
            const atendimentoObjFinal = {...this.atendimentoCliente, ...atendimentoServico}
            const response = await this.$api.Atendimento.Post(atendimentoObjFinal)
            if(response){
                this.triggerAlert(this.alertSucessoAdicionar)
                this.$router.push({name: 'servicosListar'})
            }else{
                this.triggerAlert(this.alertErroAdicionar)
            }
        },
        async findUsuariosByCpf(cpf) {
            this.loadingCpf = true
            const response = await this.$api.Usuario.GetByCpf(cpf)
            this.usuarios = [response]
            this.loadingCpf = false
        },
        setCliente(usuario) {
            this.atendimentoCliente.usuarioId = usuario.id
            this.pesquisaCpf = usuario.cpf
        },
        validaFormCpf() {
            if(this.$refs.formClienteRef.validate()){
                this.passos = 2
            }
        },
        triggerAlert(alerta){
           this.$store.dispatch('setAndTriggerInfoAlert', alerta) 
        },
    },
    data(){
        return{
            passos: 1,
            atendimentoCliente: {
                usuarioId: ''
            },
            formClienteValido: false,
            loadingCpf: false,
            pesquisaCpf: '',
            usuarios: [],
            alertSucessoAdicionar: this.$constants.getAlert('sucesso', 'Atendimento solicitado.', 5000),
            alertErroAdicionar: this.$constants.getAlert('erro', 'Erro ao solicitar atendimento.', 5000),
        }
    },
    watch: {
        pesquisaCpf (val) {
            if(val){
                if(val.length == 14){
                    this.findUsuariosByCpf(val)
                }
            }
        }
    }
}
</script>