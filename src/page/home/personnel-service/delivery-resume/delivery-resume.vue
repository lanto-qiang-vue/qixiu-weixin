<template>
  <div id="deliveryResume">
    <mt-loadmore :top-method="loadTop" :bottom-method="loadBottom" :bottom-all-loaded="allLoaded" :autoFill="false" bottomPullText="上拉加载更多"  topLoadingText="更新中" ref="loadmore">
    <div class="title clearfix">
      <div class="left" style="float: left; margin-right: 90px;">
        <div class="top">
          <input type="text" placeholder="公司名称">
          <input type="text" placeholder="岗位名称">
          <input type="text" placeholder="工作性质">
        </div>
        <div class="bottom">
          <input type="text" placeholder="发布开始时间">
          <span> ~ </span>
          <input type="text" placeholder="发布结束时间">
        </div>
      </div>
      <div class="right" style="margin-left: 100%; transform: translateX(-100%); width: 80px; height: 80px;">
        查询
      </div>
    </div>
    <div class="company-list">
      <ul>
          <li class="clearfix" v-for="(item, index) in jobList" :key="index">
            <div class="detail fl">
              <p class="text-one-cut">公司名称：{{ item.virtualCompanyName }}</p>
              <p class="text-one-cut">岗位名称：{{ item.post_name }}</p>
              <p class="text-one-cut">工作性质：{{ item.post_desc }}</p>
            </div>
            <div class="date fr">
              <p class="text-one-cut" style="margin-bottom: 21px;">薪资: 接口无薪资字段</p>
              <p class="text-one-cut">{{ item.publish_time | FormatDate }}</p>
            </div>
          </li>
        </ul>
    </div>
    </mt-loadmore>
  </div>
</template>

<script>
  import { Toast, Loadmore } from 'mint-ui';
  export default{
    name: "deliveryResume",

    data(){
      return {
        allLoaded: false,
        page: 1,
        jobList: []
      }
    },
    created(){
      this.getJobList()
    },
    components: {

    },
    methods: {
      getJobList(){
        this.axios({
          url: '/center/searchJobList',
          method: 'post',
          headers: {"Content-type": 'application/json'},
          data:JSON.stringify({
            "accessToken": localStorage.getItem("ACCESSTOKEN"),
            "endDate": "",
            "limit": 10,
            "page": this.page,
            "postName": "",
            "startDate": "",
            "virtualCompanyName": "",
            "workProperty": ""
          })
        })
          .then(res=>{
            this.$refs.loadmore.onTopLoaded();
            if(res.data.code==='0'){
              this.jobList=[...this.jobList, ...res.data.data]
              console.log(res);
            }else{
              Toast(res.data.status)
            }
          })
      },
      loadTop(){
        this.jobList=[]
        this.page=1
        this.getJobList()
      },
      loadBottom(){
        this.page++
        this.getJobList()
      }
    }
  }
</script>

<style lang='less' scoped>
  #deliveryResume {
    height: calc(100vh - 50px);
    padding: 10px;
    overflow: auto;
    .title {
      >.left {
        >.top {
          margin-bottom: 10px;
          display: flex;
          justify-content: space-between;
          input {
            margin: 0;
            width: 30%;
            height: 35px;
            padding: 0;
          }
        }
        >.bottom {
          display: flex;
          justify-content: space-between;
          line-height: 35px;
          >input {
            width: 45%;
            height: 35px;
            padding: 0;
            margin: 0;
          }
        }
      }
      >.right {
        text-align: center;
        line-height: 80px;
        color: #666;
        font-size: 18px;
        background-color: #e2e2e2;
      }
    }
    .company-list {
      margin-top: 15px;
      ul li {
        border: 1px solid #ccc;
        margin-bottom: 10px;
        padding: 10px;
        overflow: hidden;
        .detail {
          width: 60%;
        }
        .date {
          width: 40%;
          p {
            text-align: right;
          }
        }
        p {
          margin-bottom: 0;
          font-size: 15px;
        }
      }
    }
  }
</style>
