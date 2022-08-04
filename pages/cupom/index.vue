<template>
  <v-container>
    <h1>Consulta de Metodos de pagamento</h1>
    <hr>
    <v-row style="margin-top: 2%">
      <v-col
        cols="2"
      >
        <v-btn
          to="/cupom/register"
          color="red"
        >
         <v-icon>
          mdi-plus
         </v-icon> 
         cadastro
        </v-btn>
      </v-col>
    </v-row>
    <v-container>
      <v-row>
      <v-col
      cols="max"
      >
      <v-data-table
        :headers="headers"
        :items="cupom"
        :items-per-page="10"
        class="elevation-1"
      >
        <template v-slot:item.actions="{ item }">
          <v-icon
            small
            class="mr-2"
            @click="editar(item)"
          >
            mdi-pencil
          </v-icon>
          <v-icon
            small
            @click="deletar(item)"
          >
            mdi-delete
          </v-icon>
        </template>
      </v-data-table>
      </v-col>
    </v-row>
    </v-container>
  </v-container>
</template>

<script>
export default {
  name: 'ConsultacupomPage',

  data () {
    return{
      headers: [
        {
          text: 'Código',
          align: 'center',
          sortable: true,
          value: 'id',
        },
        {
          text: 'CODE',
          align: 'center',
          sortable: true,
          value: 'code',
        },
        {
          text: 'Tipo',
          align: 'center',
          sortable: true,
          value: 'type',
        },
        {
          text: 'Valor',
          align: 'center',
          sortable: true,
          value: 'value',
        },
        {
          text: 'Usos',
          align: 'center',
          sortable: true,
          value: 'uses',
        },
        // {
        //   text: 'Sinopse',
        //   align: 'center',
        //   sortable: true,
        //   value: 'sinopse',
        // },
        { text: "", value: "actions" }
      ],
      cupom: []
    }
  },

  
  methods: {
     async getCupom (){
      let cupom = await this.$api.$get(`/cupom`)
      this.cupom = cupom.data
     },
     async deletar (cupomDelete){
      try{
        if(confirm(`Deseja deletar O cupom : ${cupomDelete.name} ?`)){
          let response = await this.$api.$post('/cupom/destroy',{id: cupomDelete.id} )
          this.$toast.success(response.message)
          this.getCupom();
        }
      }catch(error){
        this.$toast.error(error.message)
      }
     },
     async editar (cupom) {
      this.$router.push({
        name: 'cupom-register',
        params: { id: cupom.id }
      });
    }
  },
  beforeMount(){
    this.getCupom()
  }
}

</script>
