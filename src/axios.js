import axios from 'axios'
import router from './router'
import store from './store'
import { Toast, Indicator, Popup } from 'mint-ui'

// axios 配置
axios.defaults.timeout = 60000;

// console.log(process.env.NODE_ENV)
let doing= false

axios.defaults.baseURL = '/proxy/';


// Add a request interceptor  请求拦截器
axios.interceptors.request.use(config => {
	// console.log(store)
	// let token= store.state.user.token
	let token= localStorage.getItem("ACCESSTOKEN")
	if(token) {
		config.headers.token= token
	}
    Indicator.open({
      text: '请稍候...',
      spinnerType: 'snake'
    });
    return config
  },
  error => {
    return Promise.reject(error);
});



// Add a response interceptor 响应拦截器
axios.interceptors.response.use(
  response => {
    Indicator.close()
    switch (response.data.code){
      case '130410':
      case '130411':
      case '130412':
      case '130405':
      case '130406':
      case '130408':

        weixinLogin()

        break

      // case '000001':
      //   Toast('系统异常')
      //   return
      //   break
    }
    return response;
  },
  error => {
  	// for(let key in error){
  	// 	console.log(key)
    // }
	 //  console.log('error.response', error.response.data.error)
	  Indicator.close()
	  // Toast({
		//   message: error.response.data.error,
		//   position: 'bottom',
		//   duration: 2000
	  // });
    if(error.message == 'timeout of 10000ms exceeded'){
      Toast({
        message: '请求超时',
        position: 'bottom',
        duration: 2000
      });
    }else{
	    Toast({
		    message: '系统异常',
		    position: 'bottom',
		    duration: 2000
	    });
    }
    return Promise.reject(error)
  });


function weixinLogin() {
  if(consts.isWeixn()){
    Toast('登录过期,正在自动重新登录!')

    axios({
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
        // Toast("授权登录成功")
        localStorage.setItem("ACCESSTOKEN",res.data.data.accessToken);
        localStorage.setItem("USERINFO",JSON.stringify(res.data.data));
        // if(this.$route.query.redirect){
        //   this.$router.replace({
        //     path: this.$route.query.redirect
        //   })
        // }else{
        //   self.$router.push({path: '/index'})
        // }
        // location.reload()

        router.replace({ path: '/'})
      }else if(res.data.code === "141010"){
      //   Toast('请绑定手机号')
      //   // this.popupVisible = true
      //   router.replace({
      //     path: '/login',
      //     query: {redirect: router.currentRoute.fullPath, bind: 'needbind'}
      //   })
        setTimeout(function () {
          Toast('此微信未绑定手机号，请手动登录')
        },1000)

        // router.replace({ path: '/'})
      }else {
        setTimeout(function () {
          Toast(res.data.status)
        },1000)
      }
    })
  }
}

export default axios;
