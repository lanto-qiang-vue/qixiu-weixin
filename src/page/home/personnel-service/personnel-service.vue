<template>
  <div id="personnel-service">
    <mt-header title="人才服务中心">
      <router-link to="/home" slot="left">
        <mt-button icon="back"></mt-button>
      </router-link>
      <mt-button icon="more" slot="right"></mt-button>
    </mt-header>
    <div class="grid" style="padding: 15px 0;">
      <ul class="mui-row">
        <!--<li class="mui-col-sm-3 mui-col-xs-3">-->
          <!--<a href="javascript:;">-->
            <!--<div style="width: 40px; height: 40px; margin: 0 auto;"></div>-->
            <!--<p class="text-one-cut" style="text-align: center; margin: 0; line-height: 35px;">找工作</p>-->
          <!--</a>-->
        <!--</li>-->
        <!--<li class="mui-col-sm-3 mui-col-xs-3">-->
          <!--<a href="javascript:;">-->
            <!--<div style="width: 40px; height: 40px; margin: 0 auto;"></div>-->
            <!--<p class="text-one-cut" style="text-align: center; margin: 0; line-height: 35px;">岗位发布</p>-->
          <!--</a>-->
        <!--</li>-->
        <!--<li class="mui-col-sm-3 mui-col-xs-3" v-if="role==='车主' || role==='未登录'" @click="goDeliveryResume">-->
          <!--<a href="javascript:;">-->
            <!--<div style="width: 40px; height: 40px; margin: 0 auto;"></div>-->
            <!--<p class="text-one-cut" style="text-align: center; margin: 0; line-height: 35px;">投放简历</p>-->
          <!--</a>-->
        <!--</li>-->
        <!--<li class="mui-col-sm-3 mui-col-xs-3" v-if="role==='维修企业' || role==='未登录'">-->
          <!--<a href="javascript:;">-->
            <!--<div style="width: 40px; height: 40px; margin: 0 auto;"></div>-->
            <!--<p class="text-one-cut" style="text-align: center; margin: 0; line-height: 35px;">简历搜索</p>-->
          <!--</a>-->
        <!--</li>-->
        <li class="mui-col-sm-3 mui-col-xs-3" @click="goPX">
          <a href="javascript:;">
            <div style="width: 40px; height: 40px; margin: 0 auto;"></div>
            <p class="text-one-cut" style="text-align: center; margin: 0; line-height: 35px;">培训需求</p>
          </a>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
  import { Header } from 'mint-ui';
  export default{
    name: "personnelService",
    data(){
      return {
        role: localStorage.getItem("USERINFO")?JSON.parse(localStorage.getItem("USERINFO")).userRole : "未登录"
      }
    },
    created(){

    },
    components: {

    },
    mounted(){
      console.log(this.role);
    },
    methods: {
      goDeliveryResume(){this.$router.push("/personnel-service/delivery-resume")},
      goExcellentCompany(){this.$router.push("/personnel-service/excellent-company")},
      goPX(){window.location.href='https://www.shanghaiqixiu.org/phone/business/train'}
    }
  }
</script>

<style lang='less' scoped>
  #personnel-service {
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
        background: url(../../../assets/img/home/personnel-service/3.png) no-repeat center center;
      }
      li:nth-child(2) a >div {
        background: url(../../../assets/img/home/personnel-service/1.png) no-repeat center center;
      }
      li:nth-child(3) a >div {
        background: url(../../../assets/img/home/personnel-service/6.png) no-repeat center center;
      }
      li:nth-child(4) a >div {
        background: url(../../../assets/img/home/personnel-service/4.png) no-repeat center center;
      }
      li:nth-child(5) a >div {
        background: url(../../../assets/img/home/personnel-service/2.png) no-repeat center center;
      }
    }
  }
</style>
