import Vue from 'vue';
import App from './App.vue';
import router from './router';
import store from './store';
import vuetify from './plugins/vuetify';
import Mixpanel from 'mixpanel-browser';

Vue.config.productionTip = false;

Mixpanel.init('8df9eaa72e6170c56e2868056fe86a1a', {
  debug: true
});

Vue.mixin({
  beforeCreate() {
    this.$mixpanel = Mixpanel;
  }
});

new Vue({
  router,
  store,
  vuetify,
  render: h => h(App)
}).$mount('#app');
