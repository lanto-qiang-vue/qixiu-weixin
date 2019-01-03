<template>
  <div id="changePhoneNum">
    <div style="position: relative; padding-left: 50px; margin-bottom: 15px; border-bottom: 1px solid #eee;">
      <label style="position: absolute; left: 0; top: 50%; transform: translateY(-60%); color: rgb(66, 133, 244); font-size: 17px;">手机号</label>
      <input type="number" v-model="phone" class="mui-input-clear" placeholder="输入手机号">
    </div>
    <div style="position: relative;">
      <div style="position: relative; padding-left: 50px; margin-bottom: 15px; border-bottom: 1px solid #eee;">
        <label style="position: absolute; left: 0; top: 50%; transform: translateY(-60%); color: rgb(66, 133, 244); font-size: 17px;">验证码</label>
        <input type="number" v-model="captcha" class="mui-input-clear" style="padding-right: 100px;" placeholder="输入短信验证码">
        <p v-if="flag" class="reGet" style="color: #4285f4; cursor: pointer; width: auto; position: absolute; right: 8px; top: 0;" @click="getCaptcha">{{getCodeButton}}</p>
        <p v-else class="reGet" style="color: #4285f4; cursor: pointer; width: auto; position: absolute; right: 8px; top: 0;">{{getCodeButton}}</p>
      </div>
    </div>
	  <div style="position: relative; padding-left: 50px; margin-bottom: 15px; border-bottom: 1px solid #eee;">
		  <label style="position: absolute; left: 0; top: 50%; transform: translateY(-60%); color: rgb(66, 133, 244); font-size: 17px;">密码</label>
		  <input type="number" v-model="pass" class="mui-input-clear" placeholder="输入密码">
	  </div>
	  <div style="position: relative; padding-left: 50px; margin-bottom: 15px; border-bottom: 1px solid #eee;">
		  <label style="position: absolute; left: 0; top: 50%; transform: translateY(-60%); color: rgb(66, 133, 244); font-size: 17px;">确认密码</label>
		  <input type="number" v-model="confirmPass" class="mui-input-clear" placeholder="确认密码">
	  </div>
    <button @click="goNext">重置密码</button>
  </div>
</template>

<script>
  import {Toast} from "mint-ui"
  export default {
    data(){
      return {
        phoneNumber: '',
        captcha: '',
        tel: '',
        phone: '',
        confirmPass:'',
        getCodeButton:"获取验证码",
        count: 0,
        timer: null,
        flag: true
      }
    },
    methods: {
      getCaptcha(){
        if(this.phone.trim()==='') {
          return Toast("手机号不能为空")
        }
        this.axios({
          method: 'post',
          url: '/user/pass/reset/'+ this.phone,
          data: {}
        }).then(response => {
          console.log(response);
          if (response.data.code === "0") {
            Toast('发送成功，请查收！');
            this.flag=false
            //计时器
            const TIME_COUNT = 60;
            let num= 0;
            if(!this.timer) {
              this.count = TIME_COUNT;
              this.timer = setInterval(() => {
                if (this.count > 0 && this.count <= TIME_COUNT) {
                  num = this.count;
                  this.getCodeButton = num + "s"
                  this.count--;
                } else {
                  clearInterval(this.timer);
                  this.getCodeButton = '获取验证码'
                  this.timer = null;
                  this.flag=true
                }
              }, 1000)
            }
          }
        })
      },
      goNext(){
        if (this.captcha.trim() === '') {
          return Toast("请输入验证码")
        }
        let params={
          "randCode": this.captcha,
          "moblie": this.phone,
          "systemToken": localStorage.getItem('SYSTEMTOKEN')
        }
        this.axios({
          method: 'post',
          url: '/user/pass/reset',
          data:{
	          "confirmPass": this.confirmPass,
	          "mobileNo": this.phone,
	          "pass": this.pass,
	          "smsCode": this.captcha
          }
        }).then(res => {
            console.log(res);
            if(res.data.code == '0'){
             this.$router.go(-1)
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
    padding: 60px 15px 0 15px;
    position: relative;
    input {
      border: none;
      font-size: 16px;
      margin: 0;
    }
    .mui-input-row {
      color: #999;
      width: 100%;
      border-bottom: 1px solid #eee;
      input {
        border: none;
        width: 150px;
        font-size: 16px;
        margin-bottom: 0;
      }
      p {
        margin-bottom: 0px;
      }
    }
    .reGet {
      width: 101px;
      right: 15px;
      line-height: 40px;
      font-size: 16px;
      float: right;
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
