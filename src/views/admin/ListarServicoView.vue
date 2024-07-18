<template>
    <v-card class="px-12 py-12">
        <v-row>
            <v-col cols="10" offset="1">
                <v-data-table
                    :items="atendimentos"
                    :headers="cabecalhos"
                    class="grey darken-1 elevation-6"
                    no-data-text="Nenhum serviço registrado."
                    no-results-text="Nenhum serviço encontrado para esta pesquisa."
                    :loading="loading"
                    dark
                >
                    <template v-slot:top>
                        <v-row class="px-12">
                            <v-col cols="4">
                                <v-btn
                                    color="success"
                                    fab
                                    elevation="0"
                                    @click="$router.push({name: 'servicosSolicitar'})"
                                >
                                    <v-icon>mdi-plus</v-icon>
                                </v-btn>
                                <v-btn
                                    fab
                                    elevation="0"
                                    color="white"
                                    class="ml-12"
                                >
                                    <v-icon 
                                        color="black"
                                        @click="fetchAtendimentos"
                                        >
                                        mdi-refresh
                                    </v-icon>
                                </v-btn>
                            </v-col>
                            <v-col cols="4" offset="4">
                                <v-text-field
                                    v-model="pesquisa"
                                    label="Pesquisar"
                                    append-icon="mdi-magnify"
                                    @click:append="pesquisar"
                                ></v-text-field>
                            </v-col>
                        </v-row>
                    </template>
                    <template v-slot:item="row">
                        <tr>
                            <td align="center">{{row.item.modeloVeiculo}}</td>
                            <td align="center">{{row.item.corVeiculo}}</td>
                            <td align="center">{{row.item.placaVeiculo}}</td>
                            <td align="center">
                                <span v-for="(servico, index) in servicos[row.index]" :key="index">
                                    <p>
                                        {{servico.nome}} 
                                        <v-icon color="success" v-show="servico.status == 2">mdi-check-circle-outline</v-icon>
                                    </p>
                                </span>
                            </td>
                            <td align="center">
                                <v-sheet
                                    color="success"
                                >
                                    {{setStatusAtendimento(row.index)}}
                                </v-sheet>
                            </td>
                            <td align="center">
                                <v-btn
                                    text
                                    @click="$router.push({name: 'servicosEditar', params: {id: row.item.id}})"
                                >
                                    <v-icon>mdi-pencil</v-icon>
                                </v-btn>
                                <v-btn
                                    text
                                >
                                    <v-icon>mdi-trash-can-outline</v-icon>
                                </v-btn>
                            </td>
                        </tr>
                    </template>
                </v-data-table>
            </v-col>
        </v-row>
    </v-card>
</template>
<script>
export default {
    mounted(){
        this.fetchAtendimentos()
    },
    methods: {
        async fetchAtendimentos(){
            this.loading = true
            const response = await this.$api.Atendimento.GetAll()
            this.atendimentos = response
            this.atendimentos.forEach(atendimento => {
                this.contadorStatusFinalizado = 0
                this.fetchServicoById(atendimento.servicoIds)
                this.servicoIndex++
            })
            this.loading = false
        },
        pesquisar(){
            console.log('pesquisa')
        },
        setServico(data){
            this.servicos.push(data)
        },
        setStatusAtendimento(index){
            const status = {
                0: 'Aguardando',
                1: 'Em atendimento',
                2: 'Finalizado'
            }
            const servicoArray = this.servicos[index]
            let contadorAguardando = 0
            let contadorFinalizado = 0
            for(let i=0; i<this.servicos[index].length; i++){
                const servico = this.servicos[index][i]
                switch(servico.status){
                    case 0:
                        contadorAguardando++
                    case 1:
                        return status[servico.status]
                    case 2:
                        contadorFinalizado++
                }
            }
            if(contadorAguardando.length == servicoArray.length){
                return status[0]
            }
            if(contadorFinalizado.length == servicoArray.length){
                return status[2]
            }
        },
        fetchServicoById(idArray){
            let arrResponses = []
            idArray.forEach(async id => {
                const response = await this.$api.Servico.GetById(id)
                arrResponses.push(response)
            })
            this.setServico(arrResponses)
        }
    },
    data() {
        return {
            atendimentos: [],
            cabecalhos: [
                {text: 'VEÍCULO', align: 'center', filterable: false, value: 'veiculo'},
                {text: 'COR', align: 'center', filterable: false, value: 'cor'},
                {text: 'PLACA', align: 'center', filterable: false, value: 'placa'},
                {text: 'SERVIÇOS', align: 'center', filterable: false, value: 'servicos'},
                {text: 'STATUS', align: 'center', filterable: false, value: 'status'},
                {text: 'AÇÕES', align: 'center', filterable: false, value: 'acoes'},
            ],
            servicos: [],
            statusAtendimentos: [],
            contadorStatusFinalizado: 0,
            servicoIndex: 0,
            pesquisa: '',
            loading: false
        }
    }
}
</script>