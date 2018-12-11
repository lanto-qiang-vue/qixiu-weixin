<template>
  <div id="myAdvantage" style="position: relative;">
    <div style="background-color: #f8f8f8; line-height: 40px; color: #999; text-indent: 15px">我的优势</div>
    <div style="position: relative;">
      <textarea v-model="text" maxlength="140"  style="border: none; min-height: 180px; width: 100%; margin: 0;" placeholder="简洁有重点的描述，HR会对您更加了解。"></textarea>
      <span style="position: absolute; right: 5px; bottom: 8px; color: #999;"><span style="color: #26a2ff;">{{ fontCount }}</span>/140</span>
    </div>
    <div style="padding: 10px 15px; background-color: #fff; position: absolute; bottom: 0; width: 100%;">
      <mt-button type="primary" size="large" style="width: 100%;" @click="goBack">保存</mt-button>
    </div>
  </div>
</template>

<script>
  import { Toast, Button } from "mint-ui"
  export default{
    name: "myAdvantage",

    data(){
      return {
        text: '',
        fontCount: '0'
      }
    },
    created(){

    },
    watch: {
      text(val){
        this.fontCount=val.trim().length
        if(Number(this.fontCount)>=140){
          Toast("字数超过限制,您写作文呢!")
        }
      },
    },
    components: {

    },
    methods: {
      goBack(){
        this.$router.go("-1")
        Toast("保存成功")
      }
    }
  }
</script>

<style lang='less' scoped>
  #myAdvantage {
    height: calc(100vh);
    background-color: #f8f8f8;
  }
</style>
