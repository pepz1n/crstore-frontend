<template>
    <v-form v-model="valid">
      <v-container>
      <v-row>
        <v-col
            cols="5"
          >
            <h1 style="font-size: 40px;margin-top: 45%; margin-left: 20%;">
              <p style="font-family:'Gugi', cursive; font-size: 30px;">
                <v-icon style="color:red  ; font-size: 105%;">
                  mdi-hamburger
                </v-icon>
                Cadastro CRStore
              </p>
              <strong>
                Informe seus dados nos campos
              </strong>
            </h1>
          </v-col>
          <v-col
            cols="max"
          
          >
            <v-container style="border: 2px solid black  ;  background-color: ivory; border-radius: 1%;width:100%; margin-top: 13%; margin-left: 7%;" >
            <v-container style="padding: 7%; background-color: ivory; border-radius: 1%;">
              <v-row>
                <v-col>
                <v-text-field
                  v-model="user.username"
                  class=""
                  label="Nome de Usuário"
                  outlined
                  placeholder="Nome de Usuário"
                  color="red"
                  prepend-inner-icon="mdi-account"
                  required
                  :rules="rule"
                ></v-text-field>
                </v-col>
                <v-col>
                <v-text-field
                  class=""
                  v-model="user.password"
                  outlined
                  label="Senha"
                  placeholder="Senha"
                  color="red"
                  prepend-inner-icon="mdi-lock"
                  required
                  type="password"
                  :rules="rule"
                ></v-text-field>
                </v-col>
              </v-row>
              <v-row>
                <v-col>
                  <v-text-field
                  class=""
                  outlined
                  v-model="user.name"
                  label="Nome Completo"
                  style="margin-top: -8%"
                  placeholder="Nome Completo"
                  color="red"
                  prepend-inner-icon="mdi-email"
                  required
                  :rules="rule"
                ></v-text-field>
                </v-col>
              </v-row>
              <v-row style="margin-top: -4%">
                <v-col>
                  <v-text-field
                  class=""
                  v-model="user.cpf"
                  outlined
                  label="CPF"
                  style="margin-top: -8%"
                  placeholder="CPF"
                  color="red"
                  prepend-inner-icon="mdi-lock"
                  required
                  :rules="rule"
                ></v-text-field>
                </v-col>
                <v-col>
                  <v-text-field
                  class=""
                  outlined
                  v-model="user.phone"
                  label="Celular"
                  style="margin-top: -8%"
                  placeholder="Celular"
                  color="red"
                  prepend-inner-icon="mdi-cellphone"
                  required
                  :rules="rule"
                ></v-text-field>
                </v-col>
              </v-row>
              <v-row>
                <v-col>
                  <v-autocomplete
                    outlined
                    v-model="user.role"
                    label="Cargo"
                    color="red"
                    style="margin-top: -5%"
                    :items="roles"
                    item-text="name"
                    item-value="value"
                    clearable
                    required
                  :rules="rule"
                  >
                  </v-autocomplete>
                </v-col>
              </v-row>
              <v-row>
                <v-col>
                  <v-btn
                    x-large
                    block
                    color="red"
                    @click="register"
                  >Cadastrar</v-btn>
                </v-col>
              </v-row>
            </v-container>
            </v-container>
          </v-col>
      </v-row>
    </v-container>
    </v-form>
</template>

<script>
import { METHODS } from 'http'

export default {
  name: 'LoginsPage',

  data(){
    return{
      valid: false,
      user:{
        username: null,
        name: null,
        phone: null,
        password: null,
        role: null,
        cpf:null
      },
      rule:[
        v => !!v || 'Esse campo é obrigatorio'
      ],
      roles: [{"name": "Cliente", "value": "customer"}, {"name": "Entregador", "value": "deliver"}]
    }
  },
  
  methods: {
    async register (){
      try {
        if(!this.valid){
          return this.$toast.warning("Infome todas as opções!")
        }
        let user ={
          username: this.user.username,
          name: this.user.name,
          phone: this.user.phone,
          password: this.user.password,
          role: this.user.role,
          cpf: this.user.cpf

        }
        let response = await this.$axios.$post('http://localhost:3333/users', user)
        if(response.type == "sucess"){
          this.$router.push('/login')
          return this.$toast(response.message)
        }
        if(response.type == "error"){
          return this.$toast.error(response.message)
        }
      } catch (error) {
        this.$toast.error("Ocorreu um erro ao realizar o cadastro!")
      }
    }
  }
}
</script>

<style>
@import url('https://fonts.googleapis.com/css2?family=Gugi&display=swap');
  a {
    color: red;
    text-decoration: none;
  }
</style>