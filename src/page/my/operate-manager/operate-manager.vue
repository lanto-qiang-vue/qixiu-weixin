<template>
  <div id="operate_manager">
    <div class="title">{{ date | FormatDate('YYYY-MM-DD HH:mm:ss') }}</div>
    <div>
      <mt-cell title="注册用户数" :value="registerUsers"></mt-cell>
      <mt-cell title="车辆绑定用户数" :value="bindUsers"></mt-cell>
      <mt-cell title="绑定车辆数" :value="bindVehicles"></mt-cell>
    </div>
  </div>
</template>

<script>
  import { Cell } from 'mint-ui'
  export default{
    name: "operateManager",

    data(){
      return {
        date: new Date(),
        bindUsers: '',
        bindVehicles: '',
        registerUsers: ''
      }
    },

    created(){
      this.axios({
        url: '/statistics/admin/carrieroperator/' + localStorage.getItem("ACCESSTOKEN"),
        method: 'get',
        headers: {'Content-type': 'application/json'}
      }).then(res=>{
        if(res.data.code==='0'){
          console.log(res.data.data);
          this.bindUsers = res.data.data.bindUsers
          this.bindVehicles = res.data.data.bindVehicles
          this.registerUsers = res.data.data.registerUsers
        }
      })
    },

    methods: {

    }
  }
</script>

<style lang='less' scoped>
  #operate_manager {
    height: 100vh;
    .title {
      line-height: 40px;
      text-indent: 10px;
      background-color: #f8f8f8;
    }
  }
</style>


<style lang='less'>
  #operate_manager {
    a {
      &:active {
        color: #000;
      }
    }
  }
</style>
