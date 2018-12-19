<template>
  <div class="doctor">
    <mt-header fixed title="我的预约服务"></mt-header>
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
            <li v-for="(item, index) in OrderList" class="page-loadmore-appointmentListitem" :key="index">
              <div class="block" :data-questionId="item.id">
                <div class="user">
                  <div class="userright">
                    <p style="display: inline-block">{{item.ownername ? item.ownername : '匿名'}}</p>
                    <span style="float: right">{{item.onServiceTime | FormatDate("YYYY-MM-DD HH:mm") }}</span>
                  </div>
                </div>
                <p class="question"><span style="color: #9a9a9a;">预约企业: </span>{{item.companyName}}</p>
                <p class="question"><span style="color: #9a9a9a;">服务内容: </span>{{item.servicecontent}}</p>
                <p class="question"><span style="color: #9a9a9a;">联系方式: </span>{{item.contactmobile}}</p>
                <div class="answer">
                  <span style="background-color: skyblue; border-radius: 3px;" v-if="item.handleStatus == '待处理'">待处理</span>
                  <span style="background-color: #4CD964; border-radius: 3px;" v-if="item.handleStatus == '已接受'">预约成功</span>
                  <span style="background-color: #f00; border-radius: 3px;" v-if="item.handleStatus == '拒绝'">预约被拒绝</span>
                </div>
                <div class="foot"><mt-button size="small" @click.stop="deleteAppointment(item.id)" type="danger" style="height: 23px; font-size: 12px; width: 48px;">删除</mt-button></div>
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
  import {Toast, MessageBox, Loadmore, Header } from 'mint-ui'
  import defaultImage from '@/assets/img/my/photo.png'
  export default {
    name: 'doctor',
    data () {
      return {
        defaultImage: defaultImage,
        allLoaded: false,
        bottomStatus: '',
        wrapperHeight: 0,
        OrderList: [],
        moveTranslate: 0,
        list: [],
        page: 1,
        serviceType : [{
            code: '300001', value: '上门故障诊断'
        },{
          code: '300002', value: '上门取送车服务'
        },{
          code: '300003', value: '上门更换备胎'
        },{
          code: '300004', value: '上门更换灯泡'
        },{
          code: '300005', value: '上门更换雨刮片'
        },{
          code: '300006', value: '上门电瓶泵电'
        },{
          code: '300007', value: '其他'
        }]
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
          url: '/maintain/getMyOnsiteOrderlist',
          headers: {
            'Content-type': 'application/json'
          },
          data: JSON.stringify(param)
        })
        .then(res => {
          if(this.page===1 && (!this.list|| res.data.data.length=='0')){
            MessageBox.alert('暂无数据').then(action => {
              return this.$router.go(-1)
            })
          }else {
            if(num===1){
              this.OrderList=res.data.data
            }else if(num===2) {
              this.$refs.loadmore.onTopLoaded()
              this.OrderList=res.data.data
            }else {
              this.OrderList=[...this.OrderList, ...res.data.data]
              this.$refs.loadmore.onBottomLoaded()
            }
            if(this.OrderList.length==res.data.count){
              this.allLoaded=true
            }
          }
        })
      },
      loadBottom(){
        this.page++
        this.doQuery(3);
      },

      loadTop(){
        this.page=1
        this.allLoaded=false
        this.doQuery(2);
      },

      deleteAppointment(id) {
        MessageBox.confirm('确定执行此操作?').then(action => {
          let param = {
            accessToken: localStorage.getItem("ACCESSTOKEN"),
            id: id,
          }
          this.axios({
            method: 'post',
            url: '/maintain/deleteOnsiteOrder',
            headers: {
              'Content-type': 'application/json'
            },
            data: JSON.stringify(param)
          })
            .then(res => {
                if(res.data.code === '0') {
                  Toast('删除成功!');

                  this.OrderList = [];
                  this.page = 1;
                  this.doQuery();
                } else {
                  Toast(res.data.status)
                }
            })
        });
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
      .user {
        overflow: hidden;
        img {
          width: 50px;
          height: 50px;
          border-radius: 100%;
          float: left;
          margin-right: 10px;
        }
        .userright {
          float: left;
          line-height: 25px;
          width: 100%;
          p {
            font-size: 14px;
            margin-bottom: 0;
            color: #333;
          }
          span {
            font-size: 12px;
            color: #9a9a9a;

          }
        }
      }
      .question {
        font-size: 14px;
        margin: 10px 0;
        color: #333;
      }
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
      .foot {
        font-size: 12px;
        color: #999999;
        position: absolute;
        right: 10px;
        bottom: 10px;
      }
    }
  }
</style>
