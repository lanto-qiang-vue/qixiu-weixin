<template>
  <div class="suggest">
    <div class="title">分类标签</div>
    <div class="content">
      <button type="button" @click='checkoutTag($event)' :data-index="item.index"
              :class="{'mui-btn': true, 'active': i==index}" v-for='(item, i) in tags' :key="i">{{ item.name }}
      </button>
    </div>
    <div class="title">我要反馈</div>
    <textarea name="" cols="30" v-model='text' rows="4" placeholder="期待您的宝贵意见,我们将为您带来更好的使用体验"></textarea>

    <button @click="submit" type="button" data-loading-text='提交中' data-loading-icon="mui-spinner mui-spinner-custom"
            class="mui-btn mui-btn mui-btn-primary">提交
    </button>
    <mt-actionsheet
      :actions="actions"
      v-model="sheetVisible">
    </mt-actionsheet>
  </div>
</template>

<script>
  import {Actionsheet, Toast} from 'mint-ui'
  export default {
    data(){
      var self = this
      return {
        actions: [
          {
            name: '拍照', method: function () {
            self.getWXtoken()
            // wx.config({
            //     debug: true, // 开启调试模式,调用的所有api的返回值会在客户端alert出来，若要查看传入的参数，可以在pc端打开，参数信息会通过log打出，仅在pc端时才会打印。
            //     appId: 'gh_cb13915aaf46', // 必填，公众号的唯一标识
            //     timestamp: 1, // 必填，生成签名的时间戳
            //     nonceStr: '', // 必填，生成签名的随机串
            //     signature: '',// 必填，签名，见附录1
            //     jsApiList: [] // 必填，需要使用的JS接口列表，所有JS接口列表见附录2
            // });
            self.openCamera()
          }
          },
          {
            name: '从相册中选择', method: function () {
            self.openPhoto()
          }
          }
        ],
        sheetVisible: false,
        tags: [
          {name: '功能建议', index: 0},
          {name: '体验建议', index: 1},
          {name: '内容建议', index: 2},
        ],
        index: 0,
        text: '',
        picURL: [
          "http://static.shanghaiqixiu.org/images/2017/11/8/pic_1512726836942.jpg",
          "http://mpic.tiankong.com/1b6/f9f/1b6f9f722eb791cfbf22d2133dacd6c9/640.jpg",
          "http://mpic.tiankong.com/6d2/a9a/6d2a9af50ae64f13c226110e17792d9b/640.jpg"
        ],
      }
    },
    mounted (){
    },
    methods: {
      addClick() {
          document.getElementById('file').click();
      },
      getWXtoken(){
        var data = {
          access_toke: 1,
          type: jsapi
        }
        this.axios({
          method: 'get',
          url: 'https://api.weixin.qq.com/cgi-bin/ticket/getticket',
          headers: {
            'Content-type': 'application/json'
          }
        }).then(res => {
          console.log(res);
        })
      },
      submit(e) {   //点击提交按钮
        if (this.text.trim() == '') {
          Toast('请输入反馈内容')
          return
        }
        let param = {
          systemToken: localStorage.getItem('SYSTEMTOKEN'),
          suggestion: this.text
        };
        this.axios({
          method: 'post',
          url: '/supervision/submitFeedback',
          headers: {
            'Content-type': 'application/json'
          },
          data: JSON.stringify(param)
        })
          .then(response => {

            if (response.data.code === '000000') {
              this.text = ''

              setTimeout(function () {
                Toast('提交成功')

              }, 1000)
            } else {
              Toast('提交失败')
            }
          })
      },
      openCamera(){   // 调取手机本地相机    参照网址:https://mp.weixin.qq.com/debug/wxadoc/dev/api/media-picture.html#wxchooseimageobject
        wx.chooseImage({
          count: 1,  //选择照片的数量
          sizeType: ['original', 'compressed'],    // 可以指定是原图还是压缩图，默认二者都有
          sourceType: ['album'],  // 可以指定来源是相册还是相机，默认二者都有
          success: function (res) {
            // 返回选定照片的本地文件路径列表，tempFilePath可以作为img标签的src属性显示图片
            var tempFilePaths = res.tempFilePaths
          }
        })
      },
      openPhoto(){     // 调取手机本地相册
        wx.chooseImage({
          count: 1,  //选择照片的数量
          sizeType: ['original', 'compressed'],    // 可以指定是原图还是压缩图，默认二者都有
          sourceType: ['camera'],  // 可以指定来源是相册还是相机，默认二者都有
          success: function (res) {
            // 返回选定照片的本地文件路径列表，tempFilePath可以作为img标签的src属性显示图片
            var tempFilePaths = res.tempFilePaths
          }
        })
      },
      checkoutTag(e){
        this.index = e.target.getAttribute('data-index')
      },
    }
  }
</script>

<style lang='less'>
  body {
    background-color: #f8f8f8;
  }

  .suggest {
    .title {
      background-color: #f8f8f8;
      height: 40px;
      line-height: 40px;
      padding-left: 15px;
    }
    .content {
      height: 70px;
      padding-left: 15px;
      button {
        height: 40px;
        width: 80px;
        margin-top: 15px;
        margin-right: 12px;
      }
      .active {
        color: #5285f4;
        border-color: #3e87f6;
        background-color: #ecf3fe;
      }
    }
    textarea {
      border: none;
      font-size: 14px;
      margin-bottom: 10px;
      // padding-bottom: 0px;
    }
    .addWrap {
      padding: 0 0 15px 15px;
      .addPic {
        width: 50px;
        height: 50px;
        border: 1px dashed #ccc;
        border-radius: 5px;
        background: url(../assets/img/record/add.png) no-repeat center center;
        background-size: 50% 50%;
      }
    }
    .mui-btn-primary {
      position: fixed;
      bottom: 0;
      width: 100%;
      height: 40px;
      border: none;
      font-size: 16px;
    }
  }
</style>
