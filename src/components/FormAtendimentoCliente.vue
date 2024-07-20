<template>
    <section>
        <v-row>
            <v-col lg="6" md="6" sm="12" xs="12" offset-lg="3" offset-md="3">
                <v-form 
                    v-model="formClienteValido"
                    ref="formClienteRef"
                    >
                    <v-menu offset-x open-on-hover>
                        <template v-slot:activator="{ on, attrs}">
                            <div
                                v-on="on"
                                v-bind="attrs"
                                >
                                <v-text-field
                                    v-mask="'###.###.###-##'"
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
                            </div>
                        </template>
                        <v-list>
                            <v-list-item v-show="usuarios.length == 0 || usuarios[0] == false">
                                <v-list-item-title>
                                    Nenhum usuário encontrado
                                </v-list-item-title>
                            </v-list-item>
                            <v-list-item v-show="usuarios.length > 0 && usuarios[0] != false"
                                v-for="(usuario, index) in usuarios" :key="index"
                                link
                                @click="setCliente(usuario)">
                                <section v-show="usuario">
                                    <v-list-item-title>
                                    {{usuario.nome}}
                                    </v-list-item-title>
                                    <v-list-item-subtitle>
                                        {{usuario.cpf}}
                                    </v-list-item-subtitle>
                                </section>
                                <v-list-item-title v-show="!usuario">
                                    Nenhum usuário encontrado
                                </v-list-item-title>
                            </v-list-item>
                        </v-list>
                    </v-menu>
                </v-form>
            </v-col>
        </v-row>
        <v-row>
            <v-col lg="6" md="6" sm="12" xs="12" offset-lg="3" offset-md="3">
                <v-chip v-show="!atendimentoCliente.usuarioId">
                    <i>Nenhum cliente selecionado.</i>
                </v-chip>
                <v-chip v-show="atendimentoCliente.usuarioId">
                    {{ usuarioMostradoNome }} - {{ usuarioMostradoCpf }}
                </v-chip>
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
    </section>
</template>
<script>
import {mask} from 'vue-the-mask'
export default{
    directives: {mask},
    data() {
        return {
            usuarioMostradoNome: '',
            usuarioMostradoCpf: '',
            usuarios: [],
            pesquisaCpf: '',
            atendimentoCliente: {
                usuarioId: null
            },
            loadingCpf: false,
            formClienteValido: false
        }
    },
    methods: {
        validaFormCpf() {
            if(this.atendimentoCliente.usuarioId){
                this.$emit('set-cliente-proximo-passo', this.atendimentoCliente)
            }
        },
        setCliente(usuario) {
            if(usuario){
                this.atendimentoCliente.usuarioId = usuario.id
                this.pesquisaCpf = usuario.cpf
                this.usuarioMostradoNome = usuario.nome
                this.usuarioMostradoCpf = usuario.cpf
            }else{
                this.atendimentoCliente.usuarioId = null
                this.pesquisaCpf = ''
            }
        },
        async findUsuariosByCpf(cpf) {
            this.loadingCpf = true
            const response = await this.$api.Usuario.GetByCpf(cpf)
            this.usuarios = [response]
            this.loadingCpf = false
        },
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