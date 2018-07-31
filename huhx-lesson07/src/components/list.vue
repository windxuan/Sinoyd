<template>
  <ul class="list">
	<li v-for="item,index in data" @click="getTitleHandle(item.title)" :key="index">{{item.title}}</li>
  </ul>
</template>

<script>
export default {
  props:["data"],	//接收数据
  methods:{
  	getTitleHandle(title){
  	  this.$emit('changeTitle',title)
  	}
  }
}
</script>

<style scoped>

</style>
