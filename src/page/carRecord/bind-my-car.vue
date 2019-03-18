<template>
  <div id="personUpload">
	  <div :class="['status', 'statu'+status]" v-show="statusText">{{statusText}}</div>
	  <div class="err-info" v-show="status==3">不通过原因：{{status}}</div>
	  <div class="upBlock drive">
		  <div class="title"><i></i>请上传行驶证正面<i></i></div>

		  <div class="imgBlock">
			  <div :class="['img',{nobg: drivePic}]">
				  <img v-img v-show="drivePic" :src="drivePic">
			  </div>
			  <p @click="$refs.upTravelLicense.clickBox()">拍摄正面</p>
		  </div>
		  <upload operate='base64' @done="upTravelLicense" ref="upTravelLicense"></upload>
	  </div>

	<div class="upBlock id">
		<div class="title"><i></i>请上传您的身份证照片<i></i></div>
		<p>若您上传了非本人的身份证, 您将无法绑定您名下的车辆</p>

		<div class="imgBlock">
			<div :class="['img',{nobg: idPic}]">
				<img v-img v-show="idPic" :src="idPic">
			</div>
			<p @click="$refs.upIdCard.clickBox()">拍摄正面</p>
		</div>
		<upload operate='base64' @done="upIdCard" ref="upIdCard"></upload>
	</div>

	  <div class="upBlock business">
		  <div class="title"><i></i>请上传营业执照正面<i></i></div>

		  <div class="imgBlock">
			  <div :class="['img',{nobg: businessPic}]">
				  <img v-img v-show="businessPic" :src="businessPic">
			  </div>
			  <p @click="$refs.upBusiness.clickBox()">拍摄正面</p>
		  </div>
		  <upload operate='base64' @done="upBusiness" ref="upBusiness"></upload>
	  </div>

	  <!--<div class="info" v-show="showDriveLicenseInfo">-->
	  <div class="info" v-show="true">
		  <div class="head">
			  <p>行驶证识别信息</p>
			  <span @click="showPopover('travelLicense')">修改</span>
		  </div>
		  <ul>
			  <li>
				  <label>所有人</label>
				  <span>{{travelLicense.ownerName}}</span>
				  <p v-show="showChangeCar('ownerName')">{{showChangeCar('ownerName')}}</p>
			  </li>
			  <li>
				  <label>车牌号</label>
				  <span>{{travelLicense.vehiclePlateNumber}}</span>
				  <p v-show="showChangeCar('vehiclePlateNumber')">{{showChangeCar('vehiclePlateNumber')}}</p>
			  </li>
			  <li>
				  <label>车架号(VIN)</label>
				  <span>{{travelLicense.vin}}</span>
				  <p v-show="showChangeCar('vin')">{{showChangeCar('vin')}}</p>
			  </li>
			  <li>
				  <label>发证日期</label>
				  <span>{{travelLicense.issueDate}}</span>
				  <p v-show="showChangeCar('issueDate')">{{showChangeCar('issueDate')}}</p>
			  </li>
			  <li>
				  <label>发动机号</label>
				  <span>{{travelLicense.engineNo}}</span>
				  <p v-show="showChangeCar('engineNo')">{{showChangeCar('engineNo')}}</p>
			  </li>
			  <li>
				  <label>地址</label>
				  <span>{{travelLicense.address}}</span>
				  <p v-show="showChangeCar('address')">{{showChangeCar('address')}}</p>
			  </li>
			  <li>
				  <label>车辆品牌</label>
				  <span>{{travelLicense.brandModel}}</span>
				  <p v-show="showChangeCar('brandModel')">{{showChangeCar('brandModel')}}</p>
			  </li>
			  <li>
				  <label>注册日期</label>
				  <span>{{travelLicense.registerDate}}</span>
				  <p v-show="showChangeCar('registerDate')">{{showChangeCar('registerDate')}}</p>
			  </li>
			  <li>
				  <label>使用性质</label>
				  <span>{{travelLicense.useNature}}</span>
				  <p v-show="showChangeCar('useNature')">{{showChangeCar('useNature')}}</p>
			  </li>
			  <li>
				  <label>车辆类型</label>
				  <span>{{travelLicense.vehicleType}}</span>
				  <p v-show="showChangeCar('vehicleType')">{{showChangeCar('vehicleType')}}</p>
			  </li>
		  </ul>
	  </div>

	  <!--<div class="info" v-show="showIDCardUpInfo">-->
	  <div class="info" v-show="true">
		  <div class="head">
			  <p>身份证正面识别信息</p>
			  <span @click="showPopover('idCard')">修改</span>
		  </div>
		  <ul>
			  <li>
				  <label>姓名</label>
				  <span>{{idCard.ownerName}}</span>
				  <p v-show="showChangeId('ownerName')">{{showChangeId('ownerName')}}</p>
			  </li>
			  <li>
				  <label>身份证号</label>
				  <span>{{idCard.idCardNo}}</span>
				  <p v-show="showChangeId('idCardNo')">{{showChangeId('idCardNo')}}</p>
			  </li>
		  </ul>
	  </div>

	  <div class="info" v-show="true">
		  <div class="head">
			  <p>营业执照识别信息</p>
			  <span @click="showPopover('business')">修改</span>
		  </div>
		  <ul>
			  <li>
				  <label>企业名称</label>
				  <span>{{business.corpName}}</span>
				  <p v-show="showChangeBus('corpName')">{{showChangeBus('corpName')}}</p>
			  </li>
			  <li>
				  <label>法定代表人</label>
				  <span>{{business.legalPerson}}</span>
				  <p v-show="showChangeBus('legalPerson')">{{showChangeBus('legalPerson')}}</p>
			  </li>
		  </ul>
	  </div>

	  <div class="upBlock">
		  <div class="title"><i></i>拍摄证件要求<i></i></div>
		  <div class="rule">
			  <p>拍摄时确保证件<span style="color: #fc0;">边框完整，字体清晰，亮度均匀</span></p>
			  <li>
				  <img src="/static/img/carOwner-centre/身份证_标准@3x.png">
				  <p>标准</p>
			  </li>
			  <li>
				  <img src="/static/img/carOwner-centre/身份证_边框缺失@3x.png">
				  <p>边框缺失</p>
			  </li>
			  <li>
				  <img src="/static/img/carOwner-centre/身份证_照片模糊@3x.png">
				  <p>照片模糊</p>
			  </li>
			  <li>
				  <img src="/static/img/carOwner-centre/身份证_闪光强烈@3x.png">
				  <p>闪光强烈</p>
			  </li>
		  </div>
	  </div>

	<div class="submit" @click="Bind">确定</div>

    <mt-popup v-model="popupShow" position="right" class="popup">
	    <Form :class="['common-form']" v-show="popType=='travelLicense'" :model="travelLicenseRevise"
	          :label-width="100" label-position="left" ref="travelLicenseRevise">
		    <FormItem label="所有人" prop="ownerName">
			    <Input v-model.trim="travelLicenseRevise.ownerName" placeholder="更改所有人"></Input>
		    </FormItem>
		    <FormItem label="车牌号" prop="vehiclePlateNumber">
			    <Input v-model.trim="travelLicenseRevise.vehiclePlateNumber" placeholder="更改车牌号"></Input>
		    </FormItem>
		    <FormItem label="车架号(VIN)" prop="vin">
			    <Input v-model.trim="travelLicenseRevise.vin" placeholder="更改车架号(VIN)"></Input>
		    </FormItem>
		    <FormItem label="发证日期" prop="issueDate">
			    <Input v-model.trim="travelLicenseRevise.issueDate"></Input>
		    </FormItem>
		    <FormItem label="发动机号" prop="engineNo">
			    <Input v-model.trim="travelLicenseRevise.engineNo"></Input>
		    </FormItem>
		    <FormItem label="地址" prop="address">
			    <Input v-model.trim="travelLicenseRevise.address"></Input>
		    </FormItem>
		    <FormItem label="车辆品牌" prop="brandModel">
			    <Input v-model.trim="travelLicenseRevise.brandModel"></Input>
		    </FormItem>
		    <FormItem label="注册日期" prop="registerDate">
			    <Input v-model.trim="travelLicenseRevise.registerDate"></Input>
		    </FormItem>
		    <FormItem label="使用性质" prop="useNature">
			    <Input v-model.trim="travelLicenseRevise.useNature"></Input>
		    </FormItem>
		    <FormItem label="车辆类型" prop="vehicleType">
			    <Input v-model.trim="travelLicenseRevise.vehicleType"></Input>
		    </FormItem>
	    </Form>

	    <Form :class="['common-form']" v-show="popType=='idCard'" :model="idCardRevise"
	          :label-width="100" label-position="left" ref="idCardRevise">
		    <FormItem label="姓名" prop="ownerName">
			    <Input v-model.trim="idCardRevise.ownerName" placeholder="更改姓名"></Input>
		    </FormItem>
		    <FormItem label="身份证号码" prop="idCardNo">
			    <Input v-model.trim="idCardRevise.idCardNo" placeholder="更改身份证号码"></Input>
		    </FormItem>
	    </Form>

	    <Form :class="['common-form']" v-show="popType=='business'" :model="businessRevise"
	          :label-width="100" label-position="left" ref="businessRevise">
		    <FormItem label="企业名称" prop="corpName">
			    <Input v-model.trim="businessRevise.corpName" placeholder="更改企业名称"></Input>
		    </FormItem>
		    <FormItem label="企业法人" prop="legalPerson">
			    <Input v-model.trim="businessRevise.legalPerson" placeholder="更改企业法人"></Input>
		    </FormItem>
	    </Form>

          <div class="button-block">
            <mt-button @click="popupShow= false" type="danger" size="large"
                       class="button">取消</mt-button>
            <mt-button @click="modify" type="primary" size="large"
                       class="button">确定</mt-button>
          </div>
    </mt-popup>
  </div>
