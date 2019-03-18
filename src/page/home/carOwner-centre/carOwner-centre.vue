<template>
  <div id="carOwner-center">
    <mt-header title="车主中心">
      <router-link to="/home" slot="left">
        <mt-button icon="back"></mt-button>
      </router-link>
      <mt-button icon="more" slot="right"></mt-button>
    </mt-header>
    <div class="grid" style="padding: 15px 0;">
      <ul class="mui-row">
        <li class="mui-col-sm-3 mui-col-xs-3" @click="goCarList">
          <a href="javascript:;">
            <div style="width: 40px; height: 40px; margin: 0 auto;"></div>
            <p class="text-one-cut" style="text-align: center; margin: 0; line-height: 35px;">爱车档案</p>
          </a>
        </li>

        <li class="mui-col-sm-3 mui-col-xs-3">
          <router-link to="/maintain?type=164" tag="a">
            <div style="width: 40px; height: 40px; margin: 0 auto;"></div>
            <p class="text-one-cut" style="text-align: center; margin: 0; line-height: 35px;">维修服务查询</p>
          </router-link>
        </li>

        <li class="mui-col-sm-3 mui-col-xs-3" @click="goCDF">
          <a href="javascript:;">
            <div style="width: 40px; height: 40px; margin: 0 auto;"></div>
            <p class="text-one-cut" style="text-align: center; margin: 0; line-height: 35px;">车大夫门诊</p>
          </a>
        </li>

        <li class="mui-col-sm-3 mui-col-xs-3" @click="goVisitService">
          <a href="javascript:;">
            <div style="width: 40px; height: 40px; margin: 0 auto;"></div>
            <p class="text-one-cut" style="text-align: center; margin: 0; line-height: 35px;">上门服务</p>
          </a>
        </li>

        <li class="mui-col-sm-3 mui-col-xs-3" @click="goAppointment">
          <a href="javascript:;">
            <div style="width: 40px; height: 40px; margin: 0 auto;"></div>
            <p class="text-one-cut" style="text-align: center; margin: 0; line-height: 35px;">预约服务</p>
          </a>
        </li>

        <li class="mui-col-sm-3 mui-col-xs-3" @click="goDLJY">
          <a href="javascript:;">
            <div style="width: 40px; height: 40px; margin: 0 auto;"></div>
            <p class="text-one-cut" style="text-align: center; margin: 0; line-height: 35px;">道路救援</p>
          </a>
        </li>

        <li class="mui-col-sm-3 mui-col-xs-3" @click="goCarInsurance">
          <a href="javascript:;">
            <div style="width: 40px; height: 40px; margin: 0 auto;"></div>
            <p class="text-one-cut" style="text-align: center; margin: 0; line-height: 35px;">车辆保险</p>
          </a>
        </li>

        <li class="mui-col-sm-3 mui-col-xs-3" @click="goNJFW">
          <a href="javascript:;">
            <div style="width: 40px; height: 40px; margin: 0 auto;"></div>
            <p class="text-one-cut" style="text-align: center; margin: 0; line-height: 35px;">年检服务</p>
          </a>
        </li>

        <li class="mui-col-sm-3 mui-col-xs-3" @click="goJJZ">
          <a href="javascript:;">
            <div style="width: 40px; height: 40px; margin: 0 auto;"></div>
            <p class="text-one-cut" style="text-align: center; margin: 0; line-height: 35px;">综合检测站</p>
          </a>
        </li>

        <li class="mui-col-sm-3 mui-col-xs-3" @click="goWY">
          <a href="javascript:;">
            <div style="width: 40px; height: 40px; margin: 0 auto;"></div>
            <p class="text-one-cut" style="text-align: center; margin: 0; line-height: 35px;">危运车辆维修</p>
          </a>
        </li>

        <li class="mui-col-sm-3 mui-col-xs-3" @click="goXNY">
          <a href="javascript:;">
            <div style="width: 40px; height: 40px; margin: 0 auto;"></div>
            <p class="text-one-cut" style="text-align: center; margin: 0; line-height: 35px;">新能源车维修</p>
          </a>
        </li>

        <li class="mui-col-sm-3 mui-col-xs-3" @click="goSJQY">
          <a href="javascript:;">
            <div style="width: 40px; height: 40px; margin: 0 auto;"></div>
            <p class="text-one-cut" style="text-align: center; margin: 0; line-height: 35px;">施救牵引企业</p>
          </a>
        </li>

        <!--<li class="mui-col-sm-3 mui-col-xs-3" @click="goUsedCar">-->
          <!--<div style="width: 40px; height: 40px; margin: 0 auto;"></div>-->
          <!--<p class="text-one-cut" style="text-align: center; margin: 0; line-height: 35px;">二手车</p>-->
        <!--</li>-->

        <!--<li class="mui-col-sm-3 mui-col-xs-3" @click="goResumeManage">-->
          <!--<a href="javascript:;">-->
            <!--<div style="width: 40px; height: 40px; margin: 0 auto;"></div>-->
            <!--<p class="text-one-cut" style="text-align: center; margin: 0; line-height: 35px;">简历管理</p>-->
          <!--</a>-->
        <!--</li>-->

        <!--<li class="mui-col-sm-3 mui-col-xs-3" @click="goWashCar">-->
          <!--<div style="width: 40px; height: 40px; margin: 0 auto;"></div>-->
          <!--<p style="text-align: center; margin: 0; line-height: 35px;">美容清洗</p>-->
        <!--</li>-->

        <!--<li class="mui-col-sm-3 mui-col-xs-3" @click="goOffenceSearch">-->
          <!--<div style="width: 40px; height: 40px; margin: 0 auto;"></div>-->
          <!--<p style="text-align: center; margin: 0; line-height: 35px;">违章查询</p>-->
        <!--</li>-->

        <li class="mui-col-sm-3 mui-col-xs-3" @click="goTJ">
        <a href="javascript:;">
        <div style="width: 40px; height: 40px; margin: 0 auto;"></div>
        <p style="text-align: center; margin: 0; line-height: 35px;">推介服务</p>
        </a>
        </li>

        <li class="mui-col-sm-3 mui-col-xs-3" @click="goXTS">
          <a href="javascript:;">
            <div style="width: 40px; height: 40px; margin: 0 auto;"></div>
            <p class="text-one-cut" style="text-align: center; margin: 0; line-height: 35px;">爱车小贴士</p>
          </a>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
  import { Header, Toast } from 'mint-ui';
  export default{
    name: "carOwnerCenter",

    data(){
      return {

      }
    },
    created(){

    },
    components: {

    },
    methods: {
      goAppointment(){
        this.$router.push("/maintain")
        Toast("请先在地图上选择维修企业")
      },
      goDLJY(){
        window.location.href = "https://www.shanghaiqixiu.org/phone/business/help"
      },
      goRenewal(){this.$router.push("/carOwner-centre/renewal")},
      goRoadHelp(){this.$router.push("/carOwner-centre/roadHelp")},
      goCarList(){this.$router.push("/my-car-list?showBtn=false")},
      goCDF(){this.$router.push("/doctor")},
      goOffenceSearch(){this.$router.push("/carOwner-centre/offenceSearch")},
      goVisitService(){this.$router.push("/carOwner-centre/visitService")},
      goResumeManage(){this.$router.push("/carOwner-centre/resume-manage")},
      goCarInsurance(){this.$router.push("/carOwner-centre/car-insurance")},
      goNJFW(){
        window.location.href = "https://www.shanghaiqixiu.org/phone/business/check"
      },
      goJJZ(){
        this.$router.push('/maintain?type=166')
      },
      goWY(){
        this.$router.push('/maintain?type=214')
      },
      goXNY(){
        this.$router.push('/maintain?type=215')
      },
      goSJQY(){
        this.$router.push('/maintain?type=213')
      },
      goXTS(){
        this.$router.push('/carOwner-centre/small-tips')
      },
      goWashCar(){this.$router.push("/carOwner-centre/wash-car")},
      goUsedCar(){this.$router.push("/carOwner-centre/used-car")},
      goTJ(){window.location.href='https://www.shanghaiqixiu.org/phone/business/study'},
    }
  }
