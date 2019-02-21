<template>
<div class="com-other-info">
	<div class="businessHours" v-show="showBlock=='businessHours'">
		<Form :model="formBusinessHours" class="common-form" :label-width="100" label-position="left" ref="formBusinessHours" :rules="ruleBusinessHours">
			<FormItem label="营业时间" prop="businessHours">
				<span :class="[ !formBusinessHours.stime? 'ivu-input':'' ,'half']" @click="pick('formBusinessHours.stime')">{{formBusinessHours.stime}}</span>
				<span class="line"> - </span>
				<span :class="[ !formBusinessHours.etime? 'ivu-input':'' ,'half']" @click="pick('formBusinessHours.etime')">{{formBusinessHours.etime}}</span>
			</FormItem>
			<FormItem label="营业状态" prop="yyState">
				<span class="ivu-input half select" @click="radioShow('formBusinessHours.yyState')">{{showyyStatus}}</span>
			</FormItem>
		</Form>

		<div class="submit"><a @click="businessHoursSubmit">提交</a></div>
	</div>
	<div class="featureTag" v-show="showBlock=='featureTag'">
		<label class="title">请选择企业特色标签：</label>
		<ul class="style-tags">
			<li v-for="(item, key) in allTagList" :key="key" :class="{on: item.checked}"
			    @click="item.checked=!item.checked">{{item.name}}</li>
		</ul>
		<div class="submit"><a @click="featureTagSubmit">提交</a></div>
	</div>


	<mt-datetime-picker
			ref="picker"
			v-model="timeVal"
			type="time"
			@confirm="timeConfirm">
	</mt-datetime-picker>

	<mt-popup v-model="showRadio"  style="width: 90%" >
		<div class="popupBlock">
			<mt-radio
					@click.native="clickRadio"
					align="right"
					v-model="radioModel"
					:options="$data[$data.radioField.split('.')[1]]">
			</mt-radio>
		</div>
	</mt-popup>
</div>
</template>

<script>
import {formatDate} from '@/util.js'
import { Toast} from 'mint-ui'
export default {
	name: "com-other-info",
	data(){
		let rule= { required: true, message:'必填项不能为空'}
		return{
			showBlock: '',
			formBusinessHours: {
				stime: '',
				etime: '',
				businessHours: '',
				yyState: '',
			},
			ruleBusinessHours:{
				businessHours: [rule],
				yyState: [rule],
			},
			timeVal: '',
			dateField: '',
			showRadio: false,
			radioField: 'formBusinessHours.yyState',
			radioModel:'',
			yyState:[
				{label: '营业中', value: '0'},
				{label: '休息中', value: '1'},
			],
			allTagList:[],
		}
	},
	computed:{
		showyyStatus(){
			return this.getText('formBusinessHours.yyState')
		}
	},
	watch:{
		'$route'(to){
			this.popupShow(to)
		},
		radioModel(val){
			this[this.radioField.split('.')[0]][this.radioField.split('.')[1]]= val
		}
	},
	mounted(){
		this.popupShow(this.$route)

	},
	methods:{
		getBusinessHours(){
			this.axios.get('/corp/manage/query/state').then(res=>{
				let item= res.data.item
				for(let key in item){
					if(item[key] ||item[key]===0){
						switch (key){
							case 'businessHours':{
								this.formBusinessHours[key]= item[key]
								this.formBusinessHours.stime= item[key].split('-')[0]
								this.formBusinessHours.etime= item[key].split('-')[1]
								break
							}
							default :{
								this.formBusinessHours[key]= item[key].toString()
							}
						}
					}

				}
			})
		},
		getFeatureTag(){
			this.axios.get('/corp/manage/tags/list').then(res=>{
				let my= res.data.item.storeSpecials, all= this.allTagList
				for(let i in my){
					// console.log('my[i]', my[i])
					for(let j in all){
						// console.log('all[j].id',all[j].id)
						if(all[j].id==my[i]){
							all[j].checked= true
						}
					}
				}
			})
		},
		popupShow(route){
			if(route.query.comOtherInfo) {
				this.showBlock= route.query.comOtherInfo
				switch (route.query.comOtherInfo){
					case 'businessHours':{
						this.getBusinessHours()
						break
					}
					case 'featureTag':{
						this.axios.get('/corp/manage/tags/list/all').then(res=>{
							let item= res.data.items
							for(let i in item){
								item[i].checked= false
								this.allTagList.push(item[i])
								this.getFeatureTag()
							}
						})

						break
					}
				}
			}else{
				this.showBlock= ''
			}
		},
		pick(str){
			// this.dateShow= true
			this.dateField= str
			let form= str.split('.')[0]
			let field= str.split('.')[1]
			this.timeVal= formatDate(this[form][field] ||new Date(), 'hh:mm')
			this.$refs.picker.open();
		},
		timeConfirm(val){
			console.log('dateConfirm', val)
			let form= this.dateField.split('.')[0]
			let field= this.dateField.split('.')[1]
			this[form][field]= val
			switch (field){
				case 'stime':
				case 'etime':{
					if(this[form].stime && this[form].etime ) {
						this[form].businessHours= this[form].stime +'-'+ this[form].etime
					}
					this.$refs[form].validateField('businessHours')
					break
				}
			}
		},
		clickRadio(){
			this.showRadio= false

		},
		radioShow(str){
			let form= str.split('.')[0]
			let field= str.split('.')[1]
			this.radioField= str
			this.radioModel= this[form][field]
			this.showRadio= true
		},
		getText(str){
			let form= str.split('.')[0]
			let field= str.split('.')[1]
			let text= ''
			for(let i in this[field]){
				if(this[field][i].value== this[form][field]){
					text=this[field][i].label
					break
				}
			}
			return text
		},
		businessHoursSubmit(){
			this.axios.post('/corp/manage/update/state', this.formBusinessHours).then((res) => {
				if (res.data.code == '0') {
					this.getBusinessHours()
					Toast('提交成功')
				}
			})
		},
		featureTagSubmit(){
			let arr=[] ,all= this.allTagList
			for(let i in all){
				if(all[i].checked) arr.push(all[i].id)
			}
			this.axios.post('/corp/manage/tags/update', {storeSpecials: arr}).then((res) => {
				if (res.data.code == '0') {
					this.getFeatureTag()
					Toast('提交成功')
				}
			})
		}
	}
}
</script>

<style scoped lang="less">
.com-other-info{

		height: 100vh;
		width: 100%;
		overflow: auto;
		background-color: #F8F8F8;

	.submit{
		z-index: 25;
		position: fixed;
		left: 0;
		bottom: 0;
		width: 100%;
		padding: 10px 20px;
		overflow: hidden;
		background-color: white;
		border-top:1px solid #EEEEEE;
		a{
			background:linear-gradient(90deg,rgba(67,142,255,1) 0%,rgba(80,204,255,1) 100%);
			border-radius:5px;
			text-align: center;
			font-size: 15px;
			display: block;
			color: white;
			width: 100%;
			height: 40px;
			line-height: 40px;
		}
	}

}
</style>
<style lang="less">
.com-other-info{
	.featureTag{
		overflow: hidden;
		label.title{
			display: block;
			font-size: 15px;
			color: #333333;
			margin: 0;
			padding-left: 20px;
			height: 40px;
			line-height: 40px;
			border-bottom:1px solid #E5E5E5;
		}
		.mint-checklist{
			.mint-checklist-title{

			}
		}
	}
}
</style>
