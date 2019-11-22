// const { app, BrowserWindow } = require('electron')
import Vue from 'vue'
import App from './App.vue'
import store from './store'
import './plugins/fontawesome/js/all.js'

Vue.config.productionTip = false

new Vue({
  store,
  render: h => h(App)
}).$mount('#app')