</script>

<style lang='less' scoped>
  #carOwner-center {
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
        background: url(../../../assets/img/home/carOwner-centre/01.png) no-repeat center center;
      }
      li:nth-child(2) a >div {
        background: url(../../../assets/img/home/carOwner-centre/02.png) no-repeat center center;
      }
      li:nth-child(3) a >div {
        background: url(../../../assets/img/home/carOwner-centre/03.png) no-repeat center center;
      }
      li:nth-child(4) a >div {
        background: url(../../../assets/img/home/carOwner-centre/04.png) no-repeat center center;
      }
      li:nth-child(5) a >div {
        background: url(../../../assets/img/home/carOwner-centre/05.png) no-repeat center center;
      }
      li:nth-child(6) a >div {
        background: url(../../../assets/img/home/carOwner-centre/06.png) no-repeat center center;
      }
      li:nth-child(7) a >div {
        background: url(../../../assets/img/home/carOwner-centre/07.png) no-repeat center center;
      }
      li:nth-child(8) a >div {
        background: url(../../../assets/img/home/carOwner-centre/08.png) no-repeat center center;
      }
      li:nth-child(9) a >div {
        background: url(../../../assets/img/home/carOwner-centre/09.png) no-repeat center center;
      }
      li:nth-child(10) a >div {
        background: url(../../../assets/img/home/carOwner-centre/10.png) no-repeat center center;
      }
      li:nth-child(11) a >div {
        background: url(../../../assets/img/home/carOwner-centre/11.png) no-repeat center center;
      }
      li:nth-child(12) a >div {
        background: url(../../../assets/img/home/carOwner-centre/12.png) no-repeat center center;
      }
      li:nth-child(13) a >div {
        background: url(../../../assets/img/home/repair-company/08.png) no-repeat center center;
      }
      li:nth-child(14) a div {
        background: url(../../../assets/img/home/carOwner-centre/14.png) no-repeat center center;
      }
    }
  }
</style>
