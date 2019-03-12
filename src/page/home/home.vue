<template>
<div id="home">
<!--<div id="float-survey">-->
  <!--<a href="http://dh3t.cn/ys6RSb" onclick="window.location.href='http://dh3t.cn/ys6RSb'">-->
    <!--<img src="/static/img/temp/laba.png"/>-->
    <!--<span>【上海市汽车维修行业顾客满意度调查】点击参与</span>-->
  <!--</a>-->
  <!--<img class="close" src="/static/img/temp/close.png"/>-->
<!--</div>-->

  <div class="banner">
    <div class='dummy'></div>
    <div class='content'>
      <mt-swipe :auto="4000">
        <mt-swipe-item v-for="(item, index) in bannerList" :key="index">
          <router-link :to="item.linkUrl" tag="a"><img :src="item.imageUrl"></router-link>
        </mt-swipe-item>
      </mt-swipe>
    </div>
  </div>

  <div class="icon">
    <div class='dummy on'></div>
    <div class='content'>
      <mt-swipe :auto="0" @change="iconBlockChange">
        <mt-swipe-item>
          <ul class="tab1" >
	          <router-link tag="li" to="/maintain">
		          <img src="../../assets/img/home/查选维修.png"/>
		          <p>查选维修</p>
	          </router-link>
	          <li @click="goJKDA">
		          <img src="../../assets/img/home/维修记录.png"/>
		          <p>维修记录</p>
	          </li>
	          <router-link tag="li" to="/remarkMap">
		          <img src="../../assets/img/home/维修点评.png"/>
		          <p>维修点评</p>
	          </router-link>
	          <router-link  tag="li" to="/rescue-map">
		          <img src="../../assets/img/home/救援找我.png"/>
		          <p>救援找我</p>
	          </router-link>




          </ul>
        </mt-swipe-item>
        <mt-swipe-item>
          <!--<ul class="tab2" >-->
          <ul class="tab1" >
            <!--<router-link tag="li" to="/carOwner-centre">-->
              <!--<img src="../../assets/img/home/车主中心.png"/>-->
              <!--<p>车主中心</p>-->
            <!--</router-link>-->
	          <li @click="goYYFW">
		          <img src="../../assets/img/home/预约服务.png"/>
		          <p>预约服务</p>
	          </li>
	          <router-link tag="li" to="/school-map">
		          <img src="../../assets/img/home/学车找我.png"/>
		          <p>学驾找我</p>
	          </router-link>
	          <router-link tag="li" to="/repair-company">
		          <img src="../../assets/img/home/汽修企业.png"/>
		          <p>汽修企业</p>
	          </router-link>
	          <router-link tag="li" to="/government-service">
		          <img src="../../assets/img/home/政务服务.png"/>
		          <p>政务服务</p>
	          </router-link>

            <router-link tag="li" to="/association-service">
              <img src="../../assets/img/home/协会服务.png"/>
              <p>协会服务</p>
            </router-link>

            <!--<router-link tag="li" to="/personnel-service">-->
              <!--<img src="../../assets/img/home/人才服务.png"/>-->
              <!--<p>人才服务</p>-->
            <!--</router-link>-->
            <!--<router-link tag="li" to="/big-data">-->
              <!--<img src="../../assets/img/home/大数据.png"/>-->
              <!--<p>大数据</p>-->
            <!--</router-link>-->
            <router-link tag="li" to="/public-supervision">
              <img src="../../assets/img/home/公共监督.png"/>
              <p>公共监督</p>
            </router-link>
            <router-link tag="li" to="/business-service">
            <img src="../../assets/img/home/商务服务.png"/>
            <p>商务服务</p>
            </router-link>
             <!--<router-link tag="li" to="/about-industry">-->
              <!--<img src="../../assets/img/home/相关产业.png"/>-->
              <!--<p>相关产业</p>-->
            <!--</router-link>-->

          </ul>
        </mt-swipe-item>
      </mt-swipe>
    </div>
  </div>


  <div class="adv_and_cdf" style="margin-bottom: 20px;position: relative">
    <!--<img src="~@/assets/img/home/temp/fast_login.png" alt="" style="width: 100%;" @click="fastLogin">-->
	  <router-link tag="a" to="/discounts-list"  style="width: 100%;"><img src="/static/img/temp/activity-315.png" style="width: 100%;"/></router-link>

    <div class="cdf">
      <img class="title" src="../../assets/img/home/cdf-title.png"/>
      <img class="cdf-pic" src="../../assets/img/home/cdf-pic.png" />
      <div style="height: 171px;overflow: hidden;" class="cdf1">
      <ul>
        <router-link v-for="(item, index) in questionList" :key="index" tag="li"
            :to="{ path: '/questionDetail', query: {questionId: item.id}}">
          <div class="top">
            <div class="head"><img :src="item.headPhoto || '/static/img/home/user.png'"/></div>
            <p>{{item.nickName || '匿名'}}</p><p>{{item.createTime | FormatDate}}</p>
          </div>
          <p class="ask"><label>问题：</label><span>{{item.content}}</span></p>
          <p class="answer" v-if="item.answerContent">
            <label>{{item.answerName || '匿名'}}：</label>
            <span>{{item.answerContent | FormatArticle}}</span></p>
          <p class="answer" style="margin-top: 25px" v-else><label></label><span style="color: #c1c1c1;height: 20px">暂无回答</span></p>
        </router-link>
      </ul>
      </div>
      <div class="more">
        <router-link src="/static/img/home/lookmore.png" tag="img" :to="{path: '/doctor'}">
        </router-link>
      </div>
    </div>
  </div>

  <div class="tips" v-if="showSwiper">
    <div class="head">
      <img class="title" src="../../assets/img/home/爱车小贴士.png"/>
      <router-link tag="a" :to="{path: '/tips-list'}">
        <img class="right-more" src="../../assets/img/home/gengduo.png"/>
      </router-link>
    </div>
    <swiper :options="swiperOption" ref="mySwiper" class="tips-swiper" >
      <!-- slides -->
      <swiper-slide v-for="(item, index) in tipsData" :key="index">
        <div class='dummy'></div>
        <div class='content'>
          <a :href="item.url" class="tips-article">
            <img :src="item.headimg|| item.thumb_url">
            <span>{{item.title}}</span>
          </a>
        </div>
      </swiper-slide>

      <!-- Optional controls -->
      <div class="swiper-pagination"  slot="pagination"></div>
      <!--<div class="swiper-button-prev" slot="button-prev"></div>-->
      <!--<div class="swiper-button-next" slot="button-next"></div>-->
      <!--<div class="swiper-scrollbar"   slot="scrollbar"></div>-->
    </swiper>
  </div>

  <div class="allnews">
    <img class="head" src="../../assets/img/home/news-title.png"/>
    <router-link tag="div" class="lastnews" :to="{ path: '/infoDetail', query: {infoId: lastnews.id}}">
      <div class="title">{{lastnews.title}}</div>
      <span v-if="lastnews.publishTime">{{lastnews.publishTime | FormatDate}}</span>
      <img :src="lastnews.photo||'/static/img/home/news_big.png'"/>
    </router-link>
    <div class="news1" style="height: 200px;overflow: hidden;">
      <ul>
        <router-link v-for="(item, index) in news1" :key="index" tag="li"
          :to="{ path: '/infoDetail', query: {infoId: item.id}}">
          <img :src="item.photo||'/static/img/home/news_small.png'"/>
          <div class="right">
            <div class="title">{{item.title}} <span v-if="item.publishTime">{{item.publishTime | FormatDate}}</span></div>
            <p>{{item.content | FormatArticle(item.title)}}</p>
          </div>
        </router-link>
      </ul>
    </div>
    <div class="more">
      <router-link src="/static/img/home/lookmore.png" tag="img"
         :to="{path: '/government-service/government-service-list', query:{id: '',name: '全部新闻'}}">
      </router-link>
    </div>
  </div>

  <div class="morenews">
    <ul class="head">
      <li :class="{on: showLeft, left:true}" @click="showLeft=true"></li>
      <li :class="{on: !showLeft, right:true}" @click="showLeft=false"></li>
    </ul>
    <div class="news2"  :class="{show: showLeft}">
      <ul>
        <router-link  v-for="(item, index) in news2" :key="index" tag="li"
             :to="{ path: '/infoDetail', query: {infoId: item.id}}">
          <div class="title">{{item.title}} <span v-if="item.publishTime">{{item.publishTime | FormatDate}}</span></div>
          <p>{{item.content | FormatArticle(item.title)}}</p>
        </router-link>
      </ul>
    </div>
    <div class="news3" :class="{show: !showLeft}">
      <ul>
        <router-link  v-for="(item, index) in news3" :key="index" tag="li"
             :to="{ path: '/infoDetail', query: {infoId: item.id}}">
          <div class="title">{{item.title}} <span v-if="item.publishTime">{{item.publishTime | FormatDate}}</span></div>
          <p>{{item.content | FormatArticle(item.title)}}</p>
        </router-link>
      </ul>
    </div>
    <div class="more">
      <!--<img src="../../assets/img/home/lookmore.png"/>-->
      <router-link src="/static/img/home/lookmore.png" tag="img"
             :to="{path: '/government-service/government-service-list',
             query:{id: showLeft?'10281019':'10281020',name: showLeft?'行业监管':'管理动态'}}">
      </router-link>
    </div>
  </div>
  <img src="../../assets/img/home/dixian.png" class="dixian"/>

  <router-link tag="a" :to="{ path: '/doctor', query: {toask: 'yes'}}">
    <img class="cdf-quick" src="/static/img/home/cdf-quick.png"/></router-link>

