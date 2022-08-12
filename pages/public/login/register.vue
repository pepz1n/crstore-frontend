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
                  :rules="[rule.password]"
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
                  :append-icon="show ? 'mdi-eye-off' : 'mdi-eye'"
                  required
                  @click:append="toggleShow"
                  :type="show ? 'text' : 'password'"
                  :rules="[rule.password]"
                ></v-text-field>
                </v-col>
              </v-row>
              <v-row style="margin-top: -4%">
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
                  :rules="[rule.password]"
                ></v-text-field>
                </v-col>
                <v-col>
                  <v-text-field
                  class=""
                  v-model="user.password2"
                  outlined
                  style="margin-top: -8%"
                  label="Confirme sua senha"
                  placeholder="Confirme sua senha"
                  color="red"
                  prepend-inner-icon="mdi-lock"
                  :append-icon="show2 ? 'mdi-eye-off' : 'mdi-eye'"
                  required
                  @click:append="toggleShow2"
                  :type="show2 ? 'text' : 'password'"
                  :rules="[rule.password, rule.equalPassword]"
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
                  :rules="[rule.password]"
                  v-mask="['###.###.###-##']"
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
                  v-mask="['(##) # ####-####', '(##) ####-####']"
                  prepend-inner-icon="mdi-cellphone"
                  required
                  :rules="[rule.password]"
                ></v-text-field>
                </v-col>
              </v-row>
              <v-row style="margin-top: -8%">
                <v-col>
                  <v-autocomplete
                    outlined
                    v-model="user.role"
                    label="Cargo"
                    color="red"
                    :items="roles"
                    item-text="name"
                    item-value="value"
                    clearable
                    required
                    :rules="[rule.password]"
                  >
                  </v-autocomplete>
                </v-col>
                <v-col>
                  <v-text-field
                  class=""
                  outlined
                  type="email"
                  v-model="user.email"
                  label="Email"
                  placeholder="Email"
                  color="red"
                  prepend-inner-icon="mdi-mail"
                  required
                  :rules="[rule.password]"
                ></v-text-field>
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
  layout: 'login',

  data(){
    return{
      valid: false,
      show: false,
      show2:false,
      user:{
        username: null,
        name: null,
        phone: null,
        password: null,
        role: null,
        cpf:null,
        password2:null
      },
      rule:{
        password: v => !!v || 'Esse campo é obrigatorio',
        equalPassword: v => v === this.user.password || 'Senha diferente!'
      },
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
          cpf: this.user.cpf,
          email: this.user.email

        }
        let response = await this.$axios.$post('http://localhost:3333/users', user)
        if(response.type === "sucess"){
          this.$toast.success(response.message)
          return this.$router.push({ name: 'public-login' });
        }
        return this.$toast.error(response.message) 
      } catch (error) {
        this.$toast.error(error.message)
      }
    },
    toggleShow(){
      this.show = !this.show
    },
    toggleShow2(){
      this.show2 = !this.show2
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