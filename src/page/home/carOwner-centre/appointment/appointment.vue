<template>
  <div id="appointment">
      <div class="appointment_content">
        <mt-field label="企业名称:" readonly disableClear placeholder="企业名称" v-model="cropName"></mt-field>
        <mt-field label="企业地址:" readonly disableClear placeholder="企业地址" v-model="cropAddress"></mt-field>
        <mt-field label="车主姓名:" :attr="{ autofocus: 'autofocus' }" placeholder="请输入您的姓名" v-model="username"></mt-field>
        <mt-field label="联系电话:" type="number" placeholder="请输入联系方式" v-model="tel"></mt-field>
        <mt-field label="服务内容:" placeholder="请输入服务内容" v-model="content"></mt-field>
        <div @click="chooseDate">
          <mt-field label="预约时间:" readonly disableClear placeholder="请选择预约时间" :value="pickerValue | FormatDate('YYYY-MM-DD HH:mm')"></mt-field>
        </div>

      </div>

	  <mt-button type="primary"  @click="submit($event)" >提交</mt-button>

    <mt-datetime-picker
      ref="picker"
      type="datetime"
      month-format="{value}月"
      date-format="{value}日"
      hour-format="{value}时"
      minute-format="{value}分"
      :startDate="startDate"
      :endDate="endDate"
      v-model="pickerValue">
    </mt-datetime-picker>
  </div>
</template>

<script>
import { Toast, Button, Field, DatetimePicker } from 'mint-ui';
export default {
    name: 'appointment',
    data(){
      return {
        pickerValue: new Date(),
        startDate: new Date(),
        endDate: new Date('2020-12-31'),
        cropName: '',
        cropAddress: '',
        username: '',
        tel: '',
        content: '',
      }
    },
    created(){
      this.axios({
        url: '/maintain/corpDetail',
        method: 'post',
        headers: {'Content-type': 'application/json'},
        data: JSON.stringify({
          corpId: this.$route.query.id,
          systemToken: localStorage.getItem("SYSTEMTOKEN")
        })
      })
        .then(res=>{
          console.log(res);
          this.cropName=res.data.data.corpName
          this.cropAddress=res.data.data.corpAdd
        })
    },
    watch: {
        username(){
          this.cancelDisabled()
        },
        tel(){
          this.cancelDisabled()
        },
        content(){
          this.cancelDisabled()
        }
    },
    mounted() {

    },
    methods: {
      chooseDate(){
        this.$refs.picker.open();
      },
      submit(e){
          var that=this
          if(this.username.trim()===''){
              return Toast("请输入姓名")
          }else if(!(/^1(3|4|5|7|8)\d{9}$/.test(this.tel.trim()))){
              return Toast("请输入正确的联系方式")

          }else if(this.content.trim()===''){
              return Toast("请输入服务内容")
          }

          let params={
              accessToken: localStorage.getItem("ACCESSTOKEN"),
              ownerName: this.username,
              serviceContent: this.content,
              contactMobile: this.tel,
              companyId: this.$route.query.id || '',
              onSiteTime: this.pickerValue
          }
        that.axios({
          method: 'post',
          url: '/maintain/addOnsiteOrder',
          headers: {
            'Content-type': 'application/json'
          },
          data: JSON.stringify(params)
        })
          .then(res => {
            var _this=this

              console.log('res',res)
            if(res.data.code=='130410'){
              Toast('登录过期,请重新登录')
              this.$router.push('/login')
            }else if(res.data.code=='0'){
              Toast('提交成功')
              setTimeout(function(){
                _this.$router.push("/myOrder")
              },1000)
            }else{
              Toast(res.data.status)
            }
          })

      },
      cancelDisabled(){
          if(!(this.username.trim()==="")&&!(this.tel.trim()==="")&&!(this.content.trim()==="")){
              $(".mui-btn-primary").addClass("jihuo")
          }
      }
    }
}
</script>

<style lang='less' scoped>
    #appointment {
        height: calc(100vh);
        position: relative;
        background-color: #f8f8f8;
        >button {
          width: 100%;
          position: absolute;
          left: 0;
          bottom: 0;
          height: 40px;
          border: none;
        }
        .jihuo {
          background-color: #007aff;
        }
    }
</style>

<style lang='less'>
    #appointment {
        .mint-cell  {
            border-bottom: 1px solid #eee;
            color: #666;
            .mint-cell-wrapper {
                background-image: none;
                .mint-cell-title {
                    width: 65px;
                    font-size: 14px;
                }
                .mint-cell-value {
                    input {
                        margin-bottom: 0;
                        border: none;
                        font-size: 14px;
                        padding: 10px;
                    }
                }
            }
        }
    }
</style>

