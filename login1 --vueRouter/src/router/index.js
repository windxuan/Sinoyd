import Vue from 'vue'
import Router from 'vue-router'

import home from '@/components/home'

import login from '@/components/login'
import layout from '@/views/layout'
import personal from '@/views/backend/personal'
import project from '@/views/backend/project'
import workbench from '@/views/backend/workbench'

Vue.use(Router)

let router = new Router({
  mode: 'history',
  linkActiveClass: 'is-active',
  routes: [
    {
      path: '/',
      name: 'home',
      component: home
    },
    {
      path: '/management',
      name: 'management',
      component: layout,
      children: [
      	{
      		path: '/project',
      		name: 'project',
      		component: project,
      		meta: {
      			login: true
      		}
      	},
      	{
      		path: '/workbench',
      		name: 'workbench',
      		component: workbench,
      		meta: {
      			login: true
      		}
      	},
      	{
      		path: '/personal',
      		name: 'personal',
      		component: personal,
      		meta: {
      			login: false
      		}
      	}
      ]
    },
    {
    	path: '/login',
    	name: 'login',
    	component: login
    },
    {
    	path: '*',
    	redirect: '/'
    }
  ]
})

router.beforeEach((to,from,next) => {

	// 判断登陆条件，只要有一项满足，返回true
	let bl = to.matched.some(function(item){
		return item.meta.login
	})

	// 判断是否已经登陆
	if (bl) {
	  let info = router.app.$local.fetch("admin")

	  // 已经登陆
	  if (info.login) {
	  	next()
	  }else {	//路由拦截
	  	router.push({
	  		path: '/login',
	  		query: {
	  			redirect: to.path.slice(1)
	  		}
	  	})
	  }

	}else {
	  next()
	}
})



export default router
