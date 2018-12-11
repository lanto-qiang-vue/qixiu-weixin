<template>
<!--<div id="compDetail">-->
<div id="compDetail" v-show="maintainDetailShow">
<img class="close" @click="closeDetail" src="../assets/img/maintain/关闭.png" />
<div class="info" >
  <div class="head">{{all.companyName}}<span :class="{rest: !isOpenTime(all.openHours)}">{{isOpenTime(all.openHours)?'营业中': '休息中'}}</span></div>
  <div class="text address">{{all.companyAddress}}</div>
  <div class="avg">
    <img src="../assets/img/maintain/score_yellow.png"  v-for="index in parseInt(all.avgCompany)||0" :key="'yellow'+index">
    <img src="../assets/img/maintain/score_gray.png"  v-for="index in (5-parseInt(all.avgCompany))||0" :key="'gray'+index">
    {{all.avgCompany?all.avgCompany+'分':'暂无评分'}}
  </div>
  <div class="text">特约维修：{{compinfo.brand}}</div>
  <div class="text">经营范围：{{all.companyProperty}}</div>
  <div class="button">
    <router-link tag="div" :to="{path: '/carOwner-centre/appointment', query: {id: maintainDetail.sid} }">
      <span class="yuyue">预约服务</span></router-link>
    <!--<router-link tag="div" :to="{path: '/carOwner-centre/visitService', query: {id: id} }">-->
      <!--<span class="shangmeng">上门服务</span></router-link>-->
    <router-link tag="div" :to="{ path : '/remarkMatch', query: { corpId: maintainDetail.sid }}">
      <span class="dianping">点评</span></router-link>
    <div v-show="all.companyTel" ><a class="lianxi" :href="'tel:'+ all.companyTel">联系</a></div>
    <div v-show="!all.companyTel"><a class="lianxi" @click="noTal">联系</a></div>
  </div>
</div>
<div class="list" :style="{height: listHeight+'px'}">
  <div id="list">
    <div class="img">
      <img :src="all.companyIcon||'/static/img/shqxwbig.png'"/>
      <!--<img @click="small();$emit('back')" class="back" src="../assets/img/maintain/back.png" />-->
    </div>
    <div class="head">累计评论（{{comment.count+1}}条）
      <router-link tag="a" :to="{path: '/maintainRemark', query: {id: maintainDetail.sid, joint: all.joint} }">
        <img src="../assets/img/maintain/箭头.png"/>
      </router-link>
    </div>
    <div class="tag"><span v-for="(item, index) in all.companyShowWors" :key="index">{{item}}</span></div>
    <ul>
      <li v-show="!all.joint" class="system">
        <div class="left"><img src="../assets/img/maintain/shqx-head.png"/></div>
        <div class="right">
          <div class="name">上海汽修平台<span>系统评分</span></div>
          <div class="avg">
            <img src="../assets/img/maintain/score_yellow.png"  v-for="index in 1" :key="'yellow'+index">
            <img src="../assets/img/maintain/score_gray.png"  v-for="index in 4" :key="'gray'+index">
            1.2分
          </div>
          <div class="msg">企业未能遵照相关法律法规和政策完成《汽车维修电子健康档案系统》对接，因此设置默认评分。</div>
        </div>
      </li>
      <li v-for="(item, index) in comment.comments" :key="index">
        <div class="left"><img v-if="item.headimgurl" :src="item.headimgurl"/></div>
        <div class="right">
          <div class="name">车友：{{hide(item.vehicleNum)}} <span>{{item.createTime | FormatDate}}</span></div>
          <div class="avg">
            <img src="../assets/img/maintain/score_yellow.png"  v-for="index in parseInt(item.userAvgScore)||0" :key="'yellow'+index">
            <img src="../assets/img/maintain/score_gray.png"  v-for="index in (5-parseInt(item.userAvgScore))||0" :key="'gray'+index">
            {{item.userAvgScore}}分
          </div>
          <div class="all">
            履约 {{item.keepAppointment}}
            态度 {{item.attitude}}
            质量 {{item.quailty}}
            速度 {{item.speed}}
            价格 {{item.price}}
          </div>
          <ol v-if="item.tags">
            <li v-for="(tag, index) in item.tags.split(';')" :key="index">{{tag}}</li>
          </ol>
        </div>
      </li>
      <li v-show="all.joint" class="system">
        <div class="left"><img src="../assets/img/maintain/shqx-head.png"/></div>
        <div class="right">
          <div class="name">上海汽修平台<span>系统评分</span></div>
          <div class="avg">
            <img src="../assets/img/maintain/score_yellow.png"  v-for="index in 3" :key="'yellow'+index">
            <img src="../assets/img/maintain/score_gray.png"  v-for="index in 2" :key="'gray'+index">
            3分
          </div>
          <div class="msg">该企业已根据相关法律法规和政策完成《汽车维修电子健康档案系统》对接，因此设置该默认评分。</div>
        </div>
      </li>
    </ul>
  </div>

