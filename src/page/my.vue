<template>
  <div style="overflow: scroll; height: calc(100vh - 50px)">
    <!-- 已登录 -->
    <div class="header" v-if="userInfo">
      <div class="text-one-cut" style="position: relative; padding-right: 15px; margin-right: 80px;">
        <b>{{name}}</b>
        <u @click="goToSet"></u>
        <span class="telNum">{{ tel }}</span>
      </div>
      <img ref="headerImg" :src="picURL ? picURL : '../assets/img/my/user.png'" @click="addClick" alt="点击更换头像" style="width: 60px;height: 60px;border-radius: 100%">
    </div>
    <!-- 未登录 -->
    <div class="header" v-else @click="goLogin">
      <span class="login" >点击登录</span>
      <span class="fastLogin">1秒登录,体验更多功能</span>
      <img src="../assets/img/my/user.png" alt="">
    </div>

    <!--<div class="list" @click="goOperate" v-if="this.jueSe===4">-->
      <!--<img src="../assets/img/my/Satisfaction_degree.png" alt=""><span>运营统计</span> <i></i>-->
    <!--</div>-->

    <div class="list" @click="goCarListManager" v-if="this.jueSe===7">
      <img src="../assets/img/my/health.png" alt=""><span>电子健康档案</span> <i></i>
    </div>

    <div class="list" @click="goCarList">
      <img src="../assets/img/my/health.png" alt=""><span>爱车档案</span> <i></i>
    </div>

    <div class="list" @click="goMyQuestion">
      <img src="../assets/img/my/my_questions.png" alt=""><span>我的提问</span> <i></i>
    </div>
    <div class="list" @click="askMeQuestions" v-if="show">
      <img src="../assets/img/my/my_questions.png" alt=""><span>向我提问</span> <i></i>
    </div>
    <div class="list" @click="goMyOrder">
      <img src="../assets/img/my/order.png" alt=""><span>我的预约服务</span> <i></i>
    </div>
    <div @click="goMyAppointmentOrder" class="list" v-if="this.jueSe===2">
      <img src="../assets/img/my/Satisfaction_degree.png" alt=""><span>我的预约订单</span> <i></i>
    </div>
    <div class="list" @click="goMyAppointment">
      <img src="../assets/img/my/appointment.png" alt=""><span>我的上门服务</span> <i></i>
    </div>
    <router-link to="/myRemark" tag="div" class="list">
      <!--<div class="list">-->
        <img src="../assets/img/my/Satisfaction_degree.png" alt=""><span>我的点评</span> <i></i>
      <!--</div>-->
    </router-link>
    <router-link to="/myComplaint" tag="div" class="list">
      <!--<div class="list">-->
      <img src="../assets/img/my/Satisfaction_degree.png" alt=""><span>我的反馈</span> <i></i>
      <!--</div>-->
    </router-link>
    <!--<div @click="goMyDiscount" class="list">-->
      <!--<img src="../assets/img/my/Satisfaction_degree.png" alt=""><span>我的优惠券</span> <i></i>-->
    <!--</div>-->
    <div @click="goExpertList" class="list">
      <img src="../assets/img/my/expert_info.png" alt=""><span>专家信息</span> <i></i>
    </div>
    <div @click="goSatisfaction" class="list">
      <img src="../assets/img/my/Satisfaction_degree.png" alt=""><span>满意度调查</span> <i></i>
    </div>

    <div class="list" @click='goSetting(tel)' style="border-top: 10px solid #f8f8f8;box-sizing: content-box;">
      <img src="../assets/img/my/set.png" alt=""><span>设置</span> <i></i>
    </div>
    <!--<div class="list" @click='goBind' v-if="notbind">-->
      <!--<img src="../assets/img/my/set.png" alt=""><span>绑定此微信号</span> <i></i>-->
    <!--</div>-->
    <div class="list" @click='goSuggestion'>
      <img src="../assets/img/my/feedback.png" alt=""><span>意见建议</span> <i></i>
    </div>
    <div class="list" @click='goComplaint'>
      <img src="../assets/img/my/report.png" alt=""><span>投诉举报</span> <i></i>
    </div>

    <input type="file" id="file" name="file" accept="image/jpg,image/png,image/bmp" @change="imgPreview($event)" style="display: none"/>
  </div>
