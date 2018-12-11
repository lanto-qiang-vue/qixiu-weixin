<template>
  <div id="surveyList">
    <div class="banner">
      <h3>上海汽修满意度调查</h3>
      <p>我们想为您做得更好</p>
    </div>
    <ul>
      <li v-for='(item, index) in surveyList' :key='index' @click="goToSurveyDetail(item.id)">
        <p>{{ item.title }}</p>
        <p class="foot clearfix">
          <span class="date">{{ item.createtime | FormatDate}}</span>
        </p>
      </li>
    </ul>
  </div>
</template>
<script>
  import { Toast } from 'mint-ui'
  export default {
    name: 'surveyList',
    data(){
      return {
        surveyList: []
      }
    },

    created(){
      this.listMyQuestion(1, 99999);
    },
    methods: {
      listMyQuestion: function (pageNo,pageSize) {
        var userInfo = JSON.parse(localStorage.getItem('USERINFO'));
        var data = {
          systemToken:localStorage.getItem("SYSTEMTOKEN"),
          page:pageNo,
          limit:pageSize
        };

        this.axios({
          method: 'post',
          url: '/questionnaires/questionnairesList',
          headers: {
            'Content-type': 'application/json'
          },
          data: JSON.stringify(data)
        })
          .then(res => {
            this.surveyList = res.data.data.dataList;
          });
      },

      goToSurveyDetail: function(id) {
        this.$router.push({
          path: '/public-supervision/survey-detail',
          query: {
            id: id
          }
        })
      },
    }
  }
</script>

<style lang='less' scoped>
  #surveyList {
    width: 100%;
    height: calc(100vh - 50px);
    background-color: #fff;
    >.banner {
      height: 100px;
      overflow: hidden;
      border-bottom: 10px solid #f8f8f8;
      background: url(../../../../assets/img/surveyList/satisfaction-bg01.png) no-repeat left 30px top 30px,
      url(../../../../assets/img/surveyList/satisfaction-bg02.png) no-repeat left 10px bottom 20px,
      url(../../../../assets/img/surveyList/satisfaction-bg03.png) no-repeat right 90px bottom 5px,
      url(../../../../assets/img/surveyList/satisfaction-bg04.png) no-repeat right 30px center, #fff;
      background-size: auto, auto 25%, auto 35%, auto 70%;
      p {
        color: #999;
        margin: 10px 0 0 0;
        text-indent: 65px;
      }
      h3 {
        margin-top: 25px;
        color: #1891ed;
        font-size: 20px;
        text-indent: 40px;
      }
    }
    >ul li {
      padding: 10px;
      border-bottom: 1px solid #f8f8f8;
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
