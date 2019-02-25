<template>
<div class="edit-com-info">
	<div :class="['status', 'statu'+status]" v-show="statusText">{{statusText}}</div>
	<div class="err-info" v-show="status==3">不通过原因：{{form.cruxAuditInfo}}</div>
	<Form :model="form" class="common-form"
	      :label-width="100" label-position="left" ref="form" :rules="ruleValidate" :style="status!='1'?'margin-bottom:60px;':''">
		<FormItem label="企业名称" :class="[{'mark-change': markChange('name')}, '']" prop="name">
			<Input v-model="form.name"></Input>
		</FormItem>
		<FormItem label="许可证号" :class="[{'mark-change': markChange('license')}, '']" prop="license">
			<Input v-model="form.license"></Input>
		</FormItem>
		<FormItem label="许可证有效期" :class="[{'mark-change': markChange('licenceBeginDate,licenceEndDate')}, '']" prop="dataRang">
			<span :class="[ !form.licenceBeginDate? 'ivu-input':'' ,'half']" @click="pick('licenceBeginDate')">{{form.licenceBeginDate}}</span>
			<span class="line"> - </span>
			<span :class="[ !form.licenceEndDate? 'ivu-input':'' ,'half']" @click="pick('licenceEndDate')">{{form.licenceEndDate}}</span>
		</FormItem>
		<FormItem label="工商注册日期" :class="[{'mark-change': markChange('registerDate')}, '']" prop="registerDate">
			<span class="ivu-input half" @click="pick('registerDate')">{{form.registerDate}}</span>
		</FormItem>
		<FormItem label="工商注册区域" :class="[{'mark-change': markChange('registerRegion')}, '']" prop="registerRegion">
			<span class="ivu-input half select" @click="radioShow('registerRegion')">{{showArea}}</span>
		</FormItem>
		<FormItem label="工商注册地址" :class="[{'mark-change': markChange('registerAddress')}, '']" prop="registerAddress">
			<Input v-model="form.registerAddress"></Input>
		</FormItem>

		<FormItem label="经营地地址:" :class="[{'mark-change': markChange('businessAddress')}, '']" prop="businessAddress">
			<Input type="text" v-model="form.businessAddress" placeholder="请输入经营地地址" @on-change="changeBusinessAddress"></Input>
		</FormItem>
		<FormItem label="经营地址区域:" :class="[{'mark-change': markChange('businessRegion')}, '']" prop="businessRegion">
			<span class="ivu-input half select" @click="radioShow('businessRegion')">{{showBusinessArea}}</span>
		</FormItem>

		<FormItem label="法人代表" :class="[{'mark-change': markChange('legalName')}, '']" prop="legalName">
			<Input v-model="form.legalName"></Input>
		</FormItem>
		<FormItem label="经营范围" :class="[{'mark-change': markChange('businessScope')}, '']" prop="businessScope">
			<span class="ivu-input half select" @click="radioShow('businessScope')">{{showBusinessScope}}</span>
		</FormItem>
		<FormItem label="经营范围子类" v-show="form.businessScope" :class="[{'mark-change': markChange('businessScope2')}, 'top-position']" prop="businessScope2">
			<mt-checklist
					class="checklist"
					align="right"
					v-model="form.businessScope2"
					:options="businessScope2">
			</mt-checklist>
		</FormItem>
		<FormItem label="营业执照（文件大小不超过3M）" :class="[{'mark-change': markChange('yyzz')}, 'top-position']" prop="yyzz">
			<a class="up" v-show="!readOnly">上传<up-img-block @done="getImg($event, 'yyzz')"></up-img-block></a>
			<div class="content" v-if="form.yyzz">
				<img :src="form.yyzz" v-img/>
			</div>
		</FormItem>
		<FormItem label="道路运输经营许可证（文件大小不超过3M）" :class="[{'mark-change': markChange('dlysxkz')}, 'top-position']" prop="dlysxkz">
			<a class="up" v-show="!readOnly">上传<up-img-block @done="getImg($event, 'dlysxkz')"></up-img-block></a>
			<div class="content" v-if="form.dlysxkz">
				<img :src="form.dlysxkz" v-img/>
			</div>
		</FormItem>
		<FormItem label="门店门头照（文件大小不超过3M）" :class="[{'mark-change': markChange('mdmtz')}, 'top-position']" prop="mdmtz">
			<a class="up" v-show="!readOnly">上传<up-img-block @done="getImg($event, 'mdmtz')"></up-img-block></a>
			<div class="content" v-if="form.mdmtz">
				<img :src="form.mdmtz" v-img/>
			</div>
			<div class="content" v-else>
				<img src="/static/img/shqxwbig.png" />
				<p>示例图</p>
			</div>
		</FormItem>
	</Form>

	<div class="submit" v-if="status!=1"><a @click="submit">提交审核</a></div>

	<mt-datetime-picker
			ref="picker"
			v-model="dataVal"
			type="date"
			year-format="{value} 年"
			month-format="{value} 月"
			date-format="{value} 日"
			@confirm="dateConfirm">
	</mt-datetime-picker>

	<mt-popup v-model="showRadio"  style="width: 90%" >
		<div class="popupBlock">
			<mt-radio
					@click.native="clickRadio"
					align="right"
					v-model="form[radioType]"
					:options="radioOptions">
			</mt-radio>
		</div>
	</mt-popup>

	<!--<mt-popup v-model="showChecklist"  style="width: 90%" >-->
		<!--<div class="popupBlock">-->
			<!--<mt-checklist-->
					<!--align="right"-->
					<!--v-model="value"-->
					<!--:options="options">-->
			<!--</mt-checklist>-->
		<!--</div>-->
	<!--</mt-popup>-->
