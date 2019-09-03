<template>
    <v-container>
            <v-layout column align-center>
                <v-container>
                        <v-layout column align-center>
                            <v-flex xs12 md10>
                                <v-card>
                                    <v-card-text>
                                        <h1 class="inputTitle">Sign in</h1>
                                        <v-layout wrap>
                                            <v-flex xs12 sm12>
                                                <v-text-field class="loginField"
                                                              label="E-mail" required
                                                              v-model="loginData.username"></v-text-field>
                                            </v-flex>
                                            <v-flex xs12 sm12>
                                                <v-text-field type="password" label="Password" required
                                                              v-model="loginData.password"></v-text-field>
                                            </v-flex>
                                            <v-flex xs12 sm4 text-xs-center>
                                                <div>
                                                    <v-btn v-on:click="login()" color="primary">Sign in</v-btn>
                                                </div>
                                            </v-flex>
                                        </v-layout>
                                    </v-card-text>
                                </v-card>
                            </v-flex>
                        </v-layout>
                </v-container>
            </v-layout>
        <Dialog
                class="dialog"
                :title=form.errorDialog.title
                color="warning"
                :show="logoutErrorMessage !== ''"
                :width="400"
                :actions="form.errorDialog.actions">
            <v-container class="dialog-container"
                         bg fill-height grid-list-md text-xs-center text-size>
                <v-layout row wrap align-center>
                    <v-flex style="font-size: x-large; font-family: Arial">
                        {{ logoutErrorMessage }}
                    </v-flex>
                </v-layout>
            </v-container>
        </Dialog>
    </v-container>
</template>

<style scoped>
    .loginField {
        margin-top: 20px;
    }
</style>


<script>
    import {VCard, VCardText, VTextField} from 'vuetify/lib'
    import Axios from 'axios'


    export default {
        components: {
            VTextField,
            VCardText,
            VCard
        },
        name: "login",

        computed: {
            logoutErrorMessage() {
                return this.$store.state.logoutErrorMessage
            }
        },

        data() {

            return {
                loginData: {
                    username: '',
                    password: ''
                },
                form: {
                    errorDialog: {
                        state: this.bookErrorMessage !== '',
                        title: "Warning",
                        actions: [
                            {
                                text: "Ok",
                                click: this.errorDialogClose,
                            }
                        ]
                    },
                }
            }
        },

        methods: {
            login() {
                this.$store.dispatch("login", this.loginData)
            },
            errorDialogClose() {
                this.$store.commit('resetLogoutMessage')
            },
        },
    }
</script>


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
