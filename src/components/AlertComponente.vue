<template>
    <v-scale-transition>
        <v-alert 
        v-show="infoAlert.mostraAlert"
        :color="infoAlert.colorAlert"
        :icon="infoAlert.iconAlert"
        dark
        >
            <div class="text-h6 pb-2">
                {{infoAlert.tituloAlert}}
            </div>
            <v-divider></v-divider>
            <div class="pt-2">
                {{infoAlert.mensagemAlert}}
            </div>
        </v-alert>
    </v-scale-transition>
</template>
<script>
export default {
    computed: {
        infoAlert() {
            return this.$store.getters.getInfoAlert
        }
    }
}
</script>