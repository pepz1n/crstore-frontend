<template>
  <v-container>
    <h1>Meus endereços</h1>
    <hr>
    <v-row style="margin-top: 2%">
      <v-col
        cols="2"
      >
        <v-btn
          to="/public/user/adress/register"
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
        :items="adresses"
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
  name: 'ConsultaadressesPage',
  layout: 'default',

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
          text: 'CEP',
          align: 'center',
          sortable: true,
          value: 'zip_code',
        },
        {
          text: 'Cidade',
          align: 'center',
          sortable: true,
          value: 'city',
        },
        {
          text: 'Numero',
          align: 'center',
          sortable: true,
          value: 'number_forget',
        },
        // {
        //   text: 'Sinopse',
        //   align: 'center',
        //   sortable: true,
        //   value: 'sinopse',
        // },
        { text: "", value: "actions" }
      ],
      adresses: []
    }
  },

  
  methods: {
     async getCategory (){
      let adresses = await this.$api.$get(`/adress`)
      this.adresses = adresses.data
     },
     async deletar (categoriaDelete){
      try{
        if(confirm(`Deseja deletar a categoria : ${categoriaDelete.name} ?`)){
          let response = await this.$api.$post('/adress/destroy',{id: categoriaDelete.id} )
          this.$toast.success(response.message)
          this.getCategory();
        }
      }catch(error){
        this.$toast.error(error.message)
      }
     },
     async editar (adresses) {
      this.$router.push({
        name: 'public-user-adress-register',
        params: { id: adresses.id }
      });
    }
  },
  beforeMount(){
    this.getCategory()
  }
}

</script>
