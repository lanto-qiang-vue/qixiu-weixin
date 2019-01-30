<template>
  <div class="welcome">
    <img src="~@/assets/img/welcome/welcome-red.png">
    <div @click="goIndex">跳过(<span> {{ time/1000 }} </span>)</div>
  </div>
</template>

<script>
  export default {
    data(){
      return {
        time: 2000,
        timer: null
      }
    },

    created(){
      var that = this
      that.timer = setInterval(function () {
        that.time=that.time-1000
        if(that.time <= 0){
          clearInterval(that.timer)
          that.$router.replace('home')

        }
      },1000)
    },
    beforeRouteLeave (to, from, next) {
      clearInterval(this.timer)
      next(); //正常执行手机返回键也是正常返回上一个路由
    },
    methods:{
      goIndex(){
        clearInterval(this.timer)
        this.$router.replace({
          path: 'home'
        })
        this.timer=null
        setTimeout(()=>{
          this.time=3000
        },1000)
      }
    }
  }
</script>

<style lang='less' scoped>
  .welcome {
    width: 100%;
    height: 100vh;
    position: relative;
    img {
      width: 100%;
      height: 100%;
    }
    >div {
      position: absolute;
      right: 15px;
      top: 15px;
      font-size: 15px;
      background-color: rgba(100,100,100,.3);
      color: #fff;
      padding: 6px 10px;
      span {
        color: #428AF8;
      }
    }
  }
</style>
