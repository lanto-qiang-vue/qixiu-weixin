<template>
  <div class="askQuestions">
    <div class="page-loadmore">
      <div class="page-loadmore-wrapper" ref="wrapper" :style="{ height: wrapperHeight + 'px' }">
        <mt-loadmore @translate-change="translateChange" @top-status-change="handleTopChange"
                     :bottom-method="loadBottom" @bottom-status-change="handleBottomChange"
                     :bottom-all-loaded="allLoaded"
                     :bottomDistance = "30"
                     ref="loadmore">
          <ul class="page-loadmore-questionList">
            <li v-for="(item, index) in questionList" class="page-loadmore-questionListitem" :key="index">
              <div class="block" :data-questionId="item.questionId" @click='goQuestionDetail(item.quesId)'>
                <div class="user">
                  <img :src="item.questionerPhoto != '' ? item.questionerPhoto : defaultImage"/>
                  <div class="userright"><p>{{item.userName ? item.userName : '匿名'}}</p>
                    <span>{{item.createTime | FormatDate}}</span></div>
                  <div style="float: right;" >
                    <button type="button" class="answer-button" @click.stop="answer(item.quesId)">回答问题</button>
                  </div>
                </div>
                <p class="question" v-html="item.quesContent"></p>
                <div class="answer">
                  <span class="violet" >{{item.categoryName}}</span>
                </div>
              </div>
            </li>
          </ul>
          <div slot="top" class="mint-loadmore-top">
            <span v-show="topStatus !== 'loading'" :class="{ 'is-rotate': topStatus === 'drop' }">↓</span>
            <span v-show="topStatus === 'loading'">
            <mt-spinner type="snake"></mt-spinner>
          </span>
          </div>
          <div slot="bottom" class="mint-loadmore-bottom">
            <span v-show="bottomStatus !== 'loading'" :class="{ 'is-rotate': bottomStatus === 'drop' }">↑</span>
            <span v-show="bottomStatus === 'loading'">
            <mt-spinner type="snake"></mt-spinner>
          </span>
          </div>
        </mt-loadmore>
      </div>
    </div>
  </div>
</template>

<script>
  import { Toast} from 'mint-ui'
  import defaultImage from '@/assets/img/my/photo.png'
  export default {
    name: 'askQuestions',
    data () {
      return {
        questionList: [],
        defaultImage: defaultImage,
        allLoaded: false,
        bottomStatus: '',
        wrapperHeight: 0,
        topStatus: '',
        translate: 0,
        moveTranslate: 0,
        listLength: null,
        list: [],
        page: 1
      }
    },

    mounted() {
      this.wrapperHeight = document.documentElement.clientHeight - this.$refs.wrapper.getBoundingClientRect().top;
    },
    created(){

    },
    methods: {
      doQuery(){
        let param = {
          accessToken: localStorage.getItem('ACCESSTOKEN'),
          pageSize: 10,
          pageNo: this.page
        }
        this.axios({
          method: 'post',
          url: '/cdf/list',
          headers: {
            'Content-type': 'application/json'
          },
          data: JSON.stringify(param)
        })
          .then(res => {
            if(res.data.code==='000000'){
              console.log('res',res)
              this.list = res.data.data.dataList;
              this.listLength = res.data.data.total;
              let lastValue = this.questionList.length;
              if (lastValue < this.listLength) {
                for (let i = 0; i < this.list.length; i++) {
                  this.questionList.push(this.list[i]);
                }
                this.page++;
              } else {
                this.allLoaded = true;
                Toast('已经到底啦');
              }
              this.$refs.loadmore.onBottomLoaded();

              for (var i in this.questionList){
                if('10401001' === this.questionList[i].category) {
                  this.questionList[i].categoryName = '发动机';
                } else if('10401002' === this.questionList[i].category) {
                  this.questionList[i].categoryName = '变速箱';
                } else if('10401003' === this.questionList[i].category) {
                  this.questionList[i].categoryName = '空调';
                } else if('10401004' === this.questionList[i].category) {
                  this.questionList[i].categoryName = '传动转向';
                } else if('10401005' === this.questionList[i].category) {
                  this.questionList[i].categoryName = '车身车架';
                } else {
                  this.questionList[i].categoryName = '其他';
                }

              }
            }else if(res.data.code==='130410'){
              this.$router.push('/login')
              Toast('登录过期,请重新登录')
            }else {
              Toast(res.data.status)
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
      answer(questionId){
        this.$router.push({
          path: '/myAnswer',
          query: {
            questionId: questionId
          }
        })
      },
      asking(){
        let userinfo = JSON.parse(localStorage.getItem("USERINFO"));
        if(userinfo != null) {
          this.$router.push({
            path: '/expertList'
          })
        } else {
          Toast('请先登录');
          this.$router.push({
            path: '/login'
          })
        }
      },
      handleBottomChange(status) {
        this.bottomStatus = status;
      },
      loadBottom() {
        this.doQuery();
      },
      handleTopChange(status) {
        this.moveTranslate = 1;
        this.topStatus = status;
      },
      translateChange(translate) {
        const translateNum = +translate;
        this.translate = translateNum.toFixed(2);
        this.moveTranslate = (1 + translateNum / 70).toFixed(2);
      },
    }
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang='less'>
  .askQuestions {
    > img {
      width: 100%;
    }
    .block {
      width: 100%;
      overflow: hidden;
      border-top: 10px solid #f8f8f8;
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
    .answer-button{
      background-color: rgba(0, 0, 255, .3);
      color: #fff;
      border:none;

    }
  }

  .loading-background, .mint-loadmore-top span {
    -webkit-transition: .2s linear;
    transition: .2s linear
  }

  .mint-loadmore-top span {
    display: inline-block;
    vertical-align: middle
  }

  .mint-loadmore-top span.is-rotate {
    -webkit-transform: rotate(180deg);
    transform: rotate(180deg)
  }

  .page-loadmore .mint-spinner {
    display: inline-block;
    vertical-align: middle
  }

  .page-loadmore-desc {
    text-align: center;
    color: #666;
    padding-bottom: 5px
  }

  .page-loadmore-desc:last-of-type,
  .page-loadmore-questionListitem {
    border-bottom: 1px solid #eee
  }

  .page-loadmore-questionListitem {
    /*height: 50px;*/
    /*line-height: 50px;*/
    /*text-align: center*/
  }

  .page-loadmore-questionListitem:first-child {
    border-top: 1px solid #eee
  }

  .page-loadmore-wrapper {
    overflow: scroll
  }

  .mint-loadmore-bottom span {
    display: inline-block;
    -webkit-transition: .2s linear;
    transition: .2s linear;
    vertical-align: middle
  }

  .mint-loadmore-bottom span.is-rotate {
    -webkit-transform: rotate(180deg);
    transform: rotate(180deg)
  }
</style>
