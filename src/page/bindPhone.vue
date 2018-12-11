<template>
  <div id="bindPhone">
    <div id="changePhoneNum">
      <p class="two">更换手机号后，下次登录需要用新手机号</p>
      <p class="two">当前绑定手机号: {{ phoneNumber }}</p>
    </div>
    <div class="phone">
      <span>+86</span>
      <div class="mui-input-row">
        <input type="number" class="mui-input-clear" v-model="phoneNum" maxlength="11" placeholder="输入新手机号">
      </div>
    </div>
    <div>
      <pic_verification style="margin-top: 15px;"></pic_verification>
    </div>
    <div class="captcha">
      <div class="mui-input-row ">
        <label style="float: right; color: #4285f4; padding:0; text-align: right;cursor: pointer;" v-if="flag" @click="getCaptcha">{{ getCodeButton }}</label>
        <label v-else style="float: right; color: #4285f4; padding:0; text-align: right;cursor: pointer;">{{ getCodeButton }}</label>
        <input  class="mui-input-clear" v-model="captcha" placeholder="输入短信验证码" style="padding-left: 15px;float: left;">
      </div>
    </div>
    <div class="password">
      <div class="mui-input-row">
        <input class="mui-input-clear" label="密码" placeholder="输入密码" type="password" v-model="userPass" style="padding-right: 40px; border: none">
      </div>
    </div>
    <button @click="submit($event)">提交</button>
  </div>
</template>

<script>
import { Toast } from "mint-ui"
import pic_verification from '../components/picVerification.vue'
export default {
  name: "bindPhone",
  data(){
    return{
      phoneNumber: this.$route.query.num,
      phoneNum: '',
      captcha:'',
      userPass:'',
      getCodeButton:"获取验证码",
      count: 0,
      timer: null,
      flag: true,
    }
  },
  components: {
    pic_verification
  },
  methods:{
    getCaptcha(){
      if(this.phoneNum.trim()===''){
        return Toast("手机号码不能为空")
      }else if(this.$store.state.picVerification.YZM===''){
        return Toast("请输入图形验证码")
      }
      this.axios({
        method: 'post',
        url: '/message/sms/sendsmscaptcha',
        headers: {
          'Content-type': 'application/json'
        },
        data:{
          "businessType": "03",
          "mobile":this.phoneNum,
          "cid": this.$store.state.picVerification.imageToken,
          "code": this.$store.state.picVerification.YZM,
          "systemToken": localStorage.getItem('SYSTEMTOKEN')
        }
      }).then(response => {
        console.log(response)
        if(response.data.code=='000000'){
          Toast('发送成功，请查收！');
          this.flag = false
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
                this.flag = true
              }
            }, 1000)
          }
        }else {
          Toast(response.data.status);
        }
      })
    },
    submit(e){
      let userInfo = JSON.parse(localStorage.getItem('USERINFO'));
      if(this.phoneNum.trim()===''){
        return Toast("手机号不能为空")
      }else if(this.captcha.trim()===''){
        return Toast("短信验证码不能为空")
      }else if (this.userPass.trim()===''){
        return Toast("密码不能为空")
      }
      let params={
        accessToken: localStorage.getItem("ACCESSTOKEN"),
        newTelphone: this.phoneNum,
        randCode: this.captcha,
        userPass: this.userPass,
        userId:userInfo && userInfo.userId
      }
      console.log('params',params)
      this.axios({
        method: 'post',
        url: '/user/telPhone/changeTelPhone',
        headers: {
          'Content-type': 'application/json'
        },
        data: JSON.stringify(params)
      })
        .then(res => {
          if(res.data.code == '1300215'){

            Toast("修改手机号码成功,请用新手机号登录")
              this.$router.push({
                path: '/login'
              })
          }else if(res.data.code != ''){
              var msg = res.data.status;
            Toast(msg)
          } else {
            Toast("修改手机号码失败")
          }

        })
    }
  }
}
</script>

<style lang='less'>
  #bindPhone {
    height: calc(100vh);
    padding: 40px 20px;
    width: calc(100vw);
    overflow: hidden;
    .phone {
      border-bottom: 1px solid #eee;
      padding-bottom: 10px;
      >span {
        float: left;
        width: 35px;
        line-height: 30px;
      }
      >.mui-input-row {
        width: calc(100% - 50px);
        margin-left: 6px;
        display: inline-block;
        input {
          margin-bottom: 0;
          padding: 15px 10px;
          height: 20px;
          border: none;
          border-left: 1px solid #eee;
        }
        >span {
          top: 0px;
        }
      }
    }

    .captcha {
      margin-top: 20px;
      padding-bottom: 20px;
      border-bottom: 1px solid #eee;
      .mui-icon-clear {
        right: 100px;
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
  #changePhoneNum{
    overflow: hidden;
    /*height: calc(100vh);*/
    padding: 0 15px;
    position: relative;
    margin-bottom: 10px;
    p {
      text-align: left;
    }
    .two {
      color: #8f8f94;
      font-size: 16px;
      font-weight: 400;
      margin-bottom: 5px;
    }
  }
  .password{
    border-bottom: 1px solid #eee;
    padding-top: 10px;
  }
</style>
