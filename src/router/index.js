import Vue from 'vue'
import VueRouter from 'vue-router'
import AuthView from '../views/AuthView'
import HomeView from '../views/HomeView'
import RegistrationView from '../views/RegistrationView'
import AuthService from '@/services/AuthService'
import AssessmentView from '../views/AssessmentView'

//import store from "../store";

Vue.use(VueRouter)

const routes = [
  {
    path: '/login',
    name: 'AuthView',
    component: AuthView,
    meta: {
      requiresAuth: false,
    }
  },
  {
    path: '/register',
    name: 'RegistrationView',
    component: RegistrationView,
    meta: {
      requiresAuth: true,
    }
  },
  {
    path: '/',
    name: 'HomeView',
    component: HomeView,
    meta: {
      requiresAuth: true,
    }
  },
  {
    path: '/assessment',
    name: 'AssessmentView',
    component: AssessmentView,
    meta: {
      requiresAuth: true,
    }
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
router.beforeEach((to, from, next) => {
  if (to.matched.some(record => record.meta.requiresAuth)) {
    if (!AuthService.isAuthenticated()) {
      next({
        path: '/login',
      })
    } else {
      next()
    }
  } else {
    next()
  }
})
export default router
