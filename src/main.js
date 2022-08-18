import Vue from "vue";

import App from "./App.vue";
import router from "./router/index";
import vuetify from "./plugins/vuetify";
import firebase from "./plugins/firebase-config";
import firestore from "./plugins/firestore-config";
import messaging from "./plugins/fcm-config";
import axios from "./plugins/axios-config";

Vue.config.productionTip = false;
Vue.prototype.$firebaseapp = firebase;
Vue.prototype.$firestoredb = firestore;
Vue.prototype.$messaging = messaging;
Vue.prototype.$axios = axios;

if ("serviceWorker" in navigator) {
  navigator.serviceWorker.register("./firebase-messaging-sw.js");
}

new Vue({
  router,
  vuetify,
  render: (h) => h(App),
}).$mount("#app");
