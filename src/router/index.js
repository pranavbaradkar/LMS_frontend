import Vue from 'vue'
import VueRouter from 'vue-router'
import AuthView from '../views/AuthView'
import HomeView from '../views/HomeView'
import RegistrationView from '../views/RegistrationView'
import AuthService from '@/services/AuthService'
import AssessmentView from '../views/AssessmentView'
import SucessSubmitView from '../views/SucessSubmitView'
import FailedView from '../views/FailedView'
import InterestsView from '../views/InterestsView.vue'
import ReportView from '../views/ReportView'
import GraphReportView from '../views/GraphReportView'
import ProfileView from '../views/ProfileView'

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
    path: '/interests',
    name: 'InterestsView',
    component :InterestsView,
    meta: {
      requiresAuth: false,
    }
  },
  {
    path: '/failed',
    name: 'FailedView',
    component: FailedView,
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
    path: '/report',
    name: 'ReportView',
    component: ReportView,
    meta: {
      requiresAuth: true,
    }
  },
  {
    path: '/reportStatus',
    name: 'GraphReportView',
    component: GraphReportView,
    meta: {
      requiresAuth: true,
    }
  },
  {
    path: '/success',
    name: 'SucessSubmitView',
    component: SucessSubmitView,
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
  {
    path: '/profile',
    name: 'ProfileView',
    component: ProfileView,
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
