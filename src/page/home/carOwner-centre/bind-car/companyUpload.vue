<template>
  <div id="companyUpload">
    <div style="height: calc(100vh - 40px); overflow: auto;">
      <div style="padding: 20px 15px 15px; margin-bottom: 15px; background-color: #fff;">
        <div style="display: flex; justify-content: space-between; width: 80%; margin: 0 auto 10px;">
          <div style="height: 1px; width: calc((100% - 190px) / 2); background-color: #ddd; position: relative; margin-top: 9px;">
            <i style="position: absolute; bottom: -1.5px; right: 0; width: 4px; height: 4px; border-radius: 2px; background-color: #ddd;"></i>
          </div>
          <div style="color: #666; font-size: 17px;">请上传营业执照正面</div>
          <div style="height: 1px; width: calc((100% - 190px) / 2); background-color: #ddd; position: relative; margin-top: 9px;">
            <i style="position: absolute; bottom: -1.5px; left: 0; width: 4px; height: 4px; border-radius: 2px; background-color: #ddd;"></i>
          </div>
        </div>

        <div style="width: 220px; height: 150px; background: #f2f7fd; margin: 20px auto 30px; overflow: hidden; border-radius: 5px; position: relative;">
          <div style="height: 120px; position: relative;">
            <img id="business_license" v-img :src="businessPic" style="position: absolute; left: 50%; top: 50%; transform: translate(-50%, -50%); width: 60%;" alt="">
          </div>
          <div style="position: absolute; width: 100%; left: 0; bottom: 0; font-size: 15px; line-height: 30px; background-color: #5795fc; text-align: center; color: #fff;"><upload operate='base64' @done="uploadBusinessLicense"></upload>拍摄正面</div>
        </div>

        <div style="display: flex; justify-content: space-between; width: 80%; margin: 0 auto 10px;">
          <div style="height: 1px; width: calc((100% - 190px) / 2); background-color: #ddd; position: relative; margin-top: 9px;">
            <i style="position: absolute; bottom: -1.5px; right: 0; width: 4px; height: 4px; border-radius: 2px; background-color: #ddd;"></i>
          </div>
          <div style="color: #666; font-size: 17px;">请上传行驶证正面</div>
          <div style="height: 1px; width: calc((100% - 190px) / 2); background-color: #ddd; position: relative; margin-top: 9px;">
            <i style="position: absolute; bottom: -1.5px; left: 0; width: 4px; height: 4px; border-radius: 2px; background-color: #ddd;"></i>
          </div>
        </div>

        <div style="width: 220px; height: 150px; background: #f2f7fd; margin: 20px auto 0; overflow: hidden; border-radius: 5px; position: relative;">
          <div style="height: 120px; position: relative;">
	          <img id="drive_license" v-img :src="drivePic" style="position: absolute; left: 50%; top: 50%; transform: translate(-50%, -50%); width: 60%;" alt="">
          </div>
          <div style="position: absolute; width: 100%; left: 0; bottom: 0; font-size: 15px; line-height: 30px; background-color: #5795fc; text-align: center; color: #fff;" @click="uploadDriveLicense">拍摄正面</div>
        </div>
      </div>

      <div style="margin-bottom: 15px;" v-show="showBusinessLicenseInfo">
        <div style="background: rgb(87, 149, 252); font-size: 16px; position: relative;">
          <span style="line-height: 35px; color: #fff; margin-left: 15px;">营业执照识别信息</span>
          <span style="border: 1px solid #fff; position: absolute; right: 15px; top: 50%; background: rgba(0,0,0,.2); transform: translateY(-50%); color: #fff; padding: 1px 15px; border-radius: 3px;" @click="showPopover('popupVisible1')">修改</span>
        </div>
        <div class="mui-input-group">
          <div class="mui-input-row">
            <label style="font-size: 16px;">企业名称</label>
            <input type="text" disabled readonly placeholder="" v-model.trim="companyName">
          </div>
          <div class="mui-input-row">
            <label style="font-size: 16px;">法定代表人</label>
            <input type="text" disabled readonly placeholder="" v-model.trim="name">
          </div>
        </div>
      </div>

      <div style="margin-bottom: 15px;" v-show="showDriveLicenseInfo">
        <div style="background: rgb(87, 149, 252); font-size: 16px; position: relative;">
          <span style="line-height: 35px; color: #fff; margin-left: 15px;">行驶证识别信息</span>
          <span style="border: 1px solid #fff; position: absolute; right: 15px; top: 50%; background: rgba(0,0,0,.2); transform: translateY(-50%); color: #fff; padding: 1px 15px; border-radius: 3px;"  @click="showPopover('popupVisible2')">修改</span>
        </div>
        <div class="mui-input-group">
          <div class="mui-input-row">
            <label style="font-size: 16px;">车&nbsp;&nbsp;牌&nbsp;&nbsp;号</label>
            <input type="text" disabled readonly placeholder="" v-model.trim="vehiclePlateNumber">
          </div>
          <div class="mui-input-row">
            <label style="font-size: 16px;">所&nbsp;&nbsp;有&nbsp;&nbsp;人</label>
            <input type="text" disabled readonly placeholder="" v-model.trim="ownerName">
          </div>
          <div class="mui-input-row">
            <label style="font-size: 16px;">车架号(VIN)</label>
            <input type="text" disabled readonly placeholder="" v-model.trim="vin">
          </div>
          <div class="mui-input-row">
            <label style="font-size: 16px;">发动机号</label>
            <input type="text" disabled readonly placeholder="" v-model.trim="engineNo">
          </div>
        </div>
      </div>

      <div style="background-color: #fff; padding-bottom: 30px;">
        <div style="display: flex; justify-content: space-around; width: 80%; padding: 25px 15px; margin: 0 auto;">
          <div style="height: 1px; width: calc((100% - 190px) / 2); background-color: #ddd; position: relative; margin-top: 9px;">
            <i style="position: absolute; bottom: -1.5px; right: 0; width: 4px; height: 4px; border-radius: 2px; background-color: #ddd;"></i>
          </div>
          <div style="color: #666; font-size: 17px;">拍摄证件要求</div>
          <div style="height: 1px; width: calc((100% - 190px) / 2); background-color: #ddd; position: relative; margin-top: 9px;">
            <i style="position: absolute; bottom: -1.5px; left: 0; width: 4px; height: 4px; border-radius: 2px; background-color: #ddd;"></i>
          </div>
        </div>
        <p style="color: #999; text-align: center;">拍摄时确保证件<span style="color: #fc0;">边框完整，字体清晰，亮度均匀</span></p>
        <div class="clearfix" style="margin-top: 25px;">
          <div class="fl" style="width: 25%; text-align: center; position: relative;">
            <img src="/static/img/carOwner-centre/行驶证_标准@3x.png" style="width: 85%;" alt="">
            <p style="position: absolute; width: 100%; color: #999; left: 0; bottom: -32px; text-align: center;">标准</p>
          </div>
          <div class="fl" style="width: 25%; text-align: center; position: relative;">
            <img src="/static/img/carOwner-centre/行驶证_边框缺失@3x.png" style="width: 85%;" alt="">
            <p style="position: absolute; width: 100%; color: #999; left: 0; bottom: -32px; text-align: center;">边框缺失</p>
          </div>
          <div class="fl" style="width: 25%; text-align: center; position: relative;">
            <img src="/static/img/carOwner-centre/行驶证_照片模糊@3x.png" style="width: 85%;" alt="">
            <p style="position: absolute; width: 100%; color: #999; left: 0; bottom: -32px; text-align: center;">照片模糊</p>
          </div>
          <div class="fl" style="width: 25%;  text-align: center; position: relative;">
            <img src="/static/img/carOwner-centre/行驶证_闪光强烈@3x.png" style="width: 85%;" alt="">
            <p style="position: absolute; width: 100%; color: #999; left: 0; bottom: -32px; text-align: center;">闪光强烈</p>
          </div>
        </div>
      </div>
    </div>
    <div style="position: absolute; width: 100%; bottom: 0; left: 0;" @click="Bind">
      <mt-button type="primary" size="large" style="width: 100%; border-radius: 0">确定</mt-button>
    </div>

    <mt-popup
      v-model="popupVisible1"
      position="right">
      <div style="width: 100vw; height: 100vh; position: relative;" class="popup">
        <div>
          <mt-field label="企业名称" placeholder="更改企业名称" type="text" v-model.trim="companyName"></mt-field>
          <mt-field label="企业法人" placeholder="更改企业法人" type="text" v-model.trim="name"></mt-field>
        </div>
        <div style="position: absolute; left: 0; bottom: 0; width: 100%;">
          <mt-button @click="popupVisible1=!popupVisible1" type="danger" size="large" style="float: left; width: 50%; border-radius: 0;">取消</mt-button>
          <mt-button @click="confirm('businessLicense')" type="primary" size="large" style="float: right; width: 50%; border-radius: 0;">确定</mt-button>
        </div>
      </div>
    </mt-popup>
    <mt-popup
      v-model="popupVisible2"
      position="right">
      <div style="width: 100vw; height: 100vh; position: relative;" class="popup">
        <div>
          <mt-field label="车牌号" placeholder="更改车牌号" type="text" v-model.trim="vehiclePlateNumber"></mt-field>
          <mt-field label="所有人" placeholder="更改所有人" type="text" v-model.trim="ownerName"></mt-field>
          <mt-field label="车架号(VIN)" placeholder="更改车架号(VIN)" type="text" v-model.trim="vin"></mt-field>
          <mt-field label="发动机号" placeholder="更改发动机号" type="text" v-model.trim="engineNo"></mt-field>
        </div>
        <div style="position: absolute; left: 0; bottom: 0; width: 100%;">
          <mt-button @click="popupVisible2=!popupVisible2" type="danger" size="large" style="float: left; width: 50%; border-radius: 0;">取消</mt-button>
          <mt-button @click="confirm('driveLicense')" type="primary" size="large" style="float: right; width: 50%; border-radius: 0;">确定</mt-button>
        </div>
      </div>
    </mt-popup>
  </div>
