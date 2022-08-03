<template>
    <v-form>
      <v-container>
      <v-row>
        <v-col
            cols="5"
          >
            <h1 style="font-size: 50px;margin-top: 45%; margin-left: 20%;">
              <p style="font-family:'Gugi', cursive; font-size: 25px;">
                <v-icon style="color:blueviolet; font-size: 105%;">
                  mdi-rocket-launch
                </v-icon>
                CRStore
              </p>
              <strong>
                Faça seu login na plataforma
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
                  color="#8257e5"
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
                      color="#8257e5"
                      prepend-inner-icon="mdi-lock"
                      background-color="#121214"
                    ></v-text-field>
                </v-col>
              </v-row>
              <v-row>
                <v-col style="margin-top:-10% ;">
                   <a href="./login/register.vue" class="" style="margin-top: -10%;color: #8257e5;">Esqueci minha senha</a>
                </v-col>
              </v-row>
              <v-row>
                <v-col>
                  <v-btn
                    dark
                    x-large
                    block
                    color="#8257e5"
                    outlined
                  >Entrar</v-btn>
                </v-col>
              </v-row>
              <v-row>
                <v-col>
                   <p style="margin-top: -5%;color: white; text-align: center; font-size: 90%; margin: auto;">Não tem uma conta? <a style="color:#8257e5" href="#">Registre-se</a></p>
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
              <v-row>
                <v-col>
                  <p style="font-size: 90%; text-align: center;">Ou entre com</p>
                </v-col>
                <v-col>
                  <v-btn
                    class=""
                    dark
                    x-large
                    block
                    color="#8257e5"
                    outlined
                    style="margin-top:-8%"
                  > <v-icon>mdi-github</v-icon> GITHUB</v-btn>
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
    color: #8257e5;
    text-decoration: none;
  }
</style>