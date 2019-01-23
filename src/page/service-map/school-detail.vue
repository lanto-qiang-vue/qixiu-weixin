<template>
<div class="school-detail">
	<div class="banner" v-if="bannerList.length">
		<div class='dummy'></div>
		<div class='content'>
			<mt-swipe :auto="3000">
				<mt-swipe-item v-for="(item, index) in bannerList" :key="index">
					<img :src="item" v-img="{group: 'school-img'}"/>
				</mt-swipe-item>
			</mt-swipe>
		</div>
	</div>
	<img v-else style="width: 100%" src="~@/assets/img/maintain/暂无图片.png"/>
	<div class="head">
		<div class="title">{{info.simpleName}}({{info.name}})</div>
		<div class="level">{{info.creditLevel=="N" ? "未评" :info.creditLevel}}级</div>
		<div class="address">
			<span class="miles" @click="sheetVisible= true">距离{{ distance }}km</span>
			<span class="address_area">{{ info.address }}</span>
		</div>
	</div>
	<div class="info">
		<p><label>学驾类型：</label>{{info.trainingScope}}</p>
		<p><label>学车基地：</label>
			<span v-for="(item, index) in info.baseList" :key="index">
				<a @click="toBase(item)">{{item.name}}</a> <span v-if="index< info.baseList.length-1">，</span>
			</span>
		</p>
		<p class="intro"><label>驾校介绍：</label><span>{{ info.about | FormatArticle('暂无')}}</span></p>
		<p v-if="info.about"><a class="more" @click="showMore= true">了解更多</a></p>
	</div>
	<div class="bottom">
		<div class="call" @click="toCall"><span>拨打电话</span></div>
		<div class="sign-up" @click="showForm= true">学车报名</div>
	</div>

	<mt-popup v-model="showTel"  style="width: 90%" >
		<div class="telBlock">
			<a v-for="(item, key) in tel" :key="key" :href="'tel:'+ item">{{item}}</a>
		</div>
	</mt-popup>
	<mt-popup v-model="showType"  style="width: 90%" >
		<div class="telBlock">
			<mt-radio
					@click.native="showType= false"
					align="right"
					v-model="signForm.category"
					:options="driveType">
			</mt-radio>
		</div>
	</mt-popup>

	<mt-popup v-model="showMore" position="right" class="show-more">
		<mt-header title="驾校详情" class="popup-header"><mt-button icon="back" slot="left" @click="showMore=false"></mt-button></mt-header>
		<div class="body">
			<div class="title">{{info.name}}</div>
			<div v-html="info.about" class="detail"></div>
			<!--<img v-for="(item, key) in bannerList" :key="key" :src="item"/>-->
		</div>

	</mt-popup>

	<mt-popup v-model="showForm" position="right" class="show-form">
		<mt-header title="报名填写" class="popup-header"><mt-button icon="back" slot="left" @click="showForm=false"></mt-button></mt-header>
		<div class="form">
			<mt-field label="联系人" placeholder="填写联系人姓名" type="text" disableClear v-model="signForm.name"></mt-field>
			<mt-cell title="学驾类型" @click.native="showType= true" is-link><span >{{signForm.category || '选择培训驾照类型'}}</span></mt-cell>
			<mt-field class="input-tel" label="联系电话" placeholder="填写联系电话"  :attr="{ maxlength: 11 }" type="text" disableClear :state="state" v-model="signForm.phoneNo"></mt-field>
		</div>
		<div :class="[state!= 'success' ? 'disable' : '', 'to-sign']" @click="toSign">一键报名</div>
	</mt-popup>
	<mt-popup v-model="showOk" position="right" class="show-ok">
		<img src="~@/assets/img/maintain/icon-ok.png"/>
		<p>恭喜您成功预约学车： </p>
		<p>{{info.simpleName+ '驾校('+ info.name+ ')'}}</p>
		<span>请留意手机，驾校将与您联系</span>
		<div class="back-home" @click="$router.go(-2)">返回首页</div>
	</mt-popup>

	<mt-actionsheet
			style="z-index: 16"
			:actions="actions"
			v-model="sheetVisible">
	</mt-actionsheet>
</div>
</template>

