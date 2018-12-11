<template>
  <div id="carList">
    <div class='search'>
      <div style="display: flex;align-items: center">
        <img src="../../../../assets/img/footer/home.png" style="width: 15px;height: 15px;margin-top: 5px"/>
        <nobr style="font-size: 10px;height: 15px;text-align:start;margin-left: 5px;margin-right: 5px;color: #333333; " >筛选</nobr>
      </div>
        <input type="search" placeholder="搜索车牌号码、维修企业名称" class="mui-input-clear" v-model='vehicleplatenumber' @keydown="key($event)" style="padding-left: 35px; text-indent: 0;">
    </div>
      <div class="carList">
        <mt-loadmore :bottom-method="loadBottom" :bottom-all-loaded="allLoaded" :autoFill="false" bottomPullText="上拉加载更多"  topLoadingText="更新中" ref="loadmore">
          <ul>
            <li @click="goRecordList(item.vin, item.status, item.vehicleplatenumber)" class="block" v-for='(item, index) in carList' :key='index'>
              <div class="title">
                <span style="font-size: 16px">上海市金山区浪城汽车修理店</span>
                <div style="display:flex;align-items: center;">
                  <span style=" color: #666666;margin-right: 8px;font-size: 14px">详情</span>
                  <img class="arrow" src="../../../../assets/img/my/right-arrow.png" width="7px" height="14px">
                </div>
              </div>
              <div class="details">
              <div style="display: grid">
                <span style="margin-top: 8px">车牌号码:{{item.vehicleplatenumber}}</span>
                <span style="margin-top: 8px">送修日期:2018.01.01</span>
                <span style="margin-top: 8px">送修里程:5000公里</span>
              </div>
                <div style="display: flex;
    align-items: flex-end;">
                  <mt-button type="default" @click.stop="evaluate()">立即评价</mt-button>
                </div>
              </div>
            </li>
          </ul>
        </mt-loadmore>
      </div>
  </div>
</template>

<script>
import { Toast, Loadmore, Button, MessageBox, Actionsheet, Popup, Radio } from 'mint-ui'
export default {

  name: 'carList',
  mounted() {
    this.getData()
   // this.getList()
  },
  data() {
    let _this = this
    return {
      carList: [],
      p:10,
      lastPage: false,
      pageNo: 1,
      vehicleplatenumber: '',
      loadMoreBtn: false,
      userRoleId: null,
      allLoaded: false,
      sheetVisible: false,
    }
  },

  methods: {
    evaluate(){
      this.$router.push({path: '/remarkMatch', query: { corpId: '5069', show: 'yes' }})
    },
    goRecordList(id, status, vehicleplatenumber,evaluate) {
        if(status == '1'){
          MessageBox.alert('绑定车辆信息正在审核中, 请审核通过后再查看').then(action => {
            return
          })
          return
        }
        if(id) {
          this.$router.push({
            path: '/recordList',
            query: {id:id, vehicleplatenumber: vehicleplatenumber}
          })
        } else {
          Toast('该车暂无维修记录')
        }


    },

    getData(){
      let data = {
        accessToken: localStorage.getItem("ACCESSTOKEN"),
        vehicleplatenumber: this.vehicleplatenumber,
        pageSize: 10,
        pageNo: this.pageNo
      }
      if(!arguments.length){
      }
      this.axios({
        method: 'post',
        url: '/vehicle/owner/queryVehicelist',
        headers: {'Content-type': 'application/json'},
        data: JSON.stringify(data)
      })
      .then(res=>{
        this.allLoaded=true
        if(arguments.length==2){
          this.carList=[...this.carList, ...res.data.data]
          this.$refs.loadmore.onBottomLoaded();
        }else {
          this.carList = res.data.data
        }
        if (this.carList == null || this.carList.length == 0) {
          Toast('您还未绑定车辆')
        }
        if(arguments.length==1){
         this.$refs.loadmore.onTopLoaded()
        }
      })
    },

    // 上拉加载更多
    loadBottom() {
      this.pageNo+=1
     this.getData(1,2)

     // this.getList();
    },
    getList: function(){
      var i = 0,list0 = [];
      for(i ; i < this.p;i ++){
        list0.push({demo:i});
      }
      this.p+=10;
      this.carList =  list0;
      this.$refs.loadmore.onBottomLoaded()
    },

    // 下拉刷新
    loadTop(){
      this.getData(1)
    },

    // 输入车牌号进行搜索
    key(e) {
      this.pageNo=1
      if (e.keyCode == '13') {
        e.target.blur()
        if (this.vehicleplatenumber.trim() == '') {
          Toast('请输入车牌号')
          return
        }
        let data = {
          accessToken: localStorage.getItem("ACCESSTOKEN"),
          vehicleplatenumber: this.vehicleplatenumber,
          pageSize: 10,
          pageNo: this.pageNo
        }
        this.axios({
          method: 'post',
          url: '/vehicle/owner/queryVehicelist',
          headers: { 'Content-type': 'application/json' },
          data: JSON.stringify(data)
        }).then(res => {
            console.log("search---res", res);
          if (res.data.data == null || res.data.data.length < 1){
            Toast('未找到匹配车辆')
            return
          }
          this.carList = res.data.data
          this.allLoaded = true
          console.log(this.carList)
        })
      }
    },

    cancel(){
      this.popupVisible=!this.popupVisible
    },

  }
}
</script>

<style scoped lang='less'>
  #carList {
  background-color: #f8f8f8;
  overflow: auto;
  position: relative;
    .mint-loadmore{
      margin-top: 51px;
      padding-bottom: 10px;
    }
    .mint-loadmore-content{
      padding-bottom: 10px;
    }
  .search {
    display: flex;
    padding: 8px 12px;
    position: fixed;
    width: 100%;
    background: #fff;
    z-index: 10;
    left: 0;
    top: 0;
      input {
        background: url(../../../../assets/img/record/search.png) no-repeat 10px 10px;
        font-size: 14px;
        background-color: #eee;
        background-size: 18px 18px;
        text-indent: 20px;
        border-radius: 5px;
        outline: none;
        border: none;
        width: 100%;
        height: 35px;
        position: relative;
        text-align: left;
        margin-bottom: 0;
      }
      span {
        position: absolute;
        top: 8px;
        right: 12px;
        height: 35px;
        width: 50px;
        line-height: 35px;
        text-align: center;
      }
  }
  .block {
    width: 100%;
    border-top: 10px solid #f8f8f8;
    background-color: #fff;
    padding: 0px 12px;
    padding-top: 10px;
    padding-bottom: 15px;
    .title{
      display:flex;
      padding-bottom: 12px;
      border-bottom: #f8f8f8 solid 1px;
      justify-content: space-between;
    }
    .details{
      display: flex;
      justify-content: space-between;
      span{
        font-size: 12px;
        color: #666666;
      }
    }
    .mint-button--default{
      color: #4a91ff;
      background-color: white;
      font-size: 12px;
      padding: 0px 8px;
      box-shadow: 0 0 1px #b8bbbf;
    }
    .mint-button{
      height: 30px;
      //border-color: 1px solid red;

    }
  }
}
</style>
