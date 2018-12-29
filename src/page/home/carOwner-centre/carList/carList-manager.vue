<template>
  <div id="carList">
    <div class='search'>
      <form action="javascript:return true;">
        <input type="search" placeholder="搜索车牌号码" class="mui-input-clear" v-model='vehicleplatenumber' @keydown="getData($event)" style="padding-left: 35px; text-indent: 0;">
      </form>
    </div>
    <div>
      <mt-loadmore :top-method="loadTop" :bottom-method="loadBottom" :bottom-all-loaded="allLoaded" :autoFill="false" bottomPullText="上拉加载更多"  topLoadingText="更新中" ref="loadmore">
        <ul>
          <li @click="goRecordList( item.repairbasicinfoId)"  class="block" v-for='(item, index) in carList' :key='index'>
            <div class="title">
              <img width="15" height="15" src="../../../../assets/img/record/list.png"/>
              <span>{{ item.vehicleplatenumber }}</span>
              <img class="arrow" src="../../../../assets/img/my/right-arrow.png" width="7px" height="14px">
            </div>
            <div class="info">
              <p><span>车架号(VIN)：{{ item.vin }}</span></p>
              <p><span>送修日期：{{ item.repairdate }}</span></p>
              <p><span>维修企业：{{ item.companyname }}</span></p>
              <p><span>结算编号：{{ item.costlistcode }}</span>
                <mt-button v-if="!userRoleId === 7" size="small" @click.stop="deleteVehicle(item.vehicleId)" type="danger" style="height: 23px; font-size: 10px; float: right;">解绑</mt-button>
              </p>
            </div>
          </li>
        </ul>
      </mt-loadmore>
    </div>
    <mt-button @click="goAddCar" v-show="loadMoreBtn" type="primary" class="add_car" size="large" style="position: fixed; left: 0;bottom: 0; border-radius: 0; border: none; width: 100%;">新增绑定车辆</mt-button>
  </div>
</template>

<script>
import { Toast, Loadmore, Button, MessageBox } from 'mint-ui'
export default {
  name: 'carList',
  mounted() {
    this.getData()
  },
  data() {
    return {
      carList: [],
      lastPage: false,
      pageNo: 1,
      vehicleplatenumber: '',
      loadMoreBtn: false,
      userRoleId: null,
      allLoaded: false
    }
  },

  created(){
    this.getUserInfo()
  },

  methods: {
    getUserInfo(){
      var userInfo=JSON.parse(localStorage.getItem("USERINFO"))
      this.userRoleId=userInfo.userRoleId
      if(userInfo.userRoleId === 1){
        this.loadMoreBtn=true
        this.allLoaded=true
      }else {
        $("#carList").css("padding-bottom", "0")
      }
    },

    goRecordList(id) {
      if(id) {
        this.$router.push({
          path: '/vehicleDetail',
          query: {id}
        })
      } else {
        Toast('该车暂无维修记录')
      }
    },

    getData(e){
	    if (e.keyCode == '13') {
		    // e.target.blur()
		    if (this.vehicleplatenumber.trim() == '') {
			    Toast('请输入车牌号')
			    return
		    }
	    }
      this.axios({
        method: 'post',
        url: '/vehicle/carfile/query4manager',
        data: {
	        byVehicleNumberStandard: "all",
	        byVinStandard: "all",
	        companyName: "",
	        pageNo: this.pageNo,
	        pageSize: 10,
	        vehicleplatenumber: this.vehicleplatenumber,
	        vin: ""
        }
      }).then(res=>{
        if(arguments.length==2){
          this.carList=[...this.carList, ...res.data.data]
          this.$refs.loadmore.onBottomLoaded();
        }else {
          this.carList = res.data.data
        }
        if (this.carList == null || this.carList.length == 0) {
          Toast('暂无数据')
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
    },

    // 下拉刷新
    loadTop(){
      this.getData(1)
    },

    // 输入车牌号进行搜索

    deleteVehicle(id) {
      MessageBox.confirm('确定执行此操作?').then(action => {
        let param = {
          accessToken: localStorage.getItem('ACCESSTOKEN'),
          vehicleId: id
        }
        this.axios({
          method: 'post',
          url: '/vehicle/carfile/remove-bind',
          headers: {
            'Content-type': 'application/json'
          },
          data: JSON.stringify(param)
        })
          .then(res => {
            if(res.data.code === '0') {
              Toast('解绑成功!');
              this.plate=''
              this.frame=''
              this.getData();
            } else {
              Toast('解绑成功!');
            }
          })
      })
    },

    goAddCar(){
      this.$router.push({
        path: "/add-car"
      })
    }
  }
}
</script>

<style scoped lang='less'>
  #carList {
  padding-top: 50px;
  height: calc(100vh);
  background-color: #f8f8f8;
  position: relative;
  .search {
    padding: 8px 12px;
    position: fixed;
    width: 100%;
    background: #fff;
    z-index: 10;
    left: 0;
    top: 0;
    form {
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
  }
  .block {
    width: 100%;
    padding: 0 10px;
    border-top: 10px solid #f8f8f8;
    background-color: #fff;
    .title {
      width: 100%;
      border-bottom: 1px solid #f8f8f8;
      height: 30px;
      overflow: hidden;
      img {
        margin-top: 7px;
      }
      .arrow {
        float: right;
        margin-right: 10px;
      }
      span {
        font-size: 16px;
        display: inline-block;
        height: 30px;
        line-height: 30px;
        margin-left: 5px;
      }
    }
    .info {
      padding: 10px 20px;
      color: #676767;
      margin: 0;
      p {
        height: 30px;
        line-height: 30px;
        font-size: 14px;
        margin-bottom: 0;
        .right {
          float: right;
        }
      }
      form {
         &:after, &:before {
            height: 0;
          }
        font-size: 14px;
        .mui-input-row {
          label {
            padding: 11px 0;
            width: 60px;
          }
          input {
            float: left;
            font-size: 14px;
            padding-left: 10px;
          }
        }
      }
    }
  }
}
</style>
