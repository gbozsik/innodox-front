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
        loginData: {}
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
        loadBooks: function (state, books) {
            state.books = books
        },
        insertBook: function (state, book) {
            let books2 = _.cloneDeep(state.books)
            books2.push(book)
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
        async saveBook({commit}, payload) {
            try {
                const {data} = await Axios.post('/book', payload)
                commit('insertBook', data)
                alert('New book has saved')
            } catch (e) {
                alert(e.response.data.message)
            }
        },
        async rentBook({commit}, payload) {
            try {
                const {data} = await Axios.get('/rent/' + payload)
                commit('loadActualUser', data)
            } catch (e) {
                alert(e.response.data.message)
            }
        },
        async giveBack({commit}, payload) {
            try {
                const {data} = await Axios.get('bringback/' + payload)
                commit('loadActualUser', data)
            } catch (e) {
                alert(e.response.data.message)
            }
        },
        async getActualUser({commit}) {
            try {
                const {data} = await Axios.get('getactualuser')
                    commit('loadActualUser', data)
                console.log('loadActualUser' + data)
                // }
            } catch (e) {
                console.log(e)
                // commit('loadActualUser', defaultUser)
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
                alert('Sikeres kijelentkezés')
            }
        }


    }
})
