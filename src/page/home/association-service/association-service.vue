<template>
  <div id="association-service">
    <mt-header title="协会服务中心">
      <router-link to="/home" slot="left">
        <mt-button icon="back"></mt-button>
      </router-link>
      <mt-button icon="more" slot="right"></mt-button>
    </mt-header>
    <div class="grid" style="padding: 15px 0;">
      <ul class="mui-row">
        <!--<li class="mui-col-sm-3 mui-col-xs-3" v-for="(item, index) in tabList" :key="index" @click="goIntroduce">-->
          <!--<div style="width: 40px; height: 40px; margin: 0 auto;"></div>-->
          <!--<p style="text-align: center; margin: 0; line-height: 35px;">{{ item.name }}</p>-->
        <!--</li>-->

        <li class="mui-col-sm-3 mui-col-xs-3" @click="goIntroduce">
        <div style="width: 40px; height: 40px; margin: 0 auto;"></div>
        <p class="text-one-cut" style="text-align: center; margin: 0; line-height: 35px;">协会简介</p>
        </li>
        <li class="mui-col-sm-3 mui-col-xs-3" @click="goAssociationDuty">
          <div style="width: 40px; height: 40px; margin: 0 auto;"></div>
          <p class="text-one-cut" style="text-align: center; margin: 0; line-height: 35px;">协会职能</p>
        </li>
        <li class="mui-col-sm-3 mui-col-xs-3" @click="goList('10281013','工作动态')">
          <div style="width: 40px; height: 40px; margin: 0 auto;"></div>
          <p class="text-one-cut" style="text-align: center; margin: 0; line-height: 35px;">工作动态</p>
        </li>
        <li class="mui-col-sm-3 mui-col-xs-3" @click="goList('10281014','行业风采')">
          <div style="width: 40px; height: 40px; margin: 0 auto;"></div>
          <p style="text-align: center; margin: 0; line-height: 35px;">行业风采</p>
        </li>
        <li class="mui-col-sm-3 mui-col-xs-3" @click="goList('10281008','行业能手')">
          <div style="width: 40px; height: 40px; margin: 0 auto;"></div>
          <p style="text-align: center; margin: 0; line-height: 35px;">行业能手</p>
        </li>
        <li class="mui-col-sm-3 mui-col-xs-3" @click="goList('10281015','行业党建')">
          <div style="width: 40px; height: 40px; margin: 0 auto;"></div>
          <p style="text-align: center; margin: 0; line-height: 35px;">行业党建</p>
        </li>
        <li class="mui-col-sm-3 mui-col-xs-3" @click="goExperts">
          <div style="width: 40px; height: 40px; margin: 0 auto;"></div>
          <p style="text-align: center; margin: 0; line-height: 35px;">专家组</p>
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
        tabList: []
      }
    },
    created(){
      this.axios({
        url: '/article/category/list/'+ localStorage.getItem("SYSTEMTOKEN"),
        method: "get"
      })
        .then(res=>{
          if(res.data.code==="0"){
            this.tabList=res.data.data[1].children
            console.log(this.tabList);
          }else {
            Toast(res.data.status)
          }
        })
    },
    components: {

    },
    methods: {
      goIntroduce(){this.$router.push('/association-service/association-introduce')},
      goExperts(){this.$router.push("/association-service/experts-list")},
      goAssociationDuty(){this.$router.push("/association-service/association-duty")},
      goWorkingChange(){this.$router.push("/association-service/working-change")},
      goIndustryShow(){this.$router.push("/association-service/industry-show-list")},
      goIndustryMaster(){this.$router.push("/association-service/industry-master")},
      goIndustryParty(){this.$router.push("/association-service/industry-party")},
      goList(id, name){
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
  #association-service {
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
        background: url(../../../assets/img/home/association-service/1.png) no-repeat center center;
      }
      li:nth-child(2) >div {
        background: url(../../../assets/img/home/association-service/2.png) no-repeat center center;
      }
      li:nth-child(3) >div {
        background: url(../../../assets/img/home/association-service/3.png) no-repeat center center;
      }
      li:nth-child(4) >div {
        background: url(../../../assets/img/home/association-service/4.png) no-repeat center center;
      }
      li:nth-child(5) >div {
        background: url(../../../assets/img/home/association-service/5.png) no-repeat center center;
      }
      li:nth-child(6) >div {
        background: url(../../../assets/img/home/association-service/6.png) no-repeat center center;
      }
      li:nth-child(7) >div {
        background: url(../../../assets/img/home/association-service/7.png) no-repeat center center;
      }
    }
  }
</style>
