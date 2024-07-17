<template>
    <v-form v-model="formValido" @submit.prevent="doCadastro">
        <section class="py-6">
            <v-row>
                <v-col cols="11">
                    <h3 style="padding-top: 16px" class="text-center">
                        CADASTRO DE CLIENTE 
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
            <v-col md="12" lg="12" class="mb-n10">
                <v-text-field
                    label="Nome do Cliente"
                    placeholder="Nome do Cliente"
                    outlined
                    v-model="usuario.nome"
                />
            </v-col>
            <v-col md="12" lg="12" class="mb-n10">
                <v-text-field
                    v-mask="'###.###.###-##'"
                    label="CPF"
                    placeholder="000.000.000-00"
                    outlined
                    v-model="usuario.cpf"
                />
            </v-col>
            <v-col md="12" lg="12" class="mb-n10">
                <v-text-field
                    label="E-mail"
                    placeholder="email@gmail.com"
                    outlined
                    v-model="usuario.email"
                />
            </v-col>
            <v-col md="12" lg="12">
                <v-text-field
                    v-mask="'(##) #####-####'"
                    label="Telefone"
                    placeholder="(99) 99999-9999"
                    outlined
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
    methods: {
        doCadastro() {
            console.log('Cadastro!')
        }
    },
    data() {
        return {
            usuario: {
                telefone: '',
                email: '',
                nome: '',
                cpf: ''
            },
            formValido: false
        }
    }
}
</script>