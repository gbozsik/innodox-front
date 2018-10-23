import '@babel/polyfill'
import Vue from 'vue'
import './plugins/vuetify'
import App from './App.vue'
import router from './router'
import store from './store'
import 'roboto-fontface/css/roboto/roboto-fontface.css'
import '@mdi/font/css/materialdesignicons.css'

Vue.config.productionTip = false

import Axios from 'axios'

Axios.defaults.baseURL = '/api'
Axios.defaults.headers.common.Accept = 'application/json'




Vue.$http = Axios
Object.defineProperty(Vue.prototype, '$http', {
    get() {
        return Axios;
    }
})

// router.beforeEach(()=> {
//     if(store.state.actualUserData.id == 0){
//         router.push({name: "login"})
//     }
// })

// Startup store actions
store.dispatch('getActualUser');



new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
