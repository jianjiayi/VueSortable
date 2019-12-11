/*
 * @Descripttion:
 * @version:
 * @Author: big bug
 * @Date: 2019-12-10 19:13:54
 * @LastEditTime: 2019-12-11 09:54:14
 */
import Vue from 'vue'
import Router from 'vue-router'
import HelloWorld from '@/components/HelloWorld'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'HelloWorld',
      component: HelloWorld
    },
  ]
})
