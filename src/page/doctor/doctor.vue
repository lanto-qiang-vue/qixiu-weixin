<template>
  <div class="doctor">
    <img src="../../assets/img/doctor/doctor.png" alt="">
    <div class="page-loadmore">
      <div class="page-loadmore-wrapper" style="height: calc(100vh - 150px); overflow: auto;">
        <mt-loadmore :top-method="loadTop"
                     :bottom-method="loadBottom"
                     :bottom-all-loaded="allLoaded"
                     :autoFill="false"
                     bottomPullText="上拉加载更多"
                     topLoadingText="更新中"
                     ref="loadmore">
          <ul class="page-loadmore-questionList">
            <li v-for="(item, index) in questionList" class="page-loadmore-questionListitem" :key="index">
              <div class="block" :data-questionId="item.questionId" @click='goQuestionDetail(item.quesId)'>
                <div class="user">
                  <div class="user_imgWrap">
                    <img :src="item.questionerPhoto || '/static/img/home/user.png'"/>
                  </div>
                  <div class="userright"><p>{{item.userName ? item.userName : '匿名'}}</p>
                    <span>{{item.createTime | FormatDate}}</span></div>
                </div>
                <p class="question" v-html="item.quesContent"></p>
                <div class="answer">
                  <span class="violet" v-if="item.answer">已处理</span>
                  <span class="blue" v-else>未处理</span>
                  <p v-if="item.answer"
                     v-html="(item.answer.answerUserName ? item.answer.answerUserName + '：' : '匿名：') + (item.answer.answerContent ? item.answer.answerContent : '')"></p>
                </div>
                <div class="foot">{{item.viewNumber}}浏览 {{item.answerCounts}}回答</div>
              </div>
            </li>
          </ul>
          <div v-if="allLoaded" style="text-align: center; line-height: 30px; background-color: #f8f8f8; font-size: 14px; color: #999;">已经到底啦...</div>
        </mt-loadmore>
      </div>
    </div>
    <div class="iAsking" @click="asking">我要提问</div>
    <mt-actionsheet
      :actions="this.actions()"
      v-model="sheetVisible">
    </mt-actionsheet>
  </div>
</template>

<script>
  import {Toast, Actionsheet } from 'mint-ui'
  import defaultImage from '@/assets/img/my/photo.png'
  export default {
    name: 'doctor',
    data () {
      return {
        questionList: [],
        defaultImage: defaultImage,
        allLoaded: false,
        page: 1,
        sheetVisible: false,
      }
    },
    created(){
      this.doQuery(1)
      if(this.$route.query.toask=='yes') this.asking()
    },
    methods: {
      actions(){
        let _this=this
        return [{
          name: '向指定专家提问',
          method() {
            // let userinfo = JSON.parse(localStorage.getItem("USERINFO"));
            // if (userinfo != null) {
              _this.$router.push({
                path: '/association-service/experts-list'
              })
            // } else {
            //   Toast('请先登录');
            //   _this.$router.push({
            //     path: '/login'
            //   })
            // }
          }
        },
          {
            name: '向全部专家提问',
            method() {
              // let userinfo = JSON.parse(localStorage.getItem("USERINFO"));
              // if (userinfo != null) {
                _this.$router.push({
                  path: '/askExpert'
                })
              // } else {
              //   Toast('请先登录');
              //   _this.$router.push({
              //     path: '/login'
              //   })
              // }
            }
          }]
      },

      loadTop(){
        this.allLoaded=false
        this.page=1
        this.doQuery(2)
      },

      loadBottom() {
        this.page++
        this.doQuery(3);
      },

      doQuery(num) {
        let param = {
          systemToken: localStorage.getItem("SYSTEMTOKEN"),
          limit: 10,
          page: this.page
        }
        this.axios({
          method: 'post',
          url: '/center/questionList',
          headers: {
            'Content-type': 'application/json'
          },
          data: JSON.stringify(param)
        })
        .then(res => {
          console.log(res.data.data)
          if(num===1){
            this.questionList=res.data.data.dataList
          } else if(num===2){
            this.questionList=res.data.data.dataList
            this.$refs.loadmore.onTopLoaded()
          }
          else{
            this.questionList = [...this.questionList,...res.data.data.dataList];
            this.$refs.loadmore.onBottomLoaded()
          }
          if(this.questionList.length==res.data.data.total){
            this.allLoaded=true
          }
        })
      },
      goQuestionDetail(questionId){
        this.$router.push({
          path: '/questionDetail',
          query: {
            questionId: questionId
          }
        })
      },
      asking(){
        this.sheetVisible=true
      }
    }
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang='less'>
  .doctor {
    height: calc(100vh - 50px);
    > img {
      width: 100%;
      height: 100px;
    }
    .block {
      width: 100%;
      overflow: hidden;
      border-top: 10px solid #f8f8f8;
      padding: 10px;
      position: relative;
      .user {
        overflow: hidden;
        .user_imgWrap {
          width: 50px;
          height: 50px;
          float: left;
          margin-right: 10px;
          border-radius: 50%;
          overflow: hidden;
          img {
            width: 50px;
          }
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
      .answer {
        font-size: 12px;
        span {
          display: block;
          padding: 1px 5px;
          color: white;
          float: left;
        }
        p {
          margin-left: 55px;
          margin-bottom: 30px;
          color: #666;
        }
        .violet {
          background-color: #93adf8;
        }
        .blue {
          background-color: #599ef9;
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
    .iAsking {
      position: fixed;
      width: 60px;
      height: 60px;
      background-color: rgba(0, 0, 255, .3);
      bottom: 65px;
      right: 15px;
      font-size: 14px;
      border-radius: 50%;
      text-align: center;
      box-sizing: border-box;
      padding: 8px 10px;
      color: #fff;
      font-weight: 600;
    }
  }
</style>