</template>

<script>
  import { Field, Button, Toast, MessageBox, Popup } from 'mint-ui'
  import Upload from '@/page/components/compress-upload.vue'
  export default{
    name: "companyUpload",
	  components: {Upload},
    data(){
      return {
        flag1: false,
        flag2: false,

        companyName: '',      // 营业执照企业名称
        name: '',             // 营业执照法人代表
        businessId:'',        // 营业执照ID

        showBusinessLicenseInfo: false,
        showDriveLicenseInfo: false,

        popupVisible1: false,
        popupVisible2: false,

	      businessPic: '/static/img/carOwner-centre/营业执照@3x.png',
	      drivePic: '/static/img/carOwner-centre/行驶证@3x.png',

        vehiclePlateNumber: '',  // 行驶证车牌号码
        ownerName: '',           // 行驶证持有人
        vin: '',                 // 行驶证车架号
        engineNo: '',            // 行驶证发动机号
        licenseId: ''            // 行驶证id
      }
    },



    mounted(){

    },

    methods: {
      uploadBusinessLicense(base64){
            this.businessPic= base64
            this.identify(base64)  // localData是图片的base64数据，可以用img标签显示
      },

      uploadDriveLicense(base64){
	        this.drivePic= base64
	        this.identifyDriveLicense(base64)  // localData是图片的base64数据，可以用img标签显示
      },


      identify(baseImg){
        this.axios({
          url: '/scan/newUpload',
          method: 'post',
          data: {
            accuracy: 'normal',
            detect_direction: true,
            detect_risk: 'true',
            image: baseImg.split(',')[1],
            property: 3
          }
        }).then(res => {
            this.companyName = res.data.item.corpName
            this.name = res.data.item.legalPerson
            this.businessId = res.data.item.businessId
            this.showBusinessLicenseInfo = true
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
			    this.showDriveLicenseInfo = true
			    this.vehiclePlateNumber = res.data.item.vehiclePlateNumber
			    this.ownerName = res.data.item.ownerName
			    this.vin = res.data.item.vin
			    this.engineNo = res.data.item.engineNo
			    this.licenseId = res.data.item.id
		    })
	    },

      Bind(){
        let _this = this
        if(this.companyName==='' || this.name===''){
          return Toast('请上传企业营业执照')
        }else if(this.vehiclePlateNumber==='' || this.ownerName==='' || this.vin==='' || this.engineNo===''){
          return Toast('请上传行驶证')
        }
        this.axios({
          url: '/scan/newBind',
          method: 'post',
          data:{
            businessId: this.businessId,
            licenseId: this.licenseId
          }
        }).then(res=>{
	        Toast('绑定成功')
	        this.$router.go(-2)
        })
      },

      showPopover(target){
        MessageBox.confirm('修改后需要审核通过才能查看汽车档案').then(action => {
          if(target==='popupVisible1'){
            this.popupVisible1 = true
          }else {
            this.popupVisible2 = true
          }
        })
      },

      confirm(target){
        let data = null
        if(target === 'businessLicense'){
          if(this.companyName===''){
            return Toast('企业名称不能为空')
          }else if(this.name===''){
            return Toast('法定代表人不能为空')
          }
          data = {
            accessToken: localStorage.getItem("ACCESSTOKEN"),
            new_corp_name: this.companyName,
            new_legal_person: this.name,
            businessId: this.businessId,
            property: 3
          }
        } else {
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
            this.popupVisible1=false
            this.popupVisible2=false
          }else{
            Toast(res.data.status)
          }
        })
      }
    }
  }
</script>

<style lang='less' scoped>
  #companyUpload{
    height: 100vh;
    position: relative;
    background-color: #f8f8f8;
    .my-backdrop {
      position: absolute;
      height: 100vh;
      width: 100vw;
      top: 0;
      left: 0;
      z-index: 9999;
      background-color: rgba(0,0,0,.3);
    }
  }
</style>

<style lang='less'>
  #companyUpload {
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

