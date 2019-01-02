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
          <div class="buttons">
	          <mt-button type="primary" size="small" v-if="item.handleStatus.name=='待处理'" @click="refuse($event, item.id)">拒绝</mt-button>

	          <mt-button type="primary" size="small" v-if="item.handleStatus.name=='待处理'" @click="accept($event, item.id)">接受</mt-button>

	          <mt-button type="danger" size="small" v-if="item.handleStatus.name=='已接受' || item.handleStatus.name=='拒绝'" @click="deleteOrder(item.id)">删除订单</mt-button>
          </div>
          <div class="mui-slider-handle text-one-cut" style="position: relative;">
            <div class="mui-table-cell">
              <p>车主姓名：{{ item.ownerName }}</p>
              <p>车主电话：{{ item.contactMobile }}</p>
              <p>预约内容：{{ item.serviceContent }}</p>
              <p>预约时间：{{ item.arrivalTime | FormatDate }}</p>
            </div>
            <span v-if="item.handleStatus.name=='待处理'" style="position: absolute; top: 0; right: 0; color: #fff; background-color: skyblue; padding: 3px 8px;">待处理</span>
            <span v-if="item.handleStatus.name=='已接受'" style="position: absolute; top: 0; right: 0; color: #fff; background-color: #4CD964; padding: 3px 8px;">已接受</span>
            <span v-if="item.handleStatus.name=='拒绝'" style="position: absolute; top: 0; right: 0; color: #fff; background-color: red; padding: 3px 8px;">已拒绝</span>
          </div>
        </li>
      </ul>
    </mt-loadmore>
  </div>
</template>

<script>
  import { MessageBox, Toast, Header, Button } from 'mint-ui';
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
          url: '/service/company/order/list',
          method: 'post',
          data: {
	          "pageNo": 1,
	          "pageSize": 100
          }
        })
          .then(res=>{

              if(res.data.items && res.data.items.length){
	              this.orderList  = res.data.items
              }else {
	              Toast('暂无预约订单')
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
                url: '/service/onSiteOrderHandle',
                method: 'post',
                data: {
		            "accept": false,
		            "onSiteOrderId": id,
		            "reason": value
	            }
              }).then(res=>{
                console.log('res', res);
                if(res.data.code==='0'){

                  e.target.parentNode.nextElementSibling.children[1].innerHTML='已拒绝'
                  e.target.parentNode.nextElementSibling.children[1].style.background='red'
                  let o=document.createElement('p');
                  o.innerHTML="拒绝原因："+value;
                  this.refuseText=o.innerHTML
                  e.target.parentNode.nextElementSibling.children[0].appendChild(o)
                  e.target.parentNode.innerHTML="<a class='mui-btn mui-btn-red'>已拒绝</a>"
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
              url: '/service/onSiteOrderHandle',
              method: 'post',
              data: {
	              "accept": true,
	              "onSiteOrderId": id,
              }
            }).then(res=>{
              if(res.data.code==='0'){

                e.target.parentNode.nextElementSibling.children[1].innerHTML='已接受'
                e.target.parentNode.nextElementSibling.children[1].style.background='#4CD964'
                e.target.parentNode.innerHTML="<a class='mui-btn mui-btn-red'>已接受</a>"
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
            url: '/service/order/delete/'+id,
            method: 'post',
            data: {}
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
	  .buttons{
		  position: absolute;
		  right: 1px;
		  bottom: 2px;
		  z-index: 1;
		  >*{
			  margin-left: 5px;
		  }
	  }
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
