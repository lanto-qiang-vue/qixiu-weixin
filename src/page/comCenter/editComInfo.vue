<template>
<div class="edit-com-info">
	<div class="status">审核通过</div>
	<Form :model="form" class="common-form"
	      :label-width="100" label-position="left" ref="form" :rules="ruleValidate">
		<FormItem label="企业名称" prop="name">
			<Input v-model="form.name"></Input>
		</FormItem>
		<FormItem label="许可证号" prop="name">
			<Input v-model="form.name"></Input>
		</FormItem>
		<FormItem label="许可证有效期" prop="name">
			<Input v-model="form.name"></Input>
		</FormItem>
		<FormItem label="工商注册日期" prop="name">
			<Input v-model="form.name"></Input>
		</FormItem>
		<FormItem label="工商注册区域" prop="name">
			<Input v-model="form.name"></Input>
		</FormItem>
		<FormItem label="工商注册地址" prop="name">
			<Input v-model="form.name"></Input>
		</FormItem>
		<FormItem label="法人代表" prop="name">
			<Input v-model="form.name"></Input>
		</FormItem>
		<FormItem label="经营范围 " prop="name">
			<Input v-model="form.name"></Input>
		</FormItem>
		<FormItem label="营业执照（文件大小不超过3M）" :label-width="300" prop="name" class="top-position">
			<Input v-model="form.name"></Input>
		</FormItem>
		<FormItem label="道路运输经营许可证（文件大小不超过3M）" :label-width="200" prop="name">
			<Input v-model="form.name"></Input>
		</FormItem>
		<FormItem label="门店门头照（文件大小不超过3M）" :label-width="200" prop="name">
			<Input v-model="form.name"></Input>
		</FormItem>
		<FormItem label="tel" prop="tel">
			<Input v-model="form.tel"></Input>
		</FormItem>
	</Form>
</div>
</template>

<script>
export default {
	name: "edit-com-info",
	data(){
		let rule= { required: true, message:'必填项不能为空'}
		let validate = (rule, value, callback) => {
			let p = /^1[3456789]\d{9}$/;
			if (p.test(value)||!value) {
				callback();
			}else{
				callback(new Error('请输入正确的号码'));
			}
		};
		return{
			form:{
				name: '',
				tel: ''
			},
			ruleValidate : {
				name: [rule],
				tel: [ rule,
					{ len:11, validator: validate, message: '请输入正确的号码'}
				],
			},
		}
	},
	mounted(){
		// this.axios.get('/corp/manage/corpDetail/crux').then(res=>{})
	}
}
</script>

<style scoped lang="less">
.edit-com-info{
	.status{
		height: 40px;
		line-height: 40px;
		padding-left: 15px;
		color: #6CBC16;
		font-size: 14px;
		border-bottom: 1px solid #E5E5E5;
	}
}
</style>
