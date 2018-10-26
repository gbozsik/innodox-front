import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

export default new Router({
    mode: 'history',
    routes: [
        {
            path: '/login',
            name: 'login',
            component: () => import( './views/Login.vue')
        },
        {
            path: '/welcome',
            name: 'welcome',
            component: () => import( './views/Welcome.vue')
        },
        {
            path: '/rent',
            name: 'rent',
            component: () => import('./views/Rent.vue')
        },
        {
            path: "/book",
            name: "book",
            meta: {
                title: "Könyv felvétele"
            },
            component: () => import('./views/Book.vue')
        },
    ]

});
