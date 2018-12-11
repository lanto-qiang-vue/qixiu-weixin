<template>
  <div id="changePhoneNum">
    <p class="one">为了账号安全，需要验证当前手机有效性</p>
    <p class="two" style="color: #333;">当前绑定手机号: {{ phoneNumber }}</p>
    <div class="mui-input-row">
      <input type="number" v-model="captcha" class="mui-input-clear" placeholder="输入验证码">
    </div>
    <p v-show="false" class="reGet">(<span>27s</span>)重新获取</p>
    <p v-show="true" class="reGet" style="color: #4285f4;cursor: pointer;" @click="getCaptcha">获取验证码</p>
    <button @click="goNext">下一步</button>
  </div>
</template>

<script>
  import { Toast } from "mint-ui"
export default {
  name: "changePhoneNum",
  data(){
    return{
      phoneNumber: this.$route.query.num,
      captcha: '',
      tel:"",
      userInfo:{}
    }
  },
  mounted(){
    this.userInfo = JSON.parse(localStorage.getItem('USERINFO'));
  },
  methods:{
    getCaptcha(){

    this.axios({
          method: 'post',
          url: '/message/sms/sendsmscaptcha',
          headers: {
            'Content-type': 'application/json'
          },
          data:{
            "businessType": "04",
            "mobile":this.userInfo && this.userInfo.telphone,
            "systemToken": localStorage.getItem('SYSTEMTOKEN')
          }
        }).then(function (response) {
          console.log('response',response)

          if(response.data.code == '000000'){
            Toast('发送成功，请查收！');
          }else {
            Toast(response.data.status);
          }
        })
      console.log(this.userInfo && this.userInfo.telphone)
    },
    goNext(){
      if(this.captcha.trim()===''){
        return Toast("请输入验证码")
      }
      let params={
        "randCode": this.captcha,
        "moblie":this.userInfo && this.userInfo.telphone,
        "accessToken": this.userInfo && this.userInfo.accessToken
      }
      console.log('response22222',params)
      this.axios({
        method: 'post',
        url: '/user/telPhone/checkSmsVerificationCode',
        headers: {
          'Content-type': 'application/json'
        },
        data: JSON.stringify(params)
      })
        .then(res => {
        console.log('response111111',res)

        if(res.data.code == '000000'){
          this.$router.push({
            path: '/bindPhone'
          })
          Toast('验证通过！');
        }else {
          Toast('验证码错误，请查验！');
        }
      })

    }
  }
}
</script>

<style lang='less' scoped>
  #changePhoneNum {
    overflow: hidden;
    height: calc(100vh);
    padding: 0 15px;
    position: relative;
    p {
      text-align: center;
    }
    .one {
      margin-top: 40px;
    }
    .two {
      color: #333;
      font-size: 16px;
      font-weight: 600;
      margin-bottom: 40px;
    }
    .mui-input-row {
      color: #999;
      width: calc(100vw - 130px);
      border-bottom: 1px solid #eee;
      input {
        border: none;
        width: 150px;
        font-size: 16px;
        margin-bottom: 0;
      }
    }
    .reGet {
      position: absolute;
      width: 101px;
      right: 15px;
      top: 131px;
      line-height: 40px;
      font-size: 16px;
      border-bottom: 1px solid #eee;
      span {
        color: red;
      }
    }
    button {
      margin-top: 70px;
      width: 90%;
      height: 40px;
      background: linear-gradient(to right, #add5fe, #88b4f9);
      color: #fff;
      border-radius: 20px;
      border: none;
      margin-left: 50%;
      transform: translateX(-50%);
    }
  }
</style>
