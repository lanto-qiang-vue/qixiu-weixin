<template>
<div class="abnormal">
	<mt-navbar v-model="selected" class="tab">
		<mt-tab-item id="">全部</mt-tab-item>
		<mt-tab-item id="true">已读</mt-tab-item>
		<mt-tab-item id="false">未读</mt-tab-item>
	</mt-navbar>
	<mt-loadmore :bottom-method="loadMore" :bottom-all-loaded="allLoaded" :autoFill="false"
	             bottomPullText="加载更多"   ref="loadmore">
		<ul class="list">
			<router-link tag="li" v-for="(item, key) in list" :key="key" :to="'/com-remind?id='+ item.id">
				<p :clas="item.type">{{showText(item.type)}}</p>
				<span>{{item.sendDate}}</span>
				<div class="right">{{item.hasRead?'已读':'未读'}}<i></i></div>
			</router-link>
		</ul>
		<div v-show="allLoaded" style="text-align: center; line-height: 30px; background-color: #f8f8f8; font-size: 14px; color: #999;">已经到底啦...</div>
	</mt-loadmore>
</div>
</template>

<script>
export default {
	name: "abnormal",
	data(){
		return{
			selected: '',
			list:[],
			page: 1,
			total: 0,
			allLoaded: false,
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
		this.getList(false)
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
		showText(val){
			let text= ''
			switch (val){
				case 'NOT_UPLOAD':{
					text= '维修记录未上传提醒';
					break;
				}
				case 'UPLOAD_FAULT':{
					text= '维修记录上传存在错误提醒';
					break;
				}
				case 'UNREAD_NOT_UPLOAD':{
					text= '维修记录未上传未读提醒';
					break;
				}
				case 'UNREAD_UPLOAD_FAULT':{
					text= '维修记录上传存在错误未读提醒';
					break;
				}
			}
			return text
		},
		loadMore(){
			this.page++
			this.getList(true)
		},
	}
}
</script>

<style scoped lang="less">
.abnormal{
	height: 100vh;
	overflow: auto;
	.tab{
		background-color: white;
		position: fixed;
		width: 100%;
		top: 0;
		left: 0;
		z-index: 1;
	}
	.list{
		margin-top: 35px;
		border-top: 10px solid #F8F8F8;
		padding-left: 15px;
		li{
			position: relative;
			border-bottom: 1px solid #EEEEEE;
			overflow: hidden;
			padding: 10px 0;
			&:last-child{
				border: 0;
			}
			p{
				color: #FF9738;
				font-size: 15px;
			}
			.UPLOAD_FAULT, .UNREAD_UPLOAD_FAULT{
				color: #F64747;
			}
			span{
				color: #333333;
				font-size: 13px;
			}
			.right{
				color: #999999;
				font-size: 13px;
				position: absolute;
				right: 15px;
				top: 50%;
				transform: translateY(-50%);
				i{
					display: inline-block;
					border-right: 1px solid #6C6C6C;
					border-bottom: 1px solid #6C6C6C;
					width: 8px;
					height: 8px;
					transform: rotate(-45deg);
					margin-left: 4px;
				}
			}
		}
	}
}
</style>
