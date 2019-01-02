<template>
<div id="remarkdetail" v-show="show">


      <div class="compinfo" >
        <!--<img :src="info.companyIcon||'/static/img/shqxw.jpg'"/>-->
        <img :src="'/static/img/shqxw.jpg'"/>
        <div class="rightinfo">
          <p class="name">{{info.companyName}}</p>
          <p class="small">地址：{{info.companyAddress}}</p>
          <!--<p class="small">电话：<span style="margin-right: 5px">{{info.companyTel}}</span>{{info.companyMobile}}</p>-->
        </div>
      </div>

</div>
</template>

<script>
  import { Toast} from 'mint-ui'
	export default {
		name: "remark-detail",
    data(){
      return{
        show: false,
        info:{},
        title: '',
        starnum: 0,
        tags: ['⊙﹏⊙||| 这个用户有点懒，没有留下任何评价~'],
        showmask: false,
        count: 0,
        userinfo:{}
      }
    },
    created(){
		  console.log($(window).width())
		  // alert($(window).width())
      let self=this
      let titles= $(window).width()<=375?'我在上海汽修平台点了个评，快来围观吧~':'我在上海汽修平台点了个评，小姐姐小哥哥们快来围观吧~'
      this.axios({
        method: 'get',
        url: '/comment/maintain/'+ this.$route.query.id,
      }).then(res => {
        if(res.data.code=='0'){
          self.info= res.data;
          self.starnum= parseInt(res.data.companyAverage)
          self.title= self.getTitle(parseFloat(res.data.companyAverage))
          if (res.data.userTags) self.tags= res.data.userTags;
          self.count= res.data.userComments
          if(res.data.weixinUserInfo) self.userinfo= JSON.parse(res.data.weixinUserInfo)
          self.show=true
        } else{
          Toast(res.data.status);
        }
      })


    },
    methods:{
      goCompany(){
        this.$router.push({path:'/maintain', query:{ compname: this.info.companyName}})
      },

    }
}
</script>

<style scoped lang='less'>
#remarkdetail{
  height: 100vh;
  overflow: auto;
  background: url('/static/img/remark/bg.jpg') no-repeat;
  background-size: 100% 100%;
  .all{
    padding: 15px;
    position: relative;
    overflow: hidden;
    min-height: 100vh;
  }
  .head{
    width: 70px;
    text-align: center;
    margin: 0 auto;
    overflow: hidden;
    div{
      width: 100%;
      height: 70px;
      border-radius: 100%;
      overflow: hidden;
      background-color: #5a63fe;
    }
    img{
      width: 100%;
    }
    p{
      font-size: 14px;
      color: white;
      margin: 5px 0;
    }
  }
  .count{
    width: 100%;
    text-align: center;
    color: #daccff;
    font-size: 14px;
  }
  .title{
    margin: 20px 0;
    padding: 0 10px;
    width: 100%;
  }
  .remark{
    margin-top: 5px;
    margin-bottom: 10px;
    text-align: center;
    /*font-size: 14px;*/
    font-weight: 700;
    color: #ffd017;
    /*height: 25px;*/
    /*line-height: 25px;*/
    display: flex;
    justify-content: center;
    .left{
      display: inline-block;
      width: 120px;
      p{
        font-size: 14px;
        margin: 0;
        color: #ffd017;
      }
      img{
        width: 20px;
        margin-right: 5px;
      }
      img:last-child{margin: 0}
    }
    span{
      /*display: inline-block;*/
      height: 42px;
      line-height: 46px;
      font-size: 46px;
      font-weight: 900;
      /*margin-right: 5px;*/
      display: inline-flex;
      align-items: flex-end;
      span{
        font-size: 16px;
        height: 30px;
        line-height: 30px;
      }
    }
  }
  .info{
    width: 100%;
    background-color: white;
    border-radius: 10px;
    overflow: hidden;
    padding: 15px;
    .compinfo{
      img{
        width: 60px;
        height: 60px;
        position: absolute;
      }
      .rightinfo{
        padding-left: 70px;
        width: 100%;
        height: 70px;
        .name{
          font-size: 16px;
          color: black;
          margin-bottom: 0;
          /*line-height: 35px;*/
          height: 35px;
          line-height: 16px;
        }
        .small{
          font-size: 14px;
          /*line-height: 20px;*/
          margin: 5px 0 0 0 ;
          height: 30px;
          line-height: 16px;
        }
      }
    }
    .tags{
      color: #a0c2f9;
      font-size: 14px;
      font-weight: 300;
      text-align: center;
      margin: 15px 0;
      li{
        display: inline-block;
        margin-right: 5px;
        margin-bottom: 5px;
      }
    }
    .word{
      width: 100%;
      text-align: center;
      margin-bottom: 10px;
      img{
        width: 70%;
      }
    }
    .percent{
      font-size: 20px;
      color: #4285f4;
      text-align: center;
      span{
        font-size: 30px;
        font-weight: 600
      }
    }
    .ercode{
      margin: 20px auto 0 auto;
      width: 80%;
      left: 0;
      right: 0;
      display: block;
    }
    .share{
      text-align: center;
      margin-top: 10px;
      a{
        font-size: 18px;
        width: 90%;
        height: 40px;
        line-height: 40px;
        border-radius: 20px;
        color: white;
        /*background-color: #4089f6;*/
        background: linear-gradient(to right, #78b9fd , #4f40ff);
        display: inline-block;
      }
    }
  }
  .mask{
    position: absolute;
    width: 100%;
    height: 100%;
    background-color: #1d1d1d;
    opacity: .7;
    left: 0;
    top: 0;
    img{
      width: 150px;
      position: fixed;
      top: 0;
      right: 5px;
    }
  }
}
</style>
