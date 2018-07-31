// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
import App from './App'
import router from './router'
import store from './store'

Vue.config.productionTip = false

Vue.use(ElementUI);

import '@/assets/fonts/iconfont.css'

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,					//注入到根实例当中
  store,
  components: { App },
  template: '<App/>'
})