<script>
import {  Swipe, SwipeItem, Popup, Toast, Radio, Field, Cell} from 'mint-ui';
export default {
	name: "school-detail",
	data(){
		return{
			info :{},
			showTel: false,
			showType: false,
			showForm: false,
			showMore: false,
			showOk: false,
			signForm:{
				name: '',
				phoneNo: '',
				category: ''
			},
			state: '',

			actions: [],
			sheetVisible: false,
		}
	},
	computed: {
		driveType(){
			let type=this.info.trainingScope? this.info.trainingScope.split(',') : [], options=[]
			for(let i in type){
				options.push({
					label: type[i],
					value: type[i],
				})
			}
			return type
		},
		tel(){
			return this.info.phoneNo? this.info.phoneNo.split('/'): []
		},
		inputTel(){
			// console.log(this.signForm.phoneNo)
			return this.signForm.phoneNo
		},
		bannerList(){
			// console.log('bannerList')
			let arr= this.info.pic? this.info.pic.split(','): []
			return arr
		},
		distance(){
			let p1= [this.$route.query.lng, this.$route.query.lat]
			let p2= [this.info.lon||0, this.info.lat|| 0]
			let distance= AMap.GeometryUtil.distance(p1, p2)
			// console.log('distance', distance)
			return (distance/1000).toFixed(1);
		}
	},
	watch:{
		inputTel(val){
			let p1 = /^1[3456789]\d{9}$/;
			if (p1.test(val)) {
				this.state= 'success'
			}else{
				this.state= 'error'
			}
		}
	},
	mounted(){
		this.getInfo()
	},
	methods:{
		getInfo(){
			this.axios.get('/training/driving/school/'+ this.$route.query.id).then( (res) => {
				this.info= res.data
				this.toNavigation()
			})
		},
		toBase(item){
			item.type='301'
			item.sid=item.id
			item.addr=item.address
			this.$router.push({
				path: '/base-map',
				query: {
					item,
					special: 'base'
				}
			})
		},
		toCall(){
			if (!localStorage.getItem("ACCESSTOKEN")) {
				Toast('登录后可拨打电话')
				// console.log(to.fullPath)
				this.$router.push({
					path: '/login',
					query: { redirect: this.$route.fullPath }
				})
			} else {
				this.showTel= true
			}
		},
		toSign(){
			if(this.state!= 'success'){
				return
			}
			this.signForm.schoolId= this.info.id
			this.signForm.schoolName= this.info.name
			this.axios.post('/training/driving/register', this.signForm).then( (res) => {
				if(res.data.code=='0'){
					this.showOk= true
				}
			})
		},
		toNavigation(){
			let name= this.info.name
			let address= this.info.address
			let position= `${this.info.lon},${this.info.lat}`
			this.actions= [{
				name: '高德地图',
				method(){
					window.location.href = `http://uri.amap.com/marker?position=${position}&name=${name}&src=上海汽修平台&coordinate=wgs84&callnative=1`
				}
			}, {
				name: '百度地图',
				method(){
					window.location.href = `http://api.map.baidu.com/geocoder?address=${address}&output=html&src=上海汽修平台`
				}
			}]
		}
	}
}
</script>

