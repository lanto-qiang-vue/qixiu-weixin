<template>
  <div id="repair-company">
    <mt-header title="政务服务中心">
      <a @click="$router.go(-1)" slot="left">
        <mt-button icon="back"></mt-button>
      </a>
      <mt-button icon="more" slot="right"></mt-button>
    </mt-header>
    <div class="grid" style="padding: 15px 0;">
      <ul class="mui-row">
        <li class="mui-col-sm-3 mui-col-xs-3" @click="goDetail('10281001','法律法规')">
          <a href="javascript:;">
            <div style="width: 40px; height: 40px; margin: 0 auto;"></div>
            <p class="text-one-cut" style="text-align: center; margin: 0; line-height: 35px;">法律法规</p>
          </a>
        </li>
        <li class="mui-col-sm-3 mui-col-xs-3" @click="goDetail('10281002', '管理规范')">
          <a href="javascript:;">
            <div style="width: 40px; height: 40px; margin: 0 auto;"></div>
            <p class="text-one-cut" style="text-align: center; margin: 0; line-height: 35px;">管理规范</p>
          </a>
        </li>
        <li class="mui-col-sm-3 mui-col-xs-3" @click="goDetail('10281003','行业政策')">
          <a href="javascript:;">
            <div style="width: 40px; height: 40px; margin: 0 auto;"></div>
            <p class="text-one-cut" style="text-align: center; margin: 0; line-height: 35px;">行业政策</p>
          </a>
        </li>
        <li class="mui-col-sm-3 mui-col-xs-3" @click="goDetail('10281004','技术标准')">
          <a href="javascript:;">
            <div style="width: 40px; height: 40px; margin: 0 auto;"></div>
            <p class="text-one-cut" style="text-align: center; margin: 0; line-height: 35px;">技术标准</p>
          </a>
        </li>
        <li class="mui-col-sm-3 mui-col-xs-3" @click="goDetail('10281005','办事指南')">
          <a href="javascript:;">
            <div style="width: 40px; height: 40px; margin: 0 auto;"></div>
            <p class="text-one-cut" style="text-align: center; margin: 0; line-height: 35px;">办事指南</p>
          </a>
        </li>
        <li class="mui-col-sm-3 mui-col-xs-3" @click="goDetail('10281006','管理职责')">
          <a href="javascript:;">
            <div style="width: 40px; height: 40px; margin: 0 auto;"></div>
            <p class="text-one-cut" style="text-align: center; margin: 0; line-height: 35px;">管理职责</p>
          </a>
        </li>
        <li class="mui-col-sm-3 mui-col-xs-3" @click="goDetail('10281007','行业概况')">
          <a href="javascript:;">
            <div style="width: 40px; height: 40px; margin: 0 auto;"></div>
            <p class="text-one-cut" style="text-align: center; margin: 0; line-height: 35px;">行业概况</p>
          </a>
        </li>
        <li class="mui-col-sm-3 mui-col-xs-3" @click="goDetail('10281010','行业文明建设')">
          <a href="javascript:;">
            <div style="width: 40px; height: 40px; margin: 0 auto;"></div>
            <p class="text-one-cut" style="text-align: center; margin: 0; line-height: 35px;">行业文明建设</p>
          </a>
        </li>
        <li class="mui-col-sm-3 mui-col-xs-3" @click="goDetail('10281009','优质企业')">
          <a href="javascript:;">
            <div style="width: 40px; height: 40px; margin: 0 auto;"></div>
            <p class="text-one-cut" style="text-align: center; margin: 0; line-height: 35px;">优质企业</p>
          </a>
        </li>
        <li class="mui-col-sm-3 mui-col-xs-3">
          <a href="/#/my-car-list">
            <div style="width: 40px; height: 40px; margin: 0 auto;"></div>
            <p class="text-one-cut" style="text-align: center; margin: 0; line-height: 35px;">电子健康档案</p>
          </a>
        </li>
        <li class="mui-col-sm-3 mui-col-xs-3" @click="goDetail('10281017','违法违规公告')">
          <a href="javascript:;">
            <div style="width: 40px; height: 40px; margin: 0 auto;"></div>
            <p class="text-one-cut" style="text-align: center; margin: 0; line-height: 35px;">违法违规公告</p>
          </a>
        </li>
        <li class="mui-col-sm-3 mui-col-xs-3" @click="goDetail('10281016','质量信誉考核')">
          <a href="javascript:;">
            <div style="width: 40px; height: 40px; margin: 0 auto;"></div>
            <p class="text-one-cut" style="text-align: center; margin: 0; line-height: 35px;">质量信誉考核</p>
          </a>
        </li>
        <!--<li class="mui-col-sm-3 mui-col-xs-3">-->
        <!--<div style="width: 40px; height: 40px; margin: 0 auto;"></div>-->
        <!--<p style="text-align: center; margin: 0; line-height: 35px;">企业合格证</p>-->
        <!--</li>-->
        <!--<li class="mui-col-sm-3 mui-col-xs-3">-->
        <!--<div style="width: 40px; height: 40px; margin: 0 auto;"></div>-->
        <!--<p class="text-one-cut"  style="text-align: center; margin: 0; line-height: 35px;">客货车辆管理</p>-->
        <!--</li>-->
      </ul>
    </div>
  </div>
