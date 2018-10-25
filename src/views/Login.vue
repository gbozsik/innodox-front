<template>
  <v-container fluid>
    <v-slide-y-transition mode="out-in">
      <v-layout column align-center>
          <v-container fluid>
              <v-slide-y-transition mode="out-in">
                  <v-layout column align-center>
                          <v-flex xs12 md6>
                              <v-card>
                                  <v-card-text>
                                      <h1 class="inputTitle">Belépés</h1>
                                      <v-layout wrap>
                                          <v-flex xs12 sm12>
                                              <v-text-field label="E-mail" required v-model="loginData.username"></v-text-field>
                                          </v-flex>
                                          <v-flex xs12 sm12>
                                              <v-text-field type="password" label="Jelszó" required v-model="loginData.password"></v-text-field>
                                          </v-flex>
                                          <v-flex xs12 sm4 text-xs-center>
                                              <div>
                                                  <v-btn v-on:click="login()" color="primary">Bejelentkezés</v-btn>
                                              </div>
                                          </v-flex>
                                      </v-layout>
                                  </v-card-text>
                              </v-card>
                          </v-flex>
                  </v-layout>
              </v-slide-y-transition>
          </v-container>
      </v-layout>
    </v-slide-y-transition>
  </v-container>
</template>


<script>
    import {VCard, VCardText, VTextField, VDataTable, VCardTitle, VAlert, VTextarea, VDialog} from 'vuetify/lib'
    import Axios from 'axios'
    export default {
        components: {
            VTextField,
            VCardText,
            VCard
        },
        name: "login",

        data() {

            return {
                loginData: {
                    username: '',
                    password: ''
                }
            }
        },

        methods: {
            login() {
                this.$store.dispatch("login", this.loginData)
            },
        }
    }
</script>


<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h1, h2 {
  font-weight: normal;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: blue;
}
</style>
