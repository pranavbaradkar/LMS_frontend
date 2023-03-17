import Vue from 'vue'
import VueRouter from 'vue-router'
import AuthView from '../views/AuthView'
import HomeView from '../views/HomeView'
import RegistrationView from '../views/RegistrationView'
import AssessmentView from '../views/AssessmentView'

//import store from "../store";

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'AuthView',
    component: AuthView
  },
  {
    path: '/register',
    name: 'RegistrationView',
    component: RegistrationView
  },
  {
    path: '/home',
    name: 'HomeView',
    component: HomeView
  },
  {
    path: '/assessment',
    name: 'AssessmentView',
    component: AssessmentView
  },
]

const router = new VueRouter({
  routes
})

// router.beforeEach((to, from, next) => {
//   if (to.matched.some((record) => record.meta.requiresAuth)) {
//     if (store.getters.isAuthenticated) {
//       next();
//       return;
//     }
//     next("/login");
//   } else {
//     next();
//   }
// });

// router.beforeEach((to, from, next) => {
//   if (to.matched.some((record) => record.meta.guest)) {
//     if (store.getters.isAuthenticated) {
//       next("/posts");
//       return;
//     }
//     next();
//   } else {
//     next();
//   }
// });
export default router
