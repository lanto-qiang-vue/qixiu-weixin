<template>
  <div id="personUpload">

	  <div class="upBlock drive">
		  <div class="title"><i></i>请上传行驶证正面<i></i></div>

		  <div class="imgBlock">
			  <div :class="['img',{nobg: drivePic}]">
				  <img v-img v-show="drivePic" :src="drivePic">
			  </div>
			  <p v-show="showUploadBtn" @click="$refs.driverUpload.clickBox()">拍摄正面</p>
		  </div>
		  <upload operate='base64' @done="uploadDriveLicense" ref="driverUpload"></upload>
	  </div>

	<div class="upBlock id">
		<div class="title"><i></i>请上传您的身份证照片<i></i></div>
		<p>若您上传了非本人的身份证, 您将无法绑定您名下的车辆</p>

		<div class="imgBlock">
			<div :class="['img',{nobg: idPic}]">
				<img v-img v-show="idPic" :src="idPic">
			</div>
			<p v-show="showUploadBtn" @click="$refs.idupload.clickBox()">拍摄正面</p>
		</div>
		<upload operate='base64' @done="uploadIDCardUp" ref="idupload"></upload>
	</div>

	  <div class="upBlock business">
		  <div class="title"><i></i>请上传营业执照正面<i></i></div>

		  <div class="imgBlock">
			  <div :class="['img',{nobg: drivePic}]">
				  <img v-img v-show="drivePic" :src="drivePic">
			  </div>
			  <p v-show="showUploadBtn" @click="$refs.driverUpload.clickBox()">拍摄正面</p>
		  </div>
		  <upload operate='base64' @done="uploadDriveLicense" ref="driverUpload"></upload>
	  </div>

	  <!--<div class="info" v-show="showDriveLicenseInfo">-->
	  <div class="info" v-show="true">
		  <div class="head">
			  <p>行驶证识别信息</p>
			  <span @click="showPopover('popupVisible2')">修改</span>
		  </div>
		  <ul>
			  <li>
				  <label>车牌号</label>
				  <!--<span>{{vehiclePlateNumber}}</span>-->
				  <span>行驶证识别信息</span>
				  <p>行驶证识别信息2</p>
			  </li>
			  <li>
				  <label>车牌号</label>
				  <span>{{vehiclePlateNumber}}</span>
			  </li>
			  <li>
				  <label>所有人</label>
				  <span>{{ownerName}}</span>
			  </li>
			  <li>
				  <label>车架号(VIN)</label>
				  <span>{{vin}}</span>
			  </li>
			  <li>
				  <label>发动机号</label>
				  <span>{{engineNo}}</span>
			  </li>
		  </ul>
	  </div>

	  <!--<div class="info" v-show="showIDCardUpInfo">-->
	  <div class="info" v-show="true">
		  <div class="head">
			  <p>身份证正面识别信息</p>
			  <span @click="showPopover('popupVisible1')">修改</span>
		  </div>
		  <ul>
			  <li>
				  <label>姓名</label>
				  <span>{{name}}</span>
			  </li>
			  <li>
				  <label>身份证号</label>
				  <span>{{IDCardNum}}</span>
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

    <mt-popup v-model="popupVisible1" position="right" class="popup">
          <div>
            <mt-field label="姓名" placeholder="更改姓名" type="text" v-model.trim="name"></mt-field>
            <mt-field label="身份证号码" placeholder="更改身份证号码" type="text" v-model.trim="IDCardNum"></mt-field>
          </div>
	    <Form :class="['common-form']"
	          :label-width="100" label-position="left" ref="form">
		    <FormItem label="姓名" prop="name">
			    <Input v-model="name"></Input>
		    </FormItem>
		    <FormItem label="身份证号码" prop="IDCardNum">
			    <Input v-model="IDCardNum"></Input>
		    </FormItem>
	    </Form>

          <div class="button-block">
            <mt-button @click="popupVisible1=!popupVisible1" type="danger" size="large"
                       class="button">取消</mt-button>
            <mt-button @click="confirm('IDCard')" type="primary" size="large"
                       class="button">确定</mt-button>
          </div>
    </mt-popup>
    <mt-popup v-model="popupVisible2" position="right" class="popup">
        <div>
          <mt-field label="车牌号" placeholder="更改车牌号" type="text" v-model.trim="vehiclePlateNumber"></mt-field>
          <mt-field label="所有人" placeholder="更改所有人" type="text" v-model.trim="ownerName"></mt-field>
          <mt-field label="车架号(VIN)" placeholder="更改车架号(VIN)" type="text" v-model.trim="vin"></mt-field>
          <mt-field label="发动机号" placeholder="更改发动机号" type="text" v-model.trim="engineNo"></mt-field>
        </div>

        <div class="button-block">
          <mt-button @click="popupVisible2=!popupVisible2" type="danger" size="large"
                     class="button">取消</mt-button>
          <mt-button @click="confirm('driveLicense')" type="primary" size="large"
                     class="button">确定</mt-button>
        </div>
    </mt-popup>
  </div>
</template>

