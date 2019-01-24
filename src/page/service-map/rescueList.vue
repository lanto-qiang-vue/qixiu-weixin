<template>
<div class="rescue-list">
	<slide-bar v-show="show=='maintainList' &&locationSuccess && list.length" :minHeight="45" :toLocation="toLocation">
		<div class="roll">
			<mt-loadmore :bottom-method="loadMore" :bottom-all-loaded="allLoaded" :autoFill="false"
			             bottomPullText="加载更多"   ref="loadMore">

				<div v-show="allLoaded && total>=10" style="text-align: center; line-height: 30px; background-color: #f8f8f8; font-size: 14px; color: #999;">已经到底啦...</div>
			</mt-loadmore>
		</div>
	</slide-bar>

	<div class="failure" v-show="!locationSuccess">
		<div class="content">
			<i class="fa fa-refresh"></i><span>加载失败，请开启定位后重试。</span>
		</div>
	</div>
	<div class="failure" v-show="locationSuccess && !list.length">
		<div class="content">
			<i class="fa fa-ban "></i><span>该区域暂无救援信息。</span>
		</div>
	</div>
</div>
</template>

<script>
import SlideBar from '@/page/service-map/SlideBar'
import { Indicator} from 'mint-ui'
export default {
	name: "rescue-list",
	components: { SlideBar},
	props: [ 'location', 'originalLocation'],
	data(){
		return{
			toLocation: 1,
			list:[],
			pageNo: 1,
			total: 0,
			allLoaded: false
		}
	},
	computed:{
		show(){
			return this.$store.state.app.slideState.showBody
		},
		locationSuccess(){
			return this.originalLocation.success
		},
	},
	watch:{
		locationSuccess(val){
			if(val){

			}
		}
	},
	mounted(){
		setTimeout(()=>{
			Indicator.close()
		},1000)

	},
	methods:{
		getList(){
			this.axios.post('/corp/rt/rescuetome',{
				"location": this.originalLocation.lng+ ','+ this.originalLocation.lat,
				"pageNo": this.pageNo,
				"pageSize":10
			}).then(res=>{
				if(res.data.code==='0'){
					this.list=res.data.items
					this.total=res.data.total

					if(this.page!=1) this.$refs.loadMore.onBottomLoaded()
					if (this.list.length>= this.total){
						this.allLoaded= true
					}else this.allLoaded= false
				}
			})
		},
		loadMore(){
			this.total++
			this.getList()
		}
	}
}
</script>

<style scoped lang="less">
.rescue-list{
	.failure{
		position: fixed;
		width: 100%;
		height: 275px;
		left: 0;
		bottom: 0;
		background-color: white;
		box-shadow:0px -1px 4px 0px rgba(0,0,0,0.2);
		z-index: 20;
		.content{
			position: absolute;
			left: 50%;
			top: 50%;
			transform: translate(-50%, -50%);
			color: #999999;
			font-size: 14px;
			width: 90%;
			text-align: center;
			i{
				font-size: 24px;
				vertical-align: bottom;
			}
			span{
				vertical-align: bottom;
				margin-left: 6px;
			}
		}
	}
}
</style>
