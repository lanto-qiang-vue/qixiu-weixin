<template>
  <div id="personUpload">
    <div style="height: calc(100vh - 40px); overflow: auto;">
      <div style="padding: 20px 15px 15px; margin-bottom: 15px; background-color: #fff;">
        <div style="display: flex; justify-content: space-between; width: 80%; margin: 0 auto 10px;">
          <div style="height: 1px; width: calc((100% - 190px) / 2); background-color: #ddd; position: relative; margin-top: 9px;">
            <i style="position: absolute; bottom: -1.5px; right: 0; width: 4px; height: 4px; border-radius: 2px; background-color: #ddd;"></i>
          </div>
          <div style="color: #666; font-size: 17px;">请上传您的身份证照片</div>
          <div style="height: 1px; width: calc((100% - 190px) / 2); background-color: #ddd; position: relative; margin-top: 9px;">
            <i style="position: absolute; bottom: -1.5px; left: 0; width: 4px; height: 4px; border-radius: 2px; background-color: #ddd;"></i>
          </div>
        </div>
        <p style="font-size: 13px; text-align: center;">若您上传了非本人的身份证, 您将无法绑定您名下的车辆</p>
        <div style="margin: 25px 15px;">
          <div id="front_idcard" style="width: 220px; height: 150px; background: #f2f7fd; margin: 0 auto; overflow: hidden; border-radius: 5px; position: relative;">
            <div style="height: 120px; position: relative;">
              <img id="IDCARDUP" @click="flag1 && lookImgs($event)" src="/static/img/carOwner-centre/身份证_正面@3x.png" style="position: absolute; left: 50%; top: 50%; transform: translate(-50%, -50%); width: 60%;" alt="">
            </div>
            <div v-if="showUploadBtn" style="position: absolute; width: 100%; left: 0; bottom: 0; font-size: 15px; line-height: 30px; background-color: #5795fc; text-align: center; color: #fff;" @click="uploadIDCardUp">拍摄正面</div>
          </div>
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
            <img id="drive_license" @click="flag2 && lookImgs($event)" src="/static/img/carOwner-centre/行驶证@3x.png" style="position: absolute; left: 50%; top: 50%; transform: translate(-50%, -50%); width: 60%;" alt="">
          </div>
          <div style="position: absolute; width: 100%; left: 0; bottom: 0; font-size: 15px; line-height: 30px; background-color: #5795fc; text-align: center; color: #fff;" @click="uploadDriveLicense">拍摄正面</div>
        </div>
      </div>

      <div style="margin-bottom: 15px;" v-show="showIDCardUpInfo">
        <div style="background: rgb(87, 149, 252); font-size: 16px; position: relative;">
          <span style="line-height: 35px; color: #fff; margin-left: 15px;">身份证正面识别信息</span>
          <span style="border: 1px solid #fff; position: absolute; right: 15px; top: 50%; background: rgba(0,0,0,.2); transform: translateY(-50%); color: #fff; padding: 1px 15px; border-radius: 3px;" v-if="modify" @click="showPopover('popupVisible1')">修改</span>
        </div>
        <div class="mui-input-group">
          <div class="mui-input-row">
            <label style="font-size: 16px;">姓&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;名</label>
            <input type="text" disabled readonly placeholder="" v-model.trim="name">
          </div>
          <div class="mui-input-row">
            <label style="font-size: 16px;">身份证号</label>
            <input type="text" disabled readonly placeholder="" v-model.trim="IDCardNum">
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
        <p style="color: #999; text-align: center; margin-bottom: 0;">1、大陆公民持有的本人有效二代身份证</p>
        <p style="color: #999; text-align: center;">2、拍摄时确保证件<span style="color: #fc0;">边框完整，字体清晰，亮度均匀</span></p>
        <div class="clearfix" style="margin-top: 25px;">
          <div class="fl" style="width: 25%; text-align: center; position: relative;">
            <img src="/static/img/carOwner-centre/身份证_标准@3x.png" style="width: 85%;" alt="">
            <p style="position: absolute; width: 100%; color: #999; left: 0; bottom: -32px; text-align: center;">标准</p>
          </div>
          <div class="fl" style="width: 25%; text-align: center; position: relative;">
            <img src="/static/img/carOwner-centre/身份证_边框缺失@3x.png" style="width: 85%;" alt="">
            <p style="position: absolute; width: 100%; color: #999; left: 0; bottom: -32px; text-align: center;">边框缺失</p>
          </div>
          <div class="fl" style="width: 25%; text-align: center; position: relative;">
            <img src="/static/img/carOwner-centre/身份证_照片模糊@3x.png" style="width: 85%;" alt="">
            <p style="position: absolute; width: 100%; color: #999; left: 0; bottom: -32px; text-align: center;">照片模糊</p>
          </div>
          <div class="fl" style="width: 25%;  text-align: center; position: relative;">
            <img src="/static/img/carOwner-centre/身份证_闪光强烈@3x.png" style="width: 85%;" alt="">
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
            <mt-field label="姓名" placeholder="更改姓名" type="text" v-model.trim="name"></mt-field>
            <mt-field label="身份证号码" placeholder="更改身份证号码" type="text" v-model.trim="IDCardNum"></mt-field>
          </div>
          <div style="position: absolute; left: 0; bottom: 0; width: 100%;">
            <mt-button @click="popupVisible1=!popupVisible1" type="danger" size="large" style="float: left; width: 50%; border-radius: 0;">取消</mt-button>
            <mt-button @click="confirm('IDCard')" type="primary" size="large" style="float: right; width: 50%; border-radius: 0;">确定</mt-button>
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
  export default{
    name: "personUpload",

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

        popupVisible1: false,
        popupVisible2: false,

        vehiclePlateNumber: '',       // 行驶证车牌号码
        ownerName: '',                // 行驶证持有人
        vin: '',                      // 行驶证车架号
        engineNo: '',                 // 行驶证发动机号
        licenseId: ''                 // 行驶证id
      }
    },

    created(){
      let self= this
      this.axios({
        method: 'post',
        url: '/app/signature',
        headers: {'Content-type': 'application/json'},
        data: JSON.stringify({url: encodeURIComponent(window.location.href.split('#')[0])})
      }).then(res=>{
        wx.config({
          debug: false,
          appId: window.location.origin==='https://weixin.shanghaiqixiu.org' ? self.consts.onlineAppId : self.consts.testAppId,
          timestamp: res.data.timeStamp,
          nonceStr: res.data.uuid,
          signature: res.data.signature,
          jsApiList: ['chooseImage', 'previewImage', 'getLocalImgData']
        })
      })
    },

    beforeMount(){
      mui('.mui-input-row input').input();
      this.axios({
        url: '/scan/getCard/' + localStorage.getItem("ACCESSTOKEN"),
        method: 'get'
      }).then(res=>{
        if(res.data.code==='000000'){
          if(!res.data.data.userId){
            return
          }
          if((res.data.data.frontImage != '') || res.data.data.frontImage){
            $('#IDCARDUP').attr('src', 'data:image/png;base64,'+res.data.data.frontImage)
            this.flag1 = true
            this.showUploadBtn = false
            this.modify = false
            $('#front_idcard').css({'height': 'auto'})
            this.name = res.data.data.reviseOwnerName
            this.IDCardNum = res.data.data.reviseIdCardNo
            this.IDCardID = res.data.data.creditId
            this.showIDCardUpInfo = true
          }
        }
      })
    },

    methods: {
      uploadIDCardUp(){
        let _this = this
        wx.ready(function(){
          wx.chooseImage({
            count: 1, // 默认9
            sizeType: ['compressed'], // 可以指定是原图还是压缩图，默认二者都有
            sourceType: ['album', 'camera'], // 可以指定来源是相册还是相机，默认二者都有
            success: function (resp) {
              _this.flag1 = true
              $('#IDCARDUP').attr('src', resp.localIds)
              wx.getLocalImgData({
                localId: resp.localIds.toString(), // 图片的localID
                success: function (res) {
                  _this.identifyIDCard(res.localData)  // localData是图片的base64数据，可以用img标签显示
                }
              });
            }
          })
        })
      },

      uploadDriveLicense(){
        let _this = this
        wx.ready(function(){
          wx.chooseImage({
            count: 1, // 默认9
            sizeType: ['compressed'], // 可以指定是原图还是压缩图，默认二者都有
            sourceType: ['album', 'camera'], // 可以指定来源是相册还是相机，默认二者都有
            success: function (resp) {
              _this.flag2 = true
              $('#drive_license').attr('src', resp.localIds)
              wx.getLocalImgData({
                localId: resp.localIds.toString(), // 图片的localID
                success: function (res) {
                  _this.identifyDriveLicense(res.localData)  // localData是图片的base64数据，可以用img标签显示
                }
              });
            }
          })
        })
      },

      lookImgs(e){
        wx.previewImage({
          current: e.target.getAttribute('src'),
          urls: [e.target.getAttribute('src')] // 需要预览的图片http链接列表
        });
      },

      identifyIDCard(baseImg){
        this.axios({
          url: '/scan/newUpload',
          method: 'post',
          headers: {'Content-type': 'application/json'},
          data: JSON.stringify({
            accessToken: localStorage.getItem("ACCESSTOKEN"),
            accuracy: 'normal',
            detect_direction: true,
            detect_risk: 'true',
            id_card_side: 'front',
            image: baseImg.split(',')[1],
            property: 1
          })
        }).then(res => {
          if(res.data.code==='000000'){
            this.IDCardID = res.data.data.creditId
            this.name = res.data.data.ownerName
            this.IDCardNum = res.data.data.idCardNo
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
          headers: {'Content-type': 'application/json'},
          data: JSON.stringify({
            accessToken: localStorage.getItem("ACCESSTOKEN"),
            accuracy: '',
            detect_direction: true,
            image: baseImg.split(',')[1],
          })
        }).then(res=>{
          if(res.data.code==='000000'){
            this.showDriveLicenseInfo = true
            this.vehiclePlateNumber = res.data.data.vehiclePlateNumber
            this.ownerName = res.data.data.ownerName
            this.vin = res.data.data.vin
            this.engineNo = res.data.data.engineNo
            this.licenseId = res.data.data.id
          }else{
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
        this.axios({
          url: '/scan/newBind',
          method: 'post',
          headers: {'Content-type': 'application/json'},
          data: JSON.stringify({
            accessToken: localStorage.getItem("ACCESSTOKEN"),
            idCardId: this.IDCardID,
            licenseId: this.licenseId
          })
        }).then(res=>{
          if(res.data.code==='000000'){
            MessageBox.confirm('绑定成功,是否立即查看车辆?').then(action => {
              _this.$router.push('/carOwner-centre/carList')
            }, action => {
              window.location.reload()
            })
          }else {
            Toast(res.data.status)
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
          if(res.data.code==='000000'){
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
    height: 100vh;
    position: relative;
    background-color: #f8f8f8;
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
