<template>
<div id='complaint' style="height: 100vh;overflow: auto;">
  <mt-header title="投诉举报" style="position: fixed;top: 0;width: 100%;z-index: 100"><mt-button icon="back" slot="left" @click="$router.go(-1)"></mt-button></mt-header>
    <div class="tel">
        <li ><span>市民热线：</span><a href="tel:12345">12345</a></li>
        <li ><span>城建热线：</span><a href="tel:12319">12319</a></li>
        <li ><span>全国运输客服电话：</span><a href="tel:12328">12328</a></li>
    </div>
  <!--<div class="mycomplaint" v-show="userinfo">-->
    <!--<h3>我的投诉</h3>-->
    <!--<mt-loadmore :bottom-method="loadBottom" :bottom-all-loaded="allLoaded" :autoFill="false" bottomPullText="上拉加载更多"  topLoadingText="更新中" ref="loadmore">-->
      <!--<ul>-->
        <!--<li v-for="(item, index) in list" :key="index">-->
          <!--维修记录未上传{{item.credits?'（有凭据）':''}}<span>{{item.createTime | FormatDate}}</span>-->
        <!--</li>-->
      <!--</ul>-->
      <!--<div v-show="allLoaded" style="text-align: center; line-height: 30px; background-color: #f8f8f8; font-size: 14px; color: #999;">已经到底啦...</div>-->
    <!--</mt-loadmore>-->
  <!--</div>-->
</div>
</template>

<script>
import { Toast, Picker } from 'mint-ui'
export default {
    data(){
        return{
          list: [],
          userinfo: localStorage.getItem("USERINFO"),
          page: 1,
          allLoaded: false
        }
    },
    created(){
      // if(this.userinfo) this.getComplaints(false)
    },
    methods: {
      loadBottom(){
        this.page++
        this.getComplaints(true)
      },
      getComplaints(flag){
        let self=this
        this.axios({
          method: 'post',
          url: '/comment/company/getUserComplaints?accesstoken='+  localStorage.getItem('ACCESSTOKEN')+
            '&pageNum='+this.page +'&pageSize=10',
          headers: {
            'Content-type': 'application/json'
          },
          data:''
        }).then(res => {
          // this.list = res.data.complaintInfoBOList
          if(res.data.code=='000000'){
            self.list=self.list.concat(res.data.complaintInfoBOList)
            // self.list=res.data.comments
            if(self.list.length>=res.data.total){
              self.allLoaded=true
            }
            if(flag) self.$refs.loadmore.onBottomLoaded()
          }
          else if(res.data.code=='000003'){
            Toast('请绑定微信号')
          }else{
            Toast(res.data.status)
          }
        })
      }
    }
}
</script>

<style lang='less' scoped>
.tel{
  margin-top: 40px;
  padding: 15px;
  li{
    line-height: 30px;
  }
}
.mycomplaint{
  /*border-top: 10px solid #f8f8f8;*/
  margin-top: 40px;
  padding: 15px;
  margin-bottom: 50px;
  h3{
    font-size: 18px;
    line-height: 30px;
    font-weight: 400;
  }
  li{
    font-size: 14px;
    color: #666666;
    height: 40px;
    line-height: 40px;
    border-bottom: 1px solid #eeeeee;
    span{
      float: right;
    }
  }
  li:last-child{
    border: 0;
  }
}
</style>
