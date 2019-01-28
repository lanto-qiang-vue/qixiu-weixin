<template>
<div class="rescue-list">
	<div class="top" v-show="showTop">
		<i class="fa fa-volume-up left"></i>
		<span>机动车因故障抛锚或发生交通事故等原因造成车辆不能正常行驶而影响道路交通的，请拨打110或12122</span>
		<i class="fa fa-close right" @click="showTop= false"></i>
	</div>
	<slide-bar v-show="show=='maintainList' &&locationSuccess && list.length &&showBlock" :minHeight="45" :toLocation="toLocation">
		<div class="roll">
			<mt-loadmore :bottom-method="loadMore" :bottom-all-loaded="allLoaded" :autoFill="false"
			             bottomPullText="加载更多"   ref="loadMore">
				<ul class="list">
					<li v-for="(item, key) in list" :key="key">
						<p>{{item.name}}</p>
						<a class="tel" :href="'tel:'+ item.rescueMobileNo">
							<div class="icon"><i class="fa fa-phone"></i></div>
							<div>
								<span>拨打</span>
								<span>救援</span>
							</div>

						</a>
					</li>
				</ul>
				<div v-show="allLoaded && total>=10" style="text-align: center; line-height: 30px; background-color: #f8f8f8; font-size: 14px; color: #999;">已经到底啦...</div>
			</mt-loadmore>
		</div>
	</slide-bar>

	<div class="failure" v-show="!locationSuccess">
		<div class="content" @click="getCurrentPosition">
			<i class="fa fa-refresh"></i><span v-show="showBlock">请开启定位后点击此处重试。</span>
			<span v-show="!showBlock">加载中。</span>
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
			list:[
				// {name: 'afsadasdadasdas', rescueMobileNo: '1234567'},
				// {name: 'afsadasdadasdas', rescueMobileNo: '1234567'},
				// {name: 'afsadasdadasdas', rescueMobileNo: '1234567'},
				// {name: 'afsadasdadasdas', rescueMobileNo: '1234567'},
				// {name: 'afsadasdadasdas', rescueMobileNo: '1234567'},
				// {name: 'afsadasdadasdas', rescueMobileNo: '1234567'},
				// {name: 'afsadasdadasdas', rescueMobileNo: '1234567'},
				// {name: 'afsadasdadasdas', rescueMobileNo: '1234567'},
				// {name: 'afsadasdadasdas', rescueMobileNo: '1234567'},
				// {name: 'afsadasdadasdas', rescueMobileNo: '1234567'},
			],
			pageNo: 1,
			total: 0,
			allLoaded: false,
			showTop: true,
			showBlock:false
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
				this.getList()
			}
		}
	},
	mounted(){

	},
	methods:{
		getCurrentPosition(){
			this.$emit('getCurrentPosition')
		},
		getList(){
			this.axios.post('/corp/rt/rescuetome', {
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
					this.loadStop()
				}
			})
		},
		loadMore(){
			this.total++
			this.getList()
		},
		loadStop(){
			this.showBlock= true
			Indicator.close()
		}
	}
}
</script>

<style scoped lang="less">
.rescue-list{
	.top{
		width: 100%;
		position: fixed;
		left: 0;
		top: 0;
		background-color: #FEFCED;
		color: #F66218;
		padding: 5px 10px;
		z-index: 10;
		font-size: 16px;
		.left{
			position: absolute;
			top: 5px;
			left: 10px;
		}
		span{
			padding: 0 10px 0 20px;
			font-size: 12px;
			line-height: 16px;
			display: inline-block;
		}
		.right{
			position: absolute;
			top: 0;
			right: 0;
			padding: 3px 6px;
		}
	}
	.roll{
		overflow: auto;
		border-top: 1px solid #F2F2F2;
		margin: 0 10px;
		.list{
			li{
				position: relative;
				border-bottom: 1px solid #F2F2F2;
				overflow: hidden;
				&:after{
					border: 0;
				}
				p{
					height: 50px;
					line-height: 50px;
					color: #333333;
					font-size: 14px;
					font-weight: 600;
				}
				.tel{
					position: absolute;
					top: 0;
					right: 0;
					padding: 10px 0;
					height: 100%;
					div{
						display: inline-block;
						vertical-align: top;
						margin-left: 10px;
					}
					.icon{
						width: 30px;
						height: 30px;
						position: relative;
						color: #24c323;
						border: 1px solid #24c323;
						border-radius: 50%;
						i{
							position: absolute;
							left: 50%;
							top: 50%;
							transform: translate(-50%, -50%);
						}
					}
					span{
						font-size: 12px;
						color: #666666;
						height: 15px;
						line-height: 15px;
						display: block;
					}
				}
			}
		}
	}
	.failure{
		position: fixed;
		width: 100%;
		height: 275px;
		left: 0;
		bottom: 0;
		background-color: white;
		box-shadow:0px -1px 4px 0px rgba(0,0,0,0.2);
		z-index: 10;
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