</div>
</template>

<script>
import { Spinner, Swipe, SwipeItem, Toast, Actionsheet } from 'mint-ui';
import 'swiper/dist/css/swiper.css'
import { swiper, swiperSlide } from 'vue-awesome-swiper'
export default {
  name: 'home',
  data () {
    let _this=this
    return {
      bannerList: [],
      userRoleId: null,
      totalCount: null,
      sheetVisible: false,
      actions: [{
        name: '绑定本人车辆',
        method(){
          _this.$router.push('/carOwner-centre/bind-car/bindCar')
        }
      },
      {
        name: '绑定他人车辆',
        method(){
          _this.$router.push('/carOwner-centre/bind-car/bind-other-car')
        }
      }],

      questionList:[],
      lastnews:{},
      news1: [],
      news2: [],
      news3: [],
      showLeft: true,

      cdf1:{
        dom: '.cdf1 ul',
        timer: null,
        top: 0,
        times:0,
        height: 171,
      },
      snews1:{
        dom: '.news1 ul',
        timer: null,
        top: 0,
        times:0,
        height: 100,
      },
      snews2:{
        dom: '.news2 ul',
        timer: null,
        top: 0,
        times:0,
        height: 95,
      },
      snews3:{
        dom: '.news3 ul',
        timer: null,
        top: 0,
        times:0,
        height: 95,
      },
      swiperOption: {
        slidesPerView : 3,
        centeredSlides : true,
        loop : true,
        // loopAdditionalSlides: 3,
        // loopedSlides: 3,

        width: window.innerWidth*2.4,
        pagination: {
          el: '.swiper-pagination',
        },
        autoplay: {
          delay: 4000,
          disableOnInteraction: false,
        },
      },
      tipsData:[],
      showSwiper: false
    }
  },

  created(){
    let self= this, SYSTEMTOKEN= localStorage.getItem("SYSTEMTOKEN");

    // this.clears()
    // window.clearInterval(this.cdf1.timer)
    // window.clearInterval(this.snews1.timer)
    // window.clearInterval(this.snews2.timer)
    // window.clearInterval(this.snews3.timer)

    this.axios.post('/banner/query',{terminal: 'W'}).then(res=>{
      if(res.data.code==='0'){
        this.bannerList=res.data.items
      }else {
        // Toast(res.data.status)
      }
    })

    this.axios({
      method: 'post',
      url: '/question/nostate/list',
      data: {
	      "pageNo": 1,
	      "pageSize": 10,
      }
    }).then(res => {
      if(res.data.code=='0'){
        self.questionList= res.data.items
	      // for(let i in self.questionList){
		   //    self.questionList[i].nickName='1111111122222222233333333333333'
	      // }

        // console.log(res.data.data.dataList.length)
        self.autoroll('cdf1',res.data.items.length, 'questionList', 3000)


      } else{
        // Toast(res.data.status);
      }
    })

    this.getNews('',function (res) {
      // self.lastnews=res.shift()
      self.lastnews=res[0]
      self.news1= res
      self.autoroll('snews1', res.length, 'news1',3800)
    })
    this.getNews('10281019',function (res) {
      self.news2= res
      self.autoroll('snews2', res.length, 'news2', 3000)
    })
    this.getNews('10281020',function (res) {
      self.getNews('10281013',function (res2) {
        self.news3= res.concat(res2)
        self.news3.sort(function (a,b) {
          return (new Date(a.createTime|| 0) > new Date(b.createTime || 0))? -1: 1
        })
        // console.log(self.news3)
        // for( let i in self.news3){
        //   console.log(self.news3[i].createTime, new Date(self.news3[i].createTime))
        // }
        self.autoroll('snews3', self.news3.length, 'news3', 3000)
      })
    })



  },
  mounted(){
    //temp
    // $('#float-survey .close').click(function () {
    //   $('#float-survey').hide()
    // })
	  this.scrollTop()

    let self=this
    $('.cdf-quick').bind('touchstart',function(e){
      let dom= this
      let docWidth= $(document).width()
      let docHeight= $(document).height()
      let thisWidth= $(this).outerWidth(true)
      let thisHeight= $(this).outerHeight(true)

      let positionDiv = $(this).offset();
      let distenceX = e.originalEvent.targetTouches[0].pageX - positionDiv.left;
      let distenceY = e.originalEvent.targetTouches[0].pageY - positionDiv.top;
      $('#home').addClass('nosroll')
      document.body.addEventListener('touchmove',self.noscroll,{ passive: false });
      $(document).bind('touchmove',function(e){
        let x = e.originalEvent.targetTouches[0].pageX - distenceX;
        let y = e.originalEvent.targetTouches[0].pageY - distenceY;
        if(x<0){
          x=0;
        } else if(x>docWidth-thisWidth){
          x = docWidth-thisWidth;
        }
        if(y<0){
          y=0;
        } else if(y>docHeight-thisHeight-50){
          y = docHeight-thisHeight-50
        }else if(y>docHeight-thisHeight){
          y = docHeight-thisHeight;
        }
        $(dom).css({
          'left':x+'px',
          'top':y+'px'
        });
      });
      $(document).bind('touchend',function(){
        $(document).off('touchmove');
        $('#home').removeClass('nosroll')
        document.body.removeEventListener('touchmove', self.noscroll,false)
      });
    });

    this.axios({
		method: 'get',
		url: '/weixin/qixiu/material/query?type=news&offset=0&count=20',
    }).then(res => {
      if(res.data.item){
        let list= res.data.item
        for(let i in list){
          let news= list[i].content.news_item
          for(let j in news){
            if(news[j].title.indexOf('爱车小贴士')>=0 && news[j].thumb_url){
              let imgarr= news[j].content.match( /<img\b.*?(?:\>|\/>)/gi)
              // console.log(news[j].content)
              news[j].headimg= imgarr? imgarr[0].match(/\bsrc\b\s*=\s*[\'\"]?([^\'\"]*)[\'\"]?/i )[1]: ''
              // console.log(news[j].headimg)
              this.tipsData.push(news[j])
            }
          }
        }
        this.showSwiper=true

      } else{
        // Toast(res.data.status);
      }
    })
  },

  // beforeDestory(){
  //   // alert(1)
  //   window.clearInterval(this.cdf1.timer)
  //   // alert(this.cdf1.timer)
  //   // this.cdf1.timer=null
  // },
  // destoryed: function(){
  //   alert(3)
  // },
  activated(){
    // console.log(this.questionList)
    // console.log(this.questionList.length)
    if(this.questionList.length){
      this.autoroll('cdf1', this.questionList.length-2, false, 3000)
      this.autoroll('snews1', this.news1.length-2, false, 3800)
      this.autoroll('snews2', this.news2.length-2, false, 3000)
      this.autoroll('snews3', this.news3.length-2, false, 3000)
    }
	  this.scrollTop()

  },

  deactivated(){
    // alert(1)
    this.clears()
    // window.clearInterval(this.cdf1.timer)
    // console.log('deactivated',this.cdf1.timer)
  },


  beforeRouteLeave (to, from, next) {
    // alert(2)
    this.clears()
    // window.clearInterval(this.cdf1.timer)
    // console.log('beforeRouteLeave',this.cdf1.timer)
    next(); //正常执行手机返回键也是正常返回上一个路由
  },


  methods: {
  	scrollTop(){
	    if($('body').scrollTop()!= 0 ) $('body').scrollTop(0)
    },
    noscroll(evt) {
      if(!evt._isScroller) {
        if (!this.translateY) event.preventDefault();
      }
    },
    getNews(category, callback){
      let data = {
	      infoType: category,
	      pageNo: 1,
	      pageSize: 10
      }
      this.axios.post('/infopublic/home/all', data).then(res => {
          // this.infoPublicList = res.data.data.dataList;
        if(res.data.code=='0') {
          callback(res.data.items)
        }else{
          // Toast(res.data.status);
        }
      })
    },
    //
    autoroll(objName, len, arrname, rollTime){
      let self=this;
        // obj= this[objName]
      // clearInterval(obj.timer)
      // this[arrname]=this[arrname].concat(this[arrname])
      if(arrname) this[arrname].push(this[arrname][0],this[arrname][1])
      // this.questionList= this.questionList.concat(this.questionList)
      // console.log("obj.timer1", obj.timer)
      self[objName].timer=setInterval( function () {
        self.rolls(objName, len)
      },rollTime)

      // console.log("obj.timer1", obj.timer)
      // window.clearInterval(obj.timer)
      // console.log("obj.timer2", obj.timer)


      $(self[objName].dom).bind('touchmove',function () {
        clearInterval(self[objName].timer)
      })

      $(self[objName].dom).bind('touchend',function () {
        clearInterval(self[objName].timer)
        self[objName].timer=setInterval( function () {
          self.rolls(objName, len)
        },rollTime)
      })

    },

    rolls(objName, len) {
      let self=this
      // console.log(self[objName].times, len)
      // let obj= this[objName]
      if(!$(self[objName].dom).hasClass('on')) $(self[objName].dom).addClass('on')
      if(self[objName].times>=len){
        $(self[objName].dom).removeClass('on')
        self[objName].times=0
        self[objName].top=0
        $(self[objName].dom).css('transform','translateY(0)')
      }else{
        self[objName].top= parseInt(self[objName].top)- self[objName].height
        $(self[objName].dom).css('transform','translateY('+ self[objName].top +'px)')
        self[objName].times++
      }
      // console.log(obj.top)
    },

    clears(){
      let self=this
      window.clearInterval(self.cdf1.timer)
      window.clearInterval(self.snews1.timer)
      window.clearInterval(self.snews2.timer)
      window.clearInterval(self.snews3.timer)
    },

    goJKDA() {
      if(this.userRoleId==3 || this.userRoleId==7){
        this.$router.push({path: "/carOwner-centre/carList-manager"})
        // clearInterval(this.timer)
        return
      }
      this.$router.push({path: "/carOwner-centre/carList"})
      // clearInterval(this.timer)
    },
    goYYFW() {
      Toast('请选择预约服务的企业')
      // clearInterval(this.timer)
      this.$router.push({path: "/maintain"})
    },
    goMaintain(){
      Toast("请选择要评价的企业")
      // clearInterval(this.timer)
      this.$router.push({path: "/maintain"})
    },
     fastLogin(){
       // clearInterval(this.timer)
       if(localStorage.getItem("ACCESSTOKEN")){
         this.$router.push('/my')
       }else{
         this.$router.push('/login')
       }
     },
    iconBlockChange(index){
      index==0?$('.icon .dummy').addClass('on'):$('.icon .dummy').removeClass('on')
    }
  },
  components: {
    swiper,
    swiperSlide
  }
}
</script>
<style scoped lang='less'>
  @in-boder-color: #dddddd;
  @bottom-boder-color: #f2f2f2;
  #home{
    /*height: calc(100vh - 50px);*/
    height: 100vh;
    background-color: #f8f8f8;
    overflow: auto;
    .banner {
      position: relative;
      overflow: hidden;
      .dummy{
        margin-top: 45%;
      }
      .content{
        position: absolute;
        left: 0;
        right: 0;
        top: 0;
        bottom: 0;
      }
      .mint-swipe-items-wrap {
        img {
          width: 100%;
          height: 100%;
        }
      }
    }
    .icon{
      /*height: 220px;*/
      background-color: white;
      width:100%;
      position:relative;
      display: inline-block;
      margin-bottom: 5px;
      .dummy{
        margin-top: 65%;
      }
      .dummy.on{
        margin-top: 32%;
      }
      .content{
        position:absolute;
        left:0;
        right:0;
        top:0;
        bottom: 0;
        border-bottom: 1px solid @bottom-boder-color;
        .tab1{
          overflow: hidden;
          position: absolute;
          top: 50%;
          transform: translateY(-50%);
	        height: 100%;
	        width: 100%;
          li{
            width: 25%;
            float: left;
            overflow: hidden;
            text-align: center;
            margin-top: 5px;
	          position: relative;
	          &:before{
		          content: "";
		          display: block;
		          margin-top: 110%;
	          }
            img{
	            width: 65%;
                max-width: 55px;
	            position: absolute;
	            left: 50%;
	            top: 6%;
	            transform: translateX(-50%);
            }
            p{
              color: black;
              /*margin: 10px 0 ;*/
	            position: absolute;
	            bottom: 4%;
	            width: 100%;
            }
          }
        }
        .tab2{
          /*padding-top: 10px;*/
          overflow: hidden;
          position: absolute;
          top: 50%;
          transform: translateY(-50%);
          li{
            width: 20%;
            float: left;
            overflow: hidden;
            text-align: center;
            img{
              width: 65%;
            }
            p{
              color: black;
              margin-top: 10px;
            }
          }
        }
      }

    }
    .adv_and_cdf{
      overflow: hidden;
      .cdf{
        position: relative;
        background-color: white;
        margin-top: 10px;
        .title{
          width: 100%;
          border-top: 1px solid @bottom-boder-color;
          border-bottom: 1px solid @in-boder-color;
          /*box-shadow: 0 1px 5px $in-boder-color;*/
        }
        .cdf-pic{
          position: absolute;
          top: 0;
          right: 10px;
          width: 100px;
          z-index: 5;
        }
        .cdf1{
          border-bottom: 1px solid @in-boder-color;
        }
        ul{
          li{
            padding: 10px 15px 10px 15px;
            border-bottom: 1px solid @in-boder-color;
            .top{
              position: relative;
              .head{
                width: 55px;
                height: 55px;
                border-radius: 100%;
                background-color: #d5d5d5;
                overflow: hidden;
                position: absolute;
                top: 0;
                left: 0;
                img {
                  width: 100%;
                  height: 100%;
                }
              }
              p{
                margin-left: 65px;
                height: 30px;
                line-height: 30px;
                color: #808080;
	              overflow: hidden;
	              text-overflow: ellipsis;
              }
            }
            >p{
              color: #808080;
              margin-top: 5px;
              position: relative;
              label{
                width: 60px;
                text-align: right;
                position: absolute;
                line-height: 20px;
                white-space: nowrap;
	              overflow: hidden;
	              text-overflow: ellipsis;
              }
              span{
                display: -webkit-box;
                -webkit-box-orient: vertical;
                -webkit-line-clamp: 2;
                height: 40px;
                line-height: 20px;
                word-wrap: break-word;
                margin-left: 60px;
                overflow: hidden;
                letter-spacing: 1px;
              }
            }
            .ask{
              color: #4287ec;
            }
          }
        }
      }
    }

    .tips{
      width: 100%;
      overflow: hidden;
      background-color: white;
      margin-bottom: 20px;
      position: relative;
      .head{
        width: 100%;
        height: 38px;
        padding: 0 15px;
        border-bottom: 1px solid @in-boder-color;
        .title{
          height: 100%;
          padding: 9.5px 0;
        }
        .right-more{
          height: 100%;
          float: right;
          padding: 11.6px 0;
        }
      }
      .tips-swiper{
        left: 50%;
        transform: translateX(-50%);
        width: calc(100vw * 2.4);
        .dummy{
          margin-top: 55%;
        }
        .content {
          position: absolute;
          left: 0;
          right: 0;
          top: 0;
          bottom: 0;
          margin-bottom: 6px;
          .tips-article{
            height: 70%;
            width: 94%;
            overflow: hidden;
            position: absolute;
            left: 0;
            right: 0;
            top: 0;
            bottom: 0;
            border-radius: 8px;
            margin: auto;
            transition: all .5s;
            img{
              width: 100%;
              height: 100%;
            }
            span{
              width: 100%;
              background-color: black;
              color: white;
              opacity: .8;
              position: absolute;
              left: 0;
              bottom: 0;
              line-height: 20px;
              padding: 5px 15px;
              font-size: 14px;
            }
          }
        }
        .swiper-slide-active .tips-article{
          height: 80%;
          width: 94%;
        }
        .swiper-pagination{
          bottom: 0;
          .swiper-pagination-bullet-active{
            background-color: #444444;
          }
        }
      }
    }

    .allnews{
      width: 100%;
      overflow: hidden;
      background-color: white;
      margin-bottom: 20px;
      .head{
        padding: 0 15px;
        width: 100%;
        border-top: 1px solid @bottom-boder-color;
        border-bottom: 1px solid @in-boder-color;
      }
      .lastnews{
        padding: 10px 15px;
        width: 100%;
        overflow: hidden;
        border-bottom: 1px solid @in-boder-color;
        /*box-shadow: 0 1px 5px $in-boder-color;*/
        .title{
          font-size: 16px;
          display: -webkit-box;
          -webkit-box-orient: vertical;
          -webkit-line-clamp: 2;
          line-height: 25px;
          word-wrap: break-word;
          overflow: hidden;
        }
        >span{
          font-size: 14px;
          color: #bebebe;
          line-height: 30px;
        }
        img{
          width: 100%;
          border-radius: 10px;
        }
      }
      .news1{
        ul{
          li{
            padding: 10px 15px 9px 15px;
            border-bottom: 1px solid @in-boder-color;
            position: relative;
            img{
              width: 80px;
              height: 80px;
              border-radius: 5px;
              position: absolute;
            }
            .right{
              margin-left: 90px;
              .title{
                padding-right: 95px;
                font-size: 16px;
                white-space: nowrap;
                overflow: hidden;
                text-overflow: ellipsis;
                line-height: 30px;
                position: relative;
                span{
                  line-height: 30px;
                  position: absolute;
                  right: 0;
                }
              }
              p{
                color: #808080;
                display: -webkit-box;
                -webkit-box-orient: vertical;
                -webkit-line-clamp: 2;
                height: 50px;
                line-height: 25px;
                word-wrap: break-word;
                overflow: hidden;
                word-break: break-all;
                text-indent: 1em;
              }
            }
          }
        }
      }
    }
    .morenews{
      background-color: white;
      overflow: hidden;
      .head{
        border-bottom: 1px solid @in-boder-color;
        border-top: 1px solid @bottom-boder-color;
        overflow: hidden;
        /*box-shadow: 0 1px 5px $in-boder-color;*/
        li{
          width: 50%;
          height: 40px;
          float: left;
        }
        .left {
          border-right: 1px solid #e9e9e9;
          background: url("../../assets/img/home/行业监管.png") no-repeat center center;
          background-size: 40%;
        }
        .right {
          background: url("../../assets/img/home/管理动态.png") no-repeat center center;
          background-size: 40%;
        }
        .left.on {
          background: url("../../assets/img/home/行业监管on.png") no-repeat center center;
          background-size: 45%;
        }
        .right.on {
          background: url("../../assets/img/home/管理动态on.png") no-repeat center center;
          background-size: 45%;
        }
      }
      .news2, .news3{
        height: 190px;
        overflow: hidden;
        ul{
          li{
            padding: 9px 15px 5px 15px;
            border-bottom: 1px solid @in-boder-color;
            .title{
              /*color: #4088ec;*/
              padding-left: 15px;
              padding-right: 95px;
              font-size: 16px;
              white-space: nowrap;
              overflow: hidden;
              text-overflow: ellipsis;
              line-height: 30px;
              position: relative;
              span{
                line-height: 30px;
                position: absolute;
                right: 0;
              }
            }
            .title::before{
              content: '';
              width: 8px;
              height: 8px;
              background-color: #4088ec;
              border-radius: 100%;
              position: absolute;
              left: 0;
              top: 0;
              bottom: 0;
              margin: auto;
            }
            p{
              color: #808080;
              display: -webkit-box;
              -webkit-box-orient: vertical;
              -webkit-line-clamp: 2;
              height: 50px;
              line-height: 25px;
              word-wrap: break-word;
              overflow: hidden;
              word-break: break-all;
              padding-left: 15px;
              text-indent: 1em;
            }
          }
        }
      }
    }
    .more{
      width: 100%;
      height: 35px;
      padding: 0 15px;
      overflow: hidden;
      border-bottom: 1px solid @bottom-boder-color;
      text-align: center;
      img{
        padding: 11px 0;
        height: 35px;
        width: auto;
      }
    }
    .dixian{
      width: 100%;
      padding: 10px 20%;
      margin-bottom: 50px;
    }

    .cdf-quick{
      width: 20%;
      position: fixed;
      bottom: 14%;
      right: 10px;
      z-index: 10;
      transform-origin: bottom;
      animation: move 4s infinite cubic-bezier(0.54, -0.16, 0.51, 1.26)
    }
    @keyframes move{
      0%, 48% {
        /*transform: translate(0);*/
        /*transform*/
        transform: rotate(0deg);
      }
      49%{
        transform: rotate(10deg);
      }
      51% {
        /*transform: translateX(-45vw);*/
        transform: rotate(-10deg);
      }
      52%{
        transform: rotate(10deg);
      }
      53%{
        transform: rotate(-10deg);
      }
      54%,100% {
        /*transform: translate(0);*/
        transform: rotate(0deg);
      }
    }
    .news2,.news3{
      opacity: 0;
      display: none;
      transition: opacity 0.5s ;
      transition-delay: 0.5s;
    }
    .news2.show,.news3.show{
      display: block;
      opacity: 1;
    }
    .cdf1 ul.on, .news1 ul.on, .news2 ul.on, .news3 ul.on{
      transition: all 1s ;
    }
    .centre_area {
      margin: 0 !important;
      background-color: #fff;
      ul li {
        width: 20%;
        padding: 11px 5px;
        border: none;
        img {
          width: 40px;
        }
        div {
          font-size: 12px;
        }
      }
    }
    #marquee {
      ul li {
        line-height: 25px;
        font-size: 15px;
      }
    }
    .quick {
      background-color: #fff;
      /*margin-bottom: 15px;*/
      ul {
        li {
          border-top: 1px solid #eee;
          border-right: 1px solid #eee;
          padding: 10px 55px 10px 10px;
          background-size: 70px 55px !important;
          >div, a div {
            font-size: 15px;
            margin: 0 0 0 13px !important;
          }
          p {
            display: inline-block;
            border: 0.7px solid #f64747;
            font-size: 12px;
            margin: 6px 0 0 6px;
            padding: 1px 12px;
            border-radius: 11px;
            color: #f64747;
          }
        }
        li:nth-child(2n) {
          border-right: none;
        }
        li:nth-child(1) {
          border-top: none;
          background: url(../../assets/img/home/1.png) no-repeat right center;
        }
        li:nth-child(2) {
          border-top: none;
          background: url(../../assets/img/home/2.png) no-repeat right center;
        }
        li:nth-child(3) {
          background: url(../../assets/img/home/3.png) no-repeat right center;
        }
        li:nth-child(4) {
          background: url(../../assets/img/home/8.png) no-repeat right center;
        }
        li:nth-child(5) {
          background: url(../../assets/img/home/5.png) no-repeat right center;
        }
        li:nth-child(6) {
          background: url(../../assets/img/home/6.png) no-repeat right center;
        }
      }
    }
  }
  #home.nosroll{
    overflow: hidden;
  }
