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
                router.push({name: "book"})
                alert('A könyv sikeresen felvéve')
            } catch (e) {
                console.log(e)
                alert('Hiba történt. Lehet, hogy nincs megfelelően kitöltve minden mező, vagy a könyv már megtalálható a könyvtárban')
            }
        },
        async rentBook({commit}, payload) {
            try {
                const {data} = await Axios.post('/rentbook', payload)
                commit('loadBooks', data)
                this.dispatch('getActualUser')
                console.log('PAYLOAD:', payload)
                console.log('rentBook')
                console.log('actualuser in state: ', this.state.actualUser)
            } catch (e) {
                alert(e.response.data.message)
            }
        },
        async giveBack({commit}, payload) {
            try {
                const {data} = await Axios.post('bringbackbook', payload)
                commit('loadBooks', data)
                this.dispatch('getActualUser')
                console.log('giveBack');
            } catch (e) {
                alert(e.response.data.message)
            }
        },
        async getActualUser({commit}) {
            try {
                const {data} = await Axios.get('getactualuser')
                commit('loadActualUser', data)
            }catch(e){
                console.log(e)
            }
        },
        async getUserToLogin({commit}) {
            const {data} = await Axios.get('getactualuser')
            commit('loadActualUser', data)
            if (this.state.actualUser != null) {
                router.push({name: "rent"})
                console.log('in if')
            }else{
                alert('Hibás az e-mail, vagy jelszó')
            }
        },
        async login({commit}, payload) {
            Axios.defaults.auth =  {
                username: payload.username,
                password: payload.password
            }
            this.dispatch('getUserToLogin')
            commit('loadActualUser', payload)
        },
        async logout({commit}) {
            const payload = defaultUser
            Axios.defaults.auth = {
            }
            commit('loadActualUser', payload)
        }


    }
})