</template>

<script>
import { Field, Button, Toast, MessageBox, Popup } from 'mint-ui'
import Upload from '@/page/components/compress-upload.vue'
import {deepClone} from '@/util.js'
let travelLicense= {
	ownerName: '',
	vehiclePlateNumber: '',
	vin: '',
	engineNo: '',
	address: '',
	brandModel: '',
	issueDate: '',
	registerDate: '',
	useNature: '',
	vehicleType: '',
}
let idCard={
	ownerName: '',
	idCardNo: '',
}
let business={
	corpName: '',
	legalPerson: ''
}
export default{
    name: "personUpload",
    components: {Upload},
    data(){
	    return {
	        popType: 'travelLicense',
		    popupShow: false,
		    travelLicense: {},
		    travelLicenseRevise: deepClone(travelLicense),
		    idCard: {},
		    idCardRevise: deepClone(idCard),
		    business: {},
		    businessRevise: deepClone(business),
		    status: '2',
		    drivePic:'',
		    idPic:'',
		    businessPic:'',
		}
    },
	computed:{
    	isPerson(){
    		return this.$route.path=='/bind-my-car'
	    },
		// status(){
		// 	return this.status.toString()
		// },
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
					text= '新建';break
				}
			}
			return text
		},
	},
	mounted(){

	// getwxticket(['chooseImage', 'previewImage', 'getLocalImgData'])
	// this.axios({
	//   url: '/scan/getCard',
	//   method: 'get'
	// }).then(res=>{
	//   if(res.data.code==='0'){
	//     if(res.data.item.frontImage){
	//       this.idPic= 'data:image/png;base64,'+res.data.item.frontImage
	//       this.flag1 = true
	//       this.showUploadBtn = false
	//       this.modify = false
	//       this.name = res.data.item.reviseOwnerName
	//       this.IDCardNum = res.data.item.reviseIdCardNo
	//       this.IDCardID = res.data.item.creditId
	//       this.showIDCardUpInfo = true
	//       $('#front_idcard').css({'height': 'auto'})
	//     }
	//   }
	// })
	},
	methods: {
		upTravelLicense(base64){
			this.identifyDriveLicense(base64)
		},

		upIdCard(base64){
			// this.idPic= base64
			this.identifyCard(base64, 1)
		},

		upBusiness(base64){
			// this.businessPic= base64
			this.identifyCard(base64, 3)
		},

		identifyCard(base64, type){
			this.axios({
			url: '/scan/newUpload',
			method: 'post',
			data: {
				"accuracy": "normal",
				"detect_direction": true,
				"detect_risk": "true",
				"id_card_side": "front",
				"image": base64.split(',')[1],
				"property": type
			}}).then(res => {
				if(res.data.code==='0'){
					switch (type){
						case 1:{
							this.idPic= base64
							this.idCard= res.data.item
							this.idCardRevise= deepClone(res.data.item)
							break
						}
						case 3:{
							this.businessPic= base64
							this.business= res.data.item
							this.businessRevise= deepClone(res.data.item)
							break
						}
					}
				} else {
					Toast(res.data.status)
				}
			})
		},

		identifyDriveLicense(base64){
			this.axios({
				url: '/scan/newDriverLicense',
				method: 'post',
				data: {
				accuracy: '',
				detect_direction: true,
				image: base64.split(',')[1],
			}}).then(res=>{
				if(res.data.code==='0'){
					this.drivePic= base64
					this.travelLicense= res.data.item
					this.travelLicenseRevise= deepClone(res.data.item)
				} else {
					Toast(res.data.status)
				}
			})
		},

		Bind(){
			let _this = this
			if(this.name==='' || this.IDCardNum===''){
			return Toast('请上传身份证正面')
			}else if(this.vehiclePlateNumber==='' || this.ownerName==='' || this.vin==='' || this.engineNo===''){
			return Toast('请上传行驶证')
			}
			if(this.name!= this.ownerName){
			return Toast('身份证与行驶证持有人不一致')
			}
			this.axios({
			url: '/scan/newBind',
			method: 'post',
			data: {
			idCardId: this.IDCardID,
			licenseId: this.licenseId
			}
			}).then(res=>{
			if(res.data.code==='0'){
			Toast('绑定成功')
			this.$router.go(-2)
			}
			})
		},

		showPopover(type){
			MessageBox.confirm('修改后需要审核通过才能查看汽车档案').then(action => {
				this.popType= type
				this.popupShow= true
			})
		},

		cancel(target){
			$(target).hide()
		},

		modify(){
			let regIdNo = /(^\d{15}$)|(^\d{18}$)|(^\d{17}(\d|X|x)$)/;
			let url= ''
			switch (this.popType){
				case '':{

				}
			}

		},
		showChangeCar(field){

		},
		showChangeId(field){

		},
		showChangeBus(field){

		},
	}
}
</script>

