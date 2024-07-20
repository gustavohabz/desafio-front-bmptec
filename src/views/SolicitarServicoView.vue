<template>
    <v-card class="px-6 py-6" elevation="24" style="height: 85%">
        <v-row>
            <v-col cols="12">
                <AlertComponente />
            </v-col>
        </v-row>
        <v-row class="py-6">
            <v-col cols="12">
                <TituloCardAtendimento />
            </v-col>
            <v-col cols="8" offset-xs="0" offset="2" v-show="!usuarioLogado.admin">
                <FormAtendimentoServico @criar-ordem="criarOrdem" />
            </v-col>
            <v-col cols="8" offset-xs="0" offset="2" v-show="usuarioLogado.admin" class="mb-12">
                <v-stepper v-model="passos" >
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

                            <FormAtendimentoCliente @set-cliente-proximo-passo="setClienteProximoPasso" />

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
import FormAtendimentoServico from './../components/FormAtendimentoServico.vue'
import FormAtendimentoCliente from './../components/FormAtendimentoCliente.vue'
import TituloCardAtendimento from './../components/TituloCardAtendimento.vue'
import AlertComponente from './../components/AlertComponente.vue'
export default {
    components: {
        FormAtendimentoServico,
        FormAtendimentoCliente,
        TituloCardAtendimento,
        AlertComponente
    },
    mounted(){
        this.usuarioLogado = this.$store.getters.getUsuarioLogin
        if(!this.usuarioLogado.admin){
            this.atendimentoCliente.usuarioId = this.usuarioLogado.id
        }
    },
    methods: {
        async criarOrdem(atendimentoServico) {
            const atendimentoObjFinal = {...this.atendimentoCliente, ...atendimentoServico}
            const response = await this.$api.Atendimento.Post(atendimentoObjFinal)
            if(response){
                this.triggerAlert(this.alertSucessoAdicionar)
            }else{
                this.triggerAlert(this.alertErroAdicionar)
            }
        },
        setClienteProximoPasso(atendimentoCliente){
            this.atendimentoCliente = atendimentoCliente
            this.passos = 2
        },
        triggerAlert(alerta){
           this.$store.dispatch('setAndTriggerInfoAlert', alerta) 
        },
    },
    data(){
        return{
            passos: 1,
            atendimentoCliente: {},
            alertSucessoAdicionar: this.$alerts.alertSucessoSolicitarAtendimento,
            alertErroAdicionar: this.$alerts.alertErroSolicitarAtendimento,
            usuarioLogado: {}
        }
    }
}
</script>