import '@babel/polyfill'
import Vue from 'vue'
import './plugins/vuetify'
import App from './app/App.vue'
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
});

router.beforeEach((to, from, next) => {
    // store.dispatch('getActualUser');
    if(store.state.actualUser.firstName === "Nincs bejelentkezve" && to.name !== 'login'){
        next({name: "login"});
    }else{
        next();
    }
});

// Startup store actions
store.dispatch('getActualUser');


new Vue({
    router,
    store,
    render: h => h(App)
}).$mount('#app')
