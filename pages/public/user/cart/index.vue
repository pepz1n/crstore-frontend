<template>

  <v-row align="center">
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
                <vcol-col style="max-width: 300px; max-height: 200px; margin-bottom: 5%">
                  <v-img :src="n.image"></v-img>
                </vcol-col>
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
          Valor total
        </v-card-title>
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
      length: 0,
      window: 0,
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
        this.cart = response.data.data.cart
        this.length = (response.data.data.cart).length
        console.log(this.cart);

      } catch (error) {
        this.$toast.error(error)
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
        quantidade = Number(quantidade)
        let response = await this.$api.post("/users/cart-remove", {produto:idItem, quantidade})  
        this.$toast.success(response.message)
      
      } catch (error) {
        this.$toast.error(error)
      }
    }
  }
}
</script>


<style>
@import url('https://fonts.googleapis.com/css2?family=Dancing+Script&display=swap');
</style>