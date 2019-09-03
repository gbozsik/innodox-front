import Vue from 'vue'
import Vuex from 'vuex'
import Axios from 'axios'
import router from './router'
import _ from 'lodash'

Vue.use(Vuex)

const defaultUser = {
    firstName: 'Nincs bejelntkezve',
    id: 0
}


export default new Vuex.Store({

    state: {
        books: [],
        authors: [],
        categories: [],
        actualUser: defaultUser,
        loginData: {},
        bookToSave: {},
        errorMessage: '',
        bookErrorMessage: '',
        logoutMessage: ""
    },

    getters: {
        categories: function (state) {
            return state.categories
        },
        authors: function (state) {
            return state.authors
        },
    },
    mutations: {
        setBookToSave(state, bookToSave) {
            state.bookToSave = bookToSave
        },
        loadBooks: function (state, books) {
            state.books = books
        },
        insertBook: function (state, book) {
            console.log("state book: " + state.books)
            console.log("book: " + book)
            let books2 = _.cloneDeep(state.books)
            books2.push(book)
            state.books = books2
        },
        removeBook(state, book) {
            let books2 = _.cloneDeep(state.books)
            books2.pop(book)
            state.books = books2
        },
        loadCategories: function (state, categories) {
            state.categories = categories
        },
        loadAuthors: function (state, authors) {
            state.authors = authors
        },
        loadActualUser: function (state, user) {
            state.actualUser = user
        },
        loadLoginData: function (state, loginData) {
            state.loginData = loginData
        },
        setErrorMessage: function (state, message) {
            state.errorMessage = message
        },
        setBookErrorMessage: function (state, message) {
            state.bookErrorMessage = message
        },
        setLogoutMessage: function (state, message) {
            state.logoutMessage = message
        },
        resetErrorMessage: function (state) {
            state.errorMessage = ''
        },
        resetBookErrorMessage: function (state) {
            state.bookErrorMessage = ''
        },
        resetLogoutMessage: function (state) {
            state.logoutMessage = ''
        }
    },
    actions: {
        async getBooks({commit}) {
            const {data} = await Axios.get('/books')
            commit('loadBooks', data)
        },
        async getCategories({commit}) {
            const {data} = await Axios.get('/categories')
            commit('loadCategories', data)
        },
        async getAuthors({commit}) {
            const {data} = await Axios.get('/authors')
            commit('loadAuthors', data)
        },
        async getActualUser({commit}) {
            try {
                const {data} = await Axios.get('getactualuser')
                    commit('loadActualUser', data)
            } catch (e) {
                console.log(e)
            }
        },
        async saveBook({commit}, payload) {
            try {
                const {data} = await Axios.post('/book', payload)
                commit('insertBook', data)
                // alert('New book has saved')
                commit('setBookErrorMessage', "New book has saved")
            } catch (e) {
                commit('setBookErrorMessage', e.response.data.message)
            }
        },
        async deleteBook({commit}, id) {
            try {
                const {data} = await Axios.delete("/book/" + id)
                commit('removeBook', data)
                commit('setBookErrorMessage', "Book deleted")
            } catch (e) {
                commit('setBookErrorMessage', e.response.data.message)
            }
        },
        async rentBook({commit}, payload) {
            try {
                const {data} = await Axios.get('/rent/' + payload)
                commit('loadActualUser', data)
            } catch (e) {
                commit('setErrorMessage', e.response.data.message)
            }
        },
        async giveBack({commit}, payload) {
            try {
                const {data} = await Axios.get('bringback/' + payload)
                commit('loadActualUser', data)
            } catch (e) {
                commit('setErrorMessage', e.response.data.message)
            }
        },
        async login({commit}, payload) {
            const options = {
                headers: { "X-Requested-By": true }
            }
            Axios.defaults.auth = {
                username: payload.username,
                password: payload.password
            }
            try {
                const {data} = await Axios.get('getactualuser', options)
                commit('loadActualUser', data)
                router.push({name: "welcome"})
            } catch (e) {
                console.log(e)
                alert('Hibás felhasználónév vagy jelszó')
                commit('loadActualUser', defaultUser)
            }
        },
        async logout({commit}) {
            try {
                await Axios.get('loggingout')
                Axios.defaults.auth = {}
                commit('loadActualUser', defaultUser)
            } catch (e) {
                console.log(e)
            }
            if (this.state.actualUser.id == 0) {
                // alert('Sikeres kijelentkezés')
                commit('setLogoutMessage', "Sikeres kijelentkezés")
            }
        },
    }
})
