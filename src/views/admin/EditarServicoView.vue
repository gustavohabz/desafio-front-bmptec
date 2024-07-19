<template>
    <v-card class="px-12 py-12" height="85%" elevation="6">
        <v-card-title>
            <v-row>
                <v-col cols="6" offset="1">
                    <h3>
                        Editar Serviços
                    </h3>
                </v-col>
                <v-col cols="1" offset="3">
                    <h3 class="text-right">
                        <v-icon 
                            x-large 
                            title="Voltar" 
                            @click="$router.push({name: 'servicosListar'})">
                            mdi-close-circle-outline
                        </v-icon>
                    </h3>
                </v-col>
            </v-row>
        </v-card-title>
        <v-row>
            <v-col cols="6" offset="1">
                <v-btn
                    color="success"
                    fab
                    elevation="0"
                    @click="addServico"
                >
                    <v-icon>mdi-plus</v-icon>
                </v-btn>
            </v-col>
        </v-row>
        <v-row>
            <v-col cols="10" offset="1">
                <v-data-table
                    :items="servicosTabela"
                    :headers="cabecalho"
                    class="elevation-0"
                    no-data-text="Nenhum serviço registrado."
                    no-results-text="Nenhum serviço encontrado para esta pesquisa."
                    :loading="loading"
                    loading-text="Carregando..."
                    hide-default-footer
                    disable-pagination
                >
                    <template v-slot:item="row">
                        <tr>
                            <td align="center" width="150">
                                <v-autocomplete
                                    :items="selectServicos"
                                    :loading="loadingServicosAll"
                                    item-value="id"
                                    item-text="nome"
                                    return-object
                                    v-model="atendimento.servicos[row.index]"
                                />
                            </td>
                            <td align="center" width="200">
                                <v-select 
                                    v-model="atendimento.servicos[row.index].status"
                                    :items="selectStatusItems"
                                    item-value="status"
                                    item-text="label"
                                />
                            </td>
                            <td align="center" width="10">
                                <v-btn
                                    fab
                                    text
                                    @click="removeServico(row.index)"
                                >
                                    <v-icon>
                                        mdi-trash-can-outline
                                    </v-icon>
                                </v-btn>
                            </td>
                        </tr>
                    </template>
                </v-data-table>
            </v-col>
        </v-row>
        <v-row>
            <v-col cols="10" offset="1">
                <AlertComponente />
            </v-col>
        </v-row>
        <v-row>
            <v-col cols="4" offset="1">
                <v-btn
                    dark
                    x-large
                    @click="$router.push({name: 'servicosListar'})"
                >
                   Cancelar 
                </v-btn>
            </v-col>
            <v-col cols="4" offset="2" class="text-right">
                <v-btn
                    color="success"
                    x-large
                    @click="validaServicos"
                >
                    Salvar
                </v-btn>
            </v-col>
        </v-row>
    </v-card>
</template>
<script>
import AlertComponente from './../../components/AlertComponente.vue'
export default {
    components: {
        AlertComponente
    },
    mounted(){
        this.atendimentoId = this.$route.params.id
        this.loading = true
        this.selectStatusItems = this.$constants.statusAtendimentoArray
        this.fetchAtendimento()
    },
    data(){
        return {
            servicosTabela: [],
            atendimento: {},
            cabecalho: [
                {text: 'Nome', align: 'center', filterable: false, value: 'nome'},
                {text: 'Status do serviço', align: 'center', filterable: false, value: 'statusServico'},,
                {text: 'Excluir', align: 'center', filterable: false, value: 'excluir'},
            ],
            loading: false,
            loadingServicosAll: false,
            atendimentoId: null,
            servicos: [],
            selectStatusItems: [],
            selectServicos: [],
            alertSucessoSalvar: this.$constants.getAlert('sucesso', 'Serviços alterados com sucesso.', 5000),
            alertErroSalvar: this.$constants.getAlert('erro', 'Erro ao salvar os serviços.', 5000),
            alertErroItemDuplicado: this.$constants.getAlert('erro', 'Existem itens duplicados.', 5000),
            alertErroSemServicos: this.$constants.getAlert('erro', 'Registre ao menos um serviço.', 5000)
        }
    },
    methods: {
        async fetchServicosAll(){
            this.loadingServicosAll = true
            const response = await this.$api.Servico.GetAll()
            this.selectServicos = response
            this.loadingServicosAll = false
        },
        async atualizaServicosAtendimento(){
            const obj = this.atendimento
            const response = await this.$api.Atendimento.Patch(this.atendimentoId, obj)
            if(response){
                this.triggerAlert(this.alertSucessoSalvar)
            }else{
                this.triggerAlert(this.alertErroSalvar)
            }
        },
        async fetchAtendimento(){
            const response = await this.$api.Atendimento.GetById(this.atendimentoId)
            this.servicosTabela = response.servicos
            this.atendimento.servicos = response.servicos
            this.fetchServicos()
        },
        removeServico(index) {
            this.atendimento.servicos.splice(index, 1)
        },
        addServico() {
            this.servicosTabela.push(this.selectServicos[0])
        },
        fetchServicos(){
            this.fetchServicosAll()
            this.loading = false
        },
        validaServicos(){
            if(this.atendimento.servicos.length > 0){
                const idArray = this.atendimento.servicos.map(item => item.id)
                const duplicado = idArray.filter((item, index) => idArray.indexOf(item) !== index )
                if(duplicado.length > 0){
                    this.triggerAlert(this.alertErroItemDuplicado)
                }else{
                    this.atualizaServicosAtendimento()
                }
            }else{
                this.triggerAlert(this.alertErroSemServicos)
            }
        },
        triggerAlert(alerta){
           this.$store.dispatch('setAndTriggerInfoAlert', alerta) 
        }
    }
}
</script>