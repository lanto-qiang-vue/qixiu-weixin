<template>
  <div class="remark">
    <div class="remark_company">
      <div class="title">评价企业</div>
      <div class="content">
        <ul>
          <li :data-index='index' v-for='(item, index) in satisfaction' :key='index'>
            <div class="left">{{ item.title }}</div>
            <div class="center">
              <img data-index='0' src="../assets/img/remark/yellow.png" alt="" @click='chooseLevel($event)'>
              <img data-index='1' src="../assets/img/remark/yellow.png" alt="" @click='chooseLevel($event)'>
              <img data-index='2' src="../assets/img/remark/yellow.png" alt="" @click='chooseLevel($event)'>
              <img data-index='3' src="../assets/img/remark/yellow.png" alt="" @click='chooseLevel($event)'>
              <img data-index='4' src="../assets/img/remark/yellow.png" alt="" @click='chooseLevel($event)'>
            </div>
            <div class="right" id='satisfaction'>5分/非常满意</div>
          </li>
        </ul>
      </div>
    </div>
    <!--<div class="assess">-->
      <!--<div class="title"></div>-->
      <!--<textarea v-model='assessText' name="" id="" cols="30" rows="5" placeholder="企业的服务还满意吗?点评一下吧,您的意见很重要哦~"></textarea>-->
    <!--</div>-->
    <!--<div class="addPic_wrap">-->
      <!--<div class="addPic" @click='openActionsheet'></div>-->
    <!--</div>-->
    <button @click='sendProblem($event)' data-loading-text='提交中...' type="button" data-loading-icon="mui-spinner mui-spinner-custom" class="mui-btn sendProblem mui-btn-primary">提交</button>
    <mt-actionsheet
  :actions="actions"
  v-model="sheetVisible">
    </mt-actionsheet>
  </div>
</template>

<script>
import { Toast } from 'mint-ui'

export default {
  data(){
    return {
      satisfaction: [    //满意度
        {
          title: '履约情况',
          level: ''
        },
        {
          title: '服务态度',
          level: ''
        },
        {
          title: '维修质量',
          level: ''
        },
        {
          title: '维修速度',
          level: ''
        },
        {
          title: '维修价格',
          level: ''
        }
      ],
      sheetVisible: false,
      actions: [
        {name: '拍照', method:function(){
          self.openCamera()
        }},
        {name: '从相册中选择',method:function(){
          self.openPhoto()
        }}
      ],
      assessText: '',       // 综合评价文本内容
      picPath: [],          // 照片路径
      promise: 5,           // 履约情况
      serviceQuality: 5,    // 服务质量
      repairQuality: 5,     // 维修质量
      repairSpeed: 5,       // 维修速度
      repairPrice: 5        // 维修价格
    }
  },
  methods: {
    openActionsheet(){
      this.sheetVisible=!this.sheetVisible
    },
    chooseLevel(e){
      var imgs = e.target.parentNode.children
      var next=[], previous=[]
      var satisfaction = e.target.parentNode.nextElementSibling
      switch(e.target.parentNode.parentNode.getAttribute('data-index')){
        case '0':
          this.promise=Number(e.target.getAttribute('data-index'))+1;
          break;
        case '1':
          this.serviceQuality=Number(e.target.getAttribute('data-index'))+1;
          break;
        case '2':
          this.repairQuality=Number(e.target.getAttribute('data-index'))+1;
          break;
        case '3':
          this.repairSpeed=Number(e.target.getAttribute('data-index'))+1;
          break;
        case '4':
          this.repairPrice=Number(e.target.getAttribute('data-index'))+1;
          break;
      }
      switch(e.target.getAttribute('data-index')){
        case '0':
          satisfaction.innerText='1分/非常不满意';
          break;
        case '1':
          satisfaction.innerText='2分/不满意';
          break;
        case '2':
          satisfaction.innerText='3分/一般';
          break;
        case '3':
          satisfaction.innerText='4分/满意';
          break;
        case '4':
          satisfaction.innerText='5分/非常满意';
          break;
      }
      for(var i=0; i<imgs.length; i++){
        if(i>Number(e.target.getAttribute('data-index'))){
          next.push(imgs[i])
        }else {
          previous.push(imgs[i])
        }
      }
      for(var i=0; i<next.length; i++){
        next[i].setAttribute('src','/static/img/gray.png')
      }
      for(var i=0; i<previous.length; i++){
        previous[i].setAttribute('src','/static/img/yellow.png')
      }
      console.log(this.promise,this.serviceQuality,this.repairQuality,this.repairSpeed,this.repairPrice);
    },
    sendProblem(e){
      // if(!this.assessText.trim()){
      //   Toast('请输入综合评价内容')
      //   return
      // }
      let data = {
        accessToken: localStorage.getItem('ACCESSTOKEN'), // 用户票据
        companyId: this.$route.query.corpId,              // 企业ID
        performance: this.promise,                        // 履约情况
        attitude: this.serviceQuality,                    // 服务质量
        quality: this.repairQuality,                      // 维修质量
        speed: this.repairSpeed,                          // 维修速度
        price: this.repairPrice,                          // 维修价格
        jsoninfo: {
          content: this.assessText,                          // 评论文字
          images: this.picPath                               // 照片路径
        },
        composite: Math.round(this.promise*6+this.serviceQuality+this.repairQuality*2+this.repairSpeed*0.5+this.repairPrice*0.5) //  综合评分
      }
      console.log(JSON.stringify(data));
      this.axios({
          method: 'post',
          url: '/company/review/submit',
          headers: {
            'Content-type': 'application/json'
          },
          data: JSON.stringify(data)
        })
        .then(res => {
          var _this=this
          console.log(res);
          if(res.data.code=='130412'){
            Toast('提交评论失败,用户票据失效,请重新登录')
          }else if(res.data.code=='120513'){
            Toast('提交评论失败,您还未添加车辆')
          }else if(res.data.code=='120509'){
            Toast('提交评论失败,评论内容过长')
          }else if(res.data.code=='120500'){
            Toast('提交评论成功')
            setTimeout(function(){
                _this.$router.go(-1)
            },3000)
          }
        })
      this.assessText=''
    }
  }
}
</script>

<style lang='less'>
  .remark {
    background-color: #fff;
    color: #666;
    font-size: 14px;
    .title {
      background: #f8f8f8;
      height: 40px;
      line-height: 40px;
      padding-left: 15px;
    }
    .content ul {
      padding: 10px 0;
      li {
        padding: 8px 15px;
        .left {
          float: left;
          width: 80px;
        }
        .center {
          float: left;
          width: 140px;
          img {
            width: 16px;
            height: 16px;
            margin-right: 5px;
            margin-top: 2px;
          }
        }
        .right {
          text-align: center;
        }
      }
    }
    .assess {
      textarea {
        border: none;
        margin-bottom: 0;
        font-size: 14px;
      }
    }
    .addPic_wrap {
      height: 65px;
      .addPic {
        height: 50px;
        width: 50px;
        border: 1px dashed #ccc;
        border-radius: 8px;
        margin: 0 0 15px 15px;
        background: url(../assets/img/record/add.png) no-repeat center center;
        background-size: 50% 50%;
      }
    }
    .mui-btn-primary {
      width: 100%;
      height: 40px;
      position: fixed;
      bottom: 0;
      background-color: #90bbf8;
      border-color: #90bbf8;
    }
  }
</style>
