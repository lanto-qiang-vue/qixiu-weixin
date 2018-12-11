<template>
  <div id="promotion">
    <div class="examine">
      <ul class="zhengwu_c" id="databody">
        <li><a href="http://www.devsz.shanghaiqixiu.org:8080/business/study1">上海云之驾科技股份有限公司</a><span></span></li>
        <li><a href="http://www.devsz.shanghaiqixiu.org:8080/business/study2">安亭驾校简介</a><span></span></li>
        <li><a href="http://www.devsz.shanghaiqixiu.org:8080/business/study3">翔茂驾校风采</a><span></span></li>
      </ul>
    </div>
  </div>
</template>

<script>
  export default{
    name: "promotion",

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
  #promotion {
    height: calc(100vh - 50px);
    background-color: #fff;
    padding: 10px;
    overflow: auto;
    ul li {
      margin-bottom: 5px;
    }
  }
</style>
