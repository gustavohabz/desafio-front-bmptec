<template>
    <v-form 
        v-model="formServicoValido" 
        ref="formServicoRef"
        lazy-validation
        >
        <v-row style="padding-top: 16px">
            <v-col md="8" lg="8" sm="12" xs="12">
                <v-text-field
                    label="Modelo do Veículo"
                    outlined
                    :rules="$formRules.modeloVeiculo"
                    v-model="atendimento.modeloVeiculo"
                />
            </v-col>
            <v-col md="4" lg="4" sm="12" xs="12">
                <v-text-field
                    label="Cor do Veículo"
                    outlined
                    :rules="$formRules.corVeiculo"
                    v-model="atendimento.corVeiculo"
                />
            </v-col>
        </v-row>
        <v-row>
            <v-col cols="8">
                <v-text-field
                    label="Placa do Veículo"
                    v-mask="'AAA-####'"
                    outlined
                    :rules="$formRules.placaVeiculo"
                    v-model="atendimento.placaVeiculo"
                />
            </v-col>
            <v-col cols="4">
                <v-autocomplete
                    label="Ano do Veículo"
                    :items="anosDeVeiculo"
                    maxlength="4"
                    outlined
                    :rules="$formRules.anoVeiculo"
                    v-model="atendimento.anoVeiculo"
                />
            </v-col>
        </v-row>
        <v-row style="margin-bottom: 32px">
            <v-col cols="8">
                <v-autocomplete
                    v-model="atendimento.servicos"
                    :items="servicos"
                    label="Serviços"
                    no-data-text="Nenhum serviço encontrado."
                    return-object
                    item-text="nome"
                    :loading="loadingServicos"
                    :rules="$formRules.servicosVeiculo"
                    chips
                    multiple
                    compact
                    outlined
                >
                    <template v-slot:selection="data">
                        <v-chip
                            v-bind="data.attrs"
                            :input-value="data.selected"
                            close
                            dark
                            color="green darken-4"
                            @click="data.select"
                            @click:close="removerServico(data)"
                        >
                        {{ data.item.nome }}
                        </v-chip>
                    </template>
                </v-autocomplete>
            </v-col>
            <v-col cols="4">
                <v-menu
                    offset-x
                    >
                    <template v-slot:activator="{ on, attrs }">
                        <v-text-field
                            label="Data do Atendimento"
                            v-mask="'##/##/####'"
                            outlined
                            :rules="$formRules.dataAtendimento"
                            v-model="atendimento.dataAtendimento"
                            v-bind="attrs"
                            v-on="on"
                        />
                    </template>
                    <v-date-picker
                        v-model="dataAtendimentoDatePicker"
                        locale="pt-br"
                        @click:date="setDataAtendimento"
                    />
                </v-menu>
            </v-col>
        </v-row>
        <v-row v-show="atendimentoSolicitado">
            <v-col cols="12" class="text-center">
                <RouterLink :to="{name: 'servicosListar'}">Visualizar Serviços solicitados</RouterLink>
            </v-col>
        </v-row>
        <v-row>
            <v-col cols="4">
                <v-btn
                    dark
                    @click="$emit('set-passo-1')"
                    v-show="usuarioLogado.admin"
                >
                    Voltar
                </v-btn>
            </v-col>
            <v-col cols="8" class="text-right">
                <v-btn
                    color="success"
                    @click="validaForm"
                    :disabled="enviouForm"
                >
                    Criar ordem de serviço
                </v-btn>
            </v-col>
        </v-row>
    </v-form>
</template>
<script>
import {mask} from 'vue-the-mask'
const minAnosDeVeiculo = new Date().getFullYear() - 100
const maxAnosDeVeiculo = new Date().getFullYear()
export default {
    directives: {mask},
    mounted() {
        this.fetchServicos()
        this.getAnosDeVeiculo()
        this.usuarioLogado = this.$store.getters.getUsuarioLogin
    },
    data() {
        return {
            servicos: [],
            mostraDatePickerDataAtendimento: false,
            dataAtendimentoDatePicker: null,
            atendimento: {
                modeloVeiculo: '',
                corVeiculo: '',
                placaVeiculo: '',
                anoVeiculo: '',
                dataAtendimento: '',
                servicos: []
            },
            loadingServicos: false,
            anosDeVeiculo: [],
            formServicoValido: false,
            enviouForm: false,
            usuarioLogado: {},
            atendimentoSolicitado: false
        }
    },
    methods: {
        async fetchServicos() {
            this.loadingServicos = true
            const response = await this.$api.Servico.GetAll()
            this.servicos = response
            this.loadingServicos = false
        },
        setDataAtendimento(date) {
            const dataArray = date.split('-')
            const dataFormatada = dataArray[2]+'/'+dataArray[1]+'/'+dataArray[0]
            this.atendimento.dataAtendimento = dataFormatada
        },
        removerServico(item) {
            this.atendimento.servicos.splice(item.index, 1)
        },
        getAnosDeVeiculo() {
            for(let i=maxAnosDeVeiculo; i>=minAnosDeVeiculo; i--){
                this.anosDeVeiculo.push(i)
            }
        },
        validaForm() {
            if(this.$refs.formServicoRef.validate()){
                this.$emit('criar-ordem', this.atendimento)
                this.enviouForm = true
                this.atendimentoSolicitado = true
                setTimeout(() => {
                    this.enviouForm = false
                }, 3000)
            }
        },
    }
}
</script>