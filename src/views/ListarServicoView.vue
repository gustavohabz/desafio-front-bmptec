<template>
    <v-card class="px-12 py-12" elevation="6">
        <v-row>
            <v-col cols="10" offset="1">
                <AlertComponente />
            </v-col>
        </v-row>
        <v-row>
            <v-col cols="12">
                <v-data-table
                    :items="atendimentos"
                    :headers="cabecalhos"
                    class="grey darken-1"
                    no-data-text="Nenhuma ordem de serviço registrada."
                    no-results-text="Nenhuma ordem serviço encontrado para esta pesquisa."
                    :loading="loading"
                    loading-text="Carregando..."
                    :search="pesquisa"
                    :custom-filter="filtrarTabela"
                    dark
                >
                    <template v-slot:top>
                        <v-row class="px-12">
                            <v-col cols="4">
                                <v-btn
                                    color="success"
                                    fab
                                    elevation="0"
                                    title="Solicitar Serviço"
                                    @click="$router.push({name: 'servicosSolicitar'})"
                                >
                                    <v-icon>mdi-plus</v-icon>
                                </v-btn>
                                <v-btn
                                    fab
                                    elevation="0"
                                    color="white"
                                    class="ml-12"
                                    @click="fetchAtendimentos"
                                    title="Atualizar Lista"
                                >
                                    <v-icon color="black">
                                        mdi-refresh
                                    </v-icon>
                                </v-btn>
                            </v-col>
                            <v-col cols="4" offset="4">
                                <v-text-field
                                    v-model="pesquisa"
                                    label="Pesquisar"
                                    append-icon="mdi-magnify"
                                ></v-text-field>
                            </v-col>
                        </v-row>
                    </template>
                    <template v-slot:item="row">
                        <tr>
                            <td align="center" class="borda-interior-tabela">{{row.item.modeloVeiculo}}</td>
                            <td align="center" class="borda-interior-tabela">{{row.item.corVeiculo}}</td>
                            <td align="center" class="borda-interior-tabela">{{row.item.placaVeiculo}}</td>
                            <td align="center" class="borda-interior-tabela">
                                <span v-for="(servico, index) in row.item.servicos" :key="index">
                                    <p>
                                        {{servico.nome}} 
                                        <v-icon color="success" v-show="servico.status == 2">mdi-check-circle-outline</v-icon>
                                    </p>
                                </span>
                            </td>
                            <td align="center" class="borda-interior-tabela">
                                <v-chip
                                    color="success"
                                    class="rounded elevation-4"
                                    x-big
                                >
                                    <span style="top: 100%">
                                        {{getStatus(row.item.servicos)}}
                                    </span>
                                </v-chip>
                            </td>
                            <td align="center" v-if="usuarioLogado.admin" class="borda-interior-tabela">
                                <v-btn
                                    text
                                    @click="$router.push({name: 'servicosEditar', params: {id: row.item.id}})"
                                    fab
                                >
                                    <v-icon>mdi-pencil-outline</v-icon>
                                </v-btn>
                                <v-btn
                                    text
                                    fab
                                    @click="abreModalDeletarAtendimento(row.item.id)"
                                >
                                    <v-icon>mdi-trash-can-outline</v-icon>
                                </v-btn>
                            </td>
                        </tr>
                    </template>
                </v-data-table>
            </v-col>
        </v-row>
        <v-dialog
            v-model="isDeletando"
            width="350"
            >
            <v-card class="text-center">
                <v-card-title>
                    Confirmação de exclusão:
                </v-card-title>
                <v-card-text>
                    <strong>
                        Deseja mesmo remover o item escolhido?
                    </strong>
                </v-card-text>
                <v-divider></v-divider>
                <v-card-actions class="justify-end">
                    <v-btn
                        dark
                        @click="isDeletando = false"
                        >
                        Cancelar
                    </v-btn>
                    <v-btn 
                        class="ml-6"
                        color="error"
                        @click="deletarAtendimento"
                        >
                        Excluir
                    </v-btn>
                </v-card-actions>
            </v-card>
        </v-dialog>
    </v-card>
