<template>
<div class="discounts-list">
	<div class="head">
		<div class="left"><i class="fa fa-search icon"></i>
			<input type="search" placeholder="企业名称/优惠内容"/></div>
		<div class="area" @click=" showRadio= true">{{areaName }}</div>
	</div>
	<mt-loadmore :bottom-method="loadMore" :bottom-all-loaded="allLoaded" :autoFill="false"
	             bottomPullText="加载更多"   ref="loadmore">
	<ul class="list">
		<li>
			<h2>上海申海汽车修理有限公司</h2>
			<div class="info">
				<span class="level">AAA级</span>
				<div class="right">距离1.4km <i class="fa fa-location-arrow icon"></i>
					<router-link tag="div" class="goto" to="/maintain?maintainId=3162">前往</router-link>
				</div>
			</div>
			<h4>服务承诺及惠民项目</h4>
			<div class="items">
				1、基盘内所有老客户推荐新客户，提前一天报备到售后信息员处备案，新客户消费金额满200元，老客户可获得100元优惠A券，同时新客户也可获得100元优惠A券； 2、客户参加厂方焕新礼活动，领取空气滤8.5折券，可以享受空气滤8.5折优惠；
			</div>
		</li>

		<!--<router-link tag="li" to="/maintain?maintainId=820">-->
			<!--<p>上海申海汽车修理有限公司</p>-->
			<!--<span>徐汇区龙华西路1号</span>-->
		<!--</router-link>-->
		<!--<router-link tag="li" to="/maintain?maintainId=3162">-->
			<!--<p>上海申海汽车修理有限公司2</p>-->
			<!--<span>徐汇区龙华西路1号</span>-->
		<!--</router-link>-->
	</ul>
	</mt-loadmore>
	<mt-popup v-model="showRadio"  style="width: 90%" >
		<div class="popupBlock">
			<mt-radio
					@click.native="showRadio= false"
					align="right"
					v-model="form.area"
					:options="area">
			</mt-radio>
		</div>
	</mt-popup>
</div>
</template>

<script>
import { Toast} from 'mint-ui'
export default {
	name: "discounts-list",
	data(){
		return{
			list:[],
			page: 1,
			total: 0,
			allLoaded: false,
			showRadio: false,
			area:[],
			form:{
				area: '',
				lng: '',
				lat: ''
			}
		}
	},
	computed:{
		areaName(){
			let name=''
			for(let i in this.area){
				if(this.form.area &&this.area[i].value== this.form.area){
					name= this.area[i].label
				}
			}
			return name|| '区域'
		}
	},
	watch:{
		selected(val){
			// console.log(val)
			// this.allLoaded= false
			this.page=1
			this.list=[]
			this.getList()
		}
	},
	mounted(){
		console.log('discounts-list.mounted')
		this.getList(false)
		this.getLocation()
		this.axios.post('/area/region/list', {areaName: 'shanghai'}).then((res) => {
			if (res.data.code == '0') {
				let arr= res.data.items
				for(let i in arr){
					this.area.push({
						label: arr[i].regionName,
						value: arr[i].regionCode,
					})
				}
			}
		})
	},
	methods:{
		getList(flag){
			let params={
				page: this.page-1,
				size: 10
			}
			if(this.selected) params.hasRead= this.selected
			this.axios.get('/monitoring/message/company-docking/query/companyCode',{params: params}).then(res=>{
				this.total= res.data.totalElements
				if(res.data.content&&res.data.content.length){
					this.list=this.list.concat(res.data.content)
					// this.list=res.data.comments
					if(this.list.length>=res.data.totalElements){
						this.allLoaded=true
					}else{
						this.allLoaded=false
					}
					if(flag) this.$refs.loadmore.onBottomLoaded()
				}else{
					this.allLoaded=true
				}
			})
		},
		loadMore(){
			this.page++
			this.getList(true)
		},
		getLocation(){
				AMap.plugin('AMap.Geolocation', () => {
					this.geolocation = new AMap.Geolocation({
						buttonPosition: 'RT',
						buttonOffset: new AMap.Pixel(10,40),
						timeout: 1000,
					});
					this.geolocation.getCurrentPosition();
					AMap.event.addListener(this.geolocation, 'complete', (result)=>{
						// console.log('result', result)
						this.form.lng= result.position.lng
						this.form.lat= result.position.lat

						console.log(this.form.lng, this.form.lat)
					});//返回定位信息
					AMap.event.addListener(this.geolocation, 'error', (err)=>{
						// console.log(err)
						Toast('定位失败')
					});      //返回定位出错信息


				});
		},
	}
}
</script>

<style scoped lang="less">

.discounts-list{
	height: 100vh;
	overflow: auto;
	background-color: white;
	.head{
		padding: 10px 15px;
		position: fixed;
		width: 100%;
		background-color: white;
		left: 0;
		top: 0;
		z-index: 1;
		box-shadow:0 0 2px #DDDDDD;
		.left{
			display: inline-block;
			position: relative;
			width: 70%;
			input{
				height: 26px;
				background-color: #EEEEEE;
				border: 1px solid #DBDBDB;
				border-radius: 15px;
				padding: 0 10px 0 30px;
				margin: 0;
				text-align: left;
				font-size: 14px;
			}
			.icon{
				position: absolute;
				font-size: 14px;
				color: #999999;
				left: 10px;
				top: 50%;
				transform: translateY(-50%);
			}
		}
		.area{
			color: #333333;
			font-size: 14px;
			position: relative;
			float: right;
			padding-right: 12px;
			line-height: 26px;
			&:after{
				position: absolute;
				right: 0;
				top: 10px;
				content: '';
				width: 0;
				height: 0;
				border-width: 4px;
				border-style: solid;
				border-color: #9A9A9A transparent transparent;
			}
		}
	}
	.list{
		margin-top: 46px;
		overflow: hidden;
		li{
			padding-left: 15px;
			border-top: 10px solid  #F3F3F3;
			h2{
				font-size: 16px;
				color: #333333;
				line-height: 20px;
				font-weight: 400;
			}
			.info{
				border-bottom: 1px solid #D9D9D9;
				font-size: 12px;
				position: relative;
				height: 32px;
				overflow: hidden;
				.level{
					color: #FF7E1E;
					position: absolute;
					left: 0;
					bottom: 5px;
				}
				.right{
					position: absolute;
					right: 15px;
					bottom: 5px;
					color: #666666;
					*{
						vertical-align: text-bottom;
					}
					.icon{
						color: transparent;
						-webkit-text-stroke: 1px #666666;
						font-size: 14px;
						margin-left: 4px;
						vertical-align: text-top;
					}
					.goto{
						display: inline-block;
						line-height: 24px;
						padding: 0 15px;
						background-color: #4A90E2;
						color: white;
						margin-left: 10px;
						border-radius: 12px;
					}
				}
			}
			h4{
				font-size: 14px;
				color: #666666;
				margin: 10px 0 0 0;
				font-weight: 400;
			}
			.items{
				color: #9B9B9B;
				font-size: 12px;
				line-height: 17px;
				padding: 10px 15px 10px 0;
			}
		}

	}

}
</style>
