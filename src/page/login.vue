<template>
  <div id="login" style="position: relative;">
    <div style="position: absolute; width: 200px; height: 25px; z-index: 100; left: 50%; transform: translateX(-50%); top: 60px; display: flex; justify-content: space-between;">
      <span id="phone_login" class="my_active" @click="phoneLogin($event)">验证码登录</span>
      <span id="account_login" @click="accountLogin($event)">密码登录</span>
    </div>
    <div style="position: absolute; width: 100%; left: 0; bottom: 30px; z-index: 10;" @click="weChatLogin">
      <mt-button type="primary" size="large" style="width: 90%; margin: 0 auto;">
        <span class="mui-icon mui-icon-weixin" style="color: #fff;"></span>
        微信授权一键登录
      </mt-button>
    </div>
    <mt-tab-container v-model="active" swipeable>
      <mt-tab-container-item id="tab-container1">
        <div style="height: 100vh;" id="phone_login_container">
          <div class="form">
            <form class="mui-input-group first_input">
              <div class="mui-input-row">
                <mt-field :state="state1" type="tel" label="+86" :attr="{ maxlength: 11 }" placeholder="输入手机号" v-model="tel">
                </mt-field>
              </div>
              <div class="mui-input-row" v-show="false">
                <pic_verification></pic_verification>
              </div>
              <div class="mui-input-row second_input">
                <mt-field placeholder="输入验证码" :attr="{ maxlength: 6 }" type="tel" v-model="code">
                  <div style="width: 100px; height: 45px; color: #4285f4; line-height: 45px; text-align: center;" @click="flag && getCode($event)">获取验证码</div>
                </mt-field>
              </div>
            </form>
          </div>
          <div class="login_btn" style="margin-top: 80px;">
            <button @click="login('code')" :class="['login-button',{on: button1on}]" style="width: 70%;">验证并登录</button>
            <p style="text-align: center; font-size: 14px; margin: 15px 20px 0;">新用户登录即完成注册,代表同意</p>
            <span @click="goProtocol" style="color: #4285f4; font-size: 14px;width: 100%;text-align: center;display: block">《上海汽修平台用户协议》</span>
          </div>
        </div>
      </mt-tab-container-item>

      <mt-tab-container-item id="tab-container2">
        <div style="height: 100vh;" id="account_login_container">
          <div style="margin-top: 150px; padding: 0 40px;">
            <div class="mui-input-group">
              <div class="mui-input-row">
                <mt-field :state="state2" type="tel" :attr="{ maxlength: 11 }" placeholder="请输入手机号" v-model="userName"></mt-field>
              </div>
              <div class="mui-input-row hahaha">
                <input type="password" style="font-size: 16px;" class="mui-input-password" v-model="passWord" placeholder="请输入密码">
              </div>
            </div>
            <div class="clearfix" style="margin-bottom: 45px;">
              <span class="fr" style="color: #4285f4; margin-top: 10px; font-size: 15px;" @click="goForgetPassWord">忘记密码?</span>
            </div>
            <button :class="['login-button',{on: button1on}]" style="width: 90%;" @click="login('passwd')">登录</button>
          </div>
        </div>
      </mt-tab-container-item>
    </mt-tab-container>

    <mt-popup
      v-model="popupVisible"
      position="right">
      <div class="ipt" style="width: 100vw; height: 100vh; position: relative;">
        <div style="height: 45px; line-height: 45px; text-indent: 10px; background-color: #f8f8f8; font-size: 16px;">请绑定您的手机号</div>
        <div>
          <mt-field label="手机号" placeholder="请输入手机号" :attr="{ maxlength: 11 }" type="tel" v-model.trim="phone"></mt-field>
          <div v-show="false">
            <pic_verification></pic_verification>
          </div>
          <mt-field label="验证码" type="tel" v-model.trim="captcha" :attr="{ maxlength: 6 }" placeholder="短信验证码">
            <div id="captcha" style="width: 120px; height: 45px; line-height: 45px; text-align: center; color: #42b5f4;" @click="flag2 && getCaptcha()">获取验证码</div>
          </mt-field>
        </div>
        <mt-button type="primary" style="position: absolute; left: 0; bottom: 0; width: 100vw; border-radius: 0;" @click='submit'>提交</mt-button>
      </div>
    </mt-popup>
  </div>
</template>

