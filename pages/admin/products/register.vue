<template>
  <v-container>
    <h1 style="text-align: center">Cadastro de produtos</h1>
    <hr>
    <v-form v-model="valid">
      <v-container>
        <v-row>
          <v-col>
            <v-text-field
              v-model="product.id"
              placeholder="codigo"
              label="codigo"
              disabled
              outlined
            />
          </v-col>
        </v-row>
        <v-row>
          <v-col>
            <v-text-field
              v-model="product.name"
              placeholder="Nome"
              label="Nome"
              :rules="rule"
              required
              outlined
            />
          </v-col>
          <v-col>
            <v-text-field
              v-model="product.price"
              placeholder="Preço"
              label="Preço"
              :rules="rule"
              required
              v-mask="['#.##','#####.##','####.##','###.##','##.##',]"
              outlined
            />
          </v-col>
        </v-row>
        <v-row>
          <v-col>
            <v-autocomplete
              outlined
              v-model="product.idCategory"
              label="categoria"
              color="red"
              :items="categories"
              item-text="name"
              item-value="id"
              clearable
              required
            >
            </v-autocomplete>
          </v-col>
        </v-row>
      </v-container>
      </v-form>
    <v-btn
      outlined
      @click="persistir"
      color="green"
    >
      cadastrar
    </v-btn>
    <v-btn
      outlined
      to="/admin/products"
      color="red"
    >
      cancelar
    </v-btn>
  </v-container>
</template>

<script>
export default {
  name: 'CadastroproductsPage',
  layou: 'admin',

  data () {
    return {
      valid: false,
      product: {  
        id: null,
        name:null,
        idCategory: null,
        price: null
      },
      rule: [
        v => !!v || 'Esse campo é obrigatório'
      ],
      categories: []
    }
  },
    
  async created () {
    if (this.$route?.params?.id) {
    this.getById(this.$route.params.id)
    }
    let categories = await this.$api.get('/category')
    this.categories = categories.data.data
    console.log(categories);
    console.log(this.categories);
  },

  methods: {
    async persistir () {
      try {
         let product = {
        name: this.product.name,
        idCategory: this.product.idCategory,
        price:this.product.price
        };

        if(!this.product.id){  
          console.log(product);
          let response = await this.$api.$post('/product', product);
          this.$router.push('/products')
          return this.$toast.success(`${response.data.name} cadastrado com sucesso`)
        }

        await this.$api.$post(`/product/${this.product.id}`, product )
        this.$router.push('/products')
        this.$toast.success('Cadastro atualizado com sucesso!');
      } catch (error) {
        this.$toast.error('Ocorreu um erro ao realizar o cadastro!');
        
      }
    },
    async getById (id) {
      let product = await this.$api.$get(`/product/${id}`);
      this.product = product.data
    },
  }
}
</script>