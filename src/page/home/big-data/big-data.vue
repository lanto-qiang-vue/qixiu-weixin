<template>
  <div id="big-data">
    <mt-header title="大数据服务中心">
      <router-link to="/home" slot="left">
        <mt-button icon="back"></mt-button>
      </router-link>
      <mt-button icon="more" slot="right"></mt-button>
    </mt-header>
    <div class="grid" style="padding: 15px 0;">
      <ul class="mui-row">
        <li class="mui-col-sm-3 mui-col-xs-3" @click="goProject">
          <div style="width: 40px; height: 40px; margin: 0 auto;"></div>
          <p style="text-align: center; margin: 0; line-height: 35px;">二手车服务</p>
        </li>
        <li class="mui-col-sm-3 mui-col-xs-3" @click="goBusiness">
          <div style="width: 40px; height: 40px; margin: 0 auto;"></div>
          <p class="text-one-cut" style="text-align: center; margin: 0; line-height: 35px;">保险数据服务</p>
        </li>

      </ul>
    </div>
  </div>
</template>

<script>
  import { Header } from 'mint-ui';
  export default{
    name: "associationService",

    data(){
      return {

      }
    },
    created(){

    },
    components: {

    },
    methods: {
      goProject(){this.$router.push("/big-data/project")},
      goBusiness(){this.$router.push("/big-data/business")},
    }
  }
</script>

<style lang='less' scoped>
  #big-data {
    height: calc(100vh - 50px);
    background-color: #fff;
    .grid ul {
      li {
        margin-bottom: 10px;
      }
      li >div {
        -webkit-background-size: 70% 75% !important;
        background-size: 70% 75% !important;
      }
      li:nth-child(1) >div {
        background: url(../../../assets/img/home/big-data/01.png) no-repeat center center;
      }
      li:nth-child(2) >div {
        background: url(../../../assets/img/home/big-data/02.png) no-repeat center center;
      }
    }
  }
</style>
