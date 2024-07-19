<template>
    <v-card class="px-12 py-12" height="85%" elevation="6">
        <v-row>
            <v-col cols="10" offset="1">
                <AlertComponente />
            </v-col>
        </v-row>
        <v-row>
            <v-col cols="8" offset="2">
                <v-card>
                    <FormCadastro />
                </v-card>
            </v-col>
        </v-row>
    </v-card>
</template>
<script>
import FormCadastro from './../../components/FormCadastro.vue'
import AlertComponente from './../../components/AlertComponente.vue'
export default {
    components: {
        FormCadastro,
        AlertComponente
    }
}
</script>