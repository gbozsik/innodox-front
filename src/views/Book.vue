<!--  KÖNYV FELÉVÉTEL FORM -->


<template>
    <v-container>
        <v-layout column align-center>
            <v-flex xs12 md6>
                <v-card>
                    <v-card-text>
                        <h4 class="inputTitle">Felvétel</h4>
                        <v-layout wrap>
                            <v-flex xs12 sm8>
                                <v-text-field label="Title" required v-model="form.book.bookToSave.title"
                                              :rules="form.validation.rules.title"></v-text-field>
                            </v-flex>
                            <v-flex xs12 sm8>
                                <v-text-field label="Publisher" required
                                              v-model="form.book.bookToSave.publisher"
                                              :rules="form.validation.rules.publisher"></v-text-field>
                            </v-flex>
                            <v-card-text style="background-color: #DDB9DF">
                                <v-flex xs12 sm6>
                                    <v-select
                                            :items="selectableAuthors"
                                            clearable
                                            item-text="name"
                                            v-model="form.book.bookToSave.selectedAuthor"
                                            label="Authors"
                                            single-line
                                            return-object
                                            @change="authorVSelectChanged()">
                                        <template slot="selection" slot-scope="data">
                                            <v-list-tile-avatar>
                                                <img :src="data.item.avatar">
                                            </v-list-tile-avatar>
                                            {{ data.item.firstName }} {{ data.item.lastName }}
                                        </template>
                                        <template slot="item" slot-scope="data">
                                            <v-list-tile-avatar>
                                                <img :src="data.item.avatar">
                                            </v-list-tile-avatar>
                                            {{ data.item.firstName }} {{ data.item.lastName }}
                                        </template>
                                    </v-select>
                                </v-flex>
                                <v-flex xs12 sm8>
                                    <v-text-field ref="newAuthorFirstName"
                                                  label="First name" required
                                                  v-model="newAuthorFirstname"
                                                  @change="newAuthorFieldsChange"
                                                  :rules="form.validation.rules.authorModel"></v-text-field>
                                </v-flex>
                                <v-flex xs12 sm8>
                                    <v-text-field ref="newAuthorLastName"
                                                  label="Last name" required
                                                  v-model="newAuthorLastname"
                                                  @change="newAuthorFieldsChange"
                                                  :rules="form.validation.rules.authorModel"></v-text-field>
                                </v-flex>
                                <v-flex xs12 sm8>
                                    <v-text-field ref="newAuthorAge"
                                                  label="Age" required
                                                  v-model="newAuthorAge"
                                                  @change="newAuthorFieldsChange"
                                                  :rules="form.validation.rules.authorAge"
                                                  type="number"></v-text-field>
                                </v-flex>
                            </v-card-text>
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
    import {
        required, positiveNum, isNumber, min2char, min50char, min100char, max200char,
        min1000char, max5000char, numMax10
    } from '@/validation/validationRules'
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
            this.$store.dispatch("getAuthors")
        },
        computed: {
            clearAuthorFields() {
                // return this.newAuthorFirstname =''
                // this.newAuthorLastname = '',
                // this.newAuthorAge = ''}
            },
            selectableCategories() {
                return this.$store.state.categories
            },
            selectableAuthors() {
                return this.$store.state.authors
            },
        },

        props: {
            newAuthorFirstname: String,
            newAuthorLastname: String,
            newAuthorAge: String
        },

        methods: {
            newAuthorFieldsChange() {
                console.log(this.newAuthorFirstname)
                if (_.isEmpty(this.form.book.bookToSave.selectedAuthor == null)) {
                    this.form.book.bookToSave.authorModel.firstName = this.newAuthorFirstname
                    this.form.book.bookToSave.authorModel.lastName = this.newAuthorLastname
                    this.form.book.bookToSave.authorModel.age = this.newAuthorAge
                    console.log(this.form.book.bookToSave.authorModel.firstName)
                    console.log(this.form.book.bookToSave.authorModel.lastName)
                    console.log(this.form.book.bookToSave.authorModel.age)
                } else {
                    this.form.book.bookToSave.authorModel = this.form.book.bookToSave.selectedAuthor
                }
            },
            authorVSelectChanged() {
                if (_.isEmpty(this.form.book.bookToSave.selectedAuthor)) {
                    this.form.book.bookToSave.authorModel.firstName = this.$refs.newAuthorFirstName.value
                    this.form.book.bookToSave.authorModel.lastName = this.$refs.newAuthorFirstName.value
                    this.form.book.bookToSave.authorModel.firstName = this.$refs.newAuthorFirstName.value
                    console.log(this.$refs.newAuthorFirstName.value)
                    console.log("change")
                } else {
                    this.$refs.newAuthorFirstName.value = this.form.book.bookToSave.authorModel.firstName
                    this.$refs.newAuthorFirstName.value = this.form.book.bookToSave.authorModel.lastName
                    this.$refs.newAuthorFirstName.value = this.form.book.bookToSave.authorModel.firstName
                }
            },
            saveBook() {
                this.$store.dispatch("saveBook", this.form.book.bookToSave);
                this.form.book.bookToSave = {}
            },
        },

        data() {
            // let empty = {}

            return {
                emptyVal: '',
                form: {
                    book: {
                        categories: [],
                        // authors: [],
                        bookToSave: {
                            title: '',
                            selectedAuthor: {},
                            authorModel: {
                                firstName: '',
                                lastName: '',
                                age: '',
                                // avatar: srcs[1]
                            },
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
                            authorModel: [required, min2char],
                            authorAge: [required, min2char],
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

    }
</script>

<style scoped>

</style>