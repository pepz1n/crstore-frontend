<template>
  <v-container>
    <h1 style="text-align: center">Meus Dados</h1>
    <hr>
    <v-form v-model="valid">
      <v-container>
        <v-row>
          <v-col>
            <v-text-field
              v-model="user.id"
              placeholder="codigo"
              label="codigo"
              disabled
              outlined
            />
          </v-col>
          <v-col>
            <v-text-field
            v-model="user.name"
            placeholder="Nome"
            color="red"
            label="Nome"
            outlined
            />
          </v-col>
          <v-col>
            <v-text-field
            v-model="user.role"
            placeholder="Tipo"
            color="red"
            disabled
            label="Tipo"
            outlined
            />
          </v-col>
        </v-row>
        <v-row>
          <v-col>
            <v-text-field
              outlined
              v-model="user.cpf"
              label="CPF"
              color="red"
              style="margin-top: -2%"
              clearable
              v-mask="['###.###.###-##']"
            >
            </v-text-field>
          </v-col>
          <v-col>
            <v-text-field
            v-model="user.username"
            placeholder="Username"
            color="red"
            style="margin-top: -2%"
            label="Username"
            outlined
            />
          </v-col>
        </v-row>
        <v-row>
          <v-col>
            <v-text-field
            v-model="user.created_at"
            placeholder="Criado em:"
            color="red"
            style="margin-top: -2%"
            label="Criado em:"
            outlined
            disabled
            />
            </v-col>
            <v-col> 
            <v-text-field
            v-model="user.phone"
            placeholder="Telefone"
            color="red"
            style="margin-top: -2%"
            label="Telefone"
            outlined
            />
            </v-col>
        </v-row>
      </v-container>
      </v-form>
    <v-btn
      outlined
      @click="atualizar"
      color="green"
    >
      atualizar
    </v-btn>
  </v-container>
</template>

<script>
export default {
  name: 'userDataPage',
  layout: 'default',

  data () {
    return {
      valid: false,
      user: {  
        id: null,
        username:null,
        cpf:null,
        name: null,
        phone: null,
        role:null,
        created_at:null
      },
      rule: [
        v => !!v || 'Esse campo é obrigatório'
      ],
      
    }
  },
    
  async created () {
    await this.getById()
  },

  methods: {
    async atualizar () {
      try {
        let usernameForget = await this.$api.$post(`/users/${this.user.id}`, this.user)
        if (usernameForget.usernameForget) {
          localStorage.setItem('forget-key', "")
          return this.$router.push('/public/login')
        }
        this.$router.push('/public/user/data')
        this.$toast.success('Cadastro atualizado com sucesso!');
      } catch (error) {
        this.$toast.error(error.message);
      }
    },
    async getById () {
      let user = await this.$api.$get(`/users/by-token`);
      this.user = user.data
      this.created_at = (user.data.created_at)
      console.log(user.data);
    },
  }
}
</script>