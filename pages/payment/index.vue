<template>
  <v-container>
    <h1>Consulta de Metodos de pagamento</h1>
    <hr>
    <v-row style="margin-top: 2%">
      <v-col
        cols="2"
      >
        <v-btn
          to="/payment/register"
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
        :items="payment"
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
  name: 'ConsultapaymentPage',

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
          text: 'Titulo',
          align: 'center',
          sortable: true,
          value: 'name',
        },
        // {
        //   text: 'Sinopse',
        //   align: 'center',
        //   sortable: true,
        //   value: 'sinopse',
        // },
        { text: "", value: "actions" }
      ],
      payment: []
    }
  },

  
  methods: {
     async getCategory (){
      let payment = await this.$axios.$get(`http://localhost:3333/payment`)
      this.payment = payment.data
     },
     async deletar (categoriaDelete){
      try{
        if(confirm(`Deseja deletar a categoria : ${categoriaDelete.name} ?`)){
          let response = await this.$axios.$post('http://localhost:3333/payment/destroy',{id: categoriaDelete.id} )
          this.$toast.success(response.message)
          this.getCategory();
        }
      }catch(error){
        this.$toast.error(error.message)
      }
     },
     async editar (payment) {
      this.$router.push({
        name: 'payment-register',
        params: { id: payment.id }
      });
    }
  },
  beforeMount(){
    this.getCategory()
  }
}

</script>
