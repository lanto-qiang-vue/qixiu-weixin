<template>
  <div class="doctor">
    <mt-header fixed title="我的上门服务"></mt-header>
    <div class="page-loadmore">
      <div class="page-loadmore-wrapper" ref="wrapper">
        <mt-loadmore
          :top-method="loadTop"
          :bottom-method="loadBottom"
          :bottom-all-loaded="allLoaded"
          bottomPullText="上拉加载更多"
          topLoadingText="更新中"
          ref="loadmore">
          <ul class="page-loadmore-appointmentList" style="min-height: calc(100vh - 40px)">
            <li v-for="(item, index) in appointmentList" class="page-loadmore-appointmentListitem" :key="index">
              <div class="block" :data-questionId="item.id">
                <div class="crop">
                  <div class="lf fl"></div>
                  <!--<div @click.stop="deleteAppointment(item.id)" class="rht" style="float: right; color: #f00; padding: 2px 5px; border: 1px solid #f00; background: rgba(200,10,10,.1); border-radius: 3px;">删除</div>-->
                  <div class="ce">
                    <h4>{{ item.companyName }}</h4>
                    <p style="color: #999;">{{ item.modifytime | FormatDate("YYYY-MM-DD HH:mm:ss") }}</p>
                  </div>
                </div>
                <div class="content">
                  <p>服务内容：{{ item.servicetype | FormatService(serviceContent, item.servicetype) }}</p>
                  <p>联系方式：{{ item.ownername }}&nbsp;&nbsp;{{ item.contactmobile }}</p>
                  <p>联系地址：{{item.contactaddress}}</p>
                </div>
                <div class="footer_btn clearfix">
                  <div class="answer" style="float: left;">
                    <span class="violet" v-if="item.status == '1'">新增</span>
                    <span class="blue" v-if="item.status == '2'">已指派企业</span>
                    <span class="blue" v-if="item.status == '3'">已回复</span>
                  </div>
                  <!--<div class="evaluate">评价</div>-->
                  <!--<div class="come_again">再次上门</div>-->
                </div>
              </div>
            </li>
            <div v-if="allLoaded" style="text-align: center; line-height: 30px; background-color: #f8f8f8; font-size: 14px; color: #999;">暂无更多数据...</div>
          </ul>
        </mt-loadmore>
      </div>
    </div>
  </div>
</template>

<script>
  import {Toast, MessageBox} from 'mint-ui'
  import defaultImage from '@/assets/img/my/photo.png'
  export default {
    name: 'doctor',
    data() {
      return {
        defaultImage: defaultImage,
        allLoaded: false,
        appointmentList: [],
        page: 1,
        serviceContent : [
          {code: '300001', value: '上门故障诊断'},
          {code: '300002', value: '上门取送车服务'},
          {code: '300003', value: '上门更换备胎'},
          {code: '300004', value: '上门更换灯泡'},
          {code: '300005', value: '上门更换雨刮片'},
          {code: '300006', value: '上门电瓶泵电'},
          {code: '300007', value: '其他'}
        ]
      }
    },

    created(){
      this.doQuery(1)
    },
    methods: {
      doQuery(num) {
        let param = {
          accessToken: localStorage.getItem("ACCESSTOKEN"),
          pageSize: 10,
          pageNo: this.page
        }
        this.axios({
          method: 'post',
          url: '/maintain/getMyOnsiteServicelist',
          headers: {
            'Content-type': 'application/json'
          },
          data: JSON.stringify(param)
        })
        .then(res => {
          if(this.page===1 && (!res.data.data || res.data.data.length=='0')){
            MessageBox.alert('暂无数据').then(action => {
              return this.$router.go(-1)
            })
          } else {
            if(num===1){
              this.appointmentList=res.data.data
            }else if(num===2) {
              this.$refs.loadmore.onTopLoaded()
              this.appointmentList=res.data.data
            }else {
              this.appointmentList=[...this.appointmentList, ...res.data.data]
              this.$refs.loadmore.onBottomLoaded()
            }
            if(this.appointmentList.length==res.data.count){
              this.allLoaded=true
            }
          }
        })
      },
      loadBottom() {
        this.page++
        this.doQuery(3);
      },

      loadTop() {
        this.page=1
        this.allLoaded=false
        this.doQuery(2)
      },

      deleteAppointment(id) {
        MessageBox.confirm('确定执行此操作?').then(action => {
          let param = {
            accessToken: localStorage.getItem("ACCESSTOKEN"),
            id: id,
          }
          this.axios({
            method: 'post',
            url: '/maintain/delete',
            headers: {
              'Content-type': 'application/json'
            },
            data: JSON.stringify(param)
          })
          .then(res => {
            if(res.data.code === '0') {
              Toast('删除成功!');
              this.appointmentList = [];
              this.page = 1;
              this.doQuery();
            } else {
              Toast('删除失败!');
            }
          })
        })
      }
    }
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang='less'>
  .doctor {
    padding-top: 40px;
    background-color: #f8f8f8;
    .block {
      width: 100%;
      overflow: hidden;
      border-top: 10px solid #f8f8f8;
      padding: 10px;
      position: relative;
      background-color: #fff;
      .crop {
        .lf {
          width: 35px;
          height: 35px;
          background: url("../assets/img/other/shqxw.jpg") no-repeat center center;
          background-size: auto 100%;
          -webkit-background-size: auto 100%;
          border-radius: 4px;
        }
        .ce{
          margin: 0 45px 0 40px;
          h4 {
            font-weight: normal;
            font-size: 16px;
            margin: 0;
            line-height: 20px;
          }
          p {
            margin: 0;
            font-size: 12px;
          }
        }
        .rht {
          width: 45px;
          font-size: 14px;
          text-align: center;
        }
      }
      .content {
        padding: 5px 0 10px 40px;
        p{
          margin: 3px 0;
          color: #999;
        }
      }
      .footer_btn {
        .answer {
          font-size: 12px;
          span {
            display: block;
            padding: 1px 5px;
            color: white;
            float: left;
          }
          p {
            margin-left: 55px;
            margin-bottom: 30px;
            color: #666;
          }
          .violet {
            background-color: #93adf8;
          }
          .blue {
            background-color: #599ef9;
          }
        }
        .come_again, .evaluate {
          float: right;
          width: 70px;
          height: 30px;
          border: 1px solid #ccc;
          border-radius: 3px;
          font-size: 14px;
          text-align: center;
          line-height: 30px;
          margin-left: 15px;
          color: #666;
        }
        .evaluate {
          float: right;
          color: #4285f4;
          border-color: #4285f4;
        }
      }
    }
  }
</style>
