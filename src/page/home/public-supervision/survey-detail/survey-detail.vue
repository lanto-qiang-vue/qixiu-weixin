<template>
  <div id='surveyDetail'>
    <div class="block" v-if="isShow">
      <div class="top">
        满意度调查
      </div>
      <div class="instruction">
        你好，我们正在做份调查问卷以便了解消费者对此产品的态度的认知、情感和行为成分。本次调查采取不记名调查，谢谢你的支持与配合，谢谢！
      </div>
      <div v-html="surveyDetail.content"  class="content">
      </div>
    </div>
    <div v-if="!isShow" style="height: calc(100vh)">
      <iframe :src="url" frameborder="0" style="width: 100%; height: 100%;"></iframe>
    </div>
  </div>
</template>

<script>
  export default {
    data(){
      return {
        surveyDetail: {},
        isShow: true,
        url: ''
      }
    },

    created(){
      if(this.$route.query.id==2){
        this.isShow=false
      }
      var data = {
        systemToken: localStorage.getItem("SYSTEMTOKEN"),
        id:this.$route.query.id
      };

      this.axios({
        method: 'post',
        url: '/questionnaires/questionnairesDetail',
        headers: {
          'Content-type': 'application/json'
        },
        data: JSON.stringify(data)
      })
        .then(res => {
          if(this.$route.query.id == "2"){
            this.url=res.data.data.content.slice(0,56)
          }else {
            this.surveyDetail = res.data.data;
          }
        });
    },
    methods: {}
  }
</script>

<style lang='less'>
  #surveyDetail {
    .block {
      width: 100%;
      overflow: hidden;
      padding: 10px;
      position: relative;
      .top {
        text-align: center;
        color: #303133;
      }
      .instruction {
        margin-top: 20px;
        font-size: 14px;
        color: #606266;
      }
      .content {
        height: 100%;
        margin-top: 10px;
      }
    }
  }
</style>
