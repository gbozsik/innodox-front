import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

// export const router = new Router({
export default new Router({
    mode: 'history',
    routes: [
        {
            path: '/login',
            name: 'login',
            component: () => import( './views/Login.vue')
        },
        {
            path: '/rent',
            name: 'rent',
            // route level code-splitting
            // this generates a separate chunk (about.[hash].js) for this route
            // which is lazy-loaded when the route is visited.
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

  // router.beforeEach((to, from, next) => {
  //   // redirect to login page if not logged in and trying to access a restricted page
  //   const publicPages = ['/login'];
  //   const authRequired = !publicPages.includes(to.path);
  //   const loggedIn = localStorage.getItem('user');
  //
  //   if (authRequired && !loggedIn) {
  //       return next('/login');
  //   }
  //   next();
// })