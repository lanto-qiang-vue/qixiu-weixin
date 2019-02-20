<template>
<div id="com-remind">
	<div class="head">上海汽修平台提醒 <span>{{info.sendDate? info.sendDate.split(' ')[0]: ''}}</span></div>
	<div class="content">{{info.content}}</div>
	<div class="content">根据《机动车维修管理规定》(交通运输部令2016年第37号) 第三十四条要求，机动车维修经营者应当按照规定如实填报、及时上传承修机动车的维修电子数据记录至国家有关汽车电子健康档案系统。
	</div>
	<div class="content">未按规定上传维修记录的维修企业，将被列入维修企业黑名单并对外公示。</div>
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
		margin-bottom: 10px;
	}
}
</style>
