<template>
    <v-container>
        <v-layout>
            <v-flex>
                <v-card-title><h2>{{title}}</h2>
                    <v-spacer></v-spacer>
                    <v-text-field append-icon="mdi-account-search"
                                  label="Search"
                                  single-line hide-details
                                  v-model="table.search">
                    </v-text-field>
                </v-card-title>

                <v-data-table :title="title"
                              :headers="table.headers"
                              :items="items"
                              :search="table.search"
                              rows-per-page-text="Line / Page"
                              :rows-per-page-items="table.rows_per_page"
                              :must-sort="true">

                    <template slot="items" slot-scope="props">
                        <td>{{ props.item.title }}</td>
                        <td class="text-xs-left">{{ props.item.authorModel.firstName + props.item.authorModel.lastName }}</td>
                        <td class="text-xs-left">{{ props.item.publisher }}</td>
                        <td class="text-xs-left">{{ props.item.categoryModel.name }}</td>
                        <td class="text-xs-center">{{ props.item.quantity }}</td>

                        <td class="text-xs-right">
                            <v-btn flat icon color="teal lighten-1" @click="prefaceDialogShow(props.item)">
                                <v-icon>mdi-book-open-page-variant</v-icon>
                            </v-btn>
                        </td>
                        <td class="text-xs-right">
                            <v-btn flat icon color="teal lighten-1" @click="rent(props.item)">
                                <v-icon>mdi-cart</v-icon>
                            </v-btn>
                        <td class="text-xs-right">
                            <v-btn flat icon color="teal lighten-1" @click="giveBackBook(props.item)">
                                <v-icon>mdi-cart-outline</v-icon>
                            </v-btn>
                        </td>
                    </template>

                    <v-alert slot="no-results" :value="true" color="error" icon="warning">
                        Nincs találat a(z) "{{ table.search }}" kifejezésre.
                    </v-alert>
                </v-data-table>
            </v-flex>
        </v-layout>

        <Dialog v-if="selectedItem !== null"
                :title=selectedItem.title
                color="teal lighten-1"
                :show="prefaceDialog.state"
                :width="800"
                :actions="prefaceDialog.actions">
            <v-container bg ill-height grid-list-md text-xs-center text-size
                         class="dialog-container">
                <v-layout row wrap align-center>
                    <v-flex style="font-size: x-large; font-family: Arial">
                        {{ selectedItem.preface }}
                    </v-flex>
                </v-layout>
            </v-container>
        </Dialog>

        <Dialog class="dialog-container"
                v-if="selectedItem !== null"
                :title=boookListDialog.title
                color="teal lighten-1"
                :show="boookListDialog.state"
                :actions="boookListDialog.actions">
            <v-card>
                <v-card-text>
                    <v-flex xs12>
                        <v-data-table class="bookListTable"
                                :title="title"
                                :headers="boookListDialog.headers"
                                :items="usersBookList">
                            <template slot="items" slot-scope="props">
                                <td class="text-xs-left">{{ props.item.title }}</td>
                                <td class="text-xs-left">{{ props.item.authorModel.firstName }}</td>
                                <td class="text-xs-left">{{ props.item.publisher }}</td>
                                <td class="text-xs-left">{{ props.item.categoryModel.name }}</td>
                            </template>
                        </v-data-table>
                    </v-flex>
                </v-card-text>
            </v-card>
        </Dialog>

        <Dialog
                class="dialog"
                :title=bookErrorDialog.title
                color="warning"
                :show="errorMessage !== ''"
                :width="400"
                :actions="bookErrorDialog.actions">
            <v-container class="dialog-container"
                         bg fill-height grid-list-md text-xs-center text-size>
                <v-layout row wrap align-center>
                    <v-flex style="font-size: x-large; font-family: Arial">
                        {{ errorMessage }}
                    </v-flex>
                </v-layout>
            </v-container>
        </Dialog>
    </v-container>
</template>

<style>
    .dialog-container {
        background-color: bisque;
    }
</style>

<script>
    import {VCard, VCardText, VTextField, VDataTable, VCardTitle, VAlert, VTextarea, VDialog} from 'vuetify/lib'
    import Table from '@/components/Core/Table'
    import Dialog from '@/components/Core/Dialog'

    export default {
        mounted() {
            this.$store.dispatch("getBooks");
        },

        computed: {
            items() {
                return this.$store.state.books
            },
            usersBookList() {
                return this.$store.state.actualUser.bookModelList
            },
            errorMessage() {
                return this.$store.state.errorMessage
            }
        },

        components: {
            VTextarea,
            Dialog,
            Table,
            VTextField,
            VDataTable,
            VCardTitle,
            VAlert,
            VCardText,
            VDialog,
            VCard
        },

        data() {
            return {
                title: "Books",
                editDialogState: false,
                selectedItem: null,
                table: {
                    selectedItem: null,
                    search: "",
                    rows_per_page: [50, 100, 150, {text: "Mind", value: -1}],
                    headers: [
                        {text: "Title", value: "title", align: "left", sortable: true},
                        {text: "Author", value: "authorModel", align: "left", sortable: true},
                        {text: "Publisher", value: "publisher", align: "left", sortable: true},
                        {text: "Category", value: "category", align: "left", sortable: true},
                        {text: "Ammount", value: "quantity", align: "middle", sortable: true},
                        {text: "Preface", value: "actions", align: "right", sortable: false},
                        {text: "Renting", value: "actions", align: "right", sortable: false},
                        {text: "Hand back", value: "actions", align: "right", sortable: false},
                    ]
                },

                bookErrorDialog: {
                    state: this.errorMessage !== '',
                    title: "Warning",
                    actions: [
                        {
                            text: "Ok",
                            click: this.errorDialogClose,
                        }
                    ]
                },

                prefaceDialog: {
                    state: false,
                    actions: [
                        {
                            text: "Ok",
                            click: this.prefaceDialogClose,
                        },
                    ],
                },
                boookListDialog: {
                    state: false,
                    title: "Currently rented books",
                    actions: [
                        {
                            text: "Ok",
                            click: this.bookListDialogClose,
                        },
                    ],
                    headers: [
                        {text: "Title", value: "title", align: "left", sortable: true},
                        {text: "Author", value: "authorModel", align: "left", sortable: true},
                        {text: "Publisher", value: "publisher", align: "left", sortable: true},
                        {text: "Category", value: "category", align: "left", sortable: true},
                    ]
                },
            }
        },

        methods: {
            errorDialogClose() {
                this.$store.commit('resetErrorMessage')
            },
            prefaceDialogShow(item) {
                this.selectedItem = item
                this.prefaceDialog.state = true
            },
            bookListDialogShow(item) {
                this.selectedItem = item
                this.boookListDialog.state = true
            },
            prefaceDialogClose() {
                this.prefaceDialog.state = false
                this.selectedItem = null
            },
            bookListDialogClose() {
                this.boookListDialog.state = false
                this.selectedItem = null
            },
            rent(item) {
                this.$store.dispatch("rentBook", item.id);
                this.bookListDialogShow(item)
            },
            giveBackBook(item) {
                this.$store.dispatch("giveBack", item.id);
                this.bookListDialogShow(item)
            }
        }
    }
</script>
