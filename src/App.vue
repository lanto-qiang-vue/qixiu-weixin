<template>
	<div id="app">

		<keep-alive>
			<router-view v-if="$route.meta.keepAlive&& $route.matched.length==1"></router-view>
		</keep-alive>
		<router-view v-if="!$route.meta.keepAlive|| $route.matched.length>1"></router-view>
	</div>
</template>

<script>
	import config from '~/config.js'
	export default {
		name: 'app',
		data(){
			return {
				transitionName: 'slide-left',
				alive: false
			}
		},


		created() {
			// console.log('process.env.NODE_ENV',process.env.NODE_ENV, process)
			// console.log(this.getUrlParam('state'))
			// console.log(encodeURIComponent(window.location.href))
			if(this.isWeixn()){

				let state= this.getUrlParam('state')
				let URL = encodeURIComponent(window.location.href)
				if( !state){
					// let URL = encodeURIComponent('http://192.168.169.109:8888')
					// let appId = window.location.origin === 'https://weixin.shanghaiqixiu.org' ? config : this.consts.testAppId
					let appId = config.appid
					window.location.href = `https://open.weixin.qq.com/connect/oauth2/authorize?appid=${appId}&redirect_uri=${URL}&response_type=code&scope=snsapi_userinfo&state=snsapi_base#wechat_redirect`
				}
				if(state=='snsapi_base'){
					this.axios({
						url: '/user/useraccount/access/openid',
						method: 'post',
						data: {
							code: this.getUrlParam('code'),
							platform: 'WX',
							workOn: window.location.origin === 'https://weixin.shanghaiqixiu.org' ? 'pPro' : 'pDev',
						}
					}).then(res=>{
						if(res.data.code==='0') {
							// this.UnionID = res.data.openId.openId
							localStorage.setItem("UNIONID",res.data.openId.openId);
							localStorage.setItem("QXWOPENID",res.data.openId.openIdReal);
							history.replaceState(null, null, window.location.origin + window.location.hash)
						}
					})
				}

				let shareLink= this.getUrlParam('share')
				if(shareLink){
					// alert(decodeURIComponent(shareLink))
					window.location.href=window.location.origin + decodeURIComponent(shareLink)
				}
			}
		},
		methods:{
			isWeixn(){
				let ua = navigator.userAgent.toLowerCase();
				if(ua.match(/MicroMessenger/i)=="micromessenger") {
					return true;
				} else {
					return false;
				}
			},
			getUrlParam(name) {
				let reg = new RegExp("(^|&)"+ name +"=([^&]*)(&|$)");
				let r = window.location.search.substr(1).match(reg);
				// if(r!=null)return  unescape(r[2]); return null;
				if(r!=null)return r[2];
				return null;
			}
		}
	}
</script>

<style>

</style>