<style lang='less' scoped>
#personUpload{
	padding-bottom: 40px;
	background-color: #f8f8f8;
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
	.drive .img{
		background: #f2f7fd url("/static/img/carOwner-centre/行驶证@3x.png") no-repeat center center;
	}
	.id .img{
		background: #f2f7fd url("/static/img/carOwner-centre/身份证_正面@3x.png") no-repeat center center;
	}
	.business .img{
		background: #f2f7fd url("/static/img/carOwner-centre/营业执照@3x.png") no-repeat center center;
	}
	.upBlock{
		padding: 20px 15px 15px;
		margin-bottom: 15px;
		background-color: white;
		.title{
			text-align: center;
			color: #666666;
			i{
				display: inline-block;
				width: 30px;
				height: 2px;
				background-color: #f1f2f4;
				padding: 0 5px;
				margin: 0 10px;
				position: relative;
				vertical-align: middle;
				&:first-child::after, &:last-child::before{
					content: '';
					width: 4px;
					height: 4px;
					display: block;
					background-color: #d1d6dc;
					position: absolute;
					top: -1px;
					border-radius: 100%;
					left: 0;
				}
				&:first-child::after{
					left: auto;
					right: 0;
				}
			}
		}
		>p{
			font-size: 13px;
		}
		.imgBlock{
			width: 220px;
			margin: 25px auto;
			overflow: hidden;
			border-radius: 5px;
			.img{
				height: 120px;
				text-align: center;
				background-size: 100px auto;
				position: relative;
				img{
					width: auto;
					height: auto;
					max-width: 100%;
					max-height: 100%;
					position: absolute;
					top: 50%;
					left: 50%;
					transform: translate(-50%, -50%);
				}
			}
			.img.nobg{
				background: #f2f7fd;
			}
			p{
				font-size: 15px;
				line-height: 30px;
				background-color: #5795FC;
				text-align: center;
				color: white;
			}
		}
		.rule{
			margin-top: 25px;
			overflow: hidden;
			p{
				color: #999999;
			}
			li{
				width: 50%;
				float: left;
				text-align: center;
				margin-top: 10px;
				img{
					width: 80%;
				}
				p{

				}
			}
		}
	}
	.info{
		background-color: white;
		.head{
			background: #5795FC;
			font-size: 16px;
			position: relative;
			p{
				font-size: 16px;
				line-height: 35px;
				color: white;
				margin-left: 15px;
			}
			span{
				border: 1px solid white;
				position: absolute;
				right: 15px;
				top: 50%;
				background: rgba(0, 0, 0, 0.2);
				transform: translateY(-50%);
				color: white;
				padding: 1px 15px;
				border-radius: 3px;
			}
		}
		ul{
			padding-left: 15px;
			font-size: 15px;
			li{
				min-height: 41px;
				overflow: hidden;
				border-bottom: 1px solid #c8c7cc;
				position: relative;
				label{
					display: inline-block;
					width: 100px;
					line-height: 40px;
					position: absolute;
					left: 0;
					top: 0;
				}
				span{
					display: inline-block;
					width: 100%;
					padding-left: 110px;
					white-space: nowrap;
					overflow: hidden;
					text-overflow: ellipsis;
					line-height: 20px;
					height: 20px;
					margin-top: 10px;
				}
				p{
					padding-left: 110px;
					position: relative;
					line-height: 20px;
					height: 20px;
					color: orange;
					font-size: 15px;
					margin-bottom: 5px;
					&:before{
						content: '修改后';
						position: absolute;
						left: 0;
						line-height: 20px;
						height: 20px;
						color: orange;
						margin-bottom: 5px;
					}
				}
			}
		}
	}
	.submit{
		width: 100%;
		height: 40px;
		line-height: 40px;
		text-align: center;
		color: white;
		background-color: #26a2ff;
		font-size: 18px;
		position: fixed;
		left: 0;
		bottom: 0;
	}
	.popup{
		width: 100%;
		height: 100vh;
		/*position: relative;*/
		/*padding-bottom: 40px;*/
		overflow: auto;
		.button-block{
			position: absolute;
			left: 0;
			bottom: 0;
			width: 100%;
			overflow: hidden;
			.button{
				float: left;
				width: 50%;
				border-radius: 0;
			}
		}
	}
}
</style>

<!--<style lang='less'>-->
  <!--#personUpload {-->
    <!--.popup {-->
      <!--a {-->
        <!--&:active {-->
          <!--color: #000;-->
        <!--}-->
        <!--.mint-cell-title {-->
          <!--width: 80px;-->
        <!--}-->
        <!--input {-->
          <!--border: none;-->
          <!--margin-bottom: 0;-->
        <!--}-->
      <!--}-->

    <!--}-->
  <!--}-->
<!--</style>-->