<style scoped lang="less">
.school-detail{
	.banner {
		position: relative;
		overflow: hidden;
		.dummy {
			margin-top: 45%;
		}
		.content{
			position: absolute;
			left: 0;
			right: 0;
			top: 0;
			bottom: 0;
			img {
				width: 100%;
				height: 100%;
			}
		}
	}
	.head{
		padding: 15px;
		border-bottom: 10px solid #F8F8F8;
		.title{
			font-size: 18px;
			font-weight: 600;
			margin-bottom: 5px;
		}
		.level{
			font-size: 12px;
			color: #FF7E1E;
			margin-bottom: 5px;
		}
		.address{
			position: relative;
			font-size: 13px;
			color: #666666;
			.address_area{
				padding-left: 15px;
				padding-right: 80px;
				background:  url("~@/assets/img/maintain/区域2.png") no-repeat left 3px;
				background-size: 12px auto;
				display: block;
			}
			.miles{
				padding-right: 12px;
				background: url("~@/assets/img/maintain/mile2.png") no-repeat right center;
				background-size: 12px auto;
				position: absolute;
				top: 0;
				right: 0;
			}
		}
	}
	.info{
		padding: 15px;
		font-size: 14px;
		p{
			color: #666666;
			line-height: 25px;
			label{
				color: black;
			}
		}
		.intro{

			&>*{
				float: left;
			}
			span{
				width: calc(100% - 70px);
				word-break: break-all;
				text-overflow: ellipsis;
				max-height: 75px;
				overflow: hidden;

				display: -webkit-box;
				display: -moz-box;
				box-orient: vertical;
				-webkit-box-orient: vertical;
				-moz-box-orient: vertical;
				line-clamp: 3;
				-webkit-line-clamp: 3;
				-moz-line-clamp: 3;
			}
		}
		.more{
			float: right;
		}
	}
	.bottom{
		width: 100%;
		height: 50px;
		position: fixed;
		left: 0;
		bottom: 0;
		.call{
			width: 40%;
			float: left;
			height: 50px;
			border-top: 1px solid #EEEEEE;
			text-align: center;
			span{
				background: url("~@/assets/img/maintain/phone3.png") no-repeat left center;
				background-size: 16px auto;
				line-height: 49px;
				color: #333333;
				padding-left: 20px;
			}
		}
		.sign-up{
			width: 60%;
			float: left;
			height: 50px;
			line-height: 50px;
			text-align: center;
			color: white;
			background: linear-gradient(90deg,#FFA520 0%,#F76B1C 100%,#F76B1C 100%);
		}
	}
	.telBlock{
		a{
			display: block;
			color: black;
			line-height: 40px;
			text-align: center;
			border-bottom: 1px solid #EEEEEE;
			&:last-child{
				border: 0;
			}
		}
	}
	.show-more{
		width: 100%;
		height: 100vh;
		.body{
			padding: 40px 15px 10px 15px;
			height: 100vh;
			overflow: auto;
			.title{
				margin: 10px 0;
				font-size: 22px;
				line-height: 25px;
				text-align: center;

			}
			.detail {
				width: 100%;
				overflow: hidden;
				position: relative;
				font-size: 14px;
			}
			img{
				max-width: 100%;
			}
		}
	}
	.show-form{
		width: 100%;
		height: 100vh;
		background-color: #F8F8F8;
		.form{
			margin-top: 40px;
			background-color: white;
			>*{
				border-bottom: 1px solid #EEEEEE;
				&:last-child{
					border: 0;
				}
			}
		}
		.to-sign{
			position: fixed;
			width: 100%;
			left: 0;
			bottom: 0;
			height: 50px;
			line-height: 50px;
			text-align: center;
			color: white;
			background: linear-gradient(90deg,#FFA520 0%,#F76B1C 100%,#F76B1C 100%);
		}
		.disable{
			opacity: .4;
		}
	}
	.show-ok{
		width: 100%;
		height: 100vh;
		background-color: white;
		text-align: center;
		padding: 15px;
		img{
			width: 100px;
			margin-top: 60px;
			margin-bottom: 30px;
		}
		p{
			font-size: 18px;
			font-weight: 600;
			margin-bottom: 10px;
		}
		span{
			display: inline-block;
			margin: 20px 0 30px 0;
			color: #999999;
			font-size: 14px;
		}
		.back-home{
			width: 80%;
			display: inline-block;
			color: white;
			height: 40px;
			line-height: 40px;
			background:linear-gradient(90deg,#6EB0FC 0%,#347DF5 100%);
			border-radius:45px;
		}
	}
	.popup-header{
		position: fixed;
		top: 0;
		left: 0;
		width: 100%;
		z-index: 1;
	}
}
</style>
<style lang="less">
.school-detail{
	.telBlock{
		.mint-radiolist-title{
			display: none;
		}
		.mint-cell{
			border-bottom: 1px solid #EEEEEE;
			&:last-child{
				border: 0;
			}
		}
	}
	.show-form{
		input{
			margin: 0;
			padding: 0;
			border: 0;
		}
		.input-tel .mint-cell-title .mint-cell-text::before{
			content: '*';
			color: red;
		}
	}
}
</style>
