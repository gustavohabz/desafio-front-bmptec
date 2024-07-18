<template>
    <v-card class="px-6 py-6" elevation="24" style="height: 85%">
        <v-row class="py-12">
            <v-col cols="12">
                <TituloCardAtendimento />
            </v-col>
            <v-col cols="8" offset="2">
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
                                <v-col cols="6" offset="3">
                                    <v-form 
                                        v-model="formClienteValido"
                                        ref="formClienteRef"
                                        >
                                        <v-autocomplete
                                            label="CPF"
                                            outlined
                                            no-data-text="Nenhum CPF encontrado."
                                            :rules="$formRules.cpf"
                                            :items="usuarios"
                                            item-text="cpf"
                                            item-value="id"
                                            required
                                            :loading="loadingCpf"
                                            placeholder="000.000.000-00"
                                            :search-input.sync="pesquisaCpf"
                                            v-model="atendimentoCliente.usuarioId"
                                            style="padding-top: 16px"
                                        >
                                            <template v-slot:item="data">
                                                {{data.item.nome}} - {{data.item.cpf}}
                                            </template>
                                        </v-autocomplete>
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
import FormAtendimentoServico from '../../components/FormAtendimentoServico.vue'
import TituloCardAtendimento from './../../components/TituloCardAtendimento.vue'
export default {
    components: {
        FormAtendimentoServico,
        TituloCardAtendimento
    },
    directives: {mask},
    methods: {
        async criarOrdem(atendimentoServico) {
            const atendimentoObjFinal = {...this.atendimentoCliente, ...atendimentoServico}
            console.log(atendimentoObjFinal)
            const response = await this.$api.Atendimento.Post(atendimentoObjFinal)
            console.log(response)
            this.$router.push({name: 'servicosListar'})
        },
        validaFormCpf() {
            if(this.$refs.formClienteRef.validate()){
                this.passos = 2
            }
        },
        async findUsuariosByCpf(cpf) {
            this.loadingCpf = true
            const response = await this.$api.Usuario.GetByCpf(cpf)
            this.usuarios = [response]
            this.loadingCpf = false
        }
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
            usuarios: []
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