</div>
</template>

<script>
import { DatetimePicker, Toast, MessageBox} from 'mint-ui'
import {formatDate} from '@/util.js'
import UpImgBlock from '@/page/components/up-img-block.vue'
export default {
	name: "edit-com-info",
	components: {UpImgBlock},
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
		let validRang=  (rule, value, callback) => {
			console.log('validRang!')
			if (!this.form.licenceBeginDate) {
				callback(new Error('必填项不能为空'));
			} else if(!this.form.licenceEndDate){
				callback(new Error('必填项不能为空'));
			}else{
				callback();
			}
		}
		return{
			form:{
				name: '',
				license: '',
				dataRang: '',
				licenceBeginDate: '',
				licenceEndDate: '',
				registerDate: '',
				registerRegion: '',
				registerAddress: '',
				legalName: '',
				businessScope: '',
				businessScope2: [],
				yyzz: '',
				dlysxkz: '',
				mdmtz: '',
				status: '',
				businessAddress: "",
				businessRegion: "",
				longitude: '',
				latitude: '',
				fields:[],
				cruxAuditInfo: ''
			},
			ruleValidate : {
				name: [rule],
				license: [rule],
				dataRang:[rule,{
					validator: validRang
				}],
				licenceBeginDate: [rule],
				licenceEndDate: [rule],
				registerDate: [rule],
				registerRegion: [rule],
				registerAddress: [rule],
				legalName: [rule],
				businessScope: [rule],
				businessScope2: [rule],
				yyzz: [rule],
				dlysxkz: [rule],
				mdmtz: [rule],
				businessRegion: [rule],
				businessAddress: [rule,{
					validator: (rule, value, callback) => {
						let wrongAddress= this.$data.wrongAddress, flag=false
						for(let i in wrongAddress){
							if (value == wrongAddress[i]) flag= true
						}
						if (flag) {
							callback(new Error('您输入的地址查不到对应坐标，请输入更详细地址'));
						} else {
							callback();
						}
					}
				}],
			},
			dateField: '',
			dataVal: '',
			businessScope: [],
			registerRegion: [],
			businessRegion: [],
			businessScope2: [],
			showRadio: false,
			radioType: '',

			timer: null,
			geocoder:null,//地标
			wrongAddress: [],
		}
	},
	computed:{
		showArea(){
			return this.getText('registerRegion')
		},
		showBusinessArea(){
			return this.getText('businessRegion')
		},
		showBusinessScope(){
			return this.getText('businessScope')
		},
		radioOptions(){
			return this.radioType? this[this.radioType]: []
		},
		status(){
			return this.form.status.toString()
		},
		statusText(){
			let text= ''
			switch (this.status){
				case '1':{
					text= '待审核';break
				}
				case '2':{
					text= '审核成功';break
				}
				case '3':{
					text= '审核不通过';break
				}
				default :{
					text= '全部';break
				}
			}
			return text
		},
		readOnly(){
			return this.form.status&& this.form.status.toString()== '1'
		},
		allFields(){
			let str1=this.form.fields?this.form.fields.join(','):''

			return str1
		},
	},
	watch:{
		showArea(){
			this.$refs.form.validateField('registerRegion')
		},
		showBusinessScope(){
			console.log('watch.showBusinessScope')
			this.$refs.form.validateField('businessScope')
			this.getRepairType(this.form.businessScope)
		}
	},
	mounted(){
		this.getPubliceType(1)
		this.axios.post('/area/region/list', {areaName: 'shanghai'}).then((res) => {
			if (res.data.code == '0') {
				let arr= res.data.items
				for(let i in arr){
					this.registerRegion.push({
						label: arr[i].shortName,
						value: arr[i].regionCode,
					})
					this.businessRegion= this.registerRegion
				}
			}
		})
		this.getInfo()

		AMap.plugin('AMap.Geocoder', () => {
			this.geocoder = new AMap.Geocoder({
				city: "021",
			});
		})
	},
	methods:{
		getInfo(){
			this.axios.get('/corp/manage/corpDetail/crux').then(res=>{
				let item= res.data.item
				for(let key in item){
					switch (key){
						case 'businessScope':{
							this.form[key]= item[key].toString()
							break
						}
						case 'businessScope2':{
							if(item[key].length){
								this.form[key]= item[key].join(',').split(',')
							}else{
								this.form[key]=[]
							}
							break
						}
						default :{
							this.form[key]= item[key]
						}
					}
				}
				if(!this.form.longitude || !this.form.latitude){
					this.geoCode(this.form.businessAddress)
				}
				if(this.form.licenceBeginDate && this.form.licenceEndDate){
					this.form.dataRang= Math.random()
				}
			})
		},
		pick(field){
			// this.dateShow= true
			this.dateField= field
			this.dataVal= new Date(this.form[field]||  new Date())
			this.$refs.picker.open();
		},
		dateConfirm(val){
			console.log('dateConfirm', val)
			this.form[this.dateField]= formatDate(val).replace(/\//g,'-')
			switch (this.dateField){
				case 'licenceBeginDate':
				case 'licenceEndDate':{
					this.form.dataRang= Math.random()
					this.$refs.form.validateField('dataRang')
					break
				}
			}
		},
		getPubliceType(id) {
			this.axios.get('/dict/getValuesByTypeId/' + id).then((res) => {
				if (res.data.code == '0') {
					switch (id){
						case 1:{
							let arr= res.data.items
							for(let i in arr){
								this.businessScope.push({
									label: arr[i].name,
									value: arr[i].id.toString(),
								})
							}
							break
						}
					}
				}
			})
		},
		getRepairType(id) {
			if (!id) {
				return
			}
			this.axios.get('/dict/value/' + id).then((res) => {
				if (res.data.code == '0') {
					let arr= res.data.items
					this.businessScope2= []
					for(let i in arr){
						this.businessScope2.push({
							label: arr[i].name,
							value: arr[i].id.toString(),
						})
					}
				}
			})
		},
		clickRadio(){
			this.showRadio= false
			if(this.radioType=='businessScope'){
				this.form.businessScope2=[]
			}
		},
		getText(name){
			let text= ''
			for(let i in this[name]){
				if(this[name][i].value== this.form[name]){
					text=this[name][i].label
					break
				}
			}
			return text
		},
		radioShow(type){
			this.radioType= type
			this.showRadio= true
		},
		getImg(res, name){
			this.form[name]= res.item.path
			this.$refs.form.validateField(name)
		},
		changeBusinessAddress(event){
			// console.log(event)
			clearTimeout(this.timer)
			this.timer= setTimeout(()=>{
				this.geoCode(event.target.value);
			},500)
		},
		geoCode(value){
			this.geocoder.getLocation(value, (status, result)=> {
				if (status === 'complete'&&result.geocodes.length) {
					let lnglat = result.geocodes[0].location;
					this.form.longitude=lnglat.lng;
					this.form.latitude=lnglat.lat;
				}else{
					this.form.longitude= '';
					this.form.latitude= '';
					this.wrongAddress.push(value)
					this.$refs.form.validateField('businessAddress')
				}
			});
		},
		markChange(fields){
			let arr= fields.split(','),flag=false
			for(let i in arr){
				if(this.allFields.indexOf(arr[i])>=0){
					flag= true
					break
				}
			}
			return flag
		},
		submit(){

			this.$refs.form.validate((valid) => {
				if (valid) {
					MessageBox.confirm('修改的信息需要审核通过才会展示', '确定提交吗？').then(action => {
						this.axios.post('/corp/manage/update/crux', this.form).then((res) => {
							if (res.data.code == '0') {
								this.getInfo()
								Toast('提交成功')
							}
						})
					});
				} else {
					Toast('必填项不能为空')
				}
			})
		}
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
	.statu1{
		color: #FF9900;
	}
	.statu3{
		color: #ed4014;
	}
	.err-info{
		min-height: 40px;
		line-height: 20px;
		padding: 10px 15px;
		color: #ed4014;
		font-size: 14px;
		border-bottom: 1px solid #E5E5E5
	}
	.up{
		margin: 0;
		line-height: 40px;
		position: absolute;
		top: -41px;
		right: 10px;
		display: block;
		width: auto;
		padding-right: 16px;
		color: #666666;
		&:after{
			content: '';
			position: absolute;
			right: 4px;
			top: 15px;
			border-right: 1px solid #666666;
			border-bottom: 1px solid #666666;
			width: 10px;
			height: 10px;
			-webkit-transform: rotate(-45deg);
			transform: rotate(-45deg);
		}
		>div{
			position: absolute;
			top: 0;
			left: 0;
			width: 100%;
			height: 100%;
			opacity: 0;
			z-index: 1;
		}
	}
	.content{
		background-color: #FCFCFD;
		border-top: 1px dashed #EEEEEE;
		display: block;
		margin-top: 0;
		padding: 10px 20px;
		overflow: hidden;
		img{
			width: 100%;
		}
		p{
			text-align: center;
		}
	}
	.submit{
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
.edit-com-info{
	.top-position .ivu-form-item-label{
		padding-right: 55px;
		white-space: nowrap;
		overflow: hidden;
		text-overflow: ellipsis;
	}

	.checklist{
		margin-top: 0;
		.mint-checklist-title{
			margin: 0;
		}
		.mint-cell{
			background-color: #FCFCFD;
			border-top: 1px dashed #EEEEEE;
		}
	}
	.mark-change .ivu-form-item-label{
		color: orange;
	}
}
</style>