<script>
  import { Toast, Field, TabContainer, Button, TabContainerItem, MessageBox } from 'mint-ui'
  import pic_verification from '../components/picVerification.vue'
  export default {
    name: 'login',
    data () {
      return {
        active: 'tab-container1',
        state1: '',
        state2: '',
        tel: '',
        code: '',
        flag: true,
        timer: 30,
        userName: '',
        passWord: '',

        popupVisible: false,
        phone: '',
        captcha: '',
        // UnionID: '',
        flag2: true,
        timer2: null,
        time2: 30,

        loginUserInfo: {},

        button1on: false,
        button2on: false
      }
    },

    created() {
      let data = {
        device: uuid(),
        password: "EpPrCgbF",
        username: "wechatqixiu"
      };
      this.axios({
        method: 'post',
        url: '/system/terminalsystem/login',
        headers: {
          'Content-type': 'application/json'
        },
        data: JSON.stringify(data)
      }).then(function (response) {
        localStorage.setItem("SYSTEMTOKEN", response.data.data.systemToken)
      })
      function  uuid() {
        var s = [];
        var hexDigits = "0123456789abcdef";
        for (var i = 0; i < 32; i++) {
          s[i] = hexDigits.substr(Math.floor(Math.random() * 0x10), 1);
        }
        s[14] = "4";
        s[19] = hexDigits.substr((s[19] & 0x3) | 0x8, 1);
        var uuid = s.join("");
        return uuid;
      }

      if(this.$route.query.bind=='needbind') this.popupVisible = true

      let userinfo= localStorage.getItem("USERINFO")
      if(userinfo){
        this.loginUserInfo= JSON.parse(userinfo)
        if(this.$route.query.bindwx=='yes'){
          let unionid= JSON.parse(userinfo).openid
          this.toBindweixin(unionid)
        }

      }
    },
    mounted(){
      mui('.mui-input-row input').input();
    },

    components: {
      pic_verification
    },

    watch: {
      active(newVal, oldVal){
        if(newVal==='tab-container1'){
          $('#phone_login').addClass('my_active')
          $('#account_login').removeClass('my_active')
        }else{
          $('#account_login').addClass('my_active')
          $('#phone_login').removeClass('my_active')
        }
      },

      tel(newVal, oldVal){
        let reg = /^1[3|4|5|7|8][0-9]{9}$/
        if (reg.test(newVal)) {
          this.state1 = 'success'
        } else if(newVal.trim()==='') {
          this.state1 = 'warning'
        } else {
          this.state1 = 'error'
        }
      },

      userName(newVal, oldVal){
        let reg = /^1[3|4|5|7|8][0-9]{9}$/
        if (reg.test(newVal)) {
          this.state2 = 'success'
        } else if(newVal.trim()==='') {
          this.state2 = 'warning'
        } else {
          this.state2 = 'error'
        }
      },
      time2 (newVal, oldVal) {
        if(newVal === 30 || newVal === 0){
          $('#captcha').html('获取验证码')
          $('#captcha').removeClass('gray')
          this.flag2 = true
          this.time = 30
          clearInterval(this.timer2)
        }else {
          $('#captcha').html('重新获取(' + newVal + ')')
          $('#captcha').addClass('gray')
        }
      },
      code(val){
        if(val) this.button1on= true
        else this.button1on= false
      },
      passWord(val){
        if(val) this.button2on= true
        else this.button2on= false
      }
    },

    methods:{
      phoneLogin(){
        this.active = 'tab-container1'
        $('#phone_login').addClass('my_active')
        $('#account_login').removeClass('my_active')
      },

      accountLogin(){
        this.active = 'tab-container2'
        $('#account_login').addClass('my_active')
        $('#phone_login').removeClass('my_active')
      },

      goProtocol(){
        this.$router.push('/protocol')
      },

      getCode(e){
        if (this.state1==='success'){
          this.axios({
            method: 'post',
            url: '/message/sms/sendsmscaptcha',
            headers: {
              'Content-type': 'application/json'
            },
            data: JSON.stringify({
              businessType: "10",
              cid: this.$store.state.picVerification.imageToken,
              code: this.$store.state.picVerification.YZM,
              mobile: this.tel,
              systemToken: localStorage.getItem("SYSTEMTOKEN")
            })
          }).then(res=>{
            if(res.data.code === '0'){
              Toast('验证码发送成功,请及时查收!')
              let [_this, time] = [this, null]
              this.flag = false
              time = setInterval(()=>{
                e.target.innerHTML = `(${_this.timer})重新获取`
                e.target.style.color = '#999'
                if(_this.timer === 0){
                  e.target.innerHTML = '获取验证码'
                  e.target.style.color = '#4285f4'
                  _this.flag = true
                  clearInterval(time)
                  _this.timer = 30
                }
                _this.timer--
              }, 1000)
            }else {
              Toast(res.data.status)
            }
          })
        } else {
          Toast('手机号输入有误')
        }
      },

      goForgetPassWord(){
        this.$router.push('/forgetPwd')
      },

      login(type){
        let self = this;
        let data = null

        if(type === 'code'){
          if(this.state1 != 'success'){
            return Toast("手机号输入有误")
          } else if(this.code.trim() === '') {
            return Toast('验证码不能为空')
          } else if(this.code.trim().length < 6) {
            return Toast('验证码为6位数字')
          }

          data = {
            captcha: this.code,   // 验证码
            loginMethod: type,
            systemToken: localStorage.getItem('SYSTEMTOKEN'),
            usertel: this.tel
          }
        }else {
          if(this.state2 != 'success'){
            return Toast("手机号输入有误")
          } else if(this.passWord.trim() === '') {
            return Toast('密码不能为空')
          }
          data = {
            systemToken: localStorage.getItem('SYSTEMTOKEN'),
            loginaccount : this.userName,
            userpassword : this.passWord
          }
        }

        this.axios({
          method: 'post',
          url: type === 'code' ? '/user/useraccount/register/login': '/user/useraccount/login',
          headers: {
            'Content-type': 'application/json'
          },
          data: JSON.stringify(data)
        }).then(res => {
          if(res.data.code=='0'){
            localStorage.setItem("ACCESSTOKEN",res.data.data.accessToken);
            localStorage.setItem("USERINFO",JSON.stringify(res.data.data));
            self.loginUserInfo= res.data.data
            // self.goBackUrl()
            Toast("登录成功")
            self.toBindweixin(res.data.data.openid)
          } else{
            Toast(res.data.status);
          }
        })
      },

      goBackUrl(){
        if(this.$route.query.redirect){
          this.$router.replace({
            path: this.$route.query.redirect
          })
        }else{
          this.$router.replace({
            path: '/index'
          })
        }
      },
      toBindweixin(id){
        let UNIONID=localStorage.getItem('UNIONID')
        let self= this
        if(UNIONID!=id){
          MessageBox({
            title: '与微信号绑定',
            message: '您的账号未与此微信绑定，是否一键绑定？',
            showCancelButton: true
          }).then(action => {
            if(action=='confirm'){
              this.axios({
                url: '/user/useraccount/bind/weixin?accessTOken='+localStorage.getItem("ACCESSTOKEN")+
                '&mobile='+self.loginUserInfo.telphone+'&unionid='+ UNIONID+'&openid='+ localStorage.getItem('QXWOPENID'),
                method: 'get',
                headers: {'Content-type': 'application/json'},
              }).then(res=>{
                if(res.data.code=='0'){
                  localStorage.setItem("USERINFO",JSON.stringify(res.data.loginUserBO.data))
                  Toast("绑定成功")
                }else{
                  Toast("绑定失败")
                }
                self.goBackUrl()
              })
            }else{
              self.goBackUrl()
            }
          })
        }else{
          self.goBackUrl()
        }
      },
      // weChatLogin(){
      //   let URL = encodeURIComponent(window.location.origin + '/#/index')
      //   let appId = window.location.origin === 'https://weixin.shanghaiqixiu.org' ? this.consts.onlineAppId : this.consts.testAppId
      //   // let URL = encodeURIComponent('https://weixin.shanghaiqixiu.org/#/index')
      //   // let appId = 'wxc0fa34909c77eaa5'
      //   window.location.href = `https://open.weixin.qq.com/connect/oauth2/authorize?appid=${appId}&redirect_uri=${URL}&response_type=code&scope=snsapi_userinfo&state=from_login#wechat_redirect`
      // },
      weChatLogin(){
        let self= this
        this.axios({
          url: '/user/useraccount/register/login',
          method: 'post',
          headers: {'Content-type': 'application/json'},
          data: JSON.stringify({
            account: localStorage.getItem('UNIONID')+','+localStorage.getItem('QXWOPENID'),
            loginMethod: 'wx',
            systemToken: localStorage.getItem('SYSTEMTOKEN')
          })
        }).then(res=>{
          console.log(res.data.code)
          if(res.data.code === "0"){
            Toast("授权登录成功")
            localStorage.setItem("ACCESSTOKEN",res.data.data.accessToken);
            localStorage.setItem("USERINFO",JSON.stringify(res.data.data));
            self.goBackUrl()
          }else if(res.data.code === "141010"){
            Toast('请绑定手机号')
            self.popupVisible = true
          }else {
            Toast(res.data.status)
          }
        })
      },

      getCaptcha() {
        let reg = /^1[3|4|5|7|8][0-9]{9}$/
        let _this = this
        if(this.phone === ''){
          return Toast('手机号不能为空')
        }else if(!reg.test(this.phone)){
          return Toast('手机号格式有误')
        }
        this.axios({
          method: 'post',
          url: '/message/sms/sendsmscaptcha',
          headers: {
            'Content-type': 'application/json'
          },
          data: JSON.stringify({
            businessType: "10",
            cid: this.$store.state.picVerification.imageToken,
            code: this.$store.state.picVerification.YZM,
            mobile: this.phone,
            systemToken: localStorage.getItem("SYSTEMTOKEN")
          })
        }).then(res=>{
          if(res.data.code === "0"){
            Toast('验证码发送成功,请查收!')
            this.flag2 = false
            this.timer2 = setInterval(()=>{
              _this.time2--
            }, 1000)
          }else {
            Toast(res.data.status)
          }
        })
      },
      submit () {
        let self= this
        if(this.phone===''){
          return Toast('手机号不能为空')
        }else if(this.captcha===''){
          return Toast('验证码不能为空')
        }
        this.axios({
          method: 'post',
          url: '/user/useraccount/register/login',
          headers: {
            'Content-type': 'application/json'
          },
          data: JSON.stringify({
            account: localStorage.getItem('UNIONID'),
            captcha: this.captcha,
            usertel: this.phone,
            loginMethod: 'wx',
            systemToken: localStorage.getItem("SYSTEMTOKEN")
          })
        }).then(res=>{
          if(res.data.code==='0'){
            Toast('绑定手机号并登录成功')
            localStorage.setItem("ACCESSTOKEN",res.data.data.accessToken);
            localStorage.setItem("USERINFO",JSON.stringify(res.data.data));
            self.loginUserInfo= res.data.data
            self.popupVisible = false
            if(self.$route.query.redirect){
              self.$router.replace({
                path: self.$route.query.redirect
              })
            }else{
              self.$router.push({path: '/index'})
            }
          }else{
            Toast(res.data.status)
          }
        })
      },
    }
  }
