<template>
  <div id="workHope">
    <ul class="mui-table-view">
      <li class="mui-table-view-cell">
        <a class="mui-navigate-right">
          <div class="fr" style="margin-right: 20px; color: #999;">10k-15k</div>
          <label>期望薪资</label>
        </a>
      </li>
      <li class="mui-table-view-cell">
        <a class="mui-navigate-right">
          <div class="fr" style="margin-right: 20px; color: #999;">不限</div>
          <label>期望职位</label>
        </a>
      </li>
      <li class="mui-table-view-cell">
        <a class="mui-navigate-right">
          <div class="fr" style="margin-right: 20px; color: #999;">上海</div>
          <label>工作地方</label>
        </a>
      </li>
      <li class="mui-table-view-cell">
        <a class="mui-navigate-right">
          <div class="fr" style="margin-right: 20px; color: #999;">全职</div>
          <label>工作类型</label>
        </a>
      </li>
    </ul>
  </div>
</template>

<script>
  export default{
    name: "workHope",

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
  #workHope {
    height: calc(100vh);
    background-color: #fff;
    li a:after {
      color: rgb(38, 162, 255);
    }
  }
</style>
