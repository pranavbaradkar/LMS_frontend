import Vue from 'vue';
import App from './App.vue';
import router from './router';
import store from './store';
import vuetify from './plugins/vuetify';
import Mixpanel from 'mixpanel-browser';
import GmapVue from 'gmap-vue'
import VueCountryCode from "vue-country-code-select";
Vue.use(VueCountryCode);
Vue.use(
  GmapVue, {
    load: {
      // [REQUIRED] This is the unique required value by Google Maps API
      key: 'AIzaSyB6VKjg8YZbX4kymR-bgUMEgQQKzG4iRJ8',
      libraries: 'places',
      customCallback: 'MyCustomCallback',
    },
    installComponents: true,
    dynamicLoad: false,
  }
);

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
