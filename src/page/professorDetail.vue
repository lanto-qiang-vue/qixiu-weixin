<template>
  <div id="professorDetail">
    <div class="top_detail">
      <img :src="content.photo===''?'http://static.dev.shanghaiqixiu.org/images/2017/11/27/pic_1514370600988.png':content.photo" width=60 height=60 alt="">
      <div class="name_wrap">
        <h2 class="name">{{ content.name }}</h2>
        <p class="zhicheng">高级讲师</p>
        <p class="school">{{ content.empUnit }}</p>
      </div>
    </div>
    <div class="zhuanye">
      <p class="tit_zhuanye">专业擅长</p>
      <p class="shuoming_zhuanye">{{ content.goodAt }}</p>
    </div>
    <div class="honor">
      <div class="main_honor">主要荣誉</div>
      <div class="honor_content">{{ content.honor }}</div>
    </div>
    <div class="tiwen">
      <button @click="goQuestion">向TA提问</button>
    </div>
  </div>
</template>

<script>
export default {
  name: "professorDetail",
  data(){
    return{
      content: {}
    }
  },
  created(){
    this.axios({
      method:'get',
      url: '/cdf/queryexpertdetail/'+localStorage.getItem("SYSTEMTOKEN")+'/'+this.$route.query.id
    }).then(res=>{
      console.log(res.data.data)
      this.content=res.data.data
    })
  },
  methods:{
    goQuestion(){
      this.$router.push({
        path: '/question'
      })
    }
  }
}
</script>

<style lang='less' scoped>
  #professorDetail {
    width: 100%;
    padding-bottom: 60px;
    background-color: #f8f8f8;
    position: relative;
    >.top_detail {
      padding: 10px;
      background-color: #fff;
      img {
        border-radius: 50%;
        float: left;
      }
      .name_wrap {
        margin-left: 70px;
        height: 60px;
        h2 {
          color: #333;
          font-size: 16px;
          margin-bottom: 0;
          font-weight: 400;
          margin-top: 0;
        }
        .school {
          font-size: 14px;
          color: #666;
          overflow: hidden;
          text-overflow: ellipsis;
          white-space: nowrap;
          height: 0;
          width: 100%;
          height: 20px;
        }
        .zhicheng {
          margin-top: 5px;
          margin-bottom: 0;
        }
      }
    }
    .zhuanye {
      background-color: #fff;
      margin: 10px 0;
      padding: 0 10px 1px;
      .tit_zhuanye {
        border-bottom: 1px solid #eee;
        padding-left: 20px;
        background: url(../assets/img/professorDetail/major.png) no-repeat left center;
        -webkit-background-size: 15px 20px;
        background-size: 16px 20px;
        color: #333;
        font-size: 15px;
        line-height: 40px;
      }
      .shuoming_zhuanye {
        color: #666;
        line-height: 20px;
        margin-top: 10px;
      }
    }
    .honor {
      background-color: #fff;
      padding: 0 10px;
      .main_honor {
        padding-left: 20px;
        background: url(../assets/img/professorDetail/honor.png) no-repeat left center;
        -webkit-background-size: 15px 20px;
        background-size: 16px 20px;
        color: #333;
        font-size: 15px;
        line-height: 40px;
      }
      .honor_content {
        border-top: 1px solid #eee;
        min-height: 300px;
        padding: 15px 0 10px 0;
        font-size: 13px;
        color: #666;
      }
    }
    .tiwen {
      position: fixed;
      left: 0;
      bottom: 0;
      background-color: #fff;
      width: 100%;
      height: 60px;
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
    .text_one {
      -ms-text-overflow: ellipsis;
      text-overflow: ellipsis;
      white-space: nowrap;
      overflow: hidden;
    }
  }
</style>
