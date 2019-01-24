import Vue from 'vue'
import App from './App.vue'
import store from './store'
import router from './router.js'
import axios from './axios.js'
import MintUI from 'mint-ui'
import VueImg from 'v-img'
import '@/assets/font-awesome/css/font-awesome.min.css'
import '~/public/static/mui/css/mui.min.css'
import 'mint-ui/lib/style.css'
import '@/assets/common.css'
import '@/fliters.js'
import '@/auth.js'

Vue.config.productionTip = false
Vue.use(MintUI)
Vue.use(VueImg);
Vue.prototype.axios = axios;

new Vue({
	router,
	store,
	render: h => h(App)
}).$mount('#app')
