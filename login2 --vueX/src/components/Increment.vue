<template>
  <div>
  	<h2>测试类</h2>
  	<div>
  		<input type="button" value="-" @click="deHandle" />
  		<span>{{data}}</span>
  		<input type="button" value="+" @click="addHandle">
  	</div>
  </div>
</template>

<script>
export default {
	computed: {
		data(){
			return this.$store.state.count
		}
	},
	methods: {
		addHandle(){
			// 改变状态,提交mutation addIncrement
			// this.$store.commit("addIncrement",{
			// 	n: 5
			// })

			//触发一个Action
			this.$store.dispatch("addAction")
		},
		deHandle(){
			// this.$store.commit("deIncrement")
			// this.$store.commit({
			// 	type: 'deIncrement',
			// 	de: 10
			// })

			this.$store.dispatch("deAction")
		}
	}
}
</script>

<style>
 input{
 	width: 50px;
 	height: 50px;
 }
 input[value]{
 	font-size: 20px;
 }
</style>
