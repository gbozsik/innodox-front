<template>
    <v-container>
        <v-layout column align-center>
            <v-flex xs12 md6>
                <v-card>
                    <v-card-text>
                        <h4 class="inputTitle">Felvétel</h4>
                        <v-layout wrap>
                            <v-flex xs12 sm6>
                                <v-select
                                        class="booComboBox"
                                        :items="selectableBooks"
                                        v-model="form.book.selectedBook"
                                        label="Book"
                                        single-line
                                        clearable
                                        @change="bookComboChanged">
                                    <template slot="selection" slot-scope="data">
                                        {{ data.item.authorModel.firstName }} {{ data.item.authorModel.lastName }} - {{ data.item.title }}
                                    </template>
                                    <template slot="item" slot-scope="data">
                                        {{ data.item.authorModel.firstName }} {{ data.item.authorModel.lastName }} {{ data.item.title }}
                                    </template>
                                    :rules="form.validation.rules.category"
                                    return-object>
                                </v-select>
                            </v-flex>
                            <v-flex xs12 sm8>
                                <v-text-field label="Title" required v-model="form.book.bookToSave.title"
                                              :rules="form.validation.rules.title"></v-text-field>
                            </v-flex>
                            <v-flex xs12 sm8>
                                <v-text-field label="Publisher" required
                                              v-model="form.book.bookToSave.publisher"
                                              :rules="form.validation.rules.publisher"></v-text-field>
                            </v-flex>
                            <v-card-text class="authorCard">
                                <v-flex xs12 sm6>
                                    <v-select
                                            :items="selectableAuthors"
                                            clearable
                                            v-model="form.book.selectedAuthor"
                                            label="Authors"
                                            single-line
                                            return-object
                                            @change="authorVSelectChanged">
                                        <template slot="selection" slot-scope="data">
                                            <v-list-tile-avatar>
                                                <img :src="data.item.avatar">
                                            </v-list-tile-avatar>
                                            {{ data.item.firstName }} {{ data.item.lastName }} {{ bookErrorMessage !== '' }}
                                        </template>
                                        <template slot="item" slot-scope="data">
                                            <v-list-tile-avatar>
                                                <img :src="data.item.avatar">
                                            </v-list-tile-avatar>
                                            {{ data.item.firstName }} {{ data.item.lastName }} {{ bookErrorMessage !== '' }}
                                        </template>
                                    </v-select>
                                </v-flex>
                                <v-flex xs12 sm8>
                                    <v-text-field ref="newAuthorFirstName"
                                                  label="First name" required
                                                  v-model="form.book.bookToSave.authorModel.firstName"
                                                  @change="newAuthorFieldsChange"
                                                  :rules="form.validation.rules.authorModel"></v-text-field>
                                </v-flex>
                                <v-flex xs12 sm8>
                                    <v-text-field ref="newAuthorLastName"
                                                  label="Last name" required
                                                  v-model="form.book.bookToSave.authorModel.lastName"
                                                  @change="newAuthorFieldsChange"
                                                  :rules="form.validation.rules.authorModel"></v-text-field>
                                </v-flex>
                                <v-flex xs12 sm8>
                                    <v-text-field ref="newAuthorAge"
                                                  label="Age" required
                                                  v-model="form.book.bookToSave.authorModel.age"
                                                  @change="newAuthorFieldsChange"
                                                  :rules="form.validation.rules.age"
                                                  type="number"></v-text-field>
                                </v-flex>
                            </v-card-text>
                            <v-flex xs12 sm6>
                                <v-select
                                        :items="selectableCategories"
                                        item-text="name"
                                        v-model="form.book.selectedCategoryModel"
                                        label="Kategória"
                                        single-line
                                        :rules="form.validation.rules.category"
                                        @change="categoryVSelectChanged"
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
                                    <v-btn v-on:click="saveBook()" color="primary">Save</v-btn>
                                    <v-btn v-on:click="deleteBook()" color="primary">Delete</v-btn>
                                </div>
                            </v-flex>
                        </v-layout>
                    </v-card-text>
                </v-card>
            </v-flex>
        </v-layout>

        <Dialog
                class="dialog"
                :title=form.errorDialog.title
                color="warning"
                :show="bookErrorMessage !== ''"
                :width="400"
                :actions="form.errorDialog.actions">
            <v-container class="dialog-container"
                         bg fill-height grid-list-md text-xs-center text-size>
                <v-layout row wrap align-center>
                    <v-flex style="font-size: x-large; font-family: Arial">
                        {{ bookErrorMessage }}
                    </v-flex>
                </v-layout>
            </v-container>
        </Dialog>
    </v-container>
