<template>
  <div id="editInfo">
    <mt-header fixed title="个人资料">
      <router-link to="/carOwner-centre/resume-detail" slot="left">
        <mt-button icon="back">返回</mt-button>
      </router-link>
      <mt-button slot="right">保存</mt-button>
    </mt-header>

    <ul class="mui-table-view">
      <li class="mui-table-view-cell">
        <a class="mui-navigate-right">
          <div class="clearfix">
            <div class="fr" style="width: 50px; height: 50px; background-color: #eee; border-radius: 50%; margin-right: 20px;"></div>
            <label style="line-height: 50px;">头像</label>
          </div>
        </a>
      </li>
      <li class="mui-table-view-cell" @click="entryName">
        <a class="mui-navigate-right">
          <div class="fr" style="margin-right: 18px; color: #999">{{ name }}</div>
          <label>姓名</label>
        </a>
      </li>
      <li class="mui-table-view-cell">
        <a class="mui-navigate-right">
          <div class="fr" style="margin-right: 18px; width: 100px;">
            <div class="mui-input-row mui-radio mui-left fl" style="width: 40px; margin-right: 10px;">
              <label>女</label>
              <input name="radio1" type="radio">
            </div>
            <div class="mui-input-row mui-radio mui-left fl" style="width: 40px;">
              <label>男</label>
              <input name="radio1" type="radio">
            </div>
          </div>
          <label>性别</label>
        </a>
      </li>
      <li class="mui-table-view-cell" @click="showDatePicker">
        <a class="mui-navigate-right">
          <div class="fr" style="margin-right: 18px; color: #999;">{{ pickerValue | FormatDate }}</div>
          <label>出生日期</label>
        </a>
      </li>
      <li class="mui-table-view-cell" @click="entryTel">
        <a class="mui-navigate-right">
          <div class="fr" style="margin-right: 18px; color: #999">{{ tel }}</div>
          <label>手机号</label>
        </a>
      </li>
      <li class="mui-table-view-cell" @click="entryEmail">
        <a class="mui-navigate-right">
          <div class="fr" style="margin-right: 18px; color: #999;">{{ email }}</div>
          <label>电子邮箱</label>
        </a>
      </li>
      <li class="mui-table-view-cell" @click="showPopup">
        <a class="mui-navigate-right">
          <div class="fr" style="margin-right: 18px; color: #999;" v-html="this.city()"></div>
          <label>现居地</label>
        </a>
      </li>
    </ul>

    <mt-datetime-picker
      ref="picker"
      type="date"
      v-model="pickerValue"
      :startDate="startDate"
      :endDate="endDate">
    </mt-datetime-picker>

    <mt-popup
      v-model="this.popupVisible()"
      position="right" style="width: 100%; height: 100%;">
      <citys></citys>
    </mt-popup>

    <mt-popup
      v-model="namePopupVisible"
      style="width: 100%; height: 100%; padding-top: 40px; background-color: #f8f8f8;"
      position="right">
      <mt-header fixed title="姓名">
        <mt-button slot="left" @click="namePopupVisible=!namePopupVisible" icon="back"></mt-button>
        <mt-button slot="right" @click="nameComplete">完成</mt-button>
      </mt-header>
      <form class="mui-input-group">
        <div class="mui-input-row">
          <input v-model="name_confirm" type="text" autofocus class="mui-input-clear" placeholder="请输入姓名">
        </div>
      </form>
    </mt-popup>

    <mt-popup
      v-model="telPopupVisible"
      style="width: 100%; height: 100%; padding-top: 40px; background-color: #f8f8f8;"
      position="right">
      <mt-header fixed title="手机号">
        <mt-button slot="left" @click="telPopupVisible=!telPopupVisible" icon="back"></mt-button>
        <mt-button slot="right" @click="telComplete">完成</mt-button>
      </mt-header>
      <form class="mui-input-group">
        <div class="mui-input-row">
          <input v-model="tel_confirm" type="text" autofocus class="mui-input-clear" placeholder="请输入手机号">
        </div>
      </form>
    </mt-popup>

    <mt-popup
      v-model="emailPopupVisible"
      style="width: 100%; height: 100%; padding-top: 40px; background-color: #f8f8f8;"
      position="right">
      <mt-header fixed title="电子邮箱">
        <mt-button slot="left" @click="emailPopupVisible=!emailPopupVisible" icon="back"></mt-button>
        <mt-button slot="right" @click="emailComplete">完成</mt-button>
      </mt-header>
      <form class="mui-input-group">
        <div class="mui-input-row">
          <input v-model="email_confirm" type="text" autofocus class="mui-input-clear" placeholder="请输入您常用的电子邮箱">
        </div>
      </form>
    </mt-popup>
  </div>
</template>

<script>
  import { Toast, Header, Popup, MessageBox, DatetimePicker } from 'mint-ui';
  import citys from './more-city.vue'
  export default{
    name: "editInfo",

    data(){
      return {
        startDate: new Date('1958-01-01'),
        endDate: new Date('2007-12-31'),
        pickerValue: '1990-01-01',
        namePopupVisible: false,
        name_confirm: '',
        name: '',
        telPopupVisible: false,
        tel_confirm: '',
        tel: '',
        emailPopupVisible: false,
        email_confirm: '',
        email: '',

      }
    },
    created(){

    },
    components: {
      citys
    },

    methods: {
      popupVisible(){
        return this.$store.state.resumeDetail.popupVisible
      },
      city() {
        return this.$store.state.resumeDetail.city
      },
      showDatePicker(){
        this.$refs.picker.open();
      },
      entryTel(){
        this.telPopupVisible=!this.telPopupVisible
      },
      telComplete(){
        if(this.tel_confirm.trim()===""){
          return Toast("手机号不能为空")
        }
        this.tel=this.tel_confirm
        this.telPopupVisible=!this.telPopupVisible
      },
      entryName(){
        this.namePopupVisible=!this.namePopupVisible
      },
      nameComplete() {
        if(this.name_confirm.trim()===""){
          return Toast("姓名不能为空")
        }
        this.name=this.name_confirm
        this.namePopupVisible=!this.namePopupVisible
      },
      entryEmail(){
        this.emailPopupVisible=!this.emailPopupVisible
      },
      emailComplete(){
        if(this.email_confirm.trim()===""){
          return Toast("邮箱不能为空")
        }
        this.email=this.email_confirm
        this.emailPopupVisible=!this.emailPopupVisible
      },
      showPopup(){
        this.$store.commit('closePopupVisible', true)
      },

    }
  }
</script>

<style lang='less' scoped>
  #editInfo {
    height: calc(100vh);
    background-color: #fff;
    overflow: auto;
    padding-top: 40px;
    ul li {
      a:after {
        color: #26a2ff;
      }
      .mui-input-row {
        clear: none;
        input {
          width: 18px;
          height: 18px;
          left: 0;
        }
        input:before {
          font-size: 18px;
        }
        label {
          padding: 4px 0 4px 20px;
        }
      }
    }
  }
</style>