</script>

<style lang='less' scoped>
#login {
  height: 100vh;
  overflow: hidden;
  .my_active {
    border-bottom: 1px solid #4285f4;
    color: #4285f4;
  }
  #account_login_container {
    .mui-input-group {
      &:before, &:after {
        height: 0;
      }
      .mui-input-row {
        height: auto;
      }
      input {
        padding: 13px;
        height: auto;
      }
    }
  }

  .form {
    margin-top: 150px;
    padding: 0 40px;
    form {
      &:before, &:after {
        height: 0;
      }
      .mui-input-row {
        height: auto;
        &:before {
          height: 0;
        }
        &:after {
          left: 0;
        }
      }
    }
  }

}
</style>

<style lang='less'>
  #login {
    #phone_login_container {
      .form {
        .mint-cell-title {
          width: 40px;
          border-right: 1px solid #ccc;
        }
        .second_input input {
          padding-left: 0;
        }
        .mui-input-row {
          a {
            background: none;
            &:active {
              color: #000;
            }
            .mint-cell-wrapper {
              background: none;
            }
          }
        }
      }
    }

    #account_login_container {
      .mui-icon-eye {
        top: 15px;
      }
      .mint-cell-wrapper {
        padding: 0;
        background: none;
        input {
          padding-left: 0;
        }
      }
      .hahaha {
        &:after {
          left: 0;
        }
        input {
          padding-left: 0 !important;
        }
      }
    }
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
    .login-button{
      margin: 0 auto;
      display: block;
      padding: 10px 0;
      border: none;
      border-radius: 20px;
      font-size: 18px;
      color: #fff;
      background: linear-gradient(to right, #add4fe, #88b4f9);
    }
    .login-button.on{
      background: #26a2ff;
    }
  }
</style>