</template>

<style scoped>
    .authorCard {
        box-shadow: 15px 10px 7px 0px rgba(0, 0, 0, 0.75);
        border-style: solid;
        border-width: 1px;
        margin-top: 20px;
        margin-bottom: 20px;
        margin-right: 300px;
    }
</style>


<script>
    import {
        required, positiveNum, isNumber, min2char, min50char, min100char, max200char,
        min1000char, max5000char, numMax10
    } from '@/validation/validationRules'
    import _ from 'lodash'
    import {VCard, VCardText, VTextField, VSelect, VDialog, VTextarea} from 'vuetify/lib'
    import Dialog from '@/components/Core/Dialog'

    export default {
        components: {
            VTextField,
            VCard,
            VCardText,
            VSelect,
            VTextarea,
            VDialog,
            Dialog
        },
        name: "book",

        mounted() {
            this.$store.dispatch("getCategories");
            this.$store.dispatch("getAuthors")
        },
        computed: {
            selectableCategories() {
                return this.$store.state.categories
            },
            selectableAuthors() {
                return this.$store.state.authors
            },
            selectableBooks() {
                return this.$store.state.books
            },
            bookErrorMessage() {
                return this.$store.state.bookErrorMessage
            }
        },

        methods: {
            bookComboChanged() {
                if (!_.isEmpty(this.form.book.selectedBook)) {
                    this.form.book.bookToSave.id = this.form.book.selectedBook.id
                    this.form.book.bookToSave.title = this.form.book.selectedBook.title
                    this.form.book.bookToSave.authorModel = this.form.book.selectedBook.authorModel
                    this.form.book.bookToSave.publisher = this.form.book.selectedBook.publisher
                    this.form.book.bookToSave.categoryModel = this.form.book.selectedBook.category
                    this.form.book.bookToSave.content = this.form.book.selectedBook.content
                    this.form.book.bookToSave.quantity = this.form.book.selectedBook.quantity
                    this.form.book.bookToSave.preface = this.form.book.selectedBook.preface
                } else {
                    this.getDefaultData()
                }
            },
            newAuthorFieldsChange() {
                this.form.book.selectedAuthor = {}
                this.form.book.bookToSave.authorModel.id = ''
            },
            authorVSelectChanged() {
                if (!_.isEmpty(this.form.book.selectedAuthor)) {
                    this.form.book.bookToSave.authorModel.id = this.form.book.selectedAuthor.id
                    this.form.book.bookToSave.authorModel.firstName = this.form.book.selectedAuthor.firstName
                    this.form.book.bookToSave.authorModel.lastName = this.form.book.selectedAuthor.lastName
                    this.form.book.bookToSave.authorModel.age = this.form.book.selectedAuthor.age
                }
            },
            categoryVSelectChanged() {
                if (!_.isEmpty(this.form.book.selectedCategoryModel)) {
                    this.form.book.bookToSave.categoryModel = this.form.book.selectedCategoryModel
                }
            },
            saveBook() {
                this.$store.dispatch("saveBook", this.form.book.bookToSave);
                console.log("current route: " + this.$router.currentRoute)
            },
            deleteBook() {
                this.$store.dispatch("deleteBook", this.form.book.bookToSave.id)
            },
            errorDialogClose() {
                this.$store.commit('resetBookErrorMessage')
            },
            getDefaultData() {
                this.form.book.bookToSave.id = ''
                this.form.book.bookToSave.title = 'default'
                this.form.book.selectedAuthor = {}
                this.form.book.bookToSave.authorModel = {}
                this.form.book.bookToSave.publisher = ''
                this.form.book.bookToSave.categoryModel = ''
                this.form.book.bookToSave.content = ''
                this.form.book.bookToSave.quantity = ''
                this.form.book.bookToSave.preface = ''
            }
        },

        data() {

            return {
                form: {
                    book: {
                        selectedBook: {},
                        // categories: [],
                        selectedAuthor: {},
                        selectedCategoryModel: {},
                        bookToSave: {
                            id: '',
                            title: '',
                            authorModel: {
                                id: '',
                                firstName: '',
                                lastName: '',
                                age: '',
                                // avatar: srcs[1]
                            },
                            publisher: '',
                            categoryModel: {},
                            preface: '',
                            content: '',
                            quantity: ''
                        }
                    },
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
                    validation: {
                        state: false,
                        rules: {
                            title: [required, min2char],
                            authorModel: [required, min2char],
                            age: [required, min2char],
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