<template>
  <v-container>
    <h1 style="text-align: center">Cadastro de categorias</h1>
    <hr>
    <v-form v-model="valid">
      <v-container>
        <v-row>
          <v-col>
            <v-text-field
              v-model="categoria.id"
              placeholder="codigo"
              label="codigo"
              color="red"
              disabled
              outlined
            />
          </v-col>
        </v-row>
        <v-row>
          <v-col>
            <v-text-field
              v-model="categoria.name"
              placeholder="Nome"
              label="Nome"
              :rules="rule"
              required
              color="red"
              outlined
            />
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
      to="/admin/category"
      color="red"
    >
      cancelar
    </v-btn>
  </v-container>
</template>

<script>
export default {
  name: 'CadastrocategoriasPage',
  layout: 'admin',

  data () {
    return {
      valid: false,
      categoria: {  
        id: null,
        name:null
      },
      rule: [
        v => !!v || 'Esse campo é obrigatório'
      ]
    }
  },
    
  created () {
    if (this.$route?.params?.id) {
    this.getById(this.$route.params.id)
    }
  },

  methods: {
    async persistir () {
      try {
         let categoria = {
        name: this.categoria.name,
        };

        if(!this.categoria.id){  
          let response = await this.$api.$post('/category', categoria);
          this.$router.push('/admin/category')
          return this.$toast.success(`${response.data.name} cadastrado com sucesso`)
        }

        await this.$api.$post(`/category/${this.categoria.id}`, categoria )
        this.$router.push('/admin/category')
        this.$toast.success('Cadastro atualizado com sucesso!');
      } catch (error) {
        this.$toast.error('Ocorreu um erro ao realizar o cadastro!');
        
      }
    },
    async getById (id) {
      let categoria = await this.$api.$get(`/category/${id}`);
      this.categoria = categoria.data
    },
  }
}
</script>