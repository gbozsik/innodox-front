<template>
    <v-container>
        <v-layout column align-center>
            <v-flex xs12 md6>
                <v-card>
                    <v-card-text>
                        <h4 class="inputTitle">Felvétel</h4>
                        <v-layout wrap>
                            <v-flex xs12 sm8>
                                <v-text-field label="Cím" required v-model="form.book.bookToSave.title"
                                              :rules="form.validation.rules.title"></v-text-field>
                            </v-flex>
                            <v-flex xs12 sm8>
                                <v-text-field label="Szerző" required
                                              v-model="form.book.bookToSave.author"
                                              :rules="form.validation.rules.author"></v-text-field>
                            </v-flex>
                            <v-flex xs12 sm8>
                                <v-text-field label="Kiadó" required
                                              v-model="form.book.bookToSave.publisher"
                                              :rules="form.validation.rules.publisher"></v-text-field>
                            </v-flex>
                            <v-flex xs12 sm6>
                                <v-select
                                        :items="selectableCategories"
                                        item-text="name"
                                        v-model="form.book.bookToSave.category"
                                        label="Kategória"
                                        single-line
                                        :rules="form.validation.rules.category"
                                        return-object>
                                </v-select>
                            </v-flex>
                            <v-flex xs12 sm8>
                                <v-text-field label="Darabszám" required
                                              v-model="form.book.bookToSave.quantity"
                                              :rules="form.validation.rules.quantity"
                                              type="number"></v-text-field>
                            </v-flex>
                            <v-flex xs12>
                                <v-card height="100%">
                                    <v-card-text>
                                        <h4 class="inputTitle">Előszó</h4>
                                        <v-layout wrap>
                                            <v-flex xs12>
                                                <v-textarea
                                                        name="preface"
                                                        label=""
                                                        v-model="form.book.bookToSave.preface"
                                                        hint="Másold be az előszó tartalmát"
                                                        clearable
                                                        rows=12
                                                        :rules="form.validation.rules.preface"
                                                        required
                                                        auto-grow>
                                                </v-textarea>
                                            </v-flex>
                                        </v-layout>
                                    </v-card-text>
                                </v-card>
                            </v-flex>
                            <v-flex xs12>
                                <v-card height="100%">
                                    <v-card-text>
                                        <h4 class="inputTitle">Tartalom</h4>
                                        <v-layout wrap>
                                            <v-flex xs12>
                                                <v-textarea
                                                        name="content"
                                                        label=""
                                                        v-model="form.book.bookToSave.content"
                                                        hint="Másold ide a könyv tartalmát"
                                                        clearable
                                                        rows=12
                                                        :rules="form.validation.rules.content"
                                                        required
                                                        auto-grow>
                                                </v-textarea>
                                            </v-flex>
                                        </v-layout>
                                    </v-card-text>
                                </v-card>
                            </v-flex>
                            <v-flex xs12 sm4 text-xs-center>
                                <div>
                                    <v-btn v-on:click="saveBook()" color="primary">Mentés</v-btn>
                                </div>
                            </v-flex>
                        </v-layout>
                    </v-card-text>
                </v-card>
            </v-flex>
        </v-layout>
    </v-container>
</template>

<script>
    import {required, positiveNum, isNumber, min2char, min50char, min100char, max200char,
        min1000char, max5000char, numMax10} from '@/validation/validationRules'
    import {VCard, VCardText, VTextField, VSelect, VBtn, VTextarea} from 'vuetify/lib'

    export default {
        components: {
            VTextField,
            VCard,
            VCardText,
            VSelect,
            VBtn,
            VTextarea
        },
        name: "book",

        mounted() {
            this.$store.dispatch("getCategories");
        },
        computed: {
            selectableCategories() {
                return this.$store.state.categories
            },
        },

        data() {
            return {
                form: {
                    book: {
                        categories: [],
                        bookToSave: {
                            title: '',
                            author: '',
                            publisher: '',
                            category: {},
                            preface: '',
                            content: '',
                            quantity: ''
                        }
                    },
                    validation: {
                        state: false,
                        rules: {
                            title: [required, min2char],
                            author: [required, min2char],
                            publisher: [required, min2char],
                            category: [required],
                            quantity: [required, isNumber, positiveNum, numMax10],
                            preface: [required, min50char, max200char],
                            content: [required, min100char, max5000char],
                        }
                    }
                }
            }
        },

        methods: {
            saveBook() {
                this.$store.dispatch("saveBook", this.form.book.bookToSave);
                console.log('bookTosSave: ', this.form.book.bookToSave)
            },
        }
    }
</script>

<style scoped>

</style>