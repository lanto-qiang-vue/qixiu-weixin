<template>
<div class="coupons-check-list">
	<Form class="common-form" :label-width="90" :model="detail" label-position="left" ref="form">
		<FormItem label="优惠券兑换码">
			<Input v-model="detail.code" placeholder="输入优惠券兑换码" style="width: 60%"></Input>

		</FormItem>
	</Form>
	<mt-loadmore :bottom-method="loadMore" :bottom-all-loaded="allLoaded" :autoFill="false"
	             bottomPullText="加载更多"   ref="loadmore">
	<ul class="coupons-list">
		<li>
			<div class="content">
				<div class="left">
					<p>修车抵用券</p>
					<span>有效期：2019.03.15-2019.03.15</span>
				</div>
				<i></i>
				<div class="right">
					<div class="times">
						<p>已核销数</p>
						<span>1690</span>
					</div>
				</div>
			</div>
		</li>
	</ul>
	</mt-loadmore>
</div>
</template>

<script>
export default {
	name: "coupons-check-list",
	data(){
		return{
			detail: {
				code: ''
			},
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
		loadMore(){
			this.page++
			this.getList(true)
		},
	}
}
</script>

<style scoped lang="less">

.coupons-check-list{
	height: 100vh;
	overflow: auto;
	background-color: white;
	.common-form{
		border-bottom: 0;
		.ivu-form-item:last-child{
			border-bottom:1px solid #EEEEEE;
		}
		.common-form .ivu-form-item .ivu-form-item-label{
			color: #333333;
		}
	}
}
@import "./coupons.less";
</style>
