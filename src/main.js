/*
 * @Descripttion:
 * @version:
 * @Author: big bug
 * @Date: 2019-12-10 19:13:54
 * @LastEditTime: 2019-12-10 19:29:55
 */
// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import Sortable from 'vue-sortable'

import ElementUI from 'element-ui';

import 'element-ui/lib/theme-chalk/index.css';

Vue.use(ElementUI);

Vue.use(Sortable)

Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>'
})