<script>
  import { Field, Button, Toast, MessageBox, Popup } from 'mint-ui'
  import Upload from '@/page/components/compress-upload.vue'
  export default{
    name: "personUpload",
    components: {Upload},
    data(){
      return {
        flag1: false,
        flag2: false,
        showUploadBtn: true,
        modify: true,                 // 修改按钮
        name: '',                     // 身份证姓名
        IDCardNum: '',                // 身份证号码
        IDCardID: '',                 // 身份证id
        showIDCardUpInfo: false,
        showDriveLicenseInfo: false,

        popupVisible1: true,
        popupVisible2: false,

	      // idPic:'/static/img/carOwner-centre/身份证_正面@3x.png',
	      // drivePic: '/static/img/carOwner-centre/行驶证@3x.png',
	      idPic:'',
	      drivePic: '',

        vehiclePlateNumber: '',       // 行驶证车牌号码
        ownerName: '',                // 行驶证持有人
        vin: '',                      // 行驶证车架号
        engineNo: '',                 // 行驶证发动机号
        licenseId: ''                 // 行驶证id
      }
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
      uploadIDCardUp(base64){

      	this.idPic= base64
		this.identifyIDCard(base64)

      },

      uploadDriveLicense(base64){
	      this.drivePic= base64
            this.identifyDriveLicense(base64)  // localData是图片的base64数据，可以用img标签显示

      },


      identifyIDCard(baseImg){
        this.axios({
          url: '/scan/newUpload',
          method: 'post',
          data: {
	          "accuracy": "normal",
	          "detect_direction": true,
	          "detect_risk": "true",
	          "id_card_side": "front",
	          "image": baseImg.split(',')[1],
	          "property": 1
          }
        }).then(res => {
          if(res.data.code==='0'){
            this.IDCardID = res.data.item.creditId
            this.name = res.data.item.ownerName
            this.IDCardNum = res.data.item.idCardNo
            this.showIDCardUpInfo = true
          } else {
            Toast(res.data.status)
          }
        })
      },

      identifyDriveLicense(baseImg){
        this.axios({
          url: '/scan/newDriverLicense',
          method: 'post',
          data: {
            accuracy: '',
            detect_direction: true,
            image: baseImg.split(',')[1],
          }
        }).then(res=>{
	        if(res.data.code==='0'){
		        this.showDriveLicenseInfo = true
		        this.vehiclePlateNumber = res.data.item.vehiclePlateNumber
		        this.ownerName = res.data.item.ownerName
		        this.vin = res.data.item.vin
		        this.engineNo = res.data.item.engineNo
		        this.licenseId = res.data.item.id
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

      showPopover(target){
        let _this = this
        MessageBox.confirm('修改后需要审核通过才能查看汽车档案').then(action => {
          if(target==='popupVisible1'){
            _this.popupVisible1 = true
          }else{
            _this.popupVisible2 = true
          }
        })
      },

      cancel(target){
        $(target).hide()
      },

      confirm(param){
        let data = null
        if(param==='IDCard'){
          let regIdNo = /(^\d{15}$)|(^\d{18}$)|(^\d{17}(\d|X|x)$)/;
          if(this.name===''){
            return Toast('姓名不能为空')
          }else if(this.IDCardNum===''){
            return Toast('身份证号不能为空')
          }else if(!regIdNo.test(this.IDCardNum)){
            return Toast('身份证号输入有误')
          }
          data = {
            accessToken: localStorage.getItem("ACCESSTOKEN"),
            idcardId: this.IDCardID,
            new_owner_name: this.name,
            new_id_card_no: this.IDCardNum,
            property: 1
          }
        }else{
          if(this.vehiclePlateNumber===''){
            return Toast('车牌号码不能为空')
          }else if(this.ownerName===''){
            return Toast('持有人不能为空')
          }else if(this.vin===''){
            return Toast('车架号不能为空')
          }else if(this.engineNo===''){
            return Toast('发动机号不能为空')
          }
          data = {
            accessToken: localStorage.getItem("ACCESSTOKEN"),
            licenseId: this.licenseId,
            new_vehicle_plate_number: this.vehiclePlateNumber,
            new_engine_no: this.engineNo,
            new_vin: this.vin,
            new_license_owner_name: this.ownerName,
            property: 2
          }
        }


        this.axios({
          url: '/scan/update',
          method: 'post',
          headers: {'Content-type': 'application/json'},
          data: JSON.stringify(data)
        }).then(res=>{
          if(res.data.code==='0'){
            Toast('修改成功')
            this.popupVisible1 = false
            this.popupVisible2 = false
          }else{
            Toast(res.data.status)
          }
        })
      }
    }
  }
</script>

<style lang='less' scoped>
#personUpload{
	padding-bottom: 40px;
	background-color: #f8f8f8;
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
				img{
					width: auto;
					height: auto;
					max-width: 100%;
					max-height: 100%;
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

<style lang='less'>
  #personUpload {
    .popup {
      a {
        &:active {
          color: #000;
        }
        .mint-cell-title {
          width: 80px;
        }
        input {
          border: none;
          margin-bottom: 0;
        }
      }

    }
  }
</style>
