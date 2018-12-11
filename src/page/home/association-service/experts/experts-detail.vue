<template>
  <div id='expertDetail'>
    <div class="block">
      <div class="user">
        <div class="img_wrap">
          <img class="img_left" :src="expertDetail.photo"/>
        </div>
        <img class="img_right" src="../../../../assets/img/expert/authentication.png"/>
        <div class="userright">
          <p>{{expertDetail.name}}</p>
          <span>高级讲师,高级技师</span>
          <span>{{expertDetail.empUnit}}</span>
        </div>
      </div>
    </div>
    <div class="list">
      <img src="../../../../assets/img/expert/specializes.png" alt=""><span>专业擅长</span>
    </div>
    <p class="list_content">
      {{expertDetail.goodAt}}
    </p>
    <div class="line">
    </div>
    <div class="list">
      <img src="../../../../assets/img/expert/honor.png" alt=""><span>主要荣誉</span>
    </div>
    <p class="list_honor_content" v-html="expertDetail.honor">

    </p>

    <button @click='sendAnswer' type="button" data-loading-icon="mui-spinner mui-spinner-custom"
            class="mui-btn sendProblem mui-btn-primary">向TA提问
    </button>
  </div>
</template>

<script>
  export default {
    data(){
      return {
        expertDetail: {},
      }
    },

    created(){
      let param = {
        systemToken: localStorage.getItem('SYSTEMTOKEN'),
        expertId: this.$route.query.expertId
      };
      this.axios({
        method: 'post',
        url: '/cdf/queryexpertdetail',
        headers: {
          'Content-type': 'application/json'
        },
        data: JSON.stringify(param)
      })
        .then(response => {
          this.expertDetail = response.data.data;
        })
    },
    methods: {
      sendAnswer() {
        this.$router.push({path: '/askExpert',query: {expertId: this.$route.query.expertId}})
      }
    }
  }
</script>

<style lang='less'>
  #expertDetail {
    height: calc(100vh);
    overflow: scroll;
    .block {
      width: 100%;
      overflow: hidden;
      padding: 20px 10px;
      position: relative;
      border-bottom: 10px solid #f8f8f8;
      .user {
        overflow: hidden;
        .img_wrap {
          width: 60px;
          height: 60px;
          border-radius: 50%;
          float: left;
          overflow: hidden;
          .img_left {
            width: 100%;
          }
        }
        .userright {
          float: left;
          height: 63px;
          margin-left: 10px;
          p {
            font-size: 14px;
            margin-bottom: 0;
            color: #333;
          }
          span {
            font-size: 12px;
            color: #9a9a9a;
            display: block;
          }
        }
      }
    }
  }

  .list {
    height: 50px;
    line-height: 50px;
    padding: 0 10px;
    border-bottom: 1px solid #f8f8f8;
    position: relative;
    img {
      position: absolute;
      width: 16px;
      height: 16px;
      top: 17px;
      left: 10px;
    }
    span {
      margin-left: 27px;
      font-size: 15px;
    }
  }

  .line {
    border-bottom: 10px solid #f8f8f8;
  }

  .list_content {
    min-height: 50px;
    margin-top: 10px;
    margin-bottom: 10px;
    padding-left: 10px;
    padding-right: 10px;
  }

  .list_honor_content {
    margin-bottom: 0px;
    padding: 13px 10px 50px 10px;
    letter-spacing: 1px;
  }

  .mui-btn-primary {
    width: 100%;
    height: 40px;
    position: fixed;
    bottom: 0;
    background-color: #90bbf8;
    border-color: #90bbf8;
  }

  .img_right {
    position: absolute;
    width: 20px !important;
    margin-top: 43px;
    margin-left: -18px;
  }
</style>


