<template>
    <v-main  style="width: 100%;">
    <v-container>
      <h1 style="text-align: center; font-size:100px">Bem Vindo A LOJA</h1>
    </v-container>
      <v-container style="margin-top:10
      %">
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
              multiple
              show-arrows
              
            >
              <v-slide-item
                v-for="(product, j) in category.products"
                :key="`${i}${j}`"
                style="margin-left:1% ;"
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
                  <v-card-text>
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
      }
    }
  }
</script>

<style>
.v-card--reveal {
  align-items: center;
  bottom: 0;
  justify-content: center;
  opacity: .90;
  position: absolute;
  width: 100%;
}
</style>