<template>
  <div id="changePassword">
    <form class="mui-input-group">
      <div class="mui-input-row">
        <input type="password" class="mui-input-password" v-model="newPassword" placeholder="输入新密码">
      </div>
      <div class="mui-input-row">
        <input type="password" class="mui-input-password" v-model="surePassword" placeholder="再次确认新密码">
      </div>
    </form>
    <button @click="submit($event)" type="button" class="mui-btn mui-btn mui-btn-primary" data-loading-text="提交中">提交
    </button>
  </div>
</template>
<script>
  import {Toast} from "mint-ui"
  export default {
    name: "resetPassword",
    data(){
      return {
        oldPassword: '',
        newPassword: '',
        surePassword: '',
        phone: ''
      }
    },
    methods: {
      submit(e){
        var that = this;
        this.phone = this.$route.query.phone;
        if (this.newPassword.trim() === "") {
          return Toast("请输入新密码")
        } else if (this.surePassword.trim() === "") {
          return Toast("请再次输入新密码")
        } else if (this.newPassword.trim() !== this.surePassword.trim()) {
          return Toast("两次输入新密码不一致，请重新输入")
        }

        this.axios({
          method: 'post',
          url: '/submitForget',
          headers: {
            'Content-type': 'application/json'
          },
          data: {
            "systemToken": localStorage.getItem("SYSTEMTOKEN"),
            "randCode": this.$route.query.randCode,
            "newpassword": this.newPassword,
            "telphone": this.phone
          }
        }).then(res => {
          if (res.data.code == '000000') {
            Toast('重置成功')
            ;
            setTimeout(function () {
              that.queryLine()
            }, 2000)
          } else {
            Toast(res.data.status)

          }
        })
      },
      queryLine: function() {
        this.$router.push({
          path: '/login'
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
    > button {
      margin-top: 60px;
      width: 90%;
      height: 40px;
      background: linear-gradient(to right, #abd2fc, #85b1f6);
      border: none;
      border-radius: 20px;
    }
  }
</style>
