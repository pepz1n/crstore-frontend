<template>
  <v-app dark>
    <v-navigation-drawer
      v-model="drawer"
      :mini-variant="miniVariant"
      :clipped="clipped"
      fixed
      app
    >
      <v-list-group
        :value="true"
        prepend-icon="mdi-account-circle"
        v-if="help"
        style="color:red;"
      >
        <template v-slot:activator>
          <v-list-item-title>{{user[0].title}}</v-list-item-title>
        </template >
        <v-list-item
          to="/public/user/orders"
        >
          <strong>Meus Dados</strong>
        </v-list-item>
        <v-list-item
          to="/public/user/adress"
        >
          <strong>Meus Endereços</strong>
        </v-list-item>
        <v-list-item
          to="/public/user/data"
        >
          <strong>Meus Pedidos</strong>
        </v-list-item>
        <v-list-item
          @click="logout"
        >
          <strong>Logout</strong>
        </v-list-item>
      </v-list-group>
      <v-list>
        <v-list-item
          v-for="(item, i) in items"
          :key="i"
          :to="item.to"
          router
          exact
        >
          <v-list-item-action>
            <v-icon>{{ item.icon }}</v-icon>
          </v-list-item-action>
          <v-list-item-content>
            <v-list-item-title v-text="item.title" />
          </v-list-item-content>
        </v-list-item>
      </v-list>
    </v-navigation-drawer>
    <v-app-bar
      :clipped-left="clipped"
      fixed
      app
    >
      <v-app-bar-nav-icon @click.stop="drawer = !drawer" />
      <v-toolbar-title v-text="title" />
      <v-spacer />
    </v-app-bar>
    <v-main>
      <v-container>
        <Nuxt />
      </v-container>
    </v-main>
    <v-footer
      :absolute="!fixed"
      app
    >
      <span>&copy; {{ new Date().getFullYear() }}</span>
    </v-footer>
  </v-app>
</template>

<script>
export default {
  name: 'DefaultLayout',
  data () {
    return {
      clipped: false,
      drawer: false,
      fixed: false,
      help: false,
      user: [],
      items: [
        {
          icon: 'mdi-home',
          title:'home',
          to: '/'
        },
        {
          icon: 'mdi-credit-card',
          title: 'Pagamentos',
          to: '/admin/payment'
        },
        {
          icon: 'mdi-database',
          title: 'categorias',
          to: '/admin/category',
        },
        {
          icon: 'mdi-food',
          title: 'produtos',
          to:'/admin/products'
        },
        {
          icon: 'mdi-card',
          title: 'Cupons',
          to:'/admin/cupom'
        },
        {
          icon: 'mdi-notebook',
          title: 'Pedidos',
          to:'/admin/order'
        }
      ],
      miniVariant: false,
      right: true,
      rightDrawer: false,
      title: 'ADMIN CRStore'
    }
  },
 
  async created () {
    await this.validateLogin();
  },

  methods :{
    logout(){
      try {
        localStorage.setItem('forget-key', "")
        return this.$router.push({ name: 'public-login' });
      } catch (error) {
        return this.$toast.info('Erro');
      }
    },

    async validateLogin (){
      let token = localStorage.getItem('forget-key')
      if(!token.length){
        this.$toast.info('Você não tem permissão para acessar esse recurso');
        return this.$router.push({ name: 'public-login' });
      }
      let response = await this.$axios.post('http://localhost:3333/users/verify-token', {"authorization": `Bearer ${token}`})

      if (response.type == 'unauthorized') {
        this.$toast.info('Você não tem permissão para acessar esse recurso');
        return this.$router.push({ name: 'index' });
      }
      this.help = true
      this.user.unshift({
          icon: 'mdi-account',
          title: `Olá ${response.data.name}`,
          to: '/public/user'
        })
    } 
  }
}
</script>
