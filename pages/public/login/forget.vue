<template>
    <v-form>
      <v-container>
      <v-row v-if="!codigo">
        <v-col
            cols="5"
          >
            <h1 style="font-size: 50px;margin-top: 45%; margin-left: 20%;">
              <p style="font-family:'Gugi', cursive; font-size: 25px;">
                <v-icon style="color:red  ; font-size: 105%;">
                  mdi-hamburger
                </v-icon>
                CRStore
              </p>
              <strong>
                Recuperação de senha!
              </strong>
            </h1>
          </v-col>
          <v-col>
            <v-container style="border: 2px solid grey  ; background-color: ivory;border-radius: 1%;width: 70%; margin-top: 13%; margin-left: 7%;" >
            <v-container style="padding: 10%; background-color: ivory">
              <v-row>
                <v-col>
                <v-text-field
                  class=""
                  label="Digite seu email"
                  v-model="login.email"
                  outlined
                  required
                  placeholder="Digite seu email"
                  color="red"
                  prepend-inner-icon="mdi-email"
                ></v-text-field>
                </v-col>
              </v-row>
              <v-row>
                <v-col>
                  <v-btn
                    x-large
                    block
                    color="red"
                    outlined
                    @click="loginAmem"
                  >Enviar</v-btn>
                </v-col>
              </v-row>
              <v-row>
                <v-col>
                  <hr>
                </v-col>
                <v-col>
                  <hr>
                </v-col>
              </v-row>
            </v-container>
            </v-container>
          </v-col>
      </v-row>
      <v-row v-if="codigo == true">
        <v-col
            cols="5"
          >
            <h1 style="font-size: 50px;margin-top: 45%; margin-left: 20%;">
              <p style="font-family:'Gugi', cursive; font-size: 25px;">
                <v-icon style="color:red  ; font-size: 105%;">
                  mdi-hamburger
                </v-icon>
                CRStore
              </p>
              <strong>
                Codigo enviado!
              </strong>
            </h1>
          </v-col>
          <v-col>
            <v-container style="border: 2px solid grey  ; background-color: ivory;border-radius: 1%;width: 70%; margin-top: 13%; margin-left: 7%;" >
            <v-container style="padding: 10%; background-color: ivory">
              <v-row>
                <v-col>
                <v-text-field
                  class=""
                  label="Digito o código enviado"
                  v-model="login.codigo"
                  outlined
                  required
                  placeholder="Digito o código enviado"
                  color="red"
                  prepend-inner-icon="mdi-email"
                ></v-text-field>
                </v-col>
              </v-row>
              <v-row>
                <v-col>
                  <v-btn
                    x-large
                    block
                    color="red"
                    outlined
                    @click="tryCode"
                  >Enviar</v-btn>
                </v-col>
              </v-row>
              <v-row>
                <v-col>
                  <hr>
                </v-col>
                <v-col>
                  <hr>
                </v-col>
              </v-row>
            </v-container>
            </v-container>
          </v-col>
      </v-row>
       <v-row v-if="codigo1 == true">
        <v-col
            cols="5"
          >
            <h1 style="font-size: 50px;margin-top: 45%; margin-left: 20%;">
              <p style="font-family:'Gugi', cursive; font-size: 25px;">
                <v-icon style="color:red  ; font-size: 105%;">
                  mdi-hamburger
                </v-icon>
                CRStore
              </p>
              <strong>
                Codigo enviado!
              </strong>
            </h1>
          </v-col>
          <v-col>
            <v-container style="border: 2px solid grey  ; background-color: ivory;border-radius: 1%;width: 70%; margin-top: 13%; margin-left: 7%;" >
            <v-container style="padding: 10%; background-color: ivory">
              <v-row>
                <v-col>
                <v-text-field
                  class=""
                  label="Digite a nova senha"
                  v-model="login.senha"
                  outlined
                  required
                  placeholder="Digite a nova senha"
                  color="red"
                  prepend-inner-icon="mdi-email"
                ></v-text-field>
                </v-col>
              </v-row>
              <v-row>
                <v-col>
                  <v-btn
                    x-large
                    block
                    color="red"
                    outlined
                    @click="newPassword"
                  >Enviar</v-btn>
                </v-col>
              </v-row>
              <v-row>
                <v-col>
                  <hr>
                </v-col>
                <v-col>
                  <hr>
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
export default {
  name: 'LoginsPage',
  layout: 'login',
  data(){
    return{
      valid: false,
      show:false,
      codigo: false,
      codigo1: false,
      login:{
        email: null,
        codigo:null,
        senha: null
      },
      rule: [
        v => !!v || 'Esse campo é obrigatorio'
      ]
    }
  },
  methods:{
    async loginAmem(){
      let forget ={
          email: this.login.email
      }
      try {
        let response = await this.$api.post('/recuperation', forget)
        console.log(response.data.type);
        if(response.data.type == "success"){
          console.log("carcule");
          this.codigo = true
        }else{
          this.$toast.error(response.data.message)
        }
      } catch (error) {
        this.$toast.error('Ocorreu um erro ao realizar a recuperaçao!');
      }
    },
    toggleShow(){
      this.show = !this.show
    },

    async tryCode (){
      try {
        let response = {
        email: this.login.email,
        code: this.login.codigo
      }
      let response1 = await this.$api.post("/try-code", response)
        if (response1.data.type == 'success') {
          this.codigo = "forget"
          this.codigo1= true
        }else{
          this.$toast.error('Ocorreu um erro ao realizar a recuperaçao!');
        }
      } catch (error) {
        this.$toast.error('Ocorreu um erro ao realizar a recuperaçao!');
      }
    },
    async newPassword(){
      try {
        let response = {
          email: this.login.email,
          newPassword: this.login.senha
        }
        let response1 = await this.$api.post("/update-password", response)
        this.$toast.success("Senha atualizada")
        this.$router.push("/public/login")
      } catch (error) {
        this.$toast.error('Ocorreu um erro ao realizar a recuperaçao!');
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

