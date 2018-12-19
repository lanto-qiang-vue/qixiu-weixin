<template>
  <div id="appointmentOrder">
    <mt-header fixed title="预约订单"></mt-header>
    <mt-loadmore
      :top-method="loadTop"
      :bottom-method="loadBottom"
      :bottom-all-loaded="allLoaded"
      ref="loadmore">

      <ul class="mui-table-view" style="min-height: calc(100vh - 36px);">
        <li class="mui-table-view-cell" v-for="(item, index) in orderList" :key="index">
          <div class="mui-slider-right mui-disabled">
            <a class="mui-btn mui-btn-red" v-if="item.handleStatus=='待处理'" @click="refuse($event, item.id)">拒绝</a>
            <a class="mui-btn mui-btn-green" v-if="item.handleStatus=='待处理'" @click="accept($event, item.id)">接受</a>
            <a class="mui-btn mui-btn-green" v-if="item.handleStatus=='已接受' || item.handleStatus=='拒绝'" @click="deleteOrder(item.id)">删除该订单?</a>
          </div>
          <div class="mui-slider-handle text-one-cut" style="position: relative;">
            <div class="mui-table-cell">
              <p>车主姓名：{{ item.ownername }}</p>
              <p>车主电话：{{ item.contactmobile }}</p>
              <p>预约内容：{{ item.servicecontent }}</p>
              <p>预约时间：{{ item.onServiceTime | FormatDate('YYYY-MM-DD HH:mm') }}</p>
            </div>
            <span v-if="item.handleStatus=='待处理'" style="position: absolute; top: 0; right: 0; color: #fff; background-color: skyblue; padding: 3px 8px;">待处理</span>
            <span v-if="item.handleStatus=='已接受'" style="position: absolute; top: 0; right: 0; color: #fff; background-color: #4CD964; padding: 3px 8px;">接受</span>
            <span v-if="item.handleStatus=='拒绝'" style="position: absolute; top: 0; right: 0; color: #fff; background-color: red; padding: 3px 8px;">拒绝</span>
          </div>
        </li>
      </ul>
    </mt-loadmore>
  </div>
</template>

<script>
  import { MessageBox, Toast, Header } from 'mint-ui';
  export default{
    name: "appointmentOrder",

    data(){
      return {
        allLoaded: false,
        orderList: [],
        refuseText: ''
      }
    },
    created(){
      this.getOrderList()
    },
    methods: {
      getOrderList(){
        this.axios({
          url: '/maintain/getOnsiteOrderlist',
          method: 'post',
          headers: {'Content-type': 'application/json'},
          data: JSON.stringify({
            accessToken: localStorage.getItem("ACCESSTOKEN")
          })
        })
          .then(res=>{
            if(res.data.code==='0'){
              if(!res.data.data || res.data.data.length=='0'){
                Toast('暂无预约订单')
                this.$router.go(-1)
              }
              this.orderList  = res.data.data
            }else{
              Toast(res.data.status)
            }
          })
      },
      refuse(e, id){
        MessageBox.confirm('确定拒绝此订单?').then(action => {
            MessageBox.prompt('请输入拒绝原因').then(({ value, action }) => {
              if(!value || value.trim()===''){
                return Toast("拒绝原因不能为空")
              }
              this.axios({
                url: '/maintain/onsiteOrderHandle',
                method: 'patch',
                headers: {"Content-type": 'application/json'},
                data: JSON.stringify({
                  accept: false,
                  accessToken: localStorage.getItem("ACCESSTOKEN"),
                  reason: value,
                  onSiteOrderId: id
                })
              }).then(res=>{
                console.log('res', res);
                if(res.data.code==='0'){

                  e.target.parentNode.nextElementSibling.children[1].innerHTML='已拒绝'
                  e.target.parentNode.nextElementSibling.children[1].style.background='red'
                  let o=document.createElement('p');
                  o.innerHTML="拒绝原因："+value;
                  this.refuseText=o.innerHTML
                  e.target.parentNode.nextElementSibling.children[0].appendChild(o)
                  e.target.parentNode.innerHTML="<a class='mui-btn mui-btn-red'>您已拒绝此订单</a>"
                }else {
                  Toast(res.data.status)
                }
              })
            },({ value, action }) => {

            })
          },
        action=>{

        });
      },
      accept(e, id){
        MessageBox.confirm('确定接受此订单?').then(action => {
            this.axios({
              url: '/maintain/onsiteOrderHandle',
              method: 'patch',
              headers: {"Content-type": 'application/json'},
              data: JSON.stringify({
                accept: true,
                accessToken: localStorage.getItem("ACCESSTOKEN"),
                onSiteOrderId: id
              })
            }).then(res=>{
              if(res.data.code==='0'){

                e.target.parentNode.nextElementSibling.children[1].innerHTML='已接受'
                e.target.parentNode.nextElementSibling.children[1].style.background='#4CD964'
                e.target.parentNode.innerHTML="<a class='mui-btn mui-btn-red'>您已接受此订单</a>"
              }else {
                Toast(res.data.status)
              }
            })
          },
          action=>{

          });
      },
      loadTop(){
        this.$refs.loadmore.onTopLoaded();
      },
      loadBottom(){
        this.$refs.loadmore.onBottomLoaded();
      },
      deleteOrder(id){
        MessageBox.confirm('确定执行此操作?').then(action => {
          this.axios({
            url: '/maintain/deleteOnsiteOrder',
            method: 'post',
            headers: {'Content-type': 'application/json'},
            data: JSON.stringify({
              accessToken: localStorage.getItem("ACCESSTOKEN"),
              id
            })
          }).then(res=>{
            if(res.data.code==='0'){
              Toast("删除成功")
              this.getOrderList()
            }else {
              Toast(res.data.status)
            }
          })
        })
      }
    }
  }
</script>

<style lang='less' scoped>
  #appointmentOrder {
    height: calc(100vh);
    background-color: #fff;
    padding-top: 40px;
    ul li {
      border-bottom: 10px solid #f8f8f8;
      .mui-slider-handle {
        p {
          font-size: 15px;
          overflow: hidden;
          text-overflow: ellipsis;
          white-space: nowrap;
        }
      }
    }
  }
</style>
