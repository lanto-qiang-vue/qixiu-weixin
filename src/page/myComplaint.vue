<template>
<div id='complaint' style="height: 100vh;overflow: auto;">
  <mt-header title="我的反馈" style="position: fixed;top: 0;width: 100%;z-index: 100"><mt-button icon="back" slot="left" @click="$router.go(-1)"></mt-button></mt-header>

  <div class="mycomplaint">
    <!--<h3>我的反馈</h3>-->
    <mt-loadmore :bottom-method="loadBottom" :bottom-all-loaded="allLoaded" :autoFill="false" bottomPullText="上拉加载更多"  topLoadingText="更新中" ref="loadmore">
      <ul>
        <li v-for="(item, index) in list" :key="index">
          {{getType(item.type.toString())}}{{item.photoUrl?'（有凭据）':''}}<span>{{item.createDate | FormatDate}}</span>
        </li>
      </ul>
      <div v-show="allLoaded" style="text-align: center; line-height: 30px; background-color: #f8f8f8; font-size: 14px; color: #999;">已经到底啦...</div>
    </mt-loadmore>
  </div>

  <!--<mt-popup v-model="selectvisible"  style="width: 90%" class="select">-->
    <!--<mt-radio title="反馈类型" v-model="type" :options="options"></mt-radio>-->
  <!--</mt-popup>-->

  <!--<div class="on button" @click="selectvisible=true">反馈类型：{{typeName}}</div>-->
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
          allLoaded: false,

          type: this.$route.query.type?  this.$route.query.type.toString() : '0',
          selectvisible: false,
          options:[
            { label: '维修记录未上传', value: '0'},
            { label: '维修记录不正确', value: '1'},
          ]
        }
    },
    created(){
      this.getComplaints(this.type,false)
    },
    computed:{
      typeName(){
        let name=''
        switch (this.type){
          case '0': name= '维修记录未上传'; break
          case '1': name= '维修记录不正确';break
          default: name= '维修记录未上传';break
        }
        return name
      }
    },
    watch:{
      type(val){
        this.list=[]
        this.getComplaints(val,false)
        this.selectvisible=false
      }
    },
    methods: {
      loadBottom(){
        this.page++
        this.getComplaints(this.type,true)
      },
      getComplaints(type,flag){
        let self=this
        this.axios({
          method: 'get',
          // url: '/comment/company/getUserComplaints?accesstoken='+  localStorage.getItem('ACCESSTOKEN')+'&pageNum='+this.page +'&pageSize=10&complaintType='+type,
          url: '/comment/complaint/maintain/query/userId?size=10&page='+(this.page-1),
        }).then(res => {
          // this.list = res.data.complaintInfoBOList

            self.list=self.list.concat(res.data.content)
            // self.list=res.data.comments
            if(self.list.length>=res.data.totalElements){
              self.allLoaded=true
            }
            if(flag) self.$refs.loadmore.onBottomLoaded()

        })
      },
      getType(type){
        switch (type){
          case '0': return '维修记录未上传';break
          case '1': return '维修记录不正确';break
          default: return '维修记录未上传';break
        }
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
  padding: 0 15px;
  /*margin-bottom: 50px;*/
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
    position: relative;
    span{
      position: absolute;
      top: 0;
      right: 0;
    }
  }
  li:last-child{
    border: 0;
  }
}
.button{
  height: 40px;
  line-height: 40px;
  text-align: center;
  font-size: 16px;
  color: white;
  background-color: #438eff;
  border-radius: 5px;
  width: 90%;
  position: fixed;
  left: 0;
  right: 0;
  bottom: 10px;
  margin: auto;
}
</style>
