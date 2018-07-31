<template>
  <section class="warp">
    <h2>vuex学习总结</h2>
  	<div class="searchIpt clearFix">
  		<!-- 组件一 -->
  	  <select-input :title="title" :is-show.sync="listShow"></select-input>
  	  <!-- 组件二 -->
	  <list v-show="listShow" :data="listData" @changeTitle="titleHandle"></list>
  	</div>
  </section>
</template>

<script>

// 引入组件
import selectInput from '@/components/selectInput'
import list from '@/components/list'

// data数据/可利用ajax请求到数据
let listData = [
	{
		title: 'javascript'
	},
	{
		title: 'html+css'
	},
	{
		title: 'angularjs'
	},
	{
		title: 'vuejs'
	},
	{
		title: 'react'
	},
	{
		title: 'jQuery'
	},
]

export default {
	// 名字
  name: 'selectexample',
  // 数据
  data () {
    return {
    	listShow: false,
    	listData: listData,
    	title: ''
    }
  },
  methods: {
  	titleHandle(title){
  	  console.log(title)
  	  this.title = title
  	}
  },
  // 子组件
  components: {
  	selectInput,
  	list
  }
}
</script>

<style>

</style>
