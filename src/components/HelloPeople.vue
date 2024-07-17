<template>
  <v-container class="text-center my-4">
    <v-row class="justify-center pa-9">
      <v-img alt="Fulltech Logo" class="shrink mr-2" contain src="../assets/logo.png" max-height="50" max-width="50" />
      <h1>Desafio Front-End</h1>
    </v-row>
    <v-row class="justify-center">
      <v-col sm="8">
        <h3>
          Siga as orientações passadas para a resolução do Desafio.
        </h3>
        Ao final suba o desafio no repositório de sua preferência e nos encaminhe o
        <b>link do repositório</b>.
      </v-col>
    </v-row>
    <v-row class="justify-center">
      <v-col>
        <h3>Para rodar a api, abra um terminal pararelo e execute:</h3> <br>
        <code>npm run api</code>
      </v-col>
    </v-row>
    <v-row class="justify-center">
      <v-col>
        <h3>Para acessar executar requisições utilize a propriedade $api</h3>
        Exemplo para pegar todos os serviços. <br>
        <code>
         this.$api.Servico.GetAll()
        </code>
      </v-col>
    </v-row>
    <v-row>
      <v-col>
        Para ver todos os metodos disponiveis entre na pasta: <b>src/plugins/_api</b>
      </v-col>
    </v-row>

    <v-row class="justify-center">
      <v-card elevation="2"  outlined min-width="500" max-width="700">
          <v-card-title>
            <v-btn color="success" @click="getServicos">RUN</v-btn> <v-spacer></v-spacer>
            <v-btn color="secondary" @click="clear">Clear</v-btn>
          </v-card-title>
          <pre>{{ servicos }}</pre>
        </v-card>
    </v-row>
    <v-row class="justify-center">
      <v-img alt="Boa sorte" class="shrink mr-2" contain src="../assets/boa-sorte.png" max-width="700" />
    </v-row>
  </v-container>
</template>

<script>
export default {
  data() {
    return {
      servicos: [],
    }
  },
  methods: {
    getServicos() {
      this.$api.Servico.GetAll().then((result) => {
        this.servicos = result
      })
    },
    clear() {
      this.servicos = []
    }
  },
}
</script>