</template>
<script>
import AlertComponente from './../components/AlertComponente.vue'
export default {
    components: {
        AlertComponente
    },
    mounted(){
        this.usuarioLogado = this.$store.getters.getUsuarioLogin
        this.fetchAtendimentos()
    },
    methods: {
        async fetchAtendimentos(){
            this.loading = true
            let response = null
            if(this.usuarioLogado.admin){
                this.addCabecalhoAcoes()
                response = await this.$api.Atendimento.GetAll()
            }else{
                response = await this.$api.Atendimento.GetAllByUser(this.usuarioLogado.id)
            }
            this.atendimentos = response
            this.loading = false
        },
        async deletarAtendimento(){
            const response = await this.$api.Atendimento.Delete(this.atendimentoIdParaDeletar)
            if(response){
                this.triggerAlert(this.alertSucessoRemover)
            }else{
                this.triggerAlert(this.alertErroRemover)
            }
            this.isDeletando = false
            this.fetchAtendimentos()
        },
        fetchServicoById(idArray){
            let arrResponses = []
            idArray.forEach(async id => {
                const response = await this.$api.Servico.GetById(id)
                arrResponses.push(response)
            })
            this.setServico(arrResponses)
        },
        addCabecalhoAcoes(){
            if(this.naoAdicionouAcoesTabela){
                this.cabecalhos.push({text: 'AÇÕES', align: 'center', filterable: false, value: 'acoes'})
                this.naoAdicionouAcoesTabela = false
            }
        },
        abreModalDeletarAtendimento(id){
            this.atendimentoIdParaDeletar = id
            this.isDeletando = true
        },
        getStatus(servicos){
            let contadorAguardando = 0
            let contadorFinalizado = 0
            let retorno = ''
            servicos.forEach(servico => {
                switch(servico.status){
                    case 0:
                        contadorAguardando++
                        break
                    case 1:
                        retorno = this.$constants.getStatusAtendimento(1)
                        break
                    case 2:
                        contadorFinalizado++
                        break
                }
            })
            if(contadorAguardando == servicos.length){
                retorno = this.$constants.getStatusAtendimento(0)
            }
            if(contadorFinalizado == servicos.length){
                retorno = this.$constants.getStatusAtendimento(2)
            }
            return retorno
        },
        triggerAlert(alerta){
           this.$store.dispatch('setAndTriggerInfoAlert', alerta) 
        },
        filtrarTabela(value, search, item) {
            return Object.values(item).some(v=>v&&v.toString().toLowerCase().includes(search))
        }
    },
    data() {
        return {
            atendimentos: [],
            cabecalhos: [
                {text: 'VEÍCULO', align: 'center', filterable: true, value: 'veiculo'},
                {text: 'COR', align: 'center', filterable: true, value: 'cor'},
                {text: 'PLACA', align: 'center', filterable: true, value: 'placa'},
                {text: 'SERVIÇOS', align: 'center', filterable: true, value: 'servicos'},
                {text: 'STATUS', align: 'center', filterable: false, value: 'status'}
            ],
            statusAtendimentos: [],
            contadorStatusFinalizado: 0,
            servicoIndex: 0,
            pesquisa: '',
            loading: false,
            isDeletando: false,
            atendimentoIdParaDeletar: null,
            coletouDoComputed: false,
            alertSucessoRemover: this.$alerts.alertSucessoRemoverAtendimento,
            alertErroRemover: this.$alerts.alertErroRemoverAtendimento,
            naoAdicionouAcoesTabela: true,
            usuarioLogado: {}
        }
    }
}
</script>
<style>
.borda-interior-tabela{
    border-color: #ffffff !important;
}
.v-data-footer{
    border-color: #ffffff !important;
}
</style>