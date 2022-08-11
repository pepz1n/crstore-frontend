<template >
  <v-row align="center" v-if="carrinho">
    <v-container>
      <h1 style="text-align: center; font-size:80px; font-family: 'Dancing Script', cursive; color: black;">Meu Carrinho</h1>
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
                <v-btn icon
                  @click="removeItem(n)"
                >
                  <v-icon>mdi-close</v-icon>
                </v-btn>
                 Remover produto
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
              >
              </v-text-field>
            </v-col>
            <v-col>
              <v-btn
                outlined
                color="red"
                rounded
                style="margin-top:8%;margin-left:-15%"
                @click="tryCupom"
              >
                Tentar
              </v-btn>
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
        </v-card-text>
      </v-card>
      <v-btn
        block
        outlined
        color="red"
        style="margin-top:5%"
        @click="finalizar(cart, cupom, discount, total, totalLiquido)"
      >
        Finalizar Compra
      </v-btn>
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
      use: false,
      discount: 0,
      window: 0,
      total: 0,
      totalLiquido:0,
      cart: []
    }
  },

  async created(){
    await this.getCart()
  },
  methods:{
    async getCart(){
      try {
        let response = await this.$api.get('/users/by-token')
        if(!response.data.data.cart){
          this.carrinho = false
          this.$toast.warning("Seu carrinho está Vazio!")
          return this.$router.push("/")
        }
        this.cart = response.data.data.cart
        let carrinho = response.data.data.cart
        let total = 0
        carrinho.forEach(item => {
          total += item.price*item.quantidade
        });
        this.total = total.toFixed(2)
        this.totalLiquido = this.total

        this.length = (response.data.data.cart).length
        console.log(this.cart);

      } catch (error) {
        this.$toast.error(error)
      }
    },

    async tryCupom(){
      try {
        if(this.use){
          return this.$toast.error("Já existe um cupom ativo!")
        }
        let cupom = this.cupom
        let response = await this.$api.post('/cupom/verify', {cupom: cupom})
        if(response.data.type == 'error'){
          return this.$toast.error(response.data.message)
        }else{
          if(response.data.message.type == "percent"){
            this.totalLiquido = Number(this.totalLiquido)
            this.total = Number(this.total)
            this.totalLiquido -= (this.total * (response.data.message.value/100))
            this.discount = (this.total * (response.data.message.value/100))
            this.use = true
            
          }else{
            this.totalLiquido -= response.data.message.value
            this.discount = response.data.message.value
            this.use = true
          }
        }
        this.discount = this.discount.toFixed(2)
        this.totalLiquido = this.totalLiquido.toFixed(2)
        this.total = this.total.toFixed(2)
        return this.$toast.success("Cupom aplicado ao carrinho!")
      } catch (error) {
        this.$toast.error("Ops!")
      }
    },
    async removeItem(item){
      try {
        console.log(item);
        let idItem = item.produto
        let {value: quantidade} = await Swal.fire({
        title: `Deseja Remover quantas unidades de ${item.name} ? `,
        input: 'number',
        confirmButtonColor: 'green',
        confirmButtonText: 'Adicionar',
        cancelButtonColor: 'red',
        cancelButtonText: 'Cancelar',
        showCancelButton:true,
        inputValidator: (value) => {
          if (value > Number(item.quantidade)){
            return 'Você só pode remover ' + item.quantidade + ' produtos'
          }
          if (!value){
            return 'Voce Precisa Informar a quantidade!'
          }
        }
        })
        if(!quantidade){
          return this.$toast.info("Item permanece igual")
        }
        await this.getCart()
        quantidade = Number(quantidade)
        await this.$api.post("/users/cart-remove", {produto:idItem, quantidade})  
        await this.getCart()
        this.discount = 0
        this.totalLiquido = this.total
        this.use = false
        await this.tryCupom()
        return this.$toast.success("Sucesso")
      } catch (error) {
        return this.$toast.error(error.message)
      }
    },
    async finalizar (cart, cupom, discount, total, totalLiquido) {
      // console.log(cart);
      this.$router.push({
        name: 'public-user-cart-order',
        params: { cart, cupom, discount,total, totalLiquido}
      });
    }
  }
}
</script>


<style>
@import url('https://fonts.googleapis.com/css2?family=Dancing+Script&display=swap');
</style>