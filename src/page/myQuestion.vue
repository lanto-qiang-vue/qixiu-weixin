<template>
  <div id="myQuestion">
    <mt-header title="我的提问">
        <mt-button icon="back"></mt-button>
    </mt-header>
    <div>
      <mt-loadmore :top-method="loadTop"
                   :bottom-method="loadBottom"
                   :bottom-all-loaded="allLoaded"
                   :autoFill="false"
                   bottomPullText="上拉加载更多"
                   topLoadingText="更新中"
                   ref="loadmore">
        <ul style="min-height: calc(100vh - 40px); ">
          <li v-for='(item, index) in myQuestionList' :key='index' @click="goToMyQuestionDetail(item.id)">
            <p>{{ item.content }}</p>
            <p class="foot clearfix">
              <span class="date">{{ item.createtime | FormatDate}}</span>
              <span class="view">{{ item.viewnumber }}浏览</span>
            </p>
          </li>
          <div v-if="allLoaded" style="text-align: center; line-height: 30px; background-color: #f8f8f8; font-size: 14px; color: #999;">暂无更多数据...</div>
        </ul>
      </mt-loadmore>
    </div>
  </div>
</template>

<script>
  import { Header, Toast } from 'mint-ui'
  export default {
    name: 'myQuestion',
    data(){
      return {
        myQuestionList: [],
        allLoaded: false,
        pageNo: 1
      }
    },
    created(){
      this.getQuestionList(1)
    },

    methods: {
      loadTop(){
        this.allLoaded=false
        this.pageNo = 1
        this.getQuestionList(2)
      },

      loadBottom(){
        this.pageNo++
        this.getQuestionList(3)
      },

      getQuestionList(num) {
        let userInfo = JSON.parse(localStorage.getItem('USERINFO'));
        let data = {
          accessToken: localStorage.getItem("ACCESSTOKEN"),
          loginUserId: userInfo.userId,
          pageNo: this.pageNo,
          pageSize: 10
        };
        this.axios({
          method: 'post',
          url: '/cdf/myQuestion',
          headers: {
            'Content-type': 'application/json'
          },
          data: JSON.stringify(data)
        })
        .then(res => {
          console.log('res: ', res.data.data);
            if (this.pageNo === 1 && (res.data.data == null || res.data.data.length === 0)) {
              this.$router.go(-1);
              Toast('暂无数据')

            }else {
              if(num === 1){
                this.myQuestionList=res.data.data
              } else if(num === 2){
                this.myQuestionList=res.data.data
                this.$refs.loadmore.onTopLoaded()
              } else {
                this.myQuestionList = [...this.myQuestionList, ...res.data.data];
                this.$refs.loadmore.onBottomLoaded()
              }
              if(this.myQuestionList.length === res.data.totalCount){
                this.allLoaded = true
              }
            }
        });
      },

      goToMyQuestionDetail(questionId) {
        this.$router.push({
          path: '/myQuestionDetail',
          query: {
            questionId: questionId
          }
        })
      }
    }
  }
</script>

<style lang='less' scoped>
  #myQuestion {
    width: 100%;
    height: calc(100vh);
    background-color: #f8f8f8;
    ul li {
      padding: 10px;
      border-bottom: 10px solid #f8f8f8;
      background-color: #fff;
      >p {
        color: #333;
      }
      >img {
        height: 60px;
        max-width: 90px;
        margin-right: 10px;
      }
      .foot {
        width: 100%;
        margin-top: 10px;
        margin-bottom: 0;
        color: #999;
        .date {
          float: left;
        }
        .view {
          float: right;
        }
      }
      .clearfix:after {
        content: '';
        height: 0;
        display: block;
        clear: both;
      }
      .clearfix {
        zoom: 1;
      }
    }
  }
</style>
