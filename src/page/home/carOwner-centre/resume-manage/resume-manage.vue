<template>
  <div id="resumeManage">
    <mt-navbar v-model="selected" style="border-bottom: 1px solid #eee;">
      <mt-tab-item id="1">我的简历</mt-tab-item>
      <mt-tab-item id="2">我的申请</mt-tab-item>
      <mt-tab-item id="3">谁看过我</mt-tab-item>
    </mt-navbar>

    <!-- tab-container -->
    <mt-tab-container v-model="selected" style="padding: 0 15px">
      <mt-tab-container-item id="1" style="position: relative;">
        <ul class="resume" style="height: calc(100vh - 50px); padding-bottom: 60px; overflow: auto;">
          <li v-for="(item, index) in resumeList" :key="index" style="padding: 15px 0; border-bottom: 1px solid #eee; color: #333; font-size: 16px;" @click="goResumeDetail(item.id)">
            <div class="text-one-cut" style="margin-bottom: 15px;">
              <span class="fr" style="color: #666;">完成度: <span style="color: #26a2ff;">{{ item.completion }}</span></span>
              <span>{{ item.name }}</span>
            </div>
            <div class="xinzi" style="color: #999;">
              <span>{{ item.minSalary }}k-{{ item.maxSalary }}k</span>
              <span>{{ item.jobType }}</span>
            </div>
          </li>
        </ul>
        <div style="padding: 10px 0; border-top: 1px solid #eee; position: absolute; width: 100%; left: 0; bottom: -2px; background-color: #fff;">
          <mt-button type="primary" size="large" @click="goAddResume" style="width: 100%;">新增简历</mt-button>
        </div>
      </mt-tab-container-item>
      <mt-tab-container-item id="2">
        <div class="request">
          <div class="mui-input-row mui-input-search" style="padding-top: 15px; border-bottom: 1px solid #eee; position: relative">
            <span class="mui-icon mui-icon-search" style="position: absolute; left: 5px; top: 50%; transform: translateY(-50%)"></span>
            <input type="search" style="text-indent: 15px;" class="mui-input-clear" placeholder="搜索公司名称">
          </div>
          <ul style="height: calc(100vh - 115px); overflow: auto;">
            <li class="clearfix" v-for="(item, index) in requestList" :key="index" style="padding: 15px 0; border-bottom: 1px solid #eee; color: #333; font-size: 16px;">
              <div class="fl" style="width: 60px; height: 60px; background-color: #eee; border-radius: 6px;"></div>
              <div style="margin-left: 75px;">
                <div class="line-one" style="margin-bottom: 6px;">
                  <span>汽车销售专员</span>
                  <span class="fr" style="color: #26a2ff; font-size: 14px;" v-if="!item.idRead">未读</span>
                  <span class="fr" style="color: #999; font-size: 14px;" v-if="item.idRead">已读</span>
                </div>
                <div class="line-two text-one-cut" style="color: #999; font-size: 14px;">{{ item.corpName }}</div>
                <div class="line-three" style="display: flex; justify-content: space-between; flex-wrap: wrap; margin-top: 5px;font-size: 14px; color: #999;">
                  <span>经验不限</span>
                  <span>大专</span>
                  <span>10-15k</span>
                  <span class="fr" style="padding-left: 0">{{ item.applyTime | FormatDate }}</span>
                </div>
              </div>
            </li>
          </ul>
        </div>
      </mt-tab-container-item>
      <mt-tab-container-item id="3">
        <div class="lookMe">
          <p style="line-height: 40px; border-bottom: 1px solid #eee;">
            近60天简历被浏览<span style="color: #26a2ff;"> 3 </span>次,浏览公司<span style="color: #26a2ff;"> 2 </span>家
          </p>
          <ul style="height: calc(100vh - 102px); overflow: auto;">
            <li class="clearfix" v-for="(item, index) in whoSeeList" :key="index" style="padding: 15px 0; border-bottom: 1px solid #eee; color: #333; font-size: 16px;">
              <div class="fl" style="width: 60px; height: 60px; background-color: #eee; border-radius: 6px;"></div>
              <div style="margin-left: 75px;">
                <div class="line-one text-one-cut" style="margin-bottom: 6px; padding-right: 40px; position: relative;">
                  <span>{{ item.corpName }}</span>
                  <span style="position: absolute; color: #999; font-size: 14px; right: 0; top: 0;">{{ item.time }}</span>
                </div>
                <div class="line-two" style="color: #999; font-size: 14px;">
                  <span>招聘</span>
                  <span style="margin-left: 10px; color: #26a2ff;">{{ item.industry }}</span>
                </div>
                <div class="line-three" style="margin-top: 5px;font-size: 14px; color: #999;">
                  <span>经验不限</span>
                  <span>大专</span>
                  <span>{{ item.minSalary }}k-{{ item.maxSalary }}k</span>
                </div>
              </div>
            </li>
          </ul>
        </div>
      </mt-tab-container-item>
    </mt-tab-container>
  </div>
