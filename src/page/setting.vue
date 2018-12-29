<template>
  <div class="wrap">
    <ul class="mui-table-view">
        <!--<li class="mui-table-view-cell">-->
          <!--<a class="mui-navigate-right">消息设置</a>-->
        <!--</li>-->
        <li class="mui-table-view-cell">
            <a class="mui-navigate-right" @click="goChangeNickName">修改昵称</a>
        </li>
        <li class="mui-table-view-cell" @click="goChangePassword">
            <a class="mui-navigate-right">修改登录密码</a>
        </li>
        <li class="mui-table-view-cell" @click="goChangePhoneNum">
            <a class="mui-navigate-right">修改手机号码</a>
            <span>{{ num }}</span>
        </li>
    </ul>
    <ul class="mui-table-view">
        <li class="mui-table-view-cell" @click="encourage">
            <a class="mui-navigate-right">鼓励一下</a>
        </li>
        <li class="mui-table-view-cell" @click='goAboutUs'>
            <a class="mui-navigate-right">关于我们</a>
        </li>
    </ul>
    <div @click="logout" class="loginOut" v-if="typeof(isLogin) == 'string'">退出登录</div>
  </div>
</template>

<script>
import { MessageBox, Toast } from 'mint-ui'
export default {
    data() {
        return{
            num: this.$route.query.num,
            isLogin: localStorage.getItem("ACCESSTOKEN")
        }
    },
    mounted(){

    },
    methods: {
        logout(){
            let self= this
            this.axios({
                method: 'get',
                url: '/user/useraccount/logout'
            }).then(function (response) {
                if(response.data.code!='0'){
                  MessageBox('提示', response.data.status);
                }else{
                  localStorage.removeItem("ACCESSTOKEN")
                  localStorage.removeItem("USERINFO")
                  MessageBox.alert('退出成功').then(action => {
                      self.$router.push({path:'/login'})
                  });
                }
            })
        },
        goAboutUs(){
            this.$router.push({path: '/aboutUs'})
        },
        goChangePassword(){
          this.$router.push({
            path: '/changePassword'
          })
        },
        goChangeNickName(){
          this.$router.push({
            path: '/changeNickName'
          })
        },
        goChangePhoneNum(){
          this.$router.push({
            path: '/bindPhone',
            query: {
              num: this.$route.query.num
            }
          })
        },
        encourage () {
          Toast("谢谢您的支持,我们将做的更好!")
        }
    }
}
</script>

<style lang='less'>
    body {
        /*background-color: #f8f8f8;*/
    }
    .wrap {
        background-color: #f8f8f8;
	    height: 100vh;
        ul {
            margin-top: 8px;
            li{
                padding: 12px 15px;
                position: relative;
                a {
                    color: #333;
                    font-size: 15px;
                }
                span {
                    position: absolute;
                    right: 35px;
                    top: 50%;
                    transform: translateY(-50%);
                    font-size: 14px;
                    color: #999;
                }
            }
        }
        ul:before, ul:after {
            height: 0;
        }
        .loginOut {
            width: 100%;
            height: 45px;
            background-color: #fff;
            margin-top: 16px;
            line-height: 45px;
            text-align: center;
            color: red;
        }
    }
</style>
