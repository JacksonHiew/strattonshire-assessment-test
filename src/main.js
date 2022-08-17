import Vue from 'vue'

import App from './App.vue'
import router from './router/index';
import vuetify from './plugins/vuetify'
import firebase from './plugins/firebase-config';

Vue.config.productionTip = false
if ('serviceWorker' in navigator) {
  navigator.serviceWorker.register("./firebase-messaging-sw.js");
}

new Vue({
  router,
  firebase,
  vuetify,
  render: h => h(App)
}).$mount('#app')
