<template>
<div class="work-card" v-show="info.work_number || info.nickname || info.work_number">
	<h1>上海汽修平台</h1>
	<img src="/static/img/hxx-logo.png"/>
	<div class="content">
		<img :src="info.pic"/>
		<p><label>姓名：</label><span>{{info.nickname}}</span></p>
		<p><label>工号：</label><span>{{info.work_number}}</span></p>
	</div>
	<div class="foot">
		<img src="/static/img/qixiu-logo.png"/>
		<div class="text">
			<h2>上海市机动车维修公共服务平台</h2>
			<p>Shanghai Automobile Maintenance Public Service Platform</p>
		</div>
	</div>
</div>
</template>

<script>
export default {
	name: "work-card",
	data(){
		return{
			info:{}
		}
	},
	mounted(){
		this.axios.get('/promotion/hxx_ground/person/card',{params:{
				accountNo: this.$route.query.accountNo,
		}}).then(res=>{
				this.info=res.data
		})
	}
}
</script>

<style scoped lang="less">
.work-card{
	width: 100vw;
	height: 100vh;
	overflow: hidden;
	position: relative;
	text-align: center;
	h1{
		color: #2D4996;
		font-size: 22px;
		margin-top: 20px;
	}
	>img{
		width: 80px;
		margin: 10px;
	}
	.content{
		border-top: 1px solid #E5E5E5;
		padding-bottom: 20px;
		img{
			width: 150px;
			margin: 40px;
		}
		p{
			width: 70%;
			margin: 0 auto 20px;
			line-height: 35px;
			font-size: 20px;
			position: relative;
			text-align: left;
			font-weight: 900;
			label{
				color: #333333;
				display: block;
				position: absolute;
				left: 0;
				top: 0;
			}
			span{
				line-height: 30px;
				display: block;
				margin-left: 55px;
				padding-left: 20px;
				color: #FE8636;
				border-bottom: 1px solid #919191;
			}
		}
	}
	.foot{
		position: absolute;
		left: 50%;
		bottom: 30px;
		width: 100%;
		padding: 0 10px;
		transform: translateX(-50%);
		white-space: nowrap;
		overflow: visible;
		transform-origin: left;
		img{
			width: 34px;
			vertical-align: middle;
		}
		.text{
			display: inline-block;
			vertical-align: middle;
			text-align: left;
			padding-left: 10px;
			width: 230px;
			h2{
				font-weight: 900;
				font-size: 15px;
				margin: 0 0 5px;
			}
			p{
				font-size: 12px;
				line-height: 10px;
				transform: scale(.7);
				transform-origin: left;
			}
		}
	}
}
</style>
