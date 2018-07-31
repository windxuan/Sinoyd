import Vue from 'vue'
import Router from 'vue-router'

import home from '@/components/home'
import notfound from '@/components/notfound'

Vue.use(Router)

let router = new Router({
  mode: 'history',
  routes: [
    {
      path: '/',
      name: 'home',
      component: home
    },
    {
      path: '/notfound',
      name: 'notfound',
      component: notfound
    },
    {
      path: '*',
      redirect: '/'
    },
  ]
})

export default router
