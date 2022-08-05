<template>
  <v-container>
    <h1 style="text-align: center">Visualização do emprestimo</h1>
    <hr>
    <v-form v-model="valid">
      <v-container>
        <v-row>
          <v-col>
            <v-text-field
              v-model="order.id"
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
              v-model="order.status"
              placeholder="Status"
              label="Status"
              :rules="rule"
              required
              disabled
              color="red"
              outlined
            />
          </v-col>
          <v-col>
            <v-text-field
              v-model="order.idUserCostumer"
              placeholder="Comprador"
              label="Comprador"
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
              v-model="order.idUserDeliver"
              placeholder="Entregador"
              label="Entregador"
              :rules="rule"
              required
              disabled
              color="red"
              outlined
            />
          </v-col>
          <v-col>
            <v-text-field
              v-model="order.total"
              placeholder="Valor"
              label="Valor"
              :rules="rule"
              disabled
              v-mask="['#.00','##.00','###.00' ]"
              required
              color="red"
              outlined
            />
          </v-col>
        </v-row>
          <v-row >
          <v-col>
            <v-text-field
              v-model="order.idCupom"
              placeholder="Cupom"
              label="Cupom"
              :rules="rule"
              required
              disabled
              color="red"
              outlined
            />
          </v-col>
          <v-col>
            <v-text-field
              v-model="order.totalDiscount"
              placeholder="Valor de desconto"
              label="Valor de desconto"
              :rules="rule"
              disabled
              v-mask="['#.00','##.00','###.00' ]"
              required
              color="red"
              outlined
            />
          </v-col>
        </v-row>
        <v-row>
          <v-col 
            cols="max"
          >
           <v-data-table
            :headers="headers"
            :items="order.product"
            :items-per-page="10"
            class="elevation-1"
          ></v-data-table>
          </v-col>
        </v-row>
      </v-container>
      </v-form>
    <v-btn
      outlined
      to="/admin/order"
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
      order: {  
        id: null,
        status:null,
        totalDiscount: null,
        total: null,
        idUserCostumer: null,
        idUserDeliver:null,
        idCupom:null,
        totalDiscount:null,
        product: []

      },
      rule: [
        v => !!v || 'Esse campo é obrigatório'
      ],
      headers:[
        {
          text: 'Código',
          align: 'center',
          sortable: false,
          value: 'id',
        },
        {
          text: 'Produto',
          align: 'center',
          sortable: false,
          value: 'name'
        },
        {
          text: 'Quantidade',
          align: 'center',
          sortable: false,
          value: 'orders_products.quantity'
        },
        {
          text: 'Valor Unitario',
          align: 'center',
          sortable: false,
          value: 'orders_products.price_products'
        }
      ]
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
      this.order = order.data
      console.log(order.data.total);
      this.order.idUserCostumer = order.data.idUserCostumer.name
      this.order.idUserDeliver = order.data.idUserCostumer.name? order.data.idUserCostumer.name : "Sem entregador"
      console.log(order.data.product);
    },
  }
}
</script>