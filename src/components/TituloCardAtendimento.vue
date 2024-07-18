<template>
    <v-card-title>
        <v-row>
            <v-col cols="6" offset="2">
                <h3>
                    Novo Atendimento
                </h3>
            </v-col>
            <v-col cols="1" offset="1">
                <h3 class="text-right">
                    <v-icon 
                        x-large 
                        title="Voltar" 
                        @click="$router.push({name: 'servicos'})">
                        mdi-close-circle-outline
                    </v-icon>
                </h3>
            </v-col>
        </v-row>
    </v-card-title>
</template>