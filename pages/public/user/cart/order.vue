<template >
  <v-row align="center" v-if="carrinho">
    <v-container>
      <h1 style="text-align: center; font-size:80px; font-family: 'Dancing Script', cursive; color: black;">Finalizar Pedido</h1>
    </v-container>
    <v-item-group
      v-model="window"
      class="shrink mr-6"
      mandatory
      tag="v-flex"
    >
      <v-item
        v-for="n in cart"
        :key="n"
        v-slot="{ active, toggle }"
      >
        <div>
          <v-btn
            :input-value="active"
            icon
            @click="toggle"
          >
            <v-icon>mdi-record</v-icon>
          </v-btn>
        </div>
      </v-item>
    </v-item-group>

    <v-col
    cols="8"
    v-if="carrinho"
    >
      <v-window
        v-model="window"
        class="elevation-1"
        vertical  
      >
        <v-window-item
          v-for="n in cart"
          :key="n"
        >
          <v-card flat>
            <v-card-text>
              <v-row
                class="mb-4"
                align="center"
              >
                <v-avatar
                  color="grey"
                  class="mr-4"
                >{{n.produto}}</v-avatar>
                <strong class="text-h5">{{ n.name }}</strong>
                <v-spacer></v-spacer>
              </v-row>
              <v-row>
                <v-col style="max-width: 300px; max-height: 200px; margin-bottom: 5%">
                  <v-img :src="n.image"></v-img>
                </v-col>
                <v-col>
                    <h2>Descrição do produto:</h2>
                    <br>
                    <p>{{n.description}}</p>
                </v-col>
                <v-col>
                  <h3>
                    Valor: {{n.price}}
                  </h3>
                  
                  <h3>
                    Quantidade: {{n.quantidade}}
                  </h3>
                  <h3>
                    Valor de {{n.quantidade}} produtos: {{(n.quantidade * n.price).toFixed(2)}}
                  </h3>
                </v-col>
              </v-row>
            </v-card-text>
          </v-card>
        </v-window-item>
      </v-window>
    </v-col>
    <v-col>
      <v-card>
        <v-card-title>
          Conta final
        </v-card-title>
        <v-card-text>
          <v-row>
            <v-col>
              <h3> <strong> Valor Bruto:  R$ {{total}} </strong> </h3>
            </v-col>
          </v-row>
          <v-row style="margin-top: 0%">
            <v-col
              cols="7"
            >
              <v-text-field
                placeholder="Cupom"
                v-model="cupom"
                outlined
                color="red"
                append-icon="mdi-barcode"
                height="10"
                rounded
                disabled 
              >
              </v-text-field>
            </v-col>
          </v-row>
          <v-row style="margin-top: -15% "> 
            <v-col>
              <h3><strong>Total Desconto: R$ {{discount}}</strong></h3>
            </v-col>
          </v-row>
          <v-row style="margin-top: -5% ">
            <v-col>
              <h3> <strong> Valor Final:  R$ {{totalLiquido}} </strong> </h3>
            </v-col>
          </v-row>
          <v-row>
            <v-col>
              <v-autocomplete
                :items="address"
                v-model="idAddress"
                :item-text="item => `${item.street} , ${item.number_forget} , ${item.city}`"
                :item-value="item => item.id"
                outlined
                placeholder="Endereço de entrega"
              >

              </v-autocomplete>
            </v-col>
          </v-row>
          <v-row style="margin-top: -10%">
            <v-col>
              <v-autocomplete
                :items="payment"
                v-model="idPayment"
                item-text="name"
                :item-value="item => item.id"
                outlined
                placeholder="Forma de Pagamento"
              >

              </v-autocomplete>
            </v-col>
          </v-row>
          <v-row style="margin-top: -10%">
            <v-col>
              <v-btn
                block
                color="red"
                outlined
                @click="confirmar"
              >
                Finalizar Compra
              </v-btn>
            </v-col>
          </v-row>
        </v-card-text>
      </v-card>
    </v-col>
  </v-row>
</template>


<script>
import Swal from 'sweetalert2'
export default {
  name: 'CartPage',
  layout: 'default',
  data(){
    return{
      carrinho: true,
      length: 0,
      cupom: null,
      idAddress: null, 
      discount: 0,
      window: 0,
      total: 0,
      idPayment: null,
      totalLiquido:0,
      cart: [],
      address: [],
      payment: []
    }
  },

  async created(){
    if (this.$route?.params?.cart) {
    this.cart = this.$route.params.cart
    this.cupom = this.$route.params.cupom || null
    this.discount = this.$route.params.discount
    this.total = this.$route.params.total
    this.totalLiquido = this.$route.params.totalLiquido
    }else{
      this.$toast.error("Você não pode estar aqui")
      return this.$route.push("/")
    }
    let response = await this.$api.get("/adress")
    this.address = response.data.data
    this.address.unshift({id: 100 , street: "Retirar No local", number_forget:"",city:""})
    response = await this.$api.get("/payment")
    this.payment = response.data.data
  },
  methods:{
    async confirmar(){
      try {
        if(!this.idAddress){
          return this.$toast.error("Informe o endereço!")
        }
        let endereco = null
        if(this.idAddress != 100){
          endereco = this.idAddress
        }

        let cadastro = {
          products: [],
          idPayment: this.idPayment,
          idAdress: endereco,
          idCupom: this.cupom
        }
        this.cart.forEach(item => {
          cadastro.products.push({"produto": item.produto, "quantidade": item.quantidade})
        });
        console.log(cadastro);
        await this.$api.post("/order", cadastro)
        await this.$api.get('/reset-carrinho')
        this.$toast.success("Ordem cadastrada")
        this.$router.push({
        name: 'index'
      });
      } catch (error) {
        this.$toast.error("F!")
      }
    }
   
  }
}
</script>


<style>
@import url('https://fonts.googleapis.com/css2?family=Dancing+Script&display=swap');
</style>