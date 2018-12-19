<template>
<div style="height: 100vh;overflow: auto;">
  <mt-header title="反馈凭证" style="position: fixed;top: 0;width: 100%;z-index: 100"><mt-button icon="back" slot="left" @click="$router.go(-1)"></mt-button></mt-header>
  <div class="above">
    <div class="title"><i></i>请上传维修凭证（可选）<i></i></div>
    <div class="picblock">
      <div class="pic mui-content-padded">
      <!--<div class="pic">-->
        <img v-show="!!img" :src="img" data-preview-src="" data-preview-group="1"/>
      </div>
      <p @click="goLogin">拍摄/上传照片
        <input type="file" accept="image/jpg,image/png,image/bmp" @change="getImg($event)" v-if="ACCESSTOKEN"/>
      </p>
      <!--<input type="file" accept="image/jpg,image/png,image/bmp" capture="camera" @change="getImg($event)" />-->

    </div>
  </div>
  <div class="under">
    <div class="title"><i></i>上传要求<i></i></div>
    <div class="content">
      <p>维修凭证可以是维修企业开具的《结算单》的清晰照片，或是必须包含以下信息的维修单据的清晰、完整的照片：</p>
      <p> 1、维修企业名称</p>
      <p> 2、车牌号码</p>
      <p> 3、结算日起</p>
      <p> 4、维修项目</p>
      <p> 5、维修配件</p>
    </div>
  </div>
  <div :class="{on: true, submit:true}" @click="submit">提交</div>
</div>
</template>

<script>
  import { Toast, MessageBox} from 'mint-ui'
	export default {
		name: "up-complain",
    data(){
      return{
        img:'',
        ACCESSTOKEN: localStorage.getItem('ACCESSTOKEN')
        // img:'/static/img/shqxw.jpg',
      }
    },
    created(){
		  let self= this

      if(!this.$route.query.type) this.upComplain(false)

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
          jsApiList: ['closeWindow']
        })
      })
    },
    methods:{
		  goLogin(){
        let self=this
        if(this.ACCESSTOKEN){
          return
        }else{
          // console.log(self.$route)
          MessageBox({
            title: '是否跳转',
            message: '上传凭证需要登录，是否进入登录页面？',
            showCancelButton: true
          }).then(action => {
            if(action=='confirm')
              self.$router.push({path: '/login', query: { redirect: self.$route.fullPath }})
          })
        }
      },
      getImg(e){
        // console.log(e)
        let self=this
        let file= e.target.files[0]
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
            // 'Content-type': 'application/json'
          },
          data: formdata
        }).then(res => {
          if(res.data.code==='0'){
            console.log(res.data)
            self.img= res.data.data.picPath
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
      submit(){
        let self= this
        if(this.img) this.upComplain(true)
        else MessageBox({
          title: '提示',
          message: '您还没上传维修凭证，是否继续反馈？',
          showCancelButton: true
        }).then(action => {
          if(action=='confirm') self.upComplain(true)
        })
      },
      upComplain(jump){
        let self= this
        let url= '/comment/company/complaint'
        let param={
          "commentId": this.$route.query.id,
          "complaintFile": this.img,
          "complaintDeatilInfo": "维修记录未上传",
          "unionid": localStorage.getItem("UNIONID")
        }
        switch (this.$route.query.type){
          case 0: break;
          case 1: {
            url= '/comment/company/complaint/repair?accessToken='+localStorage.getItem("ACCESSTOKEN")
            param={
              "commentId": this.$route.query.repairId,
              "complaintFile": this.img,
            }
            break
          }
        }

        this.axios({
          url: url,
          method: 'post',
          headers: {
            'Content-type': 'application/json'
          },
          data: JSON.stringify(param)
        }).then(res => {
          if(res.data.code==='0'){
            console.log(res.data)
            if(jump) {
              Toast('提交成功')
                if(self.ACCESSTOKEN){
                  self.$router.replace({path:'/myComplaint', query:{type: this.$route.query.type} })
                }else{
                  setTimeout(function () {
                    wx.closeWindow()
                  },1000)
                }
            }
          } else {
            Toast(res.data.status)
          }
        })
      }
    }
	}
</script>

<style scoped lang='less'>
.above, .under{
  padding: 20px 0;
  .title{
    /*text-align: center;*/
    font-size: 18px;
    font-weight: 300;
    height: 24px;
    line-height: 24px;
    display: flex;
    justify-content: center;
    align-items: center;
    i{
      display: inline-block;
      width: 40px;
      height: 2px;
      background-color: #f1f2f4;
      padding: 0 5px;
      margin: 0 10px;
      position: relative;
    }
    i:first-child::after,i:last-child::before{
      content: '';
      width: 6px;
      height: 6px;
      display: block;
      background-color: #d1d6dc;
      position: absolute;
      top: -2px;
      border-radius: 100%;
    }
    i:first-child::after{
      right: 0;
    }
    i:last-child::before{
      left: 0;
    }
  }
}
.above{
  margin-top: 40px;
  .picblock{
    width: 70%;
    margin: 20px auto 0 auto;
    border-radius: 5px;
    overflow: hidden;
    .pic{
      margin: 0;
      width: 100%;
      min-height: 150px;
      overflow: hidden;
      background: #f2f7fd url("../../assets/img/remark/nopic.png") center center no-repeat;
      background-size: 50% ;
      img{
        width: 100%;
      }
    }
    p{
      margin: 0;
      text-align: center;
      color: white;
      height: 30px;
      line-height: 30px;
      font-size: 16px;
      background-color: #5795fc;
      position: relative;
      input{
        width: 100%;
        height: 100%;
        position: absolute;
        left: 0;
        top: 0;
        opacity: 0;
      }
    }
  }
}
.under{
  border-top: 15px solid #f8f8f8;
  margin-bottom: 40px;
  .content{
    width: 80%;
    margin: 20px auto 0 auto;
    overflow: hidden;
    p{
      font-size: 13px;
      color: #999999;
      margin-bottom: 5px;
    }
  }
}
.submit{
  width: 100%;
  height: 40px;
  line-height: 40px;
  text-align: center;
  font-size: 14px;
  color: white;
  background-color: #c4dffe;
  position: fixed;
  left: 0;
  bottom: 0;
}
.submit.on{
  background-color: #438eff;
}

</style>
