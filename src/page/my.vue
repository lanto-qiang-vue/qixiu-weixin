<template>
  <div style="overflow: scroll; height: calc(100vh - 50px)">
    <!-- 已登录 -->
	  <upload @done="changeAvatar" ref="upload"></upload>
    <div class="header hasrole" v-if="userInfo">
      <div class="text-one-cut" >
        <p>{{name}}</p>
        <u @click="goToSet"></u>
	      <div class="role-name" v-if="hasRole('weixiuqiye')" @click="switchRole= true"><span>{{showRole}}</span><i></i></div>
	      <span class="telNum">{{ tel }}</span>
      </div>
	    <div class="img" @click="toUpload">
		    <img ref="headerImg" :src="picURL || '/static/img/home/user.png'"  alt="点击更换头像" style="width: 60px;height: 60px;border-radius: 100%">
	    </div>


    </div>
    <!-- 未登录 -->
    <div class="header" v-else @click="goLogin">
	    <div class="text-one-cut" >
		    <span class="login" >点击登录</span>
		    <span class="fastLogin">1秒登录,体验更多功能</span>
	    </div>
	    <div class="img">
		    <img src="/static/img/home/user.png"  alt="点击更换头像" style="width: 60px;height: 60px;border-radius: 100%">
	    </div>
    </div>

    <!--<div class="list" @click="goOperate" v-if="this.jueSe===4">-->
      <!--<img src="../assets/img/my/Satisfaction_degree.png" alt=""><span>运营统计</span> <i></i>-->
    <!--</div>-->

	  <div v-show="nowRole=='chezhu'">

    <div class="list" @click="goCarListManager" v-if="hasRole('guanlibumen')">
      <img src="../assets/img/my/health.png" alt=""><span>电子健康档案</span> <i></i>
    </div>

    <div class="list" @click="goCarList">
      <img src="../assets/img/my/health.png" alt=""><span>爱车档案</span> <i></i>
    </div>

    <div class="list" @click="goMyQuestion">
      <img src="../assets/img/my/my_questions.png" alt=""><span>我的提问</span> <i></i>
    </div>
    <div class="list" @click="askMeQuestions" v-if="hasRole('zhuanjia')">
      <img src="../assets/img/my/my_questions.png" alt=""><span>向我提问</span> <i></i>
    </div>
    <div class="list" @click="goMyOrder">
      <img src="../assets/img/my/order.png" alt=""><span>我的预约服务</span> <i></i>
    </div>
    <div class="list" @click="goMyAppointment">
      <img src="../assets/img/my/appointment.png" alt=""><span>我的上门服务</span> <i></i>
    </div>
    <router-link to="/myRemark" tag="div" class="list">
      <!--<div class="list">-->
        <img src="../assets/img/my/Satisfaction_degree.png" alt=""><span>我的点评</span> <i></i>
      <!--</div>-->
    </router-link>
    <router-link to="/myComplaint" tag="div" class="list">
      <!--<div class="list">-->
      <img src="../assets/img/my/Satisfaction_degree.png" alt=""><span>我的反馈</span> <i></i>
      <!--</div>-->
    </router-link>
	<!--<router-link to="/my-coupons" tag="div" class="list">-->
	  <!--<img src="../assets/img/my/Satisfaction_degree.png" alt=""><span>我的优惠券</span> <i></i>-->
	<!--</router-link>-->

    <!--<div @click="goMyDiscount" class="list">-->
      <!--<img src="../assets/img/my/Satisfaction_degree.png" alt=""><span>我的优惠券</span> <i></i>-->
    <!--</div>-->
    <div @click="goExpertList" class="list">
      <img src="../assets/img/my/expert_info.png" alt=""><span>专家信息</span> <i></i>
    </div>
    <div @click="goSatisfaction" class="list">
      <img src="../assets/img/my/Satisfaction_degree.png" alt=""><span>满意度调查</span> <i></i>
    </div>
  </div>
  <div v-show="nowRole=='weixiuqiye'">
	  <router-link tag="div" to="/com-abnormal" class="list">
		  <img src="../assets/img/my/异常提醒.png" alt=""><span>异常提醒</span> <i></i>
	  </router-link>
	  <router-link tag="div" to="/edit-com-info" class="list">
		  <img src="../assets/img/my/企业信息维护.png" alt=""><span>企业信息维护</span>
		  <small :style="{color: comSta.color}" v-if="comSta.text">{{comSta.text}}</small> <i></i>
	  </router-link>
	  <div @click="goMyAppointmentOrder" class="list">
		  <img src="../assets/img/my/Satisfaction_degree.png" alt=""><span>我的预约订单</span> <i></i>
	  </div>
	  <router-link tag="div" to="/com-other-info?comOtherInfo=businessHours" class="list">
		  <img src="../assets/img/my/营业时间及状态调整.png" alt=""><span>营业时间及状态调整</span> <i></i>
	  </router-link>
	  <router-link tag="div" to="/com-other-info?comOtherInfo=featureTag" class="list">
		  <img src="../assets/img/my/企业特色标签.png" alt=""><span>企业特色标签</span> <i></i>
	  </router-link>
  </div>

    <div class="list" @click='goSetting(tel)' style="border-top: 10px solid #f8f8f8;box-sizing: content-box;">
      <img src="../assets/img/my/set.png" alt=""><span>设置</span> <i></i>
    </div>
    <!--<div class="list" @click='goBind' v-if="notbind">-->
      <!--<img src="../assets/img/my/set.png" alt=""><span>绑定此微信号</span> <i></i>-->
    <!--</div>-->
    <!--<div class="list" @click='goSuggestion'>-->
      <!--<img src="../assets/img/my/feedback.png" alt=""><span>意见建议</span> <i></i>-->
    <!--</div>-->
    <div class="list" @click='goComplaint'>
      <img src="../assets/img/my/report.png" alt=""><span>投诉举报</span> <i></i>
    </div>

	  <mt-popup v-model="switchRole"  style="width: 90%" >
		  <div class="telBlock">
			  <mt-radio
					  @click.native="switchRole= false"
					  align="right"
					  v-model="nowRole"
					  :options="roleOptions">
			  </mt-radio>
		  </div>
	  </mt-popup>

  </div>
