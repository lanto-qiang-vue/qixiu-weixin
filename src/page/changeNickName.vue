<template>
  <div id="changePassword">
    <form class="mui-input-group">
      <div class="mui-input-row">
        <input type="text" v-model="nickName" placeholder="请输入昵称">
      </div>
    </form>
    <button @click="submit($event)" type="button" class="mui-btn mui-btn mui-btn-primary" data-loading-text="提交中">提交</button>
  </div>
</template>
<script>
import { Toast } from "mint-ui"
export default {
  name: "changeNickName",
  data(){
    return{
      nickName:'',
    }
  },
  created() {
      this.nickName = JSON.parse(localStorage.getItem("USERINFO")).nickname
  },
  watch: {
    nickName(){
      if(this.nickName.trim().length>10){

      }
    }
  },
  methods:{
    submit(e){
      var that = this
      if(this.nickName.trim()===""){
        return Toast("请输入昵称")
      }

      this.axios({
        method: 'post',
        url: '/center/nickName',
        headers: {
            'Content-type': 'application/json'
        },
        data: {
          "accessToken": localStorage.getItem("ACCESSTOKEN"),
          "nickName": this.nickName.trim()
        }
      }).then(res=>{
        if(res.data.code==="000000"){
          Toast("修改成功")
          let userInfo = JSON.parse(localStorage.getItem("USERINFO"));
          userInfo.nickname = this.nickName
          localStorage.setItem("USERINFO",JSON.stringify(userInfo))

          this.$router.go(-1)
        }else if(res.data.code==='130412') {
          Toast('登录过期,请重新登录')
          this.$router.push("/login")
        }else {
          Toast(res.data.status)

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
