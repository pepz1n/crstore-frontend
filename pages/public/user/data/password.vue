<template>
  <v-container>
    <h1 style="text-align: center">Meus Dados</h1>
    <hr>
    <v-form v-model="valid">
      <v-container>
        <v-row>
          <v-col>
            <v-text-field
              v-model="user.current"
              placeholder="Senha Atual"
              label="Senha Atual"
              outlined
              color="red"
              :rules="[rule.password]"
              :append-icon="show ? 'mdi-eye-off' : 'mdi-eye'"
              @click:append="toggleShow"
              :type="show ? 'text' : 'password'"
              prepend-inner-icon="mdi-lock"
            />
          </v-col>
          </v-row>
          <v-row>
          <v-col>
            <v-text-field
            v-model="user.new"
            placeholder="Nova Senha"
            color="red"
            label="Nova Senha"
            outlined
            :rules="[rule.password, rule.current]"
            :append-icon="show2 ? 'mdi-eye-off' : 'mdi-eye'"
            @click:append="toggleShow2"
            :type="show2 ? 'text' : 'password'"
            prepend-inner-icon="mdi-lock"
            />
          </v-col>
          <v-col>
            <v-text-field
            v-model="user.new2"
            placeholder="Confirme a nova senha"
            color="red"
            label="Confirme a nova senha"
            outlined
            :rules="[rule.password, rule.equalPassword]"
            :append-icon="show3 ? 'mdi-eye-off' : 'mdi-eye'"
            @click:append="toggleShow3"
            :type="show3 ? 'text' : 'password'"
            prepend-inner-icon="mdi-lock"
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
      show: false,
      show2:false,
      show3:false,
      user: {  
        current: null,
        new: null,
        new2: null
      },
      rule:{
        password: v => !!v || 'Esse campo é obrigatorio',
        equalPassword: v => v === this.user.new || 'Senha diferente!',
        current: v => v !== this.user.current || 'A senha não pode ser a mesma anterior'
      },
    }
  },


  methods: {
    async atualizar () {
      try {
        if(!this.valid){
          return this.$toast.warning("Preencha corretamente!")
        }
        let oi ={
          currentPassword: this.user.current, 
          newPassword: this.user.new
        }
        let password = await this.$api.$post(`/users/update-password`, oi)
        console.log(password);
        if (password.type == "info") {
          localStorage.setItem('forget-key', "")
          this.$toast.success('Cadastro atualizado com sucesso!');
          return this.$router.push('/public/login')
        }else{
          this.$toast.warning(password.message);
        }
      } catch (error) {
        this.$toast.error(error.message);
      }
    },
    toggleShow(){
      this.show = !this.show
    },
    toggleShow2(){
      this.show2 = !this.show2
    },
    toggleShow3(){
      this.show3 = !this.show3
    },
  }
}
</script>