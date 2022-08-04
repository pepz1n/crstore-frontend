<template>
  <v-container>
    <h1>Consulta de Metodos de pagamento</h1>
    <hr>
    <v-row style="margin-top: 2%">
      <v-col
        cols="2"
      >
        <v-btn
          to="/products/register"
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
        :items="product"
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
  name: 'ConsultaproductPage',

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
          text: 'Nome',
          align: 'center',
          sortable: true,
          value: 'name',
        },
        {
          text: 'Preço',
          align: 'center',
          sortable: true,
          value: 'price',
        },
        {
          text: 'Categoria',
          align: 'center',
          sortable: true,
          value: 'idCategory',
        },
        // {
        //   text: 'Sinopse',
        //   align: 'center',
        //   sortable: true,
        //   value: 'sinopse',
        // },
        { text: "", value: "actions" }
      ],
      product: []
    }
  },

  
  methods: {
     async getProducts (){
      let product = await this.$api.$get(`/product`)
      this.product = product.data
     },
     async deletar (categoriaDelete){
      try{
        if(confirm(`Deseja deletar a categoria : ${categoriaDelete.name} ?`)){
          let response = await this.$api.$post('/product/destroy',{id: categoriaDelete.id} )
          this.$toast.success(response.message)
          this.getProducts();
        }
      }catch(error){
        this.$toast.error(error.message)
      }
     },
     async editar (product) {
      this.$router.push({
        name: 'products-register',
        params: { id: product.id }
      });
    }
  },
  beforeMount(){
    this.getProducts()
  }
}

</script>
