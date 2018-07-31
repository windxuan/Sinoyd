<template>
  <div class="clearFix">
	<input
	  readonly="readonly"
	  class="keyWord"
	  @click="showListHandle"
	  :value="title"
	/>
	<input type="button" value="GO">
	<span></span>
  </div>
</template>

<script>
export default {
  name: 'selectInput',
  props: ['isShow',"title"],	//获取到bealean值为false
  computed:{
  	initShow(){
  	  return this.isShow
  	}
  },
  methods: {
  	showListHandle(){
  	  this.$emit("update:isShow",!this.initShow)
  	}
  }
}
</script>

<style scoped>

</style>
