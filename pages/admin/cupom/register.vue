<template>
  <v-container>
    <h1 style="text-align: center">Cadastro de categorias</h1>
    <hr>
    <v-form v-model="valid">
      <v-container>
        <v-row>
          <v-col>
            <v-text-field
              v-model="cupom.id"
              placeholder="ID"
              label="ID"
              disabled
              outlined
            />
          </v-col>
        </v-row>
        <v-row>
          <v-col>
            <v-text-field
              v-model="cupom.code"
              placeholder="Código"
              label="Código"
              :rules="rule"
              required
              color="red"
              outlined
            />
          </v-col>
          <v-col>
            <v-text-field
              v-model="cupom.uses"
              placeholder="Usos"
              label="Usos"
              :rules="rule"
              v-mask="['###']"
              required
              color="red"
              outlined
            />
          </v-col>
        </v-row>
        <v-row>
          <v-col>
            <v-autocomplete
              outlined
              v-model="cupom.type"
              label="Tipo"
              color="red"
              :rules="rule"
              required
              :items="types"
              item-text="name"
              item-value="value"
              clearable
            >  
            </v-autocomplete>
          </v-col>
          <v-col>
            <v-text-field
              v-model="cupom.value"
              placeholder="Valor"
              label="Valor"
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
      to="/admin/cupom"
      color="red"
    >
      cancelar
    </v-btn>
  </v-container>
</template>

<script>
export default {
  code: 'CadastrocategoriasPage',
  layout: 'admin',

  data () {
    return {
      valid: false,
      cupom: {  
        id: null,
        code:null,
        type: null,
        value: null,
        uses: null
      },
      rule: [
        v => !!v || 'Esse campo é obrigatório'
      ],
      types: [
        {"name": "Porcentagem", "value": "percent"},
        {"name": "Valor", "value": "money"}
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
         let cupom = {
        code: this.cupom.code,
        type: this.cupom.type,
        value: this.cupom.value,
        uses: this.cupom.uses
        };

        if(!this.cupom.id){  
          let response = await this.$api.$post('/cupom', cupom);
          this.$router.push('/admin/cupom')
          return this.$toast.success(`${response.data.code} cadastrado com sucesso`)
        }

        await this.$api.$post(`/cupom/${this.$route.params.id}`, cupom )
        this.$router.push('/admin/cupom')
        this.$toast.success('Cadastro atualizado com sucesso!');
      } catch (error) {
        this.$toast.error('Ocorreu um erro ao realizar o cadastro!');
        
      }
    },
    async getById (id) {
      let cupom = await this.$api.$get(`/cupom/${id}`);
      this.cupom = cupom.data
    },
  }
}
</script>