<template>
    <v-container>
        <v-layout>
            <v-flex>
                <v-card-title><h2>{{title}}</h2>
                    <v-spacer></v-spacer>
                    <v-text-field append-icon="mdi-account-search"
                                  label="Keresés"
                                  single-line hide-details
                                  v-model="table.search">
                    </v-text-field>
                </v-card-title>

                <v-data-table :title="title"
                              :headers="table.headers"
                              :items="items"
                              :search="table.search"
                              rows-per-page-text="Sor / oldal"
                              :rows-per-page-items="table.rows_per_page"
                              :must-sort="true">

                    <template slot="items" slot-scope="props">
                        <td>{{ props.item.title }}</td>
                        <td class="text-xs-left">{{ props.item.authorModel.firstName + props.item.authorModel.lastName }}</td>
                        <td class="text-xs-left">{{ props.item.publisher }}</td>
                        <td class="text-xs-left">{{ props.item.category.name }}</td>
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
                :actions="prefaceDialog.actions">

            <v-card>
                <v-card-text>
                    <v-container grid-list-md>
                        <v-layout wrap>
                            <v-card-text>
                                <!--<pre> {{ selectedItem }} </pre>-->
                                <v-container grid-list-md>
                                    <v-layout wrap>
                                        <v-flex xs12>
                                            <v-textarea label="Előszó" required v-model="selectedItem.preface"
                                                        readonly></v-textarea>
                                        </v-flex>
                                    </v-layout>
                                </v-container>
                            </v-card-text>
                        </v-layout>
                    </v-container>
                </v-card-text>
            </v-card>
        </Dialog>
        <Dialog v-if="selectedItem2 !== null"
                :title=boookListDialog.title
                color="teal lighten-1"
                :show="boookListDialog.state"
                :actions="boookListDialog.actions">

            <v-card>
                <v-card-text>
                    <v-container grid-list-md>
                        <v-layout wrap>
                            <v-card-text>
                                <!--<pre> {{ selectedItem }} </pre>-->
                                <v-container grid-list-md>
                                    <v-layout wrap>
                                        <v-flex xs12>
                                            <v-data-table :title="title"
                                                          :headers="boookListDialog.headers"
                                                          :items="usersBookList">
                                                <template slot="items" slot-scope="props">
                                                    <td class="text-xs-left">{{ props.item.title }}</td>
                                                    <td class="text-xs-left">{{ props.item.authorModel.firstName }}</td>
                                                    <td class="text-xs-left">{{ props.item.publisher }}</td>
                                                    <td class="text-xs-left">{{ props.item.category.name }}</td>
                                                </template>
                                            </v-data-table>
                                        </v-flex>
                                    </v-layout>
                                </v-container>
                            </v-card-text>
                        </v-layout>
                    </v-container>
                </v-card-text>
            </v-card>
        </Dialog>
    </v-container>

</template>

<script>
    import {VCard, VCardText, VTextField, VDataTable, VCardTitle, VAlert, VTextarea, VDialog} from 'vuetify/lib'
    import _ from 'lodash'
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
                title: "Könyvek",
                editDialogState: false,
                selectedItem: null,
                selectedItem2: null,
                table: {
                    selectedItem: null,
                    search: "",
                    rows_per_page: [50, 100, 150, {text: "Mind", value: -1}],
                    headers: [
                        {text: "Cím", value: "title", align: "left", sortable: true},
                        {text: "Szerző", value: "authorModel", align: "left", sortable: true},
                        {text: "Kiadó", value: "publisher", align: "left", sortable: true},
                        {text: "Kategória", value: "category", align: "left", sortable: true},
                        {text: "Darabszám", value: "quantity", align: "right", sortable: true},
                        {text: "Előszó", value: "actions", align: "right", sortable: false},
                        {text: "Kölcsönzés", value: "actions", align: "right", sortable: false},
                        {text: "Visszhoztam", value: "actions", align: "right", sortable: false},
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
                    title: "Kikölcsönzött könyveinek listája",
                    actions: [
                        {
                            text: "Ok",
                            click: this.bookListDialogClose,
                        },
                    ],
                    headers: [
                        {text: "Cím", value: "title", align: "left", sortable: true},
                        {text: "Szerző", value: "authorModel", align: "left", sortable: true},
                        {text: "Kiadó", value: "publisher", align: "left", sortable: true},
                        {text: "Kategória", value: "category", align: "left", sortable: true},
                    ]
                },
            }
        },

        methods: {
            prefaceDialogShow(item) {               //Előszó ablakot nyitja
                this.selectedItem = item
                this.prefaceDialog.state = true
            },
            bookListDialogShow(item) {              //Könyvlista ablakot nyitja
                this.selectedItem2 = item
                this.boookListDialog.state = true
            },
            prefaceDialogClose() {
                this.prefaceDialog.state = false
                this.selectedItem = null
            },
            bookListDialogClose() {
                this.boookListDialog.state = false
                this.selectedItem2 = null
            },
            rent(item) {                                  //KÖlcsönzést dispatch-olja a a store.js-ben a  rentBook async action-el ami
                this.$store.dispatch("rentBook", item.id);   //meghívja a backend-et, majd a loadBook mutáció újratölti a listát
                this.bookListDialogShow(item)
            },
                giveBackBook(item) {                    ////Könyv visszaadát dispatch-olja a giveBack mutáció pedig menti a books tömben a store.js-ben
                this.$store.dispatch("giveBack", item.id);
                this.bookListDialogShow()
            }
        }
    }
</script>
