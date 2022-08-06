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
      >
        <template v-slot:activator>
          <v-list-item-title>{{user[0].title}}</v-list-item-title>
        </template>
        <v-list-item
          to="/public/user/data"
        >
          <strong>Meus Dados</strong>
        </v-list-item>
        <v-list-item
          to="/public/user/orders"
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
          title: 'Home',
          to:'/'
        },
      ],
      miniVariant: false,
      right: true,
      rightDrawer: false,
      title: 'ADMIN CRStore'
    }
  },
  async created () {
    await this.validateLoginAdmin();
  },

  methods: {
    logout(){
      try {
        localStorage.setItem('forget-key', "")
        return this.$router.push({ name: 'public-login' });
      } catch (error) {
        return this.$toast.info('Erro');
      }
    },
    async validateLoginAdmin (){
      let token = localStorage.getItem('forget-key')
      if(!token){
        this.items.unshift({
          icon: 'mdi-account',
          title: 'Login',
          to: '/public/login'
        })
        return this.$toast.info('Bem vindo anônimo');
      }
      let response = await this.$axios.post('http://localhost:3333/users/verify-token', {"authorization": `Bearer ${token}`})
      console.log(response);
      if (response.data.type == 'unauthorized') {
        this.$toast.info('Bem vindo a Lojinha!');
        this.help = true
        this.user.unshift({
          title: `Olá ${response.data.name}`,
        }
        )
        return this.$router.push({ name: 'index' });
      }else{
        this.$toast.success("Bem vindo chefinho!")
        this.help = true
        this.user.unshift({
          icon: 'mdi-account',
          title: `Olá ${response.data.name}`,
          to: '/public/user'
        })
        this.items.push({
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
        },
        {
          icon: 'mdi-notebook',
          title: 'Pedidos',
          to:'/admin/order'
        })
      }
    } 
  }
}
</script>
