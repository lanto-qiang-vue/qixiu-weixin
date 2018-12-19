<template>
<div id="remarkdetail" v-show="show">
  <div class="all">
    <!--<img class="title" :src="title"/>-->
    <div class="head"><div><img :src="userinfo.headimgurl||'/static/img/home/user.png'"/></div><p>{{userinfo.nickname}}</p></div>
    <div class="count">我在上海汽修平台已累计发布{{count}}条评价</div>
    <div class="remark">
      <div class="left">
        <p>本次打分</p><img src="/static/img/yellow.png" v-for="index in starnum" :key="index"/>
      </div>
      <span>{{info.companyAverage}}<span>分</span></span>
    </div>
    <div class="info">
      <div class="compinfo" @click="goCompany">
        <!--<img :src="info.companyIcon||'/static/img/shqxw.jpg'"/>-->
        <img :src="'/static/img/shqxw.jpg'"/>
        <div class="rightinfo">
          <p class="name">{{info.companyName}}</p>
          <p class="small">地址：{{info.companyAddress}}</p>
          <!--<p class="small">电话：<span style="margin-right: 5px">{{info.companyTel}}</span>{{info.companyMobile}}</p>-->
        </div>
      </div>
      <ul class="tags">
        <li v-for="(item, index) in tags" :key="index">{{item}}</li>
      </ul>
      <!--<div class="percent" v-show="!!info.companyBeyondOther">打败上海滩 <span>{{(parseFloat(info.companyBeyondOther)*100).toFixed(0)}}</span>% 对手</div>-->
      <!--<div class="percent" v-show="!!info.companyBeyondOther">打败上海滩 <span>{{(parseFloat(info.companyBeyondOther)).toFixed(2)}}</span>% 对手</div>-->
      <!--<div class="percent" v-show="!info.companyBeyondOther">Sorry 我们将继续努力\(•̀ㅂ•́)/</div>-->
      <div class="word"><img  :src="title"/></div>
      <img class="ercode" src="/static/img/remark/ercode.png"/>
      <div class="share"><a @click="showmask=true">分享点评画报</a></div>
    </div>
    <div v-show="showmask" class="mask" @click="showmask=false">
      <img src="/static/img/remark/share.png"/>
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
        url: '/comment/id?commentId='+ this.$route.query.id,
        headers: {'Content-type': 'application/json'},
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

      this.axios({
        method: 'post',
        url: '/app/signature',
        headers: {'Content-type': 'application/json'},
        data: JSON.stringify({url: encodeURIComponent(window.location.href.split('#')[0])})
      }).then(res=>{
        wx.config({
          debug: false,
          appId: window.location.origin==='https://weixin.shanghaiqixiu.org' ? self.consts.onlineAppId : self.consts.testAppId,
          timestamp: res.data.timeStamp,
          nonceStr: res.data.uuid,
          signature: res.data.signature,
          jsApiList: ['onMenuShareTimeline', 'onMenuShareAppMessage']
        })
      })

      let link=window.location.origin+'?share='+encodeURIComponent(window.location.hash)
      // console.log()

      wx.ready(function(){
        //分享到朋友圈
        wx.onMenuShareTimeline({
          title: titles, // 分享标题
          link: link, // 分享链接，该链接域名或路径必须与当前页面对应的公众号JS安全域名一致
          imgUrl: 'https://weixin.shanghaiqixiu.org/static/img/shqxw.jpg', // 分享图标
          success: function () {
            // 用户点击了分享后执行的回调函数
          }
        })
        //分享给朋友
        wx.onMenuShareAppMessage({
          title: titles, // 分享标题
          desc: '汽修平台企业评价', // 分享描述
          // link: 'https://weixin.shanghaiqixiu.org/#/remarkDetail?id='+self.$route.query.id, // 分享链接，该链接域名或路径必须与当前页面对应的公众号JS安全域名一致
          link: link, // 分享链接，该链接域名或路径必须与当前页面对应的公众号JS安全域名一致
          imgUrl: 'https://weixin.shanghaiqixiu.org/static/img/shqxw.jpg', // 分享图标
          type: '', // 分享类型,music、video或link，不填默认为link
          dataUrl: '', // 如果type是music或video，则要提供数据链接，默认为空
          success: function () {
// 用户点击了分享后执行的回调函数
          }
        });
      })
    },
    methods:{
      goCompany(){
        this.$router.push({path:'/maintain', query:{ compname: this.info.companyName}})
      },
      getTitle(rank){
        // if(rank>0 && rank<=1){
        //   return '/static/img/remark/title1.png'
        // }
        // if(rank>1 && rank<=2){
        //   return '/static/img/remark/title2.png'
        // }
        // if(rank>2 && rank<=3){
        //   return '/static/img/remark/title3.png'
        // }
        // if(rank>3 && rank<=4){
        //   return '/static/img/remark/title4.png'
        // }
        // if(rank>4 && rank<=4.5){
        //   return '/static/img/remark/title5.png'
        // }
        // if(rank>4.5 && rank<5){
        //   return '/static/img/remark/title6.png'
        // }
        // if(rank==5){
        //   return '/static/img/remark/title7.png'
        // }

        if(rank>0 && rank<=1){
          return '/static/img/remark/word1.png'
        }
        if(rank>1 && rank<=2){
          return '/static/img/remark/word2.png'
        }
        if(rank>2 && rank<=3){
          return '/static/img/remark/word3.png'
        }
        if(rank>3 && rank<=4){
          return '/static/img/remark/word4.png'
        }
        if(rank>4 && rank<=4.5){
          return '/static/img/remark/word5.png'
        }
        if(rank>4.5 && rank<5){
          return '/static/img/remark/word6.png'
        }
        if(rank==5){
          return '/static/img/remark/word7.png'
        }
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
