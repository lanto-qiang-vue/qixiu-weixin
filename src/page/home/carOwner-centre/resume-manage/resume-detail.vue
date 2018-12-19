<template>
  <div id="resumeDetail" style="padding-top: 40px;">
    <mt-header fixed title="简历信息">
      <router-link to="/carOwner-centre/resume-manage" slot="left">
        <mt-button icon="back">返回</mt-button>
      </router-link>
      <mt-button slot="right">保存</mt-button>
    </mt-header>

    <div class="title" style="padding: 0 15px; background-color: #fff;">
      <ul class="mui-table-view">
        <li class="mui-table-view-cell" style="padding: 11px 0;" @click="goEditInfo">
          <a class="mui-navigate-right" style="margin: -11px 0;">
            <div class="fl" style="width: 45px; height: 45px; background-color: #eee; border-radius: 50%"></div>
            <div style="margin-left: 60px;">
              <p style="color: #333; margin-bottom: 4px;">{{ resumeInfo.realName }} | {{ resumeInfo.sex ? "男" : "女"}}</p>
              <p style="color: #333;">编辑个人资料</p>
            </div>
          </a>
        </li>
        <li class="mui-table-view-cell" @click="goWorkHope">
          <a class="mui-navigate-right" style="font-size: 15px; padding-left: 0;">求职意向</a>
        </li>
        <li class="mui-table-view-cell" @click="goMyAdvantage">
          <a class="mui-navigate-right" style="font-size: 15px; padding-left: 0;">我的优势</a>
        </li>
      </ul>
    </div>
    <div style="line-height: 40px;text-indent: 15px; font-size: 15px; color: #999;">简历详情</div>
    <div class="working-experience" style="padding: 0 15px; background-color: #fff;">
      <ul class="mui-table-view">
        <li class="mui-table-view-cell" @click="gowatchWorkingExperience">
          <a class="mui-navigate-right " style="font-size: 15px; padding-left: 0;">
            <span class="fr" style="color: #999;">2015.07-2017.07</span>
            <div class="text-one-cut" style="margin-right: 130px;">蓝途新能源汽车(上海)有限公司</div>
          </a>
        </li>
        <div style="line-height: 40px; text-align: center; color: #26a2ff; font-size: 15px" @click="goWorkingExperience">+ 工作经历</div>
      </ul>
    </div>

    <div class="working-experience" style="padding: 0 15px; margin-top: 15px; background-color: #fff;">
      <ul class="mui-table-view">
        <li class="mui-table-view-cell" @click="goWatchEducationExperience">
          <a class="mui-navigate-right " style="font-size: 15px; padding-left: 0;">
            <span class="fr" style="color: #999;">{{ resumeInfo.educationStartDate | FormatDate("YYYY.MM.DD") }}-{{ resumeInfo.educationEndDate | FormatDate("YYYY.MM.DD") }}</span>
            <div class="text-one-cut" style="margin-right: 130px;">{{ resumeInfo.schoolName }}</div>
          </a>
        </li>
        <div style="line-height: 40px; text-align: center; color: #26a2ff; font-size: 15px" @click="goEducationExperience">+ 教育经历</div>
      </ul>
    </div>
  </div>
</template>

<script>
  import { Header } from 'mint-ui';
  export default{
    name: "resumeDetail",

    data(){
      return {
        resumeInfo: {}
      }
    },
    created(){
      this.axios({
        url: '/resume/resume/'+ this.$route.query.id + '/'+localStorage.getItem("ACCESSTOKEN"),
        method: 'get'
      })
        .then(res=>{
          console.log(res);
          if(res.data.code==="0") {
            this.resumeInfo=res.data.data
          } else {
            Toast(res.data.status)
          }
        })
    },
    components: {

    },
    methods: {
      goEditInfo() {
        this.$router.push("/carOwner-centre/edit-info")
      },
      goWorkHope(){
        this.$router.push("/carOwner-centre/work-hope")
      },
      goMyAdvantage() {
        this.$router.push("/carOwner-centre/my-advantage")
      },
      goWorkingExperience() {
        this.$router.push("/carOwner-centre/working-experience")
      },
      goEducationExperience() {
        this.$router.push("/carOwner-centre/education-experience")
      },
      gowatchWorkingExperience() {
        this.$router.push({
          path: "/carOwner-centre/working-experience",
          query: {
            watch: 'watch'
          }
        })
      },
      goWatchEducationExperience() {
        this.$router.push({
          path: "/carOwner-centre/education-experience",
          query: {
            watch: 'watch'
          }
        })
      },
    }
  }
</script>

<style lang='less' scoped>
  #resumeDetail {
    height: calc(100vh - 50px);
    background-color: #f8f8f8;

    ul:before, ul:after {
      height: 0;
    }

  }
</style>

<style lang='less'>
  #resumeDetail {
    .mui-navigate-right:after {
      color: #26a2ff;
      right: 0;
    }
    .mui-table-view-cell:after {
      left: 0;
    }
  }
</style>
