<template>
  <v-container>
    <h1 style="text-align: center">Cadastro de metodos de pagamento</h1>
    <hr>
    <v-form v-model="valid">
      <v-container>
        <v-row>
          <v-col>
            <v-text-field
              v-model="payment.id"
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
              v-model="payment.name"
              placeholder="Nome"
              label="Nome"
              :rules="rule"
              required
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
      to="/admin/payment"
      color="red"
    >
      cancelar
    </v-btn>
  </v-container>
</template>

<script>
export default {
  name: 'CadastroPaymentsPage',
  layout: 'admin',

  data () {
    return {
      valid: false,
      payment: {  
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
         let payment = {
        name: this.payment.name,
        };

        if(!this.payment.id){  
          let response = await this.$api.$post('/payment', payment);
          this.$router.push('/admin/payment')
          return this.$toast.success(`${response.data.name} cadastrado com sucesso`)
        }

        await this.$api.$post(`/payment/${this.payment.id}`, payment )
        this.$router.push('/payment')
        this.$toast.success('Cadastro atualizado com sucesso!');
      } catch (error) {
        this.$toast.error('Ocorreu um erro ao realizar o cadastro!');
        
      }
    },
    async getById (id) {
      let payment = await this.$api.$get(`/payment/${id}`);
      this.payment = payment.data
    },
  }
}
</script>