<template>
    <v-main  style="width: 100%;">
    <v-container style="width: 100%;background-image:url(https://png.pngtree.com/thumb_back/fw800/back_our/20190621/ourmid/pngtree-restaurant-food-menu-background-image_190820.jpg) ; background-position:40%; background-size: cover; backface-visibility: visible; ">
      <h1 style="text-align: center; font-size:80px; font-family: 'Dancing Script', cursive; color: white;">Bem Vindo à CRStore!</h1>
    </v-container>
      <v-container style="margin-top:10%">
        <v-row>
          <template v-for="(category, i) in categories" >
            <v-col
              class="mt-2"
              cols="12"
              :key="i"
              
            >
              <strong style="font-size:30px">{{category.name}} :</strong>
            </v-col>
            <v-slide-group
              show-arrows
              
            >
              <v-slide-item
                v-for="(product, j) in category.products"
                :key="`${i}${j}`"
                style="margin-left:1% ; background-color: ivory;"
                fixed
              >
              <v-hover v-slot="{ hover }">
                <v-card
                  outlined
                  max-width="500"
                  style="width: 400px"
                >
                  <v-img
                    height="200"
                    :src="product.image"
                  >
                    <v-expand-transition>
                      <div
                        v-if="hover"
                        class="d-flex transition-fast-in-fast-out red darken-2 v-card--reveal text-h2 white--text"
                        style="height: 100%;"
                      >
                        R$ {{product.price}}
                      </div>
                    </v-expand-transition>
                  </v-img>
                  <v-card-title align="center">{{ product.name }}</v-card-title>
                  <v-card-text
                    overflow-hidden
                  >
                    <v-row
                      align="center"
                      class="mx-0"
                    >
                      <v-rating
                        :value="5"
                        color="red"
                        dense
                        half-increments
                        readonly
                        size="14"
                      >
                      </v-rating>
                      <div class="grey--text ms-4">
                        5.0 (412)
                      </div>
                      <v-divider></v-divider>
                      <div>{{product.description}}</div>
                    </v-row>
                    <v-row style="margin-top:5%">
                      <v-btn
                        block
                        outlined
                        color="red"
                        @click="addCart(product)"
                      >
                      Adicionar Ao Carrinho
                      </v-btn>
                    </v-row>
                  </v-card-text>
                </v-card>
              </v-hover>
              </v-slide-item>
            </v-slide-group>
          </template>
        </v-row>
      </v-container>
    </v-main>
  </v-app>
</template>

<script>
import Swal from 'sweetalert2'


  export default {
    name: 'homePage',
    data() {
      return{
        model: null,
        categories:[],
        drawer: null 
      }
    },


    async created(){
      this.getAll()
    },
    methods:{
      async getAll () {
        let response = await this.$api.get('/category')
        response.data.data.forEach(element => {
          element.name = element.name.toUpperCase()
        });
        this.categories = response.data.data
      },
      async addCart (item) {
        console.log(item);

          let {value: quantidade} = await Swal.fire({
          title: `Deseja adicionar quantas quantidades de ${item.name} ao carrinho? `,
          input: 'number',
          confirmButtonColor: 'green',
          confirmButtonText: 'Adicionar',
          cancelButtonColor: 'red',
          cancelButtonText: 'Cancelar',
          showCancelButton:true,
          inputValidator: (value) => {
            if (!value){
              return 'Voce Precisa Informar a quantidade!'
            }
          }
        })
        quantidade = Number(quantidade)
        let response = quantidade ? await this.$api.post("/users/cart", {quantidade: quantidade, idProduct: item.id, description: item.description, idCategory: item.idCategory, image: item.image, name:item.name, price:item.price, }): this.$toast.info("Produto não adicionado")
        quantidade ? response.data.type == 'success'? this.$toast.success("Adicionado ao carrinho") :  this.$toast.error("Ocorreu um erro") : null
        console.log(response.data)
      }
    }
  }
</script>

<style>
@import url('https://fonts.googleapis.com/css2?family=Dancing+Script&display=swap');
.v-card--reveal {
  align-items: center;
  bottom: 0;
  justify-content: center;
  opacity: .90;
  position: absolute;
  width: 100%;
}
</style>