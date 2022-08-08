<template>
  <v-container>
    <h1 style="text-align: center">Visualização do pedido</h1>
    <hr>
    <v-form v-model="valid">
      <v-container>
        <v-row>
          <v-col>
            <v-text-field
              v-model="order.zip_code"
              placeholder="CEP"
              label="CEP"
              :rules="rule"
              required
              disabled
              color="red"
              outlined
            />
          </v-col>
          <v-col>
            <v-text-field
              v-model="order.state"
              placeholder="Estado"
              label="Estado"
              :rules="rule"
              required
              disabled
              color="red"
              outlined
            />
          </v-col>
        </v-row>
        <v-row>
          <v-col>
            <v-text-field
              v-model="order.city"
              placeholder="cidade"
              label="cidade"
              :rules="rule"
              required
              disabled
              color="red"
              outlined
            />
          </v-col>
          <v-col>
            <v-text-field
              v-model="order.street"
              placeholder="Rua"
              label="Rua"
              :rules="rule"
              disabled
              required
              color="red"
              outlined
            />
          </v-col>
        </v-row>
          <v-row >
          <v-col>
            <v-text-field
              v-model="order.district"
              placeholder="Bairro"
              label="Bairro"
              :rules="rule"
              required
              disabled
              color="red"
              outlined
            />
          </v-col>
          <v-col>
            <v-text-field
              v-model="order.number_forget"
              placeholder="Numero"
              label="Numero"
              :rules="rule"
              disabled
              required
              color="red"
              outlined
            />
          </v-col>
        </v-row>
      </v-container>
      </v-form>
    <v-row 
      v-if= "entrega == false"
    >
      <v-btn
        outlined
        to="/public/user/deliver/deliver"
        color="red"
      >
        cancelar
      </v-btn>
      <v-btn
        color="blue"
        @click="pickOrder"
        outlined
        style="margin-left: 1%"
      >
        Aceitar pedido
      </v-btn>
    </v-row>
    <v-row v-if="entrega == true">
      <v-btn
        outlined
        to="/public/user/deliver/catched"
        color="blue"
      >
        voltar
      </v-btn>
      <v-btn
        color="red"
        @click="cancelOrder"
        outlined
        style="margin-left: 1%"
      >
        Cancelar corrida  
      </v-btn>
      <v-btn
        color="green"
        @click="confirm"
        outlined
        style="margin-left: 1%"
      >
        Confirmar entrega
      </v-btn>
    </v-row>
    <v-row v-if="entrega == 'entregue'">
      <v-btn
        outlined
        to="/public/user/deliver/delivered"
        color="green"
      >
        voltar
      </v-btn>
    </v-row>
  </v-container>
</template>

<script>


export default {
  name: 'CadastrocategoriasPage',
  layout: 'default',

  data () {
    return {
      valid: false,
      entrega:false,
      order: {  
        id: null,
        zip_code:null,
        state: null,
        city: null,
        street: null,
        district:null,
        number_forget:null
      },
      rule: [
        v => !!v || 'Esse campo é obrigatório'
      ],
    }
  },
    
  created () {
    if (this.$route?.params?.id) {
    this.getById(this.$route.params.id)
    }
  },

  methods: {
    async getById (id) {
      let order = await this.$api.$get(`/order/${id}`);
      console.log(order.data.status);
      if( order.data.status == "A caminho" ){
        this.entrega = true
      }
      if(order.data.status == "entregue"){
        this.entrega = "entregue"
      }
      this.order = order.data.idAdress
      this.order.id = order.data.id
      },
    async pickOrder (){
      try {
        await this.$api.post("/order/get-corrida", {orderId: this.order.id})
        this.$toast.success("Pedido pego!")
        return this.$router.push("/public/user/deliver/catched")
      } catch (error) {
        return this.$toast.error(error.message)
      }
    },
    async cancelOrder (){
      try {
        if(confirm(`Você deseja cancelar a entrega do pedido ${this.order.id} ?`)){
          await this.$api.post(`/order/cancel-corrida`,{orderId: this.order.id})
          this.$toast.success("Você cancelou a corrida")
          return this.$router.push("/public/user/deliver/catched")
        }
      } catch (error) {
        return this.$toast.error(error.message)
      }
    },
    async confirm (){
      try {
        if(confirm(`Você deseja confirmar a entrega do pedido ${this.order.id} ?`)){
          await this.$api.post(`/order/confirm`,{orderId: this.order.id})
          this.$toast.success("Você terminou a corrida")
          return this.$router.push("/public/user/deliver/catched")
        }
      } catch (error) {
        return this.$toast.error(error.message)
      }
    }
  }
}
</script>