</style>
<style>
  #home .mint-swipe-indicators{
    bottom: 4px;
  }

  .content .mint-swipe-indicator{
    background-color: #cccccc
  }
  .content .mint-swipe-indicator.is-active{
    background-color: #444444;
  }
  .swiper-pagination-bullet{
    background-color: #cccccc;
  }
  .swiper-pagination-bullet-active{
    background-color: #444444;
    opacity: .2;
  }
  .banner .content .mint-swipe-indicator.is-active{
    background-color: white;
    opacity: 1;
  }
</style>

<!--<style>-->
<!--#float-survey {-->
  <!--height: 40px;-->
  <!--line-height: 40px;-->
  <!--background-color: #fefced;-->
  <!--color: #f66218;-->
  <!--font-size: 12px;-->
  <!--position: relative;-->
<!--}-->
<!--#float-survey a{-->
  <!--display: inline-block;-->
  <!--color: #f66218;-->
  <!--width: 100%;-->
<!--}-->
<!--#float-survey span{-->
  <!--vertical-align: middle;-->
<!--}-->
<!--#float-survey img{-->
  <!--width: 16px;-->
  <!--vertical-align: middle;-->
  <!--margin-left: 5px;-->
<!--}-->
<!--#float-survey .close{-->
  <!--position: absolute;-->
  <!--top: 0;-->
  <!--right: 0;-->
  <!--padding: 14px 6px;-->
  <!--width: 12px;-->
  <!--box-sizing: content-box;-->
<!--}-->
<!--</style>-->
