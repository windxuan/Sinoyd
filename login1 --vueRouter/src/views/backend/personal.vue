<template>
  <div class="personal">
    <div class="personal-nav">
      <ul class="main-menu">
        <li>
          <router-link :to="{path:'#link1'}">Link1</router-link>
          <ul class="nav-dropdown">
            <li>
              <router-link :to="{path:'#fristLink1'}">Link1-frist</router-link>
            </li>
            <li>
              <router-link :to="{path:'#fristLink2'}">Link1-second</router-link>
            </li>
            <li>
              <router-link :to="{path:'#fristLink3'}">Link1-thrid</router-link>
            </li>
          </ul>
        </li>
        <li>
          <router-link :to="{path:'#link2'}">Link2</router-link>
          <ul class="nav-dropdown">
            <li>
              <router-link :to="{path:'#fristLink2'}">Link2-frist</router-link>
            </li>
            <li>
              <router-link :to="{path:'#secondLink2'}">Link2-second</router-link>
            </li>
            <li>
              <router-link :to="{path:'#thridLink2'}">Link2-thrid</router-link>
            </li>
          </ul>
        </li>
      </ul>
    </div>
    <div class="personal-view">
      <personal-view></personal-view>
    </div>
  </div>
</template>

<script>
  import personalView from '@/views/backend/personal-view'
  import TWEEN from 'tween.js'

  export default {
    components: {
      personalView
    },
    beforeRouteEnter(to,from,next){
      next((vm)=>{
        vm.animate(to)
      })
    },
    beforeRouteUpdate(to,from,next){
      this.animate(to)
      next();
    },
    methods: {
      animate(to){

        function animateFunc(time) {
          requestAnimationFrame(animateFunc)
          TWEEN.update(time)
        }

        if (to.hash) {
          var el = document.getElementById(to.hash.slice(1))
          var doc = document.getElementsByClassName("personal")[0];

        // 判断是否有这个元素
          if(el) {
            new TWEEN.Tween({
              number: personal.scrollTop
            })
              .to({
                number: el.offsetTop
              },500)
              .onUpdate(function(){
                personal.scrollTop = this.number.toFixed(0)
              })
              .start()
          }
        }
      }
    }
  }
</script>
<style>

</style>
