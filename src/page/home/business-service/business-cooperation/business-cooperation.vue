<template>
  <div id="businessCooperation">
    <mt-header title="商务合作">
      <router-link to="/business-service" slot="left">
        <mt-button icon="back"></mt-button>
      </router-link>
      <mt-button icon="more" slot="right"></mt-button>
    </mt-header>
    <div style="padding: 25px 18px;">
      <p>公司地址: 上海市长宁区淞虹路207号明基商务广场C座</p>
      <p>服务热线: 400-663-8210</p>
      <p>邮箱: contact@lantoev.com</p>
    </div>
  </div>
</template>

<script>
  export default{
    name: "businessCooperation",

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
  #businessCooperation {
    height: calc(100vh - 50px);
  }
</style>
