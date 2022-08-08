<template>
  <v-container>
    <h1 style="text-align: center">Cadastro de endereços</h1>
    <hr>
    <v-form v-model="valid">
      <v-container>
        <v-row>
          <v-col>
            <v-text-field
              v-model="adress.id"
              placeholder="codigo"
              label="codigo"
              disabled
              outlined
            />
          </v-col>
          <v-col>
            <v-text-field
            v-model="adress.zip_code"
            placeholder="CEP"
            color="red"
            label="CEP"
            v-mask="['#####-###']"
            outlined
            />
          </v-col>
          <v-col>
            <v-text-field
            v-model="adress.number_forget"
            placeholder="Numero"
            color="red"
            label="Numero"
            outlined
            />
          </v-col>
        </v-row>
        <v-row>
          <v-col>
            <v-autocomplete
              outlined
              v-model="adress.state"
              label="Estado"
              color="red"
              style="margin-top: -2%"
              :items="states"
              item-text="nome"
              item-value="nome"
              clearable
              required
            >
            </v-autocomplete>
          </v-col>
          <v-col>
            <v-text-field
            v-model="adress.city"
            placeholder="Cidade"
            color="red"
            style="margin-top: -2%"
            label="Cidade"
            outlined
            />
          </v-col>
        </v-row>
        <v-row>
          <v-col>
            <v-text-field
            v-model="adress.street"
            placeholder="Logradouro"
            color="red"
            style="margin-top: -2%"
            label="Logradouro"
            outlined
            />
            </v-col>
            <v-col>
            <v-text-field
            v-model="adress.district"
            placeholder="Bairo"
            color="red"
            style="margin-top: -2%"
            label="Bairo"
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
      to="/public/user/adress"
      color="red"
    >
      cancelar
    </v-btn>
  </v-container>
</template>

<script>
export default {
  name: 'adress',
  layout: 'default',

  data () {
    return {
      valid: false,
      adress: {  
        id: null,
        city:null,
        state:null,
        zip_code: null,
        district: null,
        number_forget:null,
        street:null
      },
      rule: [
        v => !!v || 'Esse campo é obrigatório'
      ],
      states: [{"nome": "Acre"},
        {"nome": "Alagoas"},
        {"nome": "Amapá"},
        {"nome": "Amazonas"},
        {"nome": "Bahia"},
        {"nome": "Ceará"},
        {"nome": "Distrito Federal"},
        {"nome": "Espírito Santo"},
        {"nome": "Goiás"},
        {"nome": "Maranhão"},
        {"nome": "Mato Grosso"},
        {"nome": "Mato Grosso do Sul"},
        {"nome": "Minas Gerais"},
        {"nome": "Pará"},
        {"nome": "Paraíba"},
        {"nome": "Paraná"},
        {"nome": "Pernambuco"},
        {"nome": "Piauí"},
        {"nome": "Rio de Janeiro"},
        {"nome": "Rio Grande do Norte"},
        {"nome": "Rio Grande do Sul"},
        {"nome": "Rondônia"},
        {"nome": "Roraima"},
        {"nome": "Santa Catarina"},
        {"nome": "São Paulo"},
        {"nome": "Sergipe"},
        {"nome": "Tocantins"}]
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
         let adress = {
          city: this.adress.city,
          state: this.adress.state,
          zip_code: this.adress.CEP,
          district: this.adress.district,
          number:this.adress.number,
          street: this.adress.street
        };

        if(!this.adress.id){  
          await this.$api.$post('/adress', adress);
          this.$router.push('/public/user/adress')
          return this.$toast.success(`Endereço cadastrado com sucesso!`)
        }

        await this.$api.$post(`/adress/${this.adress.id}`, adress )
        this.$router.push('/public/user/adress')
        this.$toast.success('Cadastro atualizado com sucesso!');
      } catch (error) {
        this.$toast.error('Ocorreu um erro ao realizar o cadastro!');
        
      }
    },
    async getById (id) {
      let adress = await this.$api.$get(`/adress/${id}`);
      this.adress = adress.data
    },
  }
}
</script>