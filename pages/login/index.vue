<template>
    <v-form>
      <v-container>
      <v-row>
        <v-col
            cols="5"
          >
            <h1 style="font-size: 50px;margin-top: 45%; margin-left: 20%;">
              <p style="font-family:'Gugi', cursive; font-size: 25px;">
                <v-icon style="color:rgb(25, 191, 25)  ; font-size: 105%;">
                  mdi-hamburger
                </v-icon>
                Vem me comer, delicia!
              </p>
              <strong>
                Seja bem vindo à CRStore
              </strong>
            </h1>
          </v-col>
          <v-col>
            <v-container style="background-color: #202024;border-radius: 1%;width: 70%; margin-top: 13%; margin-left: 7%;" >
            <v-container style="padding: 10%;">
              <v-row>
                <v-col>
                <v-text-field
                  class=""
                  outlined
                  placeholder="E-mail"
                  color="rgb(25, 191, 25)"
                  prepend-inner-icon="mdi-email"
                  background-color="#121214"
                ></v-text-field>
                </v-col>
              </v-row>
              <v-row>
                <v-col>
                  <v-text-field
                      class=""
                      style="margin-top: -8%"
                      outlined
                      placeholder="Senha"
                      color="rgb(25, 191, 25)"
                      prepend-inner-icon="mdi-lock"
                      background-color="#121214"
                    ></v-text-field>
                </v-col>
              </v-row>
              <v-row>
                <v-col style="margin-top:-10% ;">
                   <a href="/login/register" class="" style="margin-top: -10%;color: rgb(25, 191, 25);">Esqueci minha senha</a>
                </v-col>
              </v-row>
              <v-row>
                <v-col>
                  <v-btn
                    dark
                    x-large
                    block
                    color="rgb(25, 191, 25)"
                    outlined
                  >Entrar</v-btn>
                </v-col>
              </v-row>
              <v-row>
                <v-col>
                   <p style="margin-top: -5%;color: white; text-align: center; font-size: 90%; margin: auto;">Não tem uma conta? <a style="color:rgb(25, 191, 25)" href="#">Registre-se</a></p>
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
  name: 'LoginsPage'
}
</script>

<style>
@import url('https://fonts.googleapis.com/css2?family=Gugi&display=swap');
  a {
    color: rgb(25, 191, 25);
    text-decoration: none;
  }
</style>