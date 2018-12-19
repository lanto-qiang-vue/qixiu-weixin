<template>
  <div id="myAnswer">
    <div class="block">
      <p class="question" v-html="questionDetail.quesContent"></p>
      <div class="imgsWrap mui-content-padded">
        <img v-for="(item, index) in questionDetail.images" :key="index" :src="item" data-preview-src="" data-preview-group="1" />
      </div>
    </div>
    <textarea placeholder="请输入您的回答..." v-model="answerText"></textarea>
    <button @click="submit($event)" type="button" class="mui-btn mui-btn mui-btn-primary" data-loading-text="提交中">提交</button>
  </div>
</template>

<script>
import { Toast } from 'mint-ui'
export default {
  name: "myAnswer",
  data(){
    return{
      questionDetail: '',
      answerText: '',
      picURL:[
        "http://static.shanghaiqixiu.org/images/2017/11/8/pic_1512726836942.jpg",
        "http://mpic.tiankong.com/1b6/f9f/1b6f9f722eb791cfbf22d2133dacd6c9/640.jpg",
        "http://mpic.tiankong.com/6d2/a9a/6d2a9af50ae64f13c226110e17792d9b/640.jpg"
      ]
    }
  },

  created(){
    this.axios({
      method: "get",
      url: "/QxwCdf/article/detail/" + localStorage.getItem("SYSTEMTOKEN") + "/" + this.$route.query.questionId,
      heardes: {
        "Content-type": "application/json"
      }
    })
      .then(res => {
        this.questionDetail = res.data.data;
        this.questionDetail.answerCount = this.questionDetail.answer.length;
      })
  },
  mounted(){

  },
  methods:{
    submit(e){
      var that = this
      if(this.answerText.trim()===""){
        return Toast("请输入回答内容")
      }

      let param = {
        accessToken: localStorage.getItem("ACCESSTOKEN"),
        content: this.answerText,
        isanonymous: false,
        questionId: this.$route.query.questionId
      }
      this.axios({
        method: 'post',
        url: '/QxwCdf/addanswer',
        headers: {
          'Content-type': 'application/json'
        },
        data: JSON.stringify(param)
      })
      .then(res => {
        if(res.data.code==='0'){
          Toast('提交成功,待审核通过')
          that.$router.go(-1)
        }else{
          Toast(res.data.status)
        }

        that.answerText=''
      })
    }
  }
}
</script>

<style lang='less' scoped>
  #myAnswer {
    background-color: #f8f8f8;
    height: calc(100vh);
    .block{
      width: 100%;
      padding: 15px;
      background-color: #fff;
      max-height: 250px;
      .question{
        font-size: 14px;
        color: #333;
      }
      .imgsWrap {
        max-height: 60px;
        margin: 0;
        img {
          max-width: 80px;
          height: 60px;
          margin-right: 10px;
        }
      }
    }
    >textarea {
      min-height: 250px;
      max-height: 250px;
      margin: 10px 0 0 0;
      border: none;
      font-size: 14px;
    }
    >button {
      width: 100%;
      position: absolute;
      left: 0;
      bottom: 0;
      height: 40px;
      border: none;
      border-radius: 0;
    }
  }
</style>

<style lang='less'>

</style>