</template>

<script>
  import {MessageBox, Actionsheet, Toast, Radio} from 'mint-ui'
  import Upload from '@/page/components/compress-upload.vue'
  export default {
    name: 'my',
	  components: {Upload},
    data () {
      return {
		name: "",
		tel: '',
		userInfo: localStorage.getItem("USERINFO"),
		jueSe: '',
		notbind: false,
	      picURL: '',
	      roles:'',
	      switchRole: false,
	      nowRole: 'chezhu',
	      roleOptions:[
		      {label: '车主', value: 'chezhu'},
		      {label: '维修企业', value: 'weixiuqiye'}
	      ],
	      comstatus: 0
      }
    },
	  computed:{
    	showRole(){
    		let role=''
    		for(let i in this.roleOptions){
    			if(this.nowRole== this.roleOptions[i].value){
				    role= this.roleOptions[i].label
    				break
			    }
		    }
		    return role
	    },
		  comSta(){
    		return this.calcStatus(this.comstatus)
		  }
	  },
	  watch:{
		  nowRole(val){
			  this.$store.commit('setNowRole', val)
		  }
	  },
    created(){
      let userinfo = JSON.parse(localStorage.getItem("USERINFO"))
      if (userinfo) {
        this.name = userinfo.nickname ? userinfo.nickname : userinfo.mobileNo
        this.tel = userinfo.mobileNo.substr(0, 3) + "****" + userinfo.mobileNo.substr(7)
        this.picURL = userinfo.photo
        this.roles= JSON.stringify(userinfo.roles)

        if(localStorage.getItem('UNIONID')!= userinfo.openid) this.notbind=true
      }else{
	      this.$store.commit('setNowRole', 'chezhu')
      }
	    this.nowRole= this.$store.state.app.nowRole
    },
	  mounted(){
		if(this.hasRole('weixiuqiye')){
			this.axios.get('/corp/manage/corpDetail/crux').then(res=> {
				if(res.data.code=='0'){
					this.comstatus= res.data.item.status
				}
			})
		}

	  },
    methods: {
    	hasRole(name){
			return this.roles.indexOf(name)>=0
	    },
      goLogin(){
        this.$router.push({
          path: '/login'
        })
      },
      goBind(){
        this.$router.push({path: '/login', query: { redirect: this.$route.fullPath, bindwx: 'yes' }})
      },
      goCarList(){
        this.$router.push({path: '/carOwner-centre/carList'})
      },

      goCarListManager(){
        this.$router.push({path: '/carOwner-centre/carList-manager'})
      },

      goSetting(){
        this.$router.push({
          path: '/setting',
          query: {
            num: this.tel
          }
        })
      },
      goSuggestion() {
        this.$router.push({path: '/suggestion'})
      },
      goComplaint() {
        this.$router.push({path: '/public-supervision/complaint'})
      },
      goMyQuestion() {
        this.$router.push({path: '/myQuestion'})
      },
      askMeQuestions(){
        this.$router.push('/askQuestions')
      },
      goSatisfaction(){
	      this.$router.push({path: '/government-service/government-service-list', query:{id: 10281033, name: '满意度调查'}})

      },
      goExpertList() {
        this.$router.push('/association-service/experts-list')
      },
      goSurveyList() {
        this.$router.push({path: '/surveyList'})
      },
      goMyAppointment() {
        this.$router.push({path: '/myAppointment'})
      },
      goMyOrder() {
        this.$router.push({path: '/myOrder'})
      },
      goMyConsultation(){
        this.$router.push({path: '/my/my-consultation'})
      },
      goMyDiscount(){
        this.$router.push({path: '/my/my-discount'})
      },
      goMyAppointmentOrder(){
        this.$router.push({path: '/my/my-appointment-order'})
      },
      goOperate(){
        this.$router.push({path: '/my/operate-manager'})
      },

      changeAvatar(res) {
          this.axios.post('/user/photo', {
	          url: res.item.path
          }).then(response => {
                Toast("头像更换成功");
                let userinfo = JSON.parse(localStorage.getItem("USERINFO"))
                userinfo.photo = res.item.path;
                localStorage.setItem("USERINFO",JSON.stringify(userinfo));
                this.picURL= res.item.path
            })
      },

      goToSet() {
        this.$router.push({
          path: '/changeNickName',
          query: {
            num: this.tel
          }
        })
      },
	    toUpload(){
    		this.$refs.upload.clickBox()
	    },
	    calcStatus(status){
		    let obj={}, statu= status? status.toString(): ''
		    switch (statu){
			    case '1':{
				    obj.text='待审核'
				    obj.color= 'orange'
				    break
			    }
			    case '2':{
				    obj.text='审核通过'
				    obj.color= 'green'
				    break
			    }
			    case '3':{
				    obj.text='审核不通过'
				    obj.color= 'red'
				    break
			    }
		    }
		    return obj
	    },
    }
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang='less' scoped>
  body {
    background-color: #f8f8f8;
  }
  .center {
    text-align: center;
    padding-top: 20px;
    color: #fff;
    font-size: 18px;
  }
  .center img {
    width: 100px;
    height: 100px;
    border-radius: 50%;
    border: 4px solid #ececec;
  }
  .div {
    width: 100%;
    position: relative;
  }

  .header {
    border-bottom: 10px solid #f8f8f8;
    padding: 38px 10px 0;
    position: relative;
    height: 125px;
	  .text-one-cut{
		  padding-right: 80px;
		  width: 100%;
		  overflow: hidden;
		  position: relative;
		  p {
			  width: 100%;
			  overflow: hidden;
			  text-overflow: ellipsis;
			  font-weight: 600;
			  font-size: 18px;
			  color: #000;
		  }
		  u {
			  position: absolute;
			  right: 84px;
			  bottom: 8px;
			  width: 15px;
			  height: 15px;
			  background: url(../assets/img/my/edit.png);
			  background-size: 100% 100%;
		  }
	  }
    .img {
      position: absolute;
      width: 60px;
      right: 20px;
      top: 50%;
      transform: translateY(-50%);
    }
	  .role-name{
		  padding: 4px 4px 4px;
		  display: inline-block;
		  margin-right: 10px;
		  font-size: 14px;
		  color: #333333;
		  i{
			  width: 0;
			  height: 0;
			  border-left: 4px solid transparent;
			  border-right:4px solid transparent;
			  border-top:6px solid #757575;
			  vertical-align: middle;
			  display: inline-block;
			  margin-left: 2px;
			  padding-bottom: 2px;
		  }
	  }

    .telNum, .fastLogin {
      margin-top: 16px;
      display: inline-block;
      color: #999;
    }
	  .telNum{
		  font-size: 14px;
	  }
    > .login {
      font-size: 20px;
    }
    .fastLogin {
	    float: left;
	    width: 100%;
    }

  }

  .list {
    height: 50px;
    line-height: 50px;
    padding: 0 10px;
    border-bottom: 1px solid #f8f8f8;
    position: relative;
    img {
      position: absolute;
      width: 16px;
      height: auto;
      top: 17px;
      left: 18px;
    }
    span {
      margin-left: 35px;
      font-size: 15px;
    }
	  small{
		  position: absolute;
		  height: 49px;
		  line-height: 49px;
		  font-size: 15px;
		  top: 0;
		  right: 25px;
	  }
    i {
      position: absolute;
      right: 10px;
      top: 20px;
      border-right: 1px solid;
      border-bottom: 1px solid;
      width: 10px;
      height: 10px;
      color: #999;
      -webkit-transform: rotate(-45deg);
      transform: rotate(-45deg);
    }
  }

  .list:nth-child(6) {

  }

</style>
