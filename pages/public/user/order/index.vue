<template>
  <v-container>
    <h1>Consulta de Pedidos</h1>
    <hr>
    <v-row style="margin-top: 2%">
      <v-col
        cols="2"
      >
      </v-col>
    </v-row>
    <v-container>
      <v-row>
      <v-col
      cols="max"
      >
      <v-data-table
        :headers="headers"
        :items="order"
        :items-per-page="10"
        class="elevation-1"
      >
      <template v-slot:item.status="{ item }">
          <p 
            :style="item.status === 'criado' ? 'color: blue' : 'cancelado' ? 'color: red' : 'A caminho' ? 'color: yellow' : 'color: green' "
          > {{ item.status }} </p>
        </template>
        <template v-slot:item.actions="{ item }">
          <v-icon
            small
            class="mr-2"
            @click="editar(item)"
          >
            mdi-magnify
          </v-icon>
          <v-icon
            small
            @click="deletar(item)"
          >
            mdi-cancel
          </v-icon>
        </template>
      </v-data-table>
      </v-col>
    </v-row>
    </v-container>
  </v-container>
</template>

<script>
export default {
  name: 'ConsultaOrderPage',
  layout: 'default',

  data () {
    return{
      headers: [
        {
          text: 'Código',
          align: 'center',
          sortable: true,
          value: 'id',
        },
        {
          text: 'Cliente',
          align: 'center',
          sortable: true,
          value: 'idUserCostumer.name',
        },
        {
          text: 'Entregador',
          align: 'center',
          sortable: true,
          value: 'idUserDeliver.name',
        },
        {
          text: 'Valor',
          align: 'center',
          sortable: true,
          value: 'total',
        },
        {
          text: 'Status',
          align: 'center',
          sortable: true,
          value: 'status',
        },
        // {
        //   text: 'Sinopse',
        //   align: 'center',
        //   sortable: true,
        //   value: 'sinopse',
        // },
        { text: "", value: "actions" }
      ],
      order: []
    }
  },

  
  methods: {
     async getOrder (){
      let order = await this.$api.$get(`/order/get-all-orders-by-token`)
      this.order = order.data
     },
     async deletar (orderDelete){
      try{
        if(confirm(`Deseja cancelar a order : ${orderDelete.id} ?`)){
          let response = await this.$api.$post('/order/cancel-customer',{id: orderDelete.id} )
          this.$toast.success(response.message)
          this.getorder();
        }
      }catch(error){
        this.$toast.error(error.message)
      }
     },
     async editar (order) {
      this.$router.push({
        name: 'public-user-order-view',
        params: { id: order.id }
      });
    }
  },
  beforeMount(){
    this.getOrder()
  }
}

</script>