</div>

<!--<div class="bottom" v-show="showDetail">-->
  <!--<div class="lookall" @click="showAll(true)" v-show="translateY">查看详情</div>-->
  <!--<div class="lookmap" @click="showAll(false)" v-show="!translateY">显示地图</div>-->
  <!--<div class="gps" @click="$emit('openMap', compinfo);$emit('back')">导航</div>-->
  <!--<div class="distance">距离您 {{distance}}km</div>-->
<!--</div>-->
</div>
</template>

<script>
import { Toast } from 'mint-ui'
export default {
  name: "mantain-detail",
  // props: ['id','distance', 'random', 'searchCompanyType', 'showDetail', 'height'],
  props: ['height'],
  data() {
    return {
      all: {},
      compinfo: {},
      // translateY2:0,
      // translateY: $(window).height(),
      opacity: 1,
      // windowHeight: $(window).height(),
      comment:{},

      maintainDetailShow: false,
      listHeight: 300
    }
  },
  computed: {
    // bodyHeight(){
    //   return this.$store.state.slideState.bodyHeight
    // },
    show(){
      return this.$store.state.slideState.showBody
    },
    maintainDetail(){
      return this.$store.state.maintainDetail
    },
  },
  watch: {
    // random(val){
    //   this.translateY= $(window).height()
    //   this.all={}
    //   this.compinfo={}
    //   let self= this
    //   // console.log(this.searchCompanyType)
    //   if(this.searchCompanyType=='164'){
    //     this.axios({
    //       method: 'get',
    //       url: '/comment/company/detail?companyId='+this.id ,
    //       headers: {
    //         'Content-type': 'application/json'
    //       },
    //     }).then(res => {
    //       // console.log(res.data)
    //       self.all=res.data
    //       self.compinfo=res.data.companyInfo
    //       setTimeout(function () {
    //         self.small()
    //         self.opacity=1
    //         // console.log(this.translateY)
    //       },100)
    //     })
    //   }else{
    //     this.axios({
    //       method: 'post',
    //       url: '/maintain/corpDetail' ,
    //       headers: {
    //         'Content-type': 'application/json'
    //       },
    //       data: JSON.stringify({
    //         corpId : this.id ,
    //         systemToken : localStorage.getItem('SYSTEMTOKEN')
    //       })
    //     }).then(res => {
    //       console.log(res.data)
    //       self.all.companyName=res.data.data.corpName
    //       self.all.companyTel=res.data.data.linkTel
    //       self.all.businessStatus=1
    //       self.all.companyAddress=res.data.data.corpAdd
    //       self.compinfo=res.data.data
    //       setTimeout(function () {
    //         self.small()
    //         self.opacity=1
    //         console.log(this.translateY)
    //       },100)
    //     })
    //   }
    //
    //
    //   this.axios({
    //     method: 'post',
    //     url: '/comment/getComments' ,
    //     headers: {
    //       'Content-type': 'application/json'
    //     },
    //     data: JSON.stringify({"companyId": this.id,"page":1,"pageSize":10})
    //   }).then(res => {
    //     // console.log(res.data)
    //     for (let i in res.data.comments){
    //       // if(res.data.comments[i].openId)
    //       //   self.getimg(res.data.comments[i].openId)
    //       if(res.data.comments[i].userInfo){
    //         let img= JSON.parse(res.data.comments[i].userInfo).headimgurl
    //         if(img) res.data.comments[i].headimgurl= img
    //       }
    //     }
    //     self.comment= res.data
    //   })
    // },
    // show(val){
    //   if(val=== 'maintainDetail'){
    //     this.maintainDetailShow= false
    //     this.getData()
    //     // this.$store.commit('setSlideBodyHeight', 300)
    //     // this.$store.commit('setSlideMinHeight', 45)
    //   }else{
    //     // this.maintainDetailShow= false
    //   }
    // },
    maintainDetail(){
      if(this.show=== 'maintainDetail') this.getData()
    },
    height(val){
      this.calcHeight(val)
    }
    // bodyHeight(val){
    //   // console.log('bodyHeightDetail',val)
    //   if (this.show=='maintainDetail') this.calcHeight(val)
    // },
  },
  // mounted(){
  //   let self=this
  //
  //   let overscroll = function(el) {
  //     el.addEventListener('touchstart', function() {
  //       let top = el.scrollTop
  //         ,totalScroll = el.scrollHeight
  //         ,currentScroll = top + el.offsetHeight;
  //       if(top === 0) {
  //         el.scrollTop = 1;
  //       }else if(currentScroll === totalScroll) {
  //         el.scrollTop = top - 1;
  //       }
  //     });
  //
  //     el.addEventListener('touchmove', function(evt) {
  //       if(el.offsetHeight < el.scrollHeight)
  //         evt._isScroller = true;
  //     });
  //   }
  //   overscroll(document.querySelector('#compDetail'));
  //
  //   document.body.addEventListener('touchmove',this.noscroll,{ passive: false });
  // },

  // deactivated(){
  //   document.body.removeEventListener('touchmove', this.noscroll,false)
  // },
  // beforeDestory(){
  //   document.body.removeEventListener('touchmove', this.noscroll,false)
  // },
  mounted(){
    let self= this
    if(this.show=== 'maintainDetail') this.getData()
    $(".list").bind('touchmove',function(e){
      // if($(this).scrollTop()<=1) $(this).scrollTop(2)
      e.stopPropagation();
    })

    // document.body.addEventListener('touchstart',self.noscroll,{ passive: false });
    // this.bodyNoScoll()
  },
  methods:{
    noscroll(evt) {
      if(!evt._isScroller) {
        evt.preventDefault();
      }
    },
    getData(){
      this.maintainDetailShow=false
      let self= this
      this.$store.commit('setMaintainListHistory', false)
      this.$store.commit('setMaintainListHistory', this.maintainDetail)
      this.axios({
        method: 'get',
        url: '/maintain/v2/company/detail?companyId='+this.maintainDetail.sid ,
        // url: '/comment/company/detail?companyId='+this.maintainDetail.sid ,
        headers: {
          'Content-type': 'application/json'
        },
      }).then(res => {
        self.all=res.data
        self.compinfo=res.data
        this.maintainDetailShow= true
        setTimeout(function () {
          // console.log('$("#compDetail .info").outerHeight()',$("#compDetail .info").outerHeight())
          // self.$store.commit('reSetSlideBodyHeight', $("#compDetail .info").outerHeight())
          // self.$store.commit('setSlideMinHeight', $("#compDetail .info").outerHeight())

          self.$emit('minHeight', $("#compDetail .info").outerHeight())
          self.$emit('toLocation', 0)
          self.$emit('init')
        },0)

      })

      this.axios({
        method: 'post',
        url: '/comment/getComments' ,
        headers: {
          'Content-type': 'application/json'
        },
        data: JSON.stringify({"companyId": this.maintainDetail.sid,"page":1,"pageSize":9})
      }).then(res => {
        // console.log(res.data)
        for (let i in res.data.comments){
          // if(res.data.comments[i].openId)
          //   self.getimg(res.data.comments[i].openId)
          if(res.data.comments[i].userInfo){
            let img= JSON.parse(res.data.comments[i].userInfo).headimgurl
            if(img) res.data.comments[i].headimgurl= img
          }
        }
        self.comment= res.data
      })
    },
    calcHeight(height){
      let lh= parseInt(height - document.querySelector("#compDetail .info").offsetHeight)
      this.listHeight= (lh<0 ? 0 : lh)
    },
    closeDetail(){
      this.$store.commit('setSlideShowBody', 'maintainList')
    },
    showAll(show){
      if(show){
        this.translateY=0
        $("#compDetail").scrollTop(0)
      }else this.small()
    },

    formatStatus(st) {
      switch (st){
        case 1: return "营业"; break;
        case 2: return "停业"; break;
        case 3: return "注销"; break;
        case 4: return "空壳"; break;
      }
    },
    isOpenTime(timeStr){
      let sTime=0, eTime=0, now=0;
      if(!timeStr) return true
      let timeStrs= timeStr.replace(/~/g,'-')
      timeStrs= timeStrs.replace(/ /g,'')
      timeStrs= timeStrs.replace(/：/g,':')
      timeStrs= timeStrs.replace(/;/g,':')
      console.log(timeStrs)
      if(timeStrs.indexOf('-')<0 ||timeStrs.indexOf(':')<0) return true
      sTime= parseInt(timeStrs.split('-')[0].split(':')[0])*60+ parseInt(timeStrs.split('-')[0].split(':')[1])
      eTime= parseInt(timeStrs.split('-')[1].split(':')[0])*60+ parseInt(timeStrs.split('-')[1].split(':')[1])
      now= (new Date()).getHours()* 60+ (new Date()).getMinutes()
      // console.log(sTime, eTime, now)
      if(sTime <= now && now<= eTime) return true
      else return false
    },
    hide( content) {
      return content.substr(0,2)+"****"+content.substr(content.length-1,1)
    },
    noTal(){
      Toast('暂无联系方式')
    }
  }
}
</script>