</template>

<script>
  import {MessageBox, Actionsheet, Toast} from 'mint-ui'
  import avatar from '@/assets/img/my/user.png'
  export default {
    name: 'my',
    data () {
      return {
        show: false,
        name: "",
        tel: '',
        userInfo: localStorage.getItem("USERINFO"),
        jueSe: '',
        notbind: false
      }
    },
    created(){
      let userinfo = JSON.parse(localStorage.getItem("USERINFO"))
      if (userinfo != null) {
        this.name = userinfo.nickname ? userinfo.nickname : userinfo.telphone
        this.tel = userinfo.telphone.substr(0, 3) + "****" + userinfo.telphone.substr(7)
        this.picURL = userinfo.photo || avatar
        this.jueSe=userinfo.userRoleId
        if(userinfo.userRoleId == 5){
            this.show = true;
        }

        if(localStorage.getItem('UNIONID')!= userinfo.openid) this.notbind=true
      }
    },
    methods: {
      goLogin(){
        this.$router.push({
          path: '/login'
        })
      },
      goBind(){
        this.$router.push({path: '/login', query: { redirect: this.$route.fullPath, bindwx: 'yes' }})
      },
      goCarList(){
        this.$router.push({path: '/carOwner-centre/carList'})
      },

      goCarListManager(){
        this.$router.push({path: '/carOwner-centre/carList-manager'})
      },

      goSetting(){
        this.$router.push({
          path: '/setting',
          query: {
            num: this.tel
          }
        })
      },
      goSuggestion() {
        this.$router.push({path: '/suggestion'})
      },
      goComplaint() {
        this.$router.push({path: '/public-supervision/complaint'})
      },
      goMyQuestion() {
        this.$router.push({path: '/myQuestion'})
      },
      askMeQuestions(){
        this.$router.push('/askQuestions')
      },
      goSatisfaction(){
        this.$router.push('/public-supervision/survey-list')
      },
      goExpertList() {
        this.$router.push('/association-service/experts-list')
      },
      goSurveyList() {
        this.$router.push({path: '/surveyList'})
      },
      goMyAppointment() {
        this.$router.push({path: '/myAppointment'})
      },
      goMyOrder() {
        this.$router.push({path: '/myOrder'})
      },
      goMyConsultation(){
        this.$router.push({path: '/my/my-consultation'})
      },
      goMyDiscount(){
        this.$router.push({path: '/my/my-discount'})
      },
      goMyAppointmentOrder(){
        this.$router.push({path: '/my/my-appointment-order'})
      },
      goOperate(){
        this.$router.push({path: '/my/operate-manager'})
      },

      imgPreview(e){
        //获取文件
        let self=this
        let file = e.target.files[0];
        let imageType = /^image\//;
        //是否是图片
        if (!imageType.test(file.type)) {
          Toast("请选择图片！");
          return;
        }

        let reader = new FileReader();
        reader.readAsDataURL(file)
        reader.onload = function (ev) {
          let image = new Image();
          let selffile= this
          image.onload=function(){
            let width = image.width;
            let height = image.height;
            self.compress(selffile.result,
              {width: width, height:height, quality: 0.6, type: file.type} ,
              self.pushImg, file.name)
          };
          image.src= ev.target.result;
          // self.compress(this.result, {width: 1000, height:1000, quality: 0.7} , self.pushImg)
        }


        // if (file.size < 1024 * 1024) {
        //   let param = new FormData(); //创建form对象
        //   param.append('file', file, file.name);//通过append向form对象添加数据
        //   console.log(param.get('file')); //FormData私有类对象，访问不到，可以通过get判断值是否传进去
        //   let config = {
        //     headers: {'Content-Type': 'multipart/form-data'}
        //   };  //添加请求头
        //   this.axios.post('/image/add/' + localStorage.getItem('ACCESSTOKEN'), param, config)
        //     .then(response => {
        //       if (response.data.code === '0') {
        //         this.picURL = response.data.data.picPath;
        //         this.changeAvatar(this.picURL);
        //       }
        //     })
        // } else {
        //   Toast('图片超过1M')
        // }
        //读取完成
      },
      compress(path, obj, callback, name){
        let img = new Image();
        img.src = path;
        img.onload = function () {
          let that = this;
          // 默认按比例压缩
          let w = that.width,
            h = that.height,
            scale = w / h;
          w = obj.width || w;
          h = obj.height || (w / scale);
          let quality = 0.7;  // 默认图片质量为0.7
          //生成canvas
          let canvas = document.createElement('canvas');
          let ctx = canvas.getContext('2d');
          // 创建属性节点
          let anw = document.createAttribute("width");
          anw.nodeValue = w;
          let anh = document.createAttribute("height");
          anh.nodeValue = h;
          canvas.setAttributeNode(anw);
          canvas.setAttributeNode(anh);
          ctx.drawImage(that, 0, 0, w, h);
          // 图像质量
          if (obj.quality && obj.quality <= 1 && obj.quality > 0) {
            quality = obj.quality;
          }
          // quality值越小，所绘制出的图像越模糊
          let base64 = canvas.toDataURL(obj.type|| 'image/png', quality);
          // console.log(base64)
          // 返回base64的值
          callback(base64, name)
        }
      },
      pushImg(base64, name){
        let self= this
        let formdata = new FormData();
        formdata.append('file' , self.base64ToBlob(base64), name);
        this.axios({
          url: '/image/add/'+localStorage.getItem('ACCESSTOKEN'),
          method: 'post',
          headers: {
            'Content-Type': 'multipart/form-data'
          },
          data: formdata
        }).then(res => {
          if(res.data.code==='0'){
            self.picURL = res.data.data.picPath;
            self.changeAvatar(this.picURL);
          } else {
            Toast(res.data.status)
          }
        })
      },
      base64ToBlob(dataurl) {
        let arr = dataurl.split(','), mime = arr[0].match(/:(.*?);/)[1],
          bstr = atob(arr[1]), n = bstr.length, u8arr = new Uint8Array(n);
        while (n--) {
          u8arr[n] = bstr.charCodeAt(n);
        }
        return new Blob([u8arr], { type: mime });
      },
      changeAvatar(avatarpath) {
          let param = {
            avatarpath: avatarpath,
            accessToken: localStorage.getItem('ACCESSTOKEN')
          };
          this.axios.post('/center/photo', param)
            .then(response => {
              if (response.data.code === '0') {
                Toast("头像更换成功");
                let userinfo = JSON.parse(localStorage.getItem("USERINFO"))
                userinfo.photo = avatarpath;
                localStorage.setItem("USERINFO",JSON.stringify(userinfo));
                this.$refs.headerImg.setAttribute('src',avatarpath)
              }
            })
      },
      addClick() {
        document.getElementById('file').click();
      },
      goToSet() {
        this.$router.push({
          path: '/changeNickName',
          query: {
            num: this.tel
          }
        })
      }
    }
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang='less' scoped>
  body {
    background-color: #f8f8f8;
  }
  .center {
    text-align: center;
    padding-top: 20px;
    color: #fff;
    font-size: 18px;
  }
  .center img {
    width: 100px;
    height: 100px;
    border-radius: 50%;
    border: 4px solid #ececec;
  }
  .div {
    width: 100%;
    position: relative;
  }

  .header {
    border-bottom: 10px solid #f8f8f8;
    padding: 38px 10px 0;
    position: relative;
    height: 125px;
    b {
      font-size: 18px;
      color: #000;
    }
    img {
      position: absolute;
      width: 60px;
      right: 20px;
      top: 50%;
      transform: translateY(-50%);
    }
    u {
      position: absolute;
      right: 0;
      top: 4px;
      width: 15px;
      height: 15px;
      background: url(../assets/img/my/edit.png);
      background-size: 100% 100%;
    }
    .telNum, .fastLogin {
      margin-top: 10px;
      display: block;
      color: #999;
    }
    > .login {
      font-size: 20px;
    }
    > .fastLogin {
      font-size: 14px;
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
      left: 18px;
    }
    span {
      margin-left: 35px;
      font-size: 15px;
    }
    i {
      position: absolute;
      right: 10px;
      top: 18px;
      border-right: 1px solid;
      border-bottom: 1px solid;
      width: 10px;
      height: 10px;
      color: #999;
      -webkit-transform: rotate(-45deg);
      transform: rotate(-45deg);
    }
  }

  .list:nth-child(6) {

  }

</style>
