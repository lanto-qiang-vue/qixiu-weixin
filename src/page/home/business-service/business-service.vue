<template>
  <div id="business-service">
    <mt-header title="商务服务中心">
      <router-link to="/home" slot="left">
        <mt-button icon="back"></mt-button>
      </router-link>
      <mt-button icon="more" slot="right"></mt-button>
    </mt-header>
    <div class="grid" style="padding: 15px 0;">
      <ul class="mui-row">
        <li class="mui-col-sm-3 mui-col-xs-3">
          <a href="#/business-service/business-cooperation" style="display: block;">
            <div style="width: 40px; height: 40px; margin: 0 auto;"></div>
            <p style="text-align: center; margin: 0; line-height: 35px;">在线商务</p>
          </a>
        </li>
        <li class="mui-col-sm-3 mui-col-xs-3">
          <a href="/#/business-service/business-cooperation">
            <div style="width: 40px; height: 40px; margin: 0 auto;"></div>
            <p class="text-one-cut" style="text-align: center; margin: 0; line-height: 35px;">商务合作</p>
          </a>
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

    }
  }
</script>

<style lang='less' scoped>
  #business-service {
    height: calc(100vh - 50px);
    background-color: #fff;
    .grid ul {
      li {
        margin-bottom: 10px;
      }
      li div {
        -webkit-background-size: 70% 75% !important;
        background-size: 70% 75% !important;
      }
      li:nth-child(1) div {
        background: url(../../../assets/img/home/business-service/1.png) no-repeat center center;
      }
      li:nth-child(2) div {
        background: url(../../../assets/img/home/business-service/2.png) no-repeat center center;
      }
    }
  }
</style>
