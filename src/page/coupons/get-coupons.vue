<template>
<div class="get-coupons">
	<div class="head">
		<img src="/static/img/coupons/head.png"/>
		<p>活动时间：2019.03.15-2019.04.14</p>
		<div class="rule" @click="showRule">使用规则</div>
	</div>
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
					<div class="button on">立即领取</div>
					<!--<div class="tag">-->
						<!--<p>已领取</p>-->
					<!--</div>-->
					<!--<div class="times">-->
						<!--<p>已核销数</p>-->
						<!--<span>1690</span>-->
					<!--</div>-->
				</div>
			</div>
		</li>
	</ul>
	</mt-loadmore>
</div>
</template>

<script>
import {MessageBox,Toast,} from 'mint-ui'
export default {
	name: "get-coupons",
	data(){
		return{
			list:[],
			page: 1,
			total: 0,
			allLoaded: false,
		}
	},
	watch:{

	},
	mounted(){
		this.getList(false)
	},
	methods:{
		showRule(){
			MessageBox.alert('<p class="coupons-rules">1､ 优惠券有使用期限限制，过了有效期不能使用；</p><p class="coupons-rules">2､ 订单中包含特价商品时不能使用优惠券，优惠券不能与其他优惠（如促销活动）同时使用；</p><p class="coupons-rules"> 3､ 优惠券只能抵扣订单金额，优惠金额超出订单金额部分不能再次使用，不能兑换现金；</p><p class="coupons-rules"> 4､ 每个订单只能使用一张优惠券；</p>', '使用规则');
		},
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
.get-coupons{
	height: 100vh;
	overflow: auto;
	background-color: white;
	.head{
		position: relative;
		img{
			width: 100%;
		}
		p{
			font-size: 14px;
			color: #FBD008;
			position: absolute;
			bottom: 10%;
			right: 10%;
		}
		div{
			font-size: 12px;
			position: absolute;
			border-radius: 12px 0 0 12px;
			background-color: black;
			color: white;
			opacity: .6;
			height: 26px;
			line-height: 26px;
			padding: 0 15px 0 10px;
			top: 10px;
			right: 0;
			&:after{
				content: '';
				position: absolute;
				right: 5px;
				top: 9px;
				border-right: 1px solid;
				border-bottom: 1px solid;
				width: 8px;
				height: 8px;
				color: white;
				-webkit-transform: rotate(-45deg);
				transform: rotate(-45deg);
			}
		}

	}
}

@import "./coupons.less";
</style>
<style lang="less">
.coupons-rules{
	text-align: left;
	color: #999999;
	font-size: 12px;
	line-height: 20px;
}
</style>
