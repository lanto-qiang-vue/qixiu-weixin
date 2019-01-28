<template>
<div id="com-remind">
	<div class="head">上海汽修平台提醒 <span>{{info.sendDate? info.sendDate.split(' ')[0]: ''}}</span></div>
	<div class="content">{{info.content}}</div>
</div>
</template>

<script>
export default {
	name: "com-remind",
	data(){
		return{
			info: {}
		}
	},
	mounted(){
		this.axios.put('/monitoring/message/company-docking/'+this.$route.query.id).then(res=>{
			this.info= res.data
		})
	}
}
</script>

<style scoped lang="less">
#com-remind{
	padding: 20px;
	.head{
		margin-bottom: 20px;
		span{
			font-size: 12px;
			color: #cccccc;
			margin-left: 10px;
		}
	}
	.content{
		font-size: 14px;
	}
}
</style>
