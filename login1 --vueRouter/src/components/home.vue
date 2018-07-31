<template>
  <div class="main">
    <div class="home-header">
      <div class="threed">远大信息有限公司</div>
      <div class="portrait" :class={portraitLogin:isLogin}>
        <router-link v-if="!isLogin" to="/login" tag="span">登录</router-link>
        <img  v-if="isLogin" src="../assets/social.png" height="50px" width="50px" alt="">
      </div>

    </div>
    <div class="phrase">
      欢迎来到管理系统
    </div>
    <div class="btns">
      <router-link to="/project" tag="div" class=" trans">我的项目</router-link>
      <router-link to="/personal" tag="div" class=" trans">我的文档</router-link>
    </div>
  </div>
</template>

<script>
  export default {
    name: 'home',
    data() {
      return {
        isLogin: false
      }
    },
    created(){
      // 拿到登录信息
      // 有数据则用this.$ajax请求到的数据
      let info = this.$local.fetch('admin')

      this.isLogin = info.login;
    }
  }
</script>
<style>

</style>
