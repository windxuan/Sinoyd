<template>
  <div class='personal-right'>
    <h2>
    <a href="#link1" id='link1'>Link1 </a>
    </h2>
    <hr/>
    <h3>
      <a  id="fristLink1" href="#fristLink1">Link1-frist</a>
    </h3>
    <div>
      Link1-content-01
    </div>
    <h3>
      <a id="fristLink2" href="#fristLink2">Link1-second</a>
    </h3>
    <div>
      Link1-content-02
    </div>
    <h3>
      <a id="fristLink3" href="#fristLink3">Link1-third</a>
    </h3>
    <div>
      Link1-content-03
    </div>
    <h2>
      <a href="#link2"  id='link2'>Link2</a>
    </h2>
    <hr/>
    <h3>
      <a  id="fristLink2" href="#fristLink2">Link2-frist</a>
    </h3>
    <div>
     Link2-content-04
    </div>
    <h3>
      <a  id="secondLink2" href="#secondLink2">Link2-second</a>
    </h3>
    <div>
      Link2-content-05
    </div>
    <h3>
      <a  id="thridLink2" href="#thridLink2">Link2-third</a>
    </h3>
    <div>
     Link2-content-06
    </div>
  </div>
</template>

<script>
  export default {
    name: 'search',
    data () {
      return {}
    }
  }
</script>
<style>
.personal-right div{
  height: 500px;
}
h3 {
  margin-top: 20px;
}
h2 a,h3 a {
  padding-top: 10px;
  position: relative;
}
</style>
