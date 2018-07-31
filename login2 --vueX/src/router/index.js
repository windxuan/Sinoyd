import Vue from 'vue'
import Router from 'vue-router'

import Selectexample from '@/components/selectexample'
import Increment from '@/components/Increment'

Vue.use(Router)

export default new Router({
  mode: 'history',
  routes: [
    {
      path: '/',
      name: 'sel',
      component: Selectexample
    },
    {
    	path: '/increment',
    	name: 'Increment',
    	component: Increment
    }
  ]
})