<style scoped lang='less'>
  @blue-color: #008bff;
#compDetail{
  width: 100%;
  /*height: 100vh;*/
  overflow: visible;
  /*position: fixed;*/
  left: 0;
  top: 0;
  z-index: 20;
  background-color: white;
  transition: all 0.3s;
  position: relative;
  /*padding: 0 15px;*/
  .close{
    position: absolute;
    top: -10px;
    right: 15px;
    width: 26px;
    z-index: 1;
  }
  .info {
    padding: 0 15px;
    .head{
      font-size: 20px;
      padding-right: 35px;
      position: relative;
      span{
        font-weight: 300;
        font-size: 12px;
        line-height: 19px;
        padding: 0 4px;
        color: white;
        background-color: @blue-color;
        border-radius: 2px;
        vertical-align: top;
        white-space:nowrap;
      }
      span.rest{
        background-color: #bebec0;
      }
      a{
        width: 30px;
        height: 20px;
        padding-left: 5px;
        display: block;
        border-left: 1px solid #dddddd;
        position: absolute;
        right: 0;
        top: 0;
        background: url("../assets/img/maintain/phone.png") no-repeat right center;
        background-size: 20px;
      }
    }
    .text{
      font-size: 13px;
      color: #666666;
      /*font-weight: 300;*/
      margin-top: 5px;

    }
    .address{
      padding-left: 16px;
      background: url("../assets/img/maintain/区域2.png") no-repeat left center;
      background-size: 10px;
    }
    .avg{
      margin-top: 5px;
      font-size: 12px;
      color: #999999;
      img{
        width: 15px;
        float: left;
        margin-right: 3px;
        margin-top: 3px;
      }
    }
    .button{
      border-top: 1px solid #eeeeee;
      overflow: hidden;
      >div{
        width: 33%;
        float: left;
        text-align: center;
        height: 40px;
        line-height: 40px;
        /*font-weight: 300;*/
        font-size: 14px;
        span,a{
          padding-left: 15px;
        }
        .yuyue{
          background: url("../assets/img/maintain/预约服务.png") no-repeat left center;
          background-size: 13px;
        }
        .shangmeng{
          background: url("../assets/img/maintain/上门服务.png") no-repeat left center;
          background-size: 13px;
        }
        .dianping{
          background: url("../assets/img/maintain/点评.png") no-repeat left center;
          background-size: 13px;
        }
        .lianxi{
          background: url("../assets/img/maintain/phone2.png") no-repeat left center;
          background-size: 10px;
          color: black;
        }
      }
      div:first-child{
        text-align: left;
      }
      div:last-child{
        text-align: right;
      }
    }
  }

  .list{
    padding: 0 15px;
    overflow: auto;
    border-top: 10px solid #f8f8f8;
    /*border-top: 10px solid #f8f8f8;*/
    .img {
      position: relative;
      padding: 10px 15px;
      img{
        width: 100%;
        border-radius: 4px;
      }
      .back{
        position: absolute;
        left: 15px;
        top: 15px;
        width: 35px;
        height: 35px;
      }
    }
    .head{
      height: 30px;
      line-height: 30px;
      font-size: 16px;
      font-weight: 300;
      /*margin-top: 5px;*/
      img{
        float: right;
        width: 15px;
        padding: 7px 0 7px 7px;
      }
    }
    .tag{
      margin-top: 5px;
      span{
        display: inline-block;
        font-size: 14px;
        padding: 2px 12px;
        color: #666666;
        border: 1px solid #bdbdbd;
        border-radius: 5px;
        margin: 0 5px 5px 0;
      }
    }
    ul{
      margin-top: 10px;
      /*margin-bottom: 50px;*/
      li:last-child{
        border: 0;
      }
      li{
        position: relative;
        padding: 5px 0;
        border-bottom: 1px solid #eeeeee;
        .left{
          position: absolute;
          width: 35px;
          height: 35px;
          border-radius: 100%;
          background-color: #eeeeee;
          overflow: hidden;
          img{
            width: 100%;
            height: 100%;
          }
        }
        .right{
          padding-left: 45px;
          width: 100%;
          .name{
            font-size: 14px;
            span{
              float: right;
              color: #999999;
            }
          }
          .avg {
            font-size: 12px;
            color: #999999;
            img {
              width: 12px;
              float: left;
              margin-right: 3px;
              margin-top: 4px;
            }
          }
          .all {
            font-size: 13px;
            font-weight: 300;
          }
          ol{
            li{
              padding: 0 5px;
              font-size: 12px;
              margin: 0 5px 5px 0;
              background-color: #ff8327;
              color: white;
              display: inline-block;
              border-radius: 5px;
              border: 0;
            }
          }
        }
      }
      .system{
        .name span{
          color: #e4e4e4!important;
          font-size: 12px;
        }
        .msg{
          margin-top: 5px ;
          font-size: 12px;
          color: #c4c4c4;
        }
      }
    }
  }
  .bottom{
    position: fixed;
    width: 100%;
    height: 50px;
    line-height: 50px;
    padding: 0 15px;
    left: 0;
    bottom: 0;
    background-color: white;
    border-top: 1px solid #eeeeee;
    font-size: 14px;
    z-index: 10;
    .lookall{
      padding-left: 20px;
      background: url("../assets/img/maintain/detail.png") no-repeat left center;
      display: inline-block;
      background-size: 15px;
    }
    .lookmap{
      padding-left: 20px;
      background: url("../assets/img/maintain/map.png") no-repeat left center;
      display: inline-block;
      background-size: 15px;
    }
    .gps{
      color: white;
      float: right;
      padding: 0 15px 0 35px;
      /*background-color: #438eff;*/
      border-radius: 10px;
      background: #438eff url("../assets/img/maintain/mile.png") no-repeat 15px center;
      background-size: 15px;
      line-height: 30px;
      height: 30px;
      margin-top: 10px;
    }
    .distance{
      float: right;
      margin: 0 5px;
    }
  }
}
</style>

