<template>
  <div id="usedCar">
    <ul class="zhengwu_c" id="databody">
      <li><a href="#">上海永达汽车浦东销售服务有限公司介绍</a><span></span></li>
      <li><a href="#">上海万兴汽车实业有限公司简介</a><span></span></li>
      <li><a href="#">上海东昌汽车服务有限公司简介</a><span></span></li>
    </ul>
  </div>
</template>

<script>
  export default{
    name: "usedCar",

    data(){
      return {

      }
    },
    created(){

    },
    components: {

    },
    methods: {

    }
  }
</script>

<style lang='less' scoped>
  #usedCar {
    height: calc(100vh - 50px);
    background-color: #fff;
    overflow: auto;
    padding: 10px;
    ul li {
      margin-bottom: 5px;
    }
  }
</style>
