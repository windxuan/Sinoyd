import Vue from 'vue'
import Router from 'vue-router'

import Selectexample from '@/components/selectexample'
import Increment from '@/components/Increment'

import Shoppingcart from '@/components/shoppingCart'

Vue.use(Router)

export default new Router({
  mode: 'history',
  routes: [
    {
      path: '/',
      name: 'shoppingcart',
      component: Shoppingcart
    },
    {
    	path: '/increment',
    	name: 'Increment',
    	component: Increment
    },
    {
      path: '/sel',
      name: 'selectexample',
      component: Selectexample
    }
  ]
})
