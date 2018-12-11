<template>
  <div id="index">
    <keep-alive>
      <router-view v-if="$route.meta.keepAlive"></router-view>
    </keep-alive>
    <router-view v-if="!$route.meta.keepAlive"></router-view>

    <!--<router-view></router-view>-->

    <!--<mt-popup-->
      <!--v-model="popupVisible"-->
      <!--position="right">-->
      <!--<div class="ipt" style="width: 100vw; height: 100vh; position: relative;">-->
        <!--<div style="height: 45px; line-height: 45px; text-indent: 10px; background-color: #f8f8f8; font-size: 16px;">请绑定您的手机号</div>-->
        <!--<div>-->
          <!--<mt-field label="手机号" placeholder="请输入手机号" :attr="{ maxlength: 11 }" type="tel" v-model.trim="phone"></mt-field>-->
          <!--<div v-show="false">-->
            <!--<pic_verification></pic_verification>-->
          <!--</div>-->
          <!--<mt-field label="验证码" type="tel" v-model.trim="captcha" :attr="{ maxlength: 6 }" placeholder="短信验证码">-->
            <!--<div id="captcha" style="width: 120px; height: 45px; line-height: 45px; text-align: center; color: #42b5f4;" @click="flag && getCaptcha()">获取验证码</div>-->
          <!--</mt-field>-->
        <!--</div>-->
        <!--<mt-button type="primary" style="position: absolute; left: 0; bottom: 0; width: 100vw; border-radius: 0;" @click='submit'>提交</mt-button>-->
      <!--</div>-->
    <!--</mt-popup>-->
    <lt-footer></lt-footer>
  </div>
</template>

<script>
  import Footer from '../components/Footer.vue'
  import { Popup, Field, Button, Toast } from 'mint-ui'
  import pic_verification from '../components/picVerification.vue'
  export default {
    data(){
      return{
        popupVisible: false,
        phone: '',
        captcha: '',
        UnionID: '',
        flag: true,
        timer: null,
        time: 30
      }
    },

    components:{
      'lt-footer': Footer,
       // pic_verification
    },



    created(){
      // if(!localStorage.getItem('ACCESSTOKEN') && this.getUrlParam('state')=='from_login'){
      //   let code = window.location.href.split('code=')[1].split('&state')[0]
      //   this.axios({
      //     url: '/user/useraccount/access/openid',
      //     method: 'post',
      //     headers: {'Content-type': 'application/json'},
      //     data: JSON.stringify({
      //       code,
      //       platform: 'WX',
      //       workOn: window.location.origin === 'https://weixin.shanghaiqixiu.org' ? 'pPro' : 'pDev',
      //       systemToken: localStorage.getItem('SYSTEMTOKEN')
      //     })
      //   }).then(res=>{
      //     if(res.data.code==='000000'){
      //       this.UnionID = res.data.openId.openId
      //       this.axios({
      //         url: '/user/useraccount/register/login',
      //         method: 'post',
      //         headers: {'Content-type': 'application/json'},
      //         data: JSON.stringify({
      //           account: this.UnionID,
      //           loginMethod: 'wx',
      //           systemToken: localStorage.getItem('SYSTEMTOKEN')
      //         })
      //       }).then(res=>{
      //         console.log(res.data.code)
      //         if(res.data.code === "000000"){
      //           Toast("授权登录成功")
      //           localStorage.setItem("ACCESSTOKEN",res.data.data.accessToken);
      //           localStorage.setItem("USERINFO",JSON.stringify(res.data.data));
      //           if(this.$route.query.redirect){
      //             this.$router.replace({
      //               path: this.$route.query.redirect
      //             })
      //           }
      //         }else if(res.data.code === "141010"){
      //           Toast('请绑定手机号')
      //           this.popupVisible = true
      //         }else {
      //           Toast(res.data.status)
      //         }
      //       })
      //     }else {
      //       // Toast(res.data.status)
      //     }
      //   })
      // }
    },

    // watch: {
    //   time (newVal, oldVal) {
    //     if(newVal === 30 || newVal === 0){
    //       $('#captcha').html('获取验证码')
    //       $('#captcha').removeClass('gray')
    //       this.flag = true
    //       this.time = 30
    //       clearInterval(this.timer)
    //     }else {
    //       $('#captcha').html('重新获取(' + newVal + ')')
    //       $('#captcha').addClass('gray')
    //     }
    //   }
    // },




    // methods:{
    //   getCaptcha() {
    //     let reg = /^1[3|4|5|7|8][0-9]{9}$/
    //     let _this = this
    //     if(this.phone === ''){
    //       return Toast('手机号不能为空')
    //     }else if(!reg.test(this.phone)){
    //       return Toast('手机号格式有误')
    //     }
    //     this.axios({
    //       method: 'post',
    //       url: '/message/sms/sendsmscaptcha',
    //       headers: {
    //         'Content-type': 'application/json'
    //       },
    //       data: JSON.stringify({
    //         businessType: "10",
    //         cid: this.$store.state.picVerification.imageToken,
    //         code: this.$store.state.picVerification.YZM,
    //         mobile: this.phone,
    //         systemToken: localStorage.getItem("SYSTEMTOKEN")
    //       })
    //     }).then(res=>{
    //       if(res.data.code === "000000"){
    //         Toast('验证码发送成功,请查收!')
    //         this.flag = false
    //         this.timer = setInterval(()=>{
    //           _this.time--
    //         }, 1000)
    //       }else {
    //         Toast(res.data.status)
    //       }
    //     })
    //   },
    //   submit () {
    //     if(this.phone===''){
    //       return Toast('手机号不能为空')
    //     }else if(this.captcha===''){
    //       return Toast('验证码不能为空')
    //     }
    //     this.axios({
    //       method: 'post',
    //       url: '/user/useraccount/register/login',
    //       headers: {
    //         'Content-type': 'application/json'
    //       },
    //       data: JSON.stringify({
    //         account: this.UnionID,
    //         captcha: this.captcha,
    //         usertel: this.phone,
    //         loginMethod: 'wx',
    //         systemToken: localStorage.getItem("SYSTEMTOKEN")
    //       })
    //     }).then(res=>{
    //       if(res.data.code==='000000'){
    //         Toast('绑定手机号并登录成功')
    //         localStorage.setItem("ACCESSTOKEN",res.data.data.accessToken);
    //         localStorage.setItem("USERINFO",JSON.stringify(res.data.data));
    //         this.popupVisible = false
    //         if(this.$route.query.redirect){
    //           this.$router.replace({
    //             path: this.$route.query.redirect
    //           })
    //         }
    //       }else{
    //         Toast(res.data.status)
    //       }
    //     })
    //   },
    //   getUrlParam(name) {
    //     let reg = new RegExp("(^|&)"+ name +"=([^&]*)(&|$)");
    //     let r = window.location.search.substr(1).match(reg);
    //     // if(r!=null)return  unescape(r[2]); return null;
    //     if(r!=null)return r[2];
    //     return null;
    //   }
    // }
  }
</script>

<style lang='less'>
  #index {
    .ipt {
      a {
        &:active {
          color: #000;
        }
        input {
        margin-bottom: 0;
        border: none;
      }
      }
    }
    .gray {
      color: #999 !important;
      background-color: #f8f8f8;
    }
  }
</style>
