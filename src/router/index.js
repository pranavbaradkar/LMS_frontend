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
import PreMain from '../views/PreMain'
import SlotSelection from '../views/SlotSelectionView'
import Pcad from '../views/PcadView'
import ScreeningStatus from '../views/ScreeningStatusView'
import ResultView from '../views/ResultView'
import MainScreeningSetupStatus from '../views/MainScreeningSetupStatusView';
import DemoVideo from '../views/DemoVideoView';

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
      requiresAuth: true,
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
  {
    path: '/assessment/mains/setup',
    name: 'PreMain',
    component: PreMain,
    meta: {
      requiresAuth: true,
    }
  },
  {
    path: '/assessment/mains/slot',
    name: 'SlotSelection',
    component: SlotSelection,
    meta: {
      requiresAuth: true,
    }
  },
  {
    path: '/assessment/:id/mains/pacd',
    name: 'Pcad',
    component: Pcad,
    meta: {
      requiresAuth: true,
    }
  },
  {
    path: '/assessment/:id/status',
    name: 'ScreeningStatus',
    component: ScreeningStatus,
    meta: {
      requiresAuth: true,
    }
  },
  {
    path: '/assessment/:id/result',
    name: 'ResultView',
    component: ResultView,
    meta: {
      requiresAuth: true,
    }
  },
  {
    path: '/pre/assessment/mains',
    name: 'mainsSet',
    component: MainScreeningSetupStatus,
    meta: {
      requiresAuth: true,
    }
  },
  {
    path: '/assessment/mains/demo',
    name: 'mainsSet',
    component: DemoVideo,
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
