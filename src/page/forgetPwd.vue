<template>
  <div id="changePhoneNum">
    <div style="position: relative; padding-left: 50px; margin-bottom: 15px; border-bottom: 1px solid #eee;">
      <label style="position: absolute; left: 0; top: 50%; transform: translateY(-60%); color: rgb(66, 133, 244); font-size: 17px;">手机号</label>
      <input type="number" v-model="phone" class="mui-input-clear" placeholder="输入手机号">
    </div>
    <pic_verification style="margin-bottom: 25px;"></pic_verification>
    <div style="position: relative;">
      <div style="position: relative; padding-left: 50px; margin-bottom: 15px; border-bottom: 1px solid #eee;">
        <label style="position: absolute; left: 0; top: 50%; transform: translateY(-60%); color: rgb(66, 133, 244); font-size: 17px;">验证码</label>
        <input type="number" v-model="captcha" class="mui-input-clear" style="padding-right: 100px;" placeholder="输入短信验证码">
        <p v-if="flag" class="reGet" style="color: #4285f4; cursor: pointer; width: auto; position: absolute; right: 8px; top: 0;" @click="getCaptcha">{{getCodeButton}}</p>
        <p v-else class="reGet" style="color: #4285f4; cursor: pointer; width: auto; position: absolute; right: 8px; top: 0;">{{getCodeButton}}</p>
      </div>
    </div>
    <button @click="goNext">下一步</button>
  </div>
</template>

<script>
  import {Toast} from "mint-ui"
  import pic_verification from '../components/picVerification.vue'
  export default {
    data(){
      return {
        phoneNumber: '',
        captcha: '',
        tel: '',
        phone: '',
        getCodeButton:"获取验证码",
        count: 0,
        timer: null,
        flag: true
      }
    },
    components: {
      pic_verification
    },
    methods: {
      getCaptcha(){
        if(this.phone.trim()==='') {
          return Toast("手机号不能为空")
        }else if(this.$store.state.picVerification.YZM===''){
          return Tosat("验证码不能为空")
        }
        this.axios({
          method: 'post',
          url: '/message/sms/sendsmscaptcha',
          headers: {
            'Content-type': 'application/json'
          },
          data: {
            "businessType": "02",
            "mobile": this.phone,
            "cid": this.$store.state.picVerification.imageToken,
            "code": this.$store.state.picVerification.YZM,
            "systemToken": localStorage.getItem('SYSTEMTOKEN')
          }
        }).then(response => {
          console.log(response);
          if (response.data.code === "000000") {
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
          } else {
            Toast(response.data.status);
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
          url: '/user/telPhone/checkSystemToken',
          headers: {
            'Content-type': 'application/json'
          },
          data: JSON.stringify(params)
        })
          .then(res => {
            console.log(res);
            if(res.data.code == '000000'){
              this.$router.push({
                path: '/resetPassword',
                query: {
                  randCode: this.captcha.trim(),
                  phone: this.phone
                }
              })
            }else {
              Toast('短信验证码错误，请重新输入');
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
