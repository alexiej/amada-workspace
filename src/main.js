import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import VuePageTransition from 'vue-page-transition'
import './plugins/fontawesome/js/all.min.js';

Vue.config.productionTip = false;


Vue.use(VuePageTransition)


new Vue({
  router,
  store,
  render: h => h(App)
}).$mount("#app");
