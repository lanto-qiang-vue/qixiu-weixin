<template>
<div class="discounts-list">
	<div class="head">
		<div class="left"><i class="fa fa-search icon"></i>
			<form action="">
				<input type="search" ref="input" v-model="search.q" @keydown="key($event)" placeholder="企业名称/优惠内容"/>
			</form>
			<i class="fa fa-times-circle close" v-show="search.q" @click="close" ></i>
			</div>
		<div class="area" @click="showRadio= true">{{areaName }}</div>
	</div>
	<mt-loadmore :bottom-method="loadMore" :bottom-all-loaded="allLoaded" :autoFill="false"
	             bottomPullText="加载更多"   ref="loadmore">
	<ul class="list">
		<li v-for="item in list" :key="item.sid">
			<h2>{{item.name}}</h2>
			<div class="rating">
				<img src="~@/assets/img/maintain/score_yellow.png"  v-for="index in parseInt(item.rating)||0" :key="'yellow'+index">
				<img src="~@/assets/img/maintain/score_gray.png"  v-for="index in (5-parseInt(item.rating))||0" :key="'gray'+index">
				{{item.rating?item.rating+'分':'暂无评分'}}
				<span>点评数：<small>{{item.commentCount}}</small></span></div>
			<div class="info">
				<span class="level">{{item.credit?'全国诚信企业 ':''}}
					{{levelText(item)}}<small v-if="item.grade=='AAA'">（最高评级）</small></span>
				<div class="right">
					<span>距离{{item.distance.toFixed(1)}}km <i class="fa fa-location-arrow icon"></i></span>
					<router-link tag="div" class="goto"
					             :to="`/maintain?maintainId=${item.sid}&distance=${item.distance}`">前往</router-link>
				</div>
			</div>
			<h4>服务承诺及惠民项目</h4>
			<div class="items" v-html="item.promoDetail.replace(/\n/g,'</br>')"></div>
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
import {getwxticket} from '@/util.js'
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
			area:[{
				label: '全部',
				value: '310000',
			}],
			search:{
				type: '164',
				q:'',
				area: '',
				distance: 0,
				lng: '121.480236',
				lat: '31.236301',
				// lng: '121.320209',
				// lat: '31.279839',
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
		// this.axios.post('/area/region/list', {areaName: 'shanghai'}).then((res) => {
		this.axios.get('/area/query').then((res) => {
			if (res.data.code == '0') {
				let arr= res.data.items
				for(let i in arr){
					if(arr[i].regionCode=='310000') {
						this.area.push({
							label: '全部',
							value: '310000',
						})
					}else
					this.area.push({
						label: arr[i].name,
						value: arr[i].code,
					})
				}
			}
		})

		getwxticket(['onMenuShareTimeline', 'onMenuShareAppMessage'])
		this.share()
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
			query+= ('&sort=gradeLevel asc,distance asc')
			if(this.search.lng) {
				let point=('&point='+this.search.lat+','+this.search.lng)
				if(this.localSuccess && (this.search.area=='310000'||!this.search.area)) point+= ',10'
				query+= point
			}
			let fq='&fq=status:1+AND+type:'+ this.search.type, is4s=''
			if(this.search.area && this.search.area!='310000' && (is164)) fq+= '+AND+areaKey:'+ this.search.area
			if(this.search.is4s && is164){
				is4s= (this.search.is4s=='yes' ? 'kw:4s': '-kw:4s')
				fq+= '+AND+' + is4s
			}
			query += fq

			return query
		},
		getList(flag){
			console.log('getList')
			this.axios({
				baseURL: '/repairproxy',
				url: '/micro/search/promotion'+ this.calcQuery(),
				method: 'get',
			}).then(res=>{
				this.total= res.data.totalElements
				if(res.data.content&&res.data.content.length){
					let arr= res.data.content
					for(let i in arr){
						arr[i].rating= 0
						arr[i].commentCount= 0
						this.getScore(arr[i].sid)
					}
					this.list=this.list.concat(arr)

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
		getScore(id){
			this.axios({
				method: 'get',
				baseURL: '/repairproxy',
				url: '/micro/search/company/repair/'+ id,
			}).then(res => {
				let arr= this.list
				for(let i in arr){
					if(arr[i].sid== res.data.sid){
						arr[i].rating= res.data.rating
						arr[i].commentCount= res.data.commentCount+1
					}
				}
			})
		},
		levelText(item){
			let text=''
			if(item.grade){
				text= item.grade+'级'
			}else if(!item.credit){
				text= '未评级'
			}
			return text
		},
		loadMore(){
			this.page++
			this.getList(true)
		},
		getLocation(){
				AMap.plugin('AMap.Geolocation', () => {
					this.geolocation = new AMap.Geolocation({
						// timeout: 2000,
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
						console.log(err)
						this.localSuccess= false
						Toast('定位失败')
						this.getList(false)
					});      //返回定位出错信息

				});
		},
		close(){
			this.search.q='';
			// setTimeout(()=>{
			this.page=1
			this.list=[]
			this.getList()
				this.$refs.input.focus()
			// },500)
		},
		share(){
			let link= window.location.href
			let titles= '车主福利大放送'
			let shareImg= 'https://download.image.shanghaiqixiu.org/2019/03/13/1552468798349.png'
			// console.log(news[j].headimg)

			wx.ready(function(){
				//分享到朋友圈
				wx.onMenuShareTimeline({
					title: titles, // 分享标题
					link: link, // 分享链接，该链接域名或路径必须与当前页面对应的公众号JS安全域名一致
					imgUrl: shareImg|| 'https://weixin.shanghaiqixiu.org/static/img/shqxw.jpg', // 分享图标
					success: function () {
						// 用户点击了分享后执行的回调函数
					}
				})
				//分享给朋友
				wx.onMenuShareAppMessage({
					title: titles, // 分享标题
					desc: titles, // 分享描述
					// link: 'https://weixin.shanghaiqixiu.org/#/remarkDetail?id='+self.$route.query.id, // 分享链接，该链接域名或路径必须与当前页面对应的公众号JS安全域名一致
					link: link, // 分享链接，该链接域名或路径必须与当前页面对应的公众号JS安全域名一致
					imgUrl: shareImg|| 'https://weixin.shanghaiqixiu.org/static/img/shqxw.jpg', // 分享图标
					type: '', // 分享类型,music、video或link，不填默认为link
					dataUrl: '', // 如果type是music或video，则要提供数据链接，默认为空
					success: function () {
// 用户点击了分享后执行的回调函数
					}
				});
			})
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
				line-height: 24px;
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
			.close{
				position: absolute;
				font-size: 18px;
				color: #999999;
				right: 5px;
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
			margin-right: 20px;
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
				margin: 10px 0 0 0;
			}
			.rating{
				position: relative;
				/*top: 3px;*/
				font-size: 12px;
				color: #999999;
				img{
					width: 15px;
					float: left;
					margin-right: 3px;
					margin-top: 3px;
				}
				span{
					margin-left: 10px;
					font-size: 13px;
					small{
						color: #666666;
					}
				}
			}
			.info{
				border-bottom: 1px solid #D9D9D9;
				font-size: 12px;
				position: relative;
				top: -8px;
				height: 32px;
				.level{
					color: #FF7E1E;
					position: absolute;
					left: 0;
					bottom: 3px;
					font-size: 13px;
					small{
						font-size: 12px;
						color: #9B9B9B;
					}
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
				margin: 0 0 0 0;
				font-weight: 400;
			}
			.items{
				color: #9B9B9B;
				font-size: 12px;
				line-height: 17px;
				padding: 6px 15px 6px 0;
			}
		}

	}

}
</style>
