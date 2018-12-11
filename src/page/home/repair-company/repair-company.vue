<template>
  <div id="repair-company">
    <mt-header title="汽修企业服务中心">
      <router-link to="/home" slot="left">
        <mt-button icon="back"></mt-button>
      </router-link>
      <mt-button icon="more" slot="right"></mt-button>
    </mt-header>
    <div class="grid" style="padding: 15px 0;">
      <ul class="mui-row">
        <!--<li class="mui-col-sm-3 mui-col-xs-3" @click="goHealthRecord">-->
          <!--<a href="javascript:;">-->
            <!--<div style="width: 40px; height: 40px; margin: 0 auto;"></div>-->
            <!--<p style="text-align: center; margin: 0; line-height: 35px;">维修记录</p>-->
          <!--</a>-->
        <!--</li>-->

        <!--<li class="mui-col-sm-3 mui-col-xs-3" @click="goRepairCertificate">-->
          <!--<a href="javascript:;">-->
            <!--<div style="width: 40px; height: 40px; margin: 0 auto;"></div>-->
            <!--<p style="text-align: center; margin: 0; line-height: 35px;">维修合格证</p>-->
          <!--</a>-->
        <!--</li>-->

        <!--<li class="mui-col-sm-3 mui-col-xs-3" @click="goPersonnelDemand">-->
          <!--<a href="javascript:;">-->
            <!--<div style="width: 40px; height: 40px; margin: 0 auto;"></div>-->
            <!--<p style="text-align: center; margin: 0; line-height: 35px;">人才招聘</p>-->
          <!--</a>-->
        <!--</li>-->

        <!--<li class="mui-col-sm-3 mui-col-xs-3" @click="goOpenBusiness">-->
          <!--<a href="javascript:;">-->
            <!--<div style="width: 40px; height: 40px; margin: 0 auto;"></div>-->
            <!--<p style="text-align: center; margin: 0; line-height: 35px;">开停业咨询</p>-->
          <!--</a>-->
        <!--</li>-->

        <li class="mui-col-sm-3 mui-col-xs-3" >
          <a href="http://hxx.hoxiuxiu.com/">
            <div style="width: 40px; height: 40px; margin: 0 auto;"></div>
            <p class="text-one-cut" style="text-align: center; margin: 0; line-height: 35px;">门店管理</p>
          </a>
        </li>

        <li class="mui-col-sm-3 mui-col-xs-3" @click="goPJ">
          <a href="javascript:;">
            <div style="width: 40px; height: 40px; margin: 0 auto;"></div>
            <p class="text-one-cut" style="text-align: center; margin: 0; line-height: 35px;">配件需求</p>
          </a>
        </li>

        <li class="mui-col-sm-3 mui-col-xs-3" @click="goQB">
          <a href="javascript:;">
            <div style="width: 40px; height: 40px; margin: 0 auto;"></div>
            <p class="text-one-cut" style="text-align: center; margin: 0; line-height: 35px;">汽保设备需求</p>
          </a>
        </li>

        <li class="mui-col-sm-3 mui-col-xs-3" @click="goJS">
          <a href="javascript:;">
            <div style="width: 40px; height: 40px; margin: 0 auto;"></div>
            <p style="text-align: center; margin: 0; line-height: 35px;">技术需求</p>
          </a>
        </li>

        <!--<li class="mui-col-sm-3 mui-col-xs-3" @click="goTJ">-->
          <!--<a href="javascript:;">-->
            <!--<div style="width: 40px; height: 40px; margin: 0 auto;"></div>-->
            <!--<p style="text-align: center; margin: 0; line-height: 35px;">推介服务</p>-->
          <!--</a>-->
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

    },
    components: {

    },
    methods: {
      goPersonnelDemand(){this.$router.push("/repair-company/personnel-demand")},
      goOpenBusiness(){this.$router.push("/repair-company/open-business")},
      goPromotion(){this.$router.push("/repair-company/promotion")},
      goHealthRecord(){this.$router.push("/repair-company/health-record")},
      goPartsNeeding(){this.$router.push("/repair-company/parts-needing")},
      goMaintenanceEquipment(){this.$router.push("/repair-company/maintenance-equipment")},
      goTechnologyInfo(){this.$router.push("/repair-company/technology-info")},
      goRepairCertificate(){this.$router.push("/repair-company/repair-certificate")},


      goPJ(){window.location.href='https://www.shanghaiqixiu.org/phone/business/parts'},
      goQB(){window.location.href='https://www.shanghaiqixiu.org/phone/business/equip'},
      goJS(){this.$router.push('/doctor')},
      // goTJ(){window.location.href='https://www.shanghaiqixiu.org/phone/business/study'},
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
        background-size: 80% auto !important;
      }
      li:nth-child(1) a >div {
        background: url(../../../assets/img/home/repair-company/门店管理.png) no-repeat center center;
      }
      li:nth-child(2) a >div {
        background: url(../../../assets/img/home/repair-company/05.png) no-repeat center center;
      }
      li:nth-child(3) a >div {
        background: url(../../../assets/img/home/repair-company/06.png) no-repeat center center;
      }
      li:nth-child(4) a >div {
        background: url(../../../assets/img/home/repair-company/07.png) no-repeat center center;
      }
      li:nth-child(5) a >div {
        background: url(../../../assets/img/home/repair-company/05.png) no-repeat center center;
      }
      li:nth-child(6) a >div {
        background: url(../../../assets/img/home/repair-company/06.png) no-repeat center center;
      }
      li:nth-child(7) a >div {
        background: url(../../../assets/img/home/repair-company/07.png) no-repeat center center;
      }
      li:nth-child(8) a >div {
        background: url(../../../assets/img/home/repair-company/08.png) no-repeat center center;
      }
    }
  }
</style>
