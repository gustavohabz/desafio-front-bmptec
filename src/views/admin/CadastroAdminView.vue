<template>
    <v-card class="px-12 py-12" elevation="6">
        <v-row>
            <v-col cols="10" offset="1">
                <AlertComponente />
            </v-col>
        </v-row>
        <v-row>
            <v-col cols="6" offset="3">
                <FormCadastro />
            </v-col>
        </v-row>
    </v-card>
</template>
<script>
import FormCadastro from '../../components/FormCadastro.vue'
import AlertComponente from '../../components/AlertComponente.vue'
export default {
    components: {
        FormCadastro,
        AlertComponente
    }
}
</script>