</template>

<script>
  import { Header } from 'mint-ui';
  export default{
    name: "repairCompany",

    data(){
      return {

      }
    },
    created(){
      // this.axios({
      //   url: '/article/category/list/'+ localStorage.getItem("SYSTEMTOKEN"),
      //   method: "get"
      // })
      //   .then(res=>{
      //     console.log(res);
      //   })
    },
    components: {

    },
    methods: {
      goDetail(id, name){
        this.$router.push({
          path: '/government-service/government-service-list',
          query: {
            id,
            name
          }
        })
      }
    }
  }
</script>

<style lang='less' scoped>
  #repair-company {
    height: calc(100vh - 50px);
    background-color: #fff;
    .grid ul {
      li {
        margin-bottom: 10px;
      }
      li a >div {
        -webkit-background-size: 70% 75% !important;
        background-size: 70% 75% !important;
      }
      li:nth-child(1) a >div {
        background: url(../../../assets/img/home/government-service/1.png) no-repeat center center;
      }
      li:nth-child(2) a >div {
        background: url(../../../assets/img/home/government-service/2.png) no-repeat center center;
      }
      li:nth-child(3) a >div {
        background: url(../../../assets/img/home/government-service/3.png) no-repeat center center;
      }
      li:nth-child(4) a >div {
        background: url(../../../assets/img/home/government-service/4.png) no-repeat center center;
      }
      li:nth-child(5) a >div {
        background: url(../../../assets/img/home/government-service/5.png) no-repeat center center;
      }
      li:nth-child(6) a >div {
        background: url(../../../assets/img/home/government-service/6.png) no-repeat center center;
      }
      li:nth-child(7) a >div {
        background: url(../../../assets/img/home/government-service/7.png) no-repeat center center;
      }
      li:nth-child(8) a >div {
        background: url(../../../assets/img/home/government-service/8.png) no-repeat center center;
      }
      li:nth-child(9) a >div {
        background: url(../../../assets/img/home/government-service/9.png) no-repeat center center;
      }
      li:nth-child(10) a >div {
        background: url(../../../assets/img/home/government-service/copy10.png) no-repeat center center;
      }
      li:nth-child(11) a >div {
        background: url(../../../assets/img/home/government-service/11.png) no-repeat center center;
      }
      li:nth-child(12) a >div {
        background: url(../../../assets/img/home/government-service/12.png) no-repeat center center;
      }
      li:nth-child(13) a >div {
        background: url(../../../assets/img/home/government-service/13.png) no-repeat center center;
      }
      li:nth-child(14) a >div {
        background: url(../../../assets/img/home/government-service/14.png) no-repeat center center;
      }
    }
  }
</style>
