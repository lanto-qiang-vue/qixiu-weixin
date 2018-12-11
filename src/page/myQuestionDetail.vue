<template>
  <div id='questionDetail'>
    <div class="block">
      <div class="user">
        <img :src="questionDetail.questionerPhoto || '/static/img/home/user.png'"/>
        <div class="userright"><p>{{questionDetail.userName ? questionDetail.userName : '匿名'}}</p>
          <span>{{questionDetail.createTime | FormatDate}}</span></div>
      </div>
      <p class="question" v-html="questionDetail.quesContent"></p>

      <div class="imgsWrap mui-content-padded">
        <img v-for="(item, index) in questionDetail.images" :key="index" :src="item" data-preview-src=""
             data-preview-group="1"/>
      </div>

      <div class="answer">
        <span class="violet">{{questionDetail.categoryCode}}</span>
        <!--<span class="gray">#发动机</span>-->
        <!--<span class="gray">#传向转动</span>-->
      </div>
      <div class="foot" v-if="questionDetail.quesStatus == '审核通过' ">{{questionDetail.viewNumber + 1}}浏览 · {{ questionDetail.answerCount }}回答</div>
      <div class="foot" v-else>0 浏览 · 0 回答</div>
    </div>
    <div class="answers">
      <ul>
        <li v-for="item in questionDetail.answer" v-if="item.answerIsadopt === true">
          <span class="used">已采纳</span>
          <div class="zhuanjia">
            <img :src="item.answerPhoto || '/static/img/home/user.png'"/>
            <div class="userright"><p>{{item.answerUserName}}</p>
              <span>{{item.answerTime | FormatDate}}</span></div>
          </div>
          <div class="answer_text" v-html="item.answerContent"></div>
        </li>
        <li v-for="item in questionDetail.answer" v-if="item.answerIsadopt === false">
          <div class="zhuanjia">
            <img :src="item.answerPhoto ? item.answerPhoto : defaultImage"/>
            <div class="userright"><p>{{item.answerUserName}}</p>
              <span>{{item.answerTime | FormatDate}}</span></div>
          </div>
          <div class="answer_text" v-html="item.answerContent"></div>
        </li>
      </ul>
    </div>
    <!--<div class="iAnswer">-->
      <!--<button @click="goMyAnswer">我要回答</button>-->
    <!--</div>-->
  </div>
</template>

<script>
  import defaultImage from '@/assets/img/my/photo.png'
  export default {
    data(){
      return {
        questionDetail: {},
        picURL: [
          "http://static.shanghaiqixiu.org/images/2017/11/8/pic_1512726836942.jpg",
          "http://mpic.tiankong.com/1b6/f9f/1b6f9f722eb791cfbf22d2133dacd6c9/640.jpg",
          "http://mpic.tiankong.com/6d2/a9a/6d2a9af50ae64f13c226110e17792d9b/640.jpg"
        ],
        defaultImage: defaultImage
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
          console.log(" this.questionDetail", this.questionDetail);
        })
    },
    methods: {
      goMyAnswer(){
        this.$router.push({
          path: "/myAnswer",
          query: {
            questionId: this.$route.query.questionId
          }
        })
      },
    }
  }
</script>

<style lang='less'>
  #questionDetail {
    padding-bottom: 0px;
    .block {
      width: 100%;
      overflow: hidden;
      padding: 10px;
      position: relative;
      .user {
        overflow: hidden;
        img {
          width: 50px;
          height: 50px;
          border-radius: 100%;
          float: left;
          margin-right: 10px;
        }
        .userright {
          float: left;
          height: 50px;
          line-height: 25px;
          p {
            font-size: 14px;
            margin-bottom: 0;
            color: #333;
          }
          span {
            font-size: 12px;
            color: #9a9a9a;

          }
        }
      }
      .question {
        font-size: 14px;
        margin: 10px 0;
        color: #333;
      }
      .imgsWrap {
        height: 60px;
        margin: 0 0 20px 0;
        img {
          max-width: 90px;
          height: 100%;
          margin-right: 10px;
        }
      }
      .answer {
        font-size: 12px;
        span {
          display: block;
          padding: 1px 5px;
          color: white;
          float: left;
          margin-right: 5px;
        }
        p {
          margin-left: 55px;
          margin-bottom: 30px;
          color: #666;
        }
        .violet {
          background-color: #ecf3fe;
          color: #599ef9;
        }
        .gray {
          background-color: #f5f5f5;
          color: #999;
        }
      }
      .foot {
        font-size: 12px;
        color: #999999;
        position: absolute;
        right: 10px;
        bottom: 10px;
      }
    }
    .answers {
      border-top: 10px solid #efeff4;
      padding: 0 10px;
      li {
        padding-top: 10px;
        position: relative;
        .used {
          background-color: #5997ff;
          color: #fff;
          padding: 3px 5px;
          position: absolute;
          right: 0;
          font-size: 12px;
        }
        .zhuanjia {
          overflow: hidden;
          img {
            width: 50px;
            border-radius: 100%;
            float: left;
            margin-right: 10px;
          }
          .userright {
            float: left;
            height: 50px;
            line-height: 25px;
            p {
              font-size: 14px;
              margin-bottom: 0;
              color: #333;
            }
            span {
              font-size: 12px;
              color: #9a9a9a;

            }
          }
        }
        .answer_text {
          margin-left: 60px;
          color: #333;
          font-size: 14px;
          border-bottom: 1px solid #efeff4;
          padding-bottom: 15px;
        }
      }
    }
    .iAnswer {
      position: fixed;
      left: 0;
      bottom: 0;
      background-color: #fff;
      width: 100%;
      height: 60px;
      border-top: 1px solid #efeff4;
      button {
        display: block;
        width: 90%;
        height: 40px;
        margin: 10px auto;
        border: none;
        background: linear-gradient(to right, #78b9fe, #3882f5);
        color: #fff;
      }
    }
  }
</style>