</template>

<script>
  import { Toast, Navbar, TabItem, Button } from 'mint-ui';
  export default{
    name: "resumeManage",

    data(){
      return {
        selected: "1",
        resumeList: [],
        requestList: [],
        whoSeeList:[]
      }
    },
    created(){

      this.axios({
        url: '/resume/center/'+localStorage.getItem("ACCESSTOKEN"),
        method: 'get'
      })
      .then(res=>{
        if(res.data.code==="0") {
          this.resumeList=res.data.data
        } else {
          Toast(res.data.status)
        }
      })

      this.axios({
        url: '/resume/apply/'+localStorage.getItem("ACCESSTOKEN"),
        method: 'get'
      })
      .then(res=>{
        if(res.data.code==="0") {
          this.requestList=res.data.data
        } else {
          Toast(res.data.status)
        }
      })

      this.axios({
        url: '/resume/whosee/'+localStorage.getItem("ACCESSTOKEN"),
        method: 'get'
      })
        .then(res=>{
          console.log(res);
          if(res.data.code==="0") {
            this.whoSeeList=res.data.data
          } else {
            Toast("暂无数据")
          }
        })
    },
    components: {

    },
    methods: {
      goResumeDetail(id) {
        this.$router.push({
          path:"/carOwner-centre/resume-detail",
          query: {
            id
          }
        })
      },
      goAddResume(){
        this.$router.push('/carOwner-centre/add-resume')
      }
    }
  }
</script>

<style lang='less' scoped>
  #resumeManage {
    height: calc(100vh);
    background-color: #fff;
    overflow: auto;
    a {
      color: #666;
    }
    a.is-selected {
      color: #26a2ff;
    }
  }
</style>

<style lang='less'>
  #resumeManage {
    .mint-navbar a .mint-tab-item-label {
      font-size: 15px;
    }
    .mint-tab-container-wrap .resume li .xinzi {
      span {
        -webkit-background-size: 16px 16px !important;
        background-size: 16px 16px !important;
        padding-left: 20px;
        display: inline-block;
        margin-right: 15px;
      }
      span:first-child {
        background: url(../../../../assets/img/home/carOwner-centre/3-3.png) no-repeat left center;
      }
      span:last-child {
        background: url(../../../../assets/img/home/carOwner-centre/3-2.png) no-repeat left center;
      }
    }
    .mint-tab-container-wrap .request li .line-three, .mint-tab-container-wrap .lookMe li .line-three {
      span {
        -webkit-background-size: 16px 16px !important;
        background-size: 16px 16px !important;
        padding-left: 18px;
        display: inline-block;
        margin-right: 5px;
      }
      span:first-child {
        background: url(../../../../assets/img/home/carOwner-centre/3-1.png) no-repeat left center;
      }
      span:nth-child(2) {
        background: url(../../../../assets/img/home/carOwner-centre/3-4.png) no-repeat left center;
      }
      span:nth-child(3) {
        background: url(../../../../assets/img/home/carOwner-centre/3-3.png) no-repeat left center;
      }
    }
  }

</style>
