<template>
  <ul class="footer">
    <router-link :class="{active: findex==1}" :to="{ path: '/home' }" tag="li">
      <img src="../assets/img/footer/temp/home.png" v-show="findex==1">
      <img src="../assets/img/footer/temp/unhome.png" v-show="findex!=1">
      <p>首页</p>
    </router-link>
    <router-link :class="{active: findex==2}" :to="{ path: '/maintain' }" tag="li">
      <img src="../assets/img/footer/temp/maintain.png" v-show="findex==2">
      <img src="../assets/img/footer/temp/unmaintain.png" v-show="findex!=2">
      <p>维修服务</p>
    </router-link>
    <router-link :class="{active: findex==3}" :to="{ path: '/doctor' }" tag="li">
      <img src="../assets/img/footer/temp/ask.png" v-show="findex==3">
      <img src="../assets/img/footer/temp/unask.png" v-show="findex!=3">
      <p>车大夫门诊</p>
    </router-link>
    <!--<router-link :class="{active: findex==4}" :to="{ path: '/infoService' }" tag="li">-->
      <!--<img src="../assets/img/footer/news.png" v-show="findex==4">-->
      <!--<img src="../assets/img/footer/unnews.png" v-show="findex!=4">-->
      <!--<p>公共服务</p>-->
    <!--</router-link>-->
    <router-link :class="{active: findex==5}" :to="{ path: '/my' }" tag="li">
      <img src="../assets/img/footer/temp/my.png" v-show="findex==5">
      <img src="../assets/img/footer/temp/unmy.png" v-show="findex!=5">
      <p>我的</p>
    </router-link>
  </ul>
</template>

<script>
  export default {
    name: 'footers',
    data () {
      return {
        findex: 1
      }
    },
    watch:{
      '$route'(oldV, newV){
        this.fChange()
      }
    },
    mounted(){
      this.fChange()
    },
    methods:{
      fChange() {
        if(this.$route.matched.length==2){
          switch (this.$route.matched[1].name){
            case 'home': {this.findex= 1; break;}
            case 'maintain': {this.findex= 2; break;}
            case 'doctor': {this.findex= 3; break;}
            // case 'infoService': {this.findex= 4; break;}
            case 'my': {this.findex= 5; break;}
          }
        }

      }
    }
  }
</script>


<style scoped lang='less'>
.footer{
    width: 100%;
    height: 50px;
    position: fixed;
    left: 0;
    bottom: 0;
    overflow: hidden;
    border-top: 1px solid #e2e2e3;
    background-color: white;
    z-index: 15;
}
li{
  width: 25%;
  overflow: hidden;
  float: left;
  height: 100%;
  display: block;
  padding: 5px 0;
  text-align: center;
  position: relative;
}
li img{
  width: 24px;
}
li:last-child img{
  width: 20px;
}
li p{
  font-size: 12px;
  color: #333;
  width: 100%;
  position: absolute;
  bottom: 0;
  margin: 0;
}
.active p{
  /*color: #1383ca*/
  color: #CD220D
}
</style>
