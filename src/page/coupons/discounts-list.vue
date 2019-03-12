<template>
<div class="discounts-list">
	<div class="head">
		<div class="left"><i class="fa fa-search icon"></i>
			<input type="search" v-model="search.q" @keydown="key($event)" placeholder="企业名称/优惠内容"/></div>
		<div class="area" @click="showRadio= true">{{areaName }}</div>
	</div>
	<mt-loadmore :bottom-method="loadMore" :bottom-all-loaded="allLoaded" :autoFill="false"
	             bottomPullText="加载更多"   ref="loadmore">
	<ul class="list">
		<li v-for="(item, index) in list" :key="index">
			<h2>{{item.name}}</h2>
			<div class="info">
				<span class="level">{{item.credit?'全国诚信企业 ':''}}{{item.grade?item.grade+'级': ''}}</span>
				<div class="right">
					<span v-show="localSuccess">距离{{item.distance.toFixed(1)}}km <i class="fa fa-location-arrow icon"></i></span>
					<router-link tag="div" class="goto" :to="'/maintain?maintainId='+item.sid">前往</router-link>
				</div>
			</div>
			<h4>服务承诺及惠民项目</h4>
			<div class="items" v-html="item.promoDetail.replace('\n','</br>')">
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
					@click.native="selectArea"
					align="right"
					v-model="search.area"
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
			limit: 10,
			total: 0,
			allLoaded: false,
			showRadio: false,
			area:[],
			search:{
				type: '164',
				q:'',
				area: '',
				lng: '121.480236',
				lat: '31.236301',
			},
			localSuccess: true
		}
	},
	computed:{
		areaName(){
			let name=''
			for(let i in this.area){
				if(this.search.area &&this.area[i].value== this.search.area){
					name= this.area[i].label
				}
			}
			return name|| '区域'
		},
	},
	watch:{
		areaName(){
			this.page=1
			this.list=[]
			this.getList()
		}
	},
	mounted(){
		console.log('discounts-list.mounted')
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
		key(e) {
			if ( e.keyCode == 13 || e=='search') {
				this.page=1
				this.list=[]
				this.getList()
			}
		},
		selectArea(){
			console.log('selectArea')
			this.showRadio= false
		},
		calcQuery(limit){
			let is164= this.search.type== '164'
			let query='?fl=pic,type,sid,name,addr,tel,distance,kw,lon,lat,bizScope,brand,category,grade,tag,promoDetail,credit'+
				'&q='+ this.search.q +
				'&page='+ (this.page-1) +','+ (limit ||this.limit)
			query+= ('&sort=_score desc,'+ (this.search.sort||'distance'))
			if(this.search.lng) query+=('&point='+this.search.lat+','+this.search.lng)
			let fq='&fq=status:1+AND+type:'+ this.search.type, is4s=''
			if(this.search.area && (is164)) fq+= '+AND+areaKey:'+ this.search.area
			if(this.search.is4s && is164){
				is4s= (this.search.is4s=='yes' ? 'kw:4s': '-kw:4s')
				fq+= '+AND+' + is4s
			}
			query += fq

			return query
		},
		getList(flag){
			this.axios({
				baseURL: '/repairproxy',
				url: '/micro/search/promotion'+ this.calcQuery(),
				method: 'get',
			}).then(res=>{
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
						this.search.lng= result.position.lng
						this.search.lat= result.position.lat
						this.localSuccess= true
						this.getList(false)
						console.log(this.search.lng, this.search.lat)
					});//返回定位信息
					AMap.event.addListener(this.geolocation, 'error', (err)=>{
						// console.log(err)
						// Toast('定位失败')
						this.getList(false)
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
				/*margin-top: 2px;*/
				/*overflow: hidden;*/
				.level{
					color: #FF7E1E;
					position: absolute;
					left: 0;
					bottom: 2px;
				}
				.right{
					position: absolute;
					right: 15px;
					bottom: 2px;
					color: #666666;
					height: auto;
					padding-top: 2px;
					overflow: visible;
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
