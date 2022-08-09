<template>
  <v-container>
    <h1>Consulta de categorias</h1>
    <hr>
    <v-row style="margin-top: 2%">
      <v-col
        cols="2"
      >
        <v-btn
          to="/admin/category/register"
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
        :items="categorias"
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
  name: 'ConsultacategoriasPage',
  layout: 'admin',

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
      categorias: []
    }
  },

  
  methods: {
     async getCategory (){
      let categorias = await this.$api.$get(`/category/get-all-categories`)
      this.categorias = categorias.data
     },
     async deletar (categoriaDelete){
      try{
        if(confirm(`Deseja deletar a categoria : ${categoriaDelete.nome} ?`)){
          let response = await this.$api.$post('/category/destroy',{id: categoriaDelete.id} )
          this.$toast.success(response.message)
          this.getCategory();
        }
      }catch(error){
        this.$toast.error(error.message)
      }
     },
     async editar (category) {
      this.$router.push({
        name: 'admin-category-register',
        params: { id: category.id }
      });
    }
  },
  beforeMount(){
    this.getCategory()
  }
}

</script>
