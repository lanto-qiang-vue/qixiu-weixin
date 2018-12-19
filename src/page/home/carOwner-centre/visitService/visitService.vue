<template>
  <div id="visit">
    <div class="title">用户信息</div>
    <mt-field label="车主姓名" placeholder="请输入您的姓名" v-model="username"></mt-field>
    <mt-field label="联系方式" type="number" placeholder="请输入联系方式" v-model="tel"></mt-field>
    <mt-field label="地址" placeholder="请输入详细地址" v-model="address"></mt-field>
    <div class="title">服务内容</div>

    <div class="content">
      <button type="button" @click='checkoutTag($event)' :data-index="item.index"
              :class="{'mui-btn': true, 'active': item.checked==true}" v-for='(item, i) in tags' :key="i">{{ item.name }}
      </button>
    </div>

	  <mt-button type="primary" @click="submit($event)">提交</mt-button>
  </div>
</template>

<script>

  import {Toast, Button, Field, Checklist} from 'mint-ui';
  export default {
    data(){
      return {
        username: '',
        tel: '',
        address: '',
        serviceItem: [
          {value: '300001', label: '上门故障诊断'},
          {value: '300002', label: '上门送取车服务'},
          {value: '300003', label: '上门更换备胎'},
          {value: '300004', label: '上门更换电灯泡'},
          {value: '300005', label: '上门更换雨刮片'},
          {value: '300006', label: '上门更换电瓶'},
          {value: '300007', label: '上门泵电'}
        ],
        tags: [
          {name: '上门故障诊断', index: 0, value: '300001', checked:false},
          {name: '上门送取车服务', index: 1, value: '300002', checked:false},
          {name: '上门更换备胎', index: 2, value: '300003', checked:false},
          {name: '上门更换电灯泡', index: 3, value: '300004', checked:false},
          {name: '上门更换雨刮片', index: 4, value: '300005', checked:false},
          {name: '上门更换电瓶', index: 5, value: '300006', checked:false},
          {name: '上门泵电', index: 6, value: '300007', checked:false},
        ],
        content: [],
        index: 0,
        serviceTypeList:[],
      }
    },

    mounted() {

    },
    methods: {
      checkoutTag(e){
        var that = this;
        var currItem = that.serviceItem[e.target.getAttribute('data-index')];
        var hasItem = false;
        for(var i = 0; i < that.serviceTypeList.length; i++){
          if(that.serviceTypeList[i] == currItem.value){
            that.serviceTypeList.splice(i,1);
            that.tags[e.target.getAttribute('data-index')].checked = false;
            hasItem = true;
          }
        }
        if(!hasItem){
          that.serviceTypeList.push(currItem.value);
          that.tags[e.target.getAttribute('data-index')].checked = true;
        }
      },
      chooseServiceItem(e){
        let flag = true;
        for (let i in this.content) {
          if (this.content[i] === e.target.getAttribute("data-code")) {
            this.content.splice(i, 1);
            flag = false;
            break;
          }
        }
        if (flag) {
          this.content.push(e.target.getAttribute("data-code"))
        }
      },
      submit(e){
        var that = this
        if (this.username.trim() === '') {
          Toast("请输入姓名")
          return
        } else if (!(/^1(3|4|5|7|8)\d{9}$/.test(this.tel.trim()))) {
          Toast("请输入正确的联系方式")
          return
        } else if (this.address.trim() === '') {
          Toast("请输入详细地址")
          return
        } else if (this.content === '') {
          Toast("请选择服务内容")
          return
        }



        var serviceType = that.serviceTypeList.join(',') || null;

        let params = {
          accessToken: localStorage.getItem("ACCESSTOKEN"),
          ownerName: this.username,
          contactMobile: this.tel,
          contactAddress: this.address,
          serviceType: serviceType
        }
        that.axios({
          method: 'post',
          url: '/maintain/addOnsiteService',
          headers: {
            'Content-type': 'application/json'
          },
          data: JSON.stringify(params)
        })
          .then(res => {
              console.log("维修服务res", res);
            if (res.data.code == '0') {

              that.username = ''
              that.address = ''
              that.tel = ''
              Toast("提交成功")
              this.$router.push('/myAppointment')
            } else if (res.data.code == '130408') {
              Toast('请登录')
              setTimeout(function () {
                that.$router.push({
                  path: '/login'
                })
              }, 2000)
            }else if (res.data.code != '' && res.data.code != null) {
              Toast(res.status)
            } else{
              Toast("提交失败，请重试！")
            }

          })

      }
    }
  }
</script>

<style lang='less' scoped>
  #visit {
    height: calc(100vh);
    overflow: auto;
    position: relative;
    .title {
      height: 40px;
      line-height: 40px;
      background: #f8f8f8;
      padding: 0 10px;
      color: #333;
    }
    > button {
      position: absolute;
      width: 100%;
      left: 0;
      bottom: 0;
      height: 40px;
      border: none;
    }
    > ul li {
      border-bottom: 1px solid #eee;
      color: #333;
      font-size: 14px;
    }
  }

  .content {
    button {
      height: 30px;
      width: 80%;
      margin-top: 10px;
      margin-left: 10%;
    }
    .active {
      color: #5285f4;
      border-color: #3e87f6;
      background-color: #ecf3fe;
    }
  }
</style>

<style lang='less'>
  #visit {
    .mint-field {
      border-bottom: 1px solid #eee;
      color: #333;
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
          }
        }
      }
      &:nth-child(4) {
        .mint-cell-wrapper .mint-cell-title {
          width: 85px;
          span {
            letter-spacing: 28px;
          }
        }
        .mint-cell-wrapper .mint-cell-value {
          margin-left: -20px;
        }
      }
    }
  }
</style>

