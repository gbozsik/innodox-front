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
        categories: [],
        actualUser: defaultUser,
        loginData: {}
    },

    getters: {
        categories: function (state) {
            return state.categories
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
        loadActualUser: function (state, user) {
            state.actualUser = user
        },
        loadLoginData: function (state, loginData) {
            state.loginData = loginData
        }
    },
    actions: {
        async getBooks({commit}) {
            const {data} = await Axios.get('/getbooks')
            commit('loadBooks', data)
        },
        async getCategories({commit}) {
            const {data} = await Axios.get('/getcategories')
            commit('loadCategories', data)
        },
        async saveBook({commit}, payload) {
            try {
                const {data} = await Axios.post('/savebooks', payload)
                commit('insertBook', data)
                alert('A könyv sikeresen felvéve')
            } catch (e) {
                console.log(e.response.data.message)
                alert(e.response.data.message)
            }
        },
        async rentBook({commit}, payload) {
            try {
                const {data} = await Axios.post('/rentbook', payload)
                commit('loadBooks', data)
                this.dispatch('getActualUser')
            } catch (e) {
                alert(e.response.data.message)
            }
        },
        async giveBack({commit}, payload) {
            try {
                const {data} = await Axios.post('bringbackbook', payload)
                commit('loadBooks', data)
                this.dispatch('getActualUser')
            } catch (e) {
                alert(e.response.data.message)
            }
        },
        async getActualUser({commit}) {
            try {
                const {data} = await Axios.get('getactualuser')
                if (data === "") {
                    commit('loadActualUser', defaultUser)
                } else {
                    commit('loadActualUser', data)
                }
                console.log('data: ', data)
            } catch (e) {
                console.log(e)
                commit('loadActualUser', defaultUser)
            }
        },
        // async getUserToLogin({commit}) {
        //     commit('loadActualUser', data)
        //     if (this.state.actualUser != null) {
        //         router.push({name: "rent"})
        //     } else {
        //         alert('Hibás az e-mail, vagy jelszó')
        //     }
        // },
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
                router.push({name: "rent"})
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
                console.log('loggingout')
            } catch (e) {
                console.log(e)
            }
            if (this.state.actualUser.id == 0) {
                alert('Sikeres kijelentkezés')
            }
        }


    }
})
