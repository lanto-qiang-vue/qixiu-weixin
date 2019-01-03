<template>
  <div id="changePassword">
    <form class="mui-input-group">
      <div class="mui-input-row">
        <input type="password" class="mui-input-password" v-model="oldPassword" placeholder="输入旧密码">
      </div>
      <div class="mui-input-row">
        <input type="password" class="mui-input-password" v-model="newPassword" placeholder="输入新密码">
      </div>
      <div class="mui-input-row">
        <input type="password" class="mui-input-password" v-model="surePassword" placeholder="再次确认新密码">
      </div>
    </form>
    <button @click="submit($event)" type="button" class="mui-btn mui-btn mui-btn-primary" data-loading-text="提交中">提交</button>
  </div>
</template>
<script>
import { Toast } from "mint-ui"
export default {
  name: "changePassword",
  data(){
    return{
      oldPassword:'',
      newPassword: '',
      surePassword: ''
    }
  },
  methods:{
    submit(e){
      var that = this
      if(this.oldPassword.trim()===""){
        return Toast("请输入旧密码")
      }else if(this.newPassword.trim()===""){
        return Toast("请输入新密码")
      }else if (this.surePassword.trim()===""){
        return Toast("请再次输入新密码")
      }else if (this.newPassword.trim()!==this.surePassword.trim()){
        return Toast("两次输入新密码不一致，请重新输入")
      }

      this.axios({
        method: 'post',
        url: '/user/update/password',
        data: {
	        "confirmPassword": this.surePassword,
	        "newPassword": this.newPassword,
	        "oldPassword": this.oldPassword
        }
      }).then(res=>{
        if(res.data.code==="0"){
          Toast("修改成功")

          this.$router.go(-2)
        }
      })
    }
  }
}
</script>

<style lang='less'>
  #changePassword {
    height: calc(100vh);
    background-color: #fff;
    padding: 40px 20px;
    text-align: center;
    form {
      &:before, &:after {
        height: 0;
      }
      .mui-input-row {
        height: 50px;
        input {
          padding: 20px 15px 0;
        }
        .mui-icon-eye {
          top: 18px;
        }
      }
    }
    >button {
      margin-top: 60px;
      width: 90%;
      height: 40px;
      background: linear-gradient(to right, #abd2fc, #85b1f6);
      border: none;
      border-radius: 20px;
    }
  }
</style>
