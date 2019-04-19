import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'

Vue.config.productionTip = false

import { Pagination, DatePicker,Button } from 'ant-design-vue';
Vue.use(DatePicker);
Vue.use(Pagination);
Vue.use(Button);

import 'ant-design-vue/dist/antd.css';  // or 'ant-design-vue/dist/antd.less'
import 'ant-design-vue/lib/date-picker/style/css';        // for css
import 'ant-design-vue/lib/pagination/style/css';        // for css
import 'ant-design-vue/lib/button/style/css';        // for css

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
