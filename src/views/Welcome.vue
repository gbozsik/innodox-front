<!--  KÖNYV FELÉVÉTEL FORM -->


<template>
    <v-container background: #eeeeee>
        <v-layout column align-center justify-center row fill-height xs10 offset-xs1>
            <v-flex xs12 md6>
                <v-card>
                    <v-card-text>
                        <h4 class="welcome" style="font-size:50px; color:lightseagreen">Welcome in Digital Library</h4>
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
        name: "welcome",

        mounted() {
            this.$store.dispatch("getBooks");
        },

        data() {
            return {
                // form: {
                //     book: {
                //         title: '',
                //         authorModel: {
                //             id: '',
                //             firstName: '',
                //             lastName: '',
                //             age: '',
                //         },
                //         publisher: '',
                //         category: {},
                //         preface: '',
                //         content: '',
                //         quantity: ''
                //     }
                // },
                validation: {
                    state: false,
                    rules: {
                        title: [required, min2char],
                        authorModel: [required, min2char],
                        publisher: [required, min2char],
                        category: [required],
                        quantity: [required, isNumber, positiveNum, numMax10],
                        preface: [required, min50char, max200char],
                        content: [required, min100char, max5000char],
                    }
                }
            }
        },

        methods: {
            saveBook() {
                this.$store.dispatch("saveBook", this.form.book.bookOnForm);
                this.form.book.bookOnForm = {}
            },
        }
    }
</script>

<style scoped>

</style>