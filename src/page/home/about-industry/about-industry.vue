<template>
  <div id="about-industry">
    <mt-header title="汽修相关产业服务中心">
      <router-link to="/home" slot="left">
        <mt-button icon="back"></mt-button>
      </router-link>
      <mt-button icon="more" slot="right"></mt-button>
    </mt-header>
    <div class="grid" style="padding: 15px 0;">
      <ul class="mui-row">
        <li class="mui-col-sm-3 mui-col-xs-3" @click="go1">
          <a href="https://www.shanghaiqixiu.org/phone/business/parts">
            <div style="width: 40px; height: 40px; margin: 0 auto;"></div>
            <p style="text-align: center; margin: 0; line-height: 35px;">汽车配件</p>
          </a>
        </li>
        <!--<li class="mui-col-sm-3 mui-col-xs-3">-->
          <!--<a href="javascript:;">-->
            <!--<div style="width: 40px; height: 40px; margin: 0 auto;"></div>-->
            <!--<p class="text-one-cut" style="text-align: center; margin: 0; line-height: 35px;">人才需求</p>-->
          <!--</a>-->
        <!--</li>-->
        <li class="mui-col-sm-3 mui-col-xs-3" @click="go2">
          <a href="https://www.shanghaiqixiu.org/phone/business/train">
            <div style="width: 40px; height: 40px; margin: 0 auto;"></div>
            <p class="text-one-cut" style="text-align: center; margin: 0; line-height: 35px;">相关培训</p>
          </a>
        </li>
        <li class="mui-col-sm-3 mui-col-xs-3" @click="go3">
          <a href="https://www.shanghaiqixiu.org/phone/partner">
            <div style="width: 40px; height: 40px; margin: 0 auto;"></div>
            <p class="text-one-cut" style="text-align: center; margin: 0; line-height: 35px;">商务合作</p>
          </a>
        </li>
        <li class="mui-col-sm-3 mui-col-xs-3" @click="go4">
          <a href="https://www.shanghaiqixiu.org/phone/partner">
            <div style="width: 40px; height: 40px; margin: 0 auto;"></div>
            <p class="text-one-cut" style="text-align: center; margin: 0; line-height: 35px;">数据需求</p>
          </a>
        </li>
        <li class="mui-col-sm-3 mui-col-xs-3" @click="go5">
          <a href="https://www.shanghaiqixiu.org/phone/business/books">
            <div style="width: 40px; height: 40px; margin: 0 auto;"></div>
            <p class="text-one-cut" style="text-align: center; margin: 0; line-height: 35px;">汽车读物</p>
          </a>
        </li>
        <li class="mui-col-sm-3 mui-col-xs-3" @click="go6">
          <a href="https://www.shanghaiqixiu.org/phone/business/insure">
            <div style="width: 40px; height: 40px; margin: 0 auto;"></div>
            <p class="text-one-cut" style="text-align: center; margin: 0; line-height: 35px;">汽车保险</p>
          </a>
        </li>
        <li class="mui-col-sm-3 mui-col-xs-3" @click="go7">
          <a href="https://www.shanghaiqixiu.org/phone/business/consum">
            <div style="width: 40px; height: 40px; margin: 0 auto;"></div>
            <p class="text-one-cut" style="text-align: center; margin: 0; line-height: 35px;">汽车用品</p>
          </a>
        </li>
        <li class="mui-col-sm-3 mui-col-xs-3" @click="go8">
          <a href="https://www.shanghaiqixiu.org/phone/business/equip">
            <div style="width: 40px; height: 40px; margin: 0 auto;"></div>
            <p class="text-one-cut" style="text-align: center; margin: 0; line-height: 35px;">汽保设备</p>
          </a>
        </li>
        <li class="mui-col-sm-3 mui-col-xs-3" @click="go9">
          <a href="https://www.shanghaiqixiu.org/phone/business/sell">
            <div style="width: 40px; height: 40px; margin: 0 auto;"></div>
            <p class="text-one-cut" style="text-align: center; margin: 0; line-height: 35px;">汽车销售</p>
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
      go1(){window.location.href='https://www.shanghaiqixiu.org/phone/business/parts'},
      go2(){window.location.href='https://www.shanghaiqixiu.org/phone/business/train'},
      go3(){window.location.href='https://www.shanghaiqixiu.org/phone/partner'},
      go4(){window.location.href='https://www.shanghaiqixiu.org/phone/partner'},
      go5(){window.location.href='https://www.shanghaiqixiu.org/phone/business/books'},
      go6(){window.location.href='https://www.shanghaiqixiu.org/phone/business/insure'},
      go7(){window.location.href='https://www.shanghaiqixiu.org/phone/business/consum'},
      go8(){window.location.href='https://www.shanghaiqixiu.org/phone/business/equip'},
      go9(){window.location.href='https://www.shanghaiqixiu.org/phone/business/sell'}
    }
  }
</script>

<style lang='less' scoped>
  #about-industry {
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
        background: url(../../../assets/img/home/about-industry/1.png) no-repeat center center;
      }
      li:nth-child(2) a >div {
        background: url(../../../assets/img/home/about-industry/2.png) no-repeat center center;
      }
      li:nth-child(3) a >div {
        background: url(../../../assets/img/home/about-industry/3.png) no-repeat center center;
      }
      li:nth-child(4) a >div {
        background: url(../../../assets/img/home/about-industry/4.png) no-repeat center center;
      }
      li:nth-child(5) a >div {
        background: url(../../../assets/img/home/about-industry/5.png) no-repeat center center;
      }
      li:nth-child(6) a >div {
        background: url(../../../assets/img/home/about-industry/6.png) no-repeat center center;
      }
      li:nth-child(7) a >div {
        background: url(../../../assets/img/home/about-industry/7.png) no-repeat center center;
      }
      li:nth-child(8) a >div {
        background: url(../../../assets/img/home/about-industry/8.png) no-repeat center center;
      }
      li:nth-child(9) a >div {
        background: url(../../../assets/img/home/about-industry/9.png) no-repeat center center;
      }
      li:nth-child(10) a >div {
        background: url(../../../assets/img/home/about-industry/10.png) no-repeat center center;
      }
    }
  }
</style>
