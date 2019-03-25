<template>
<div class="school-apply-detail">
	<Form :model="form" class="common-form"
	      :label-width="100" label-position="left" ref="form">
		<FormItem label="报名人">
			<Input v-model="form.name" readonly></Input>
		</FormItem>
		<FormItem label="报名时间">
			<Input v-model="form.createDate" readonly></Input>
		</FormItem>
		<FormItem label="报名驾照类型">
			<Input v-model="form.category" readonly></Input>
		</FormItem>
		<FormItem label="联系电话">
			<Input v-model="form.phoneNo" readonly></Input>
		</FormItem>
		<FormItem label="是否已联系" class="table">
			<mt-switch v-model="form.contact" @change="change">{{form.contact?'是': '否'}}</mt-switch>
		</FormItem>
	</Form>

	<div class="common-submit"><a :href="'tel:'+ form.phoneNo">一键拨打</a></div>
</div>
</template>

<script>
export default {
	name: "school-apply-detail",
	data(){
		return{
			form:{}
		}
	},
	mounted(){
		this.axios.get('/training/driving/register/'+ this.$route.query.id).then((res) => {
			this.form= res.data
		})
	},
	methods:{
		change(val){
			console.log(val)
			this.form.contact= !this.form.contact
			this.axios.post('/training/center/driving/contact_status', this.form).then( (res) => {
				this.form= res.data
			})
		}
	}
}
</script>

<style scoped lang="less">

</style>
