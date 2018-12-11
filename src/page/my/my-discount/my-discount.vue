<template>
  <div id="discount">
    <mt-header fixed title="我的优惠券"></mt-header>
    <ul>
      <li v-for="(item, index) in ticketList" :key="index">
        <div class="shixiao" v-if="item.expire"></div>
        <a href="javascript:;" style="display: block; border-bottom: 1px dashed #ccc">
          <div class="clearfix">
            <div class="top">
              <span class="fl">{{ item.activity }}</span>
              <span class="fr">{{ item.seq }}</span>
            </div>
            <div class="bottom clearfix">
              <b>{{ item.activity == '2018途虎养车月活动' ? '洗车券' : '抵用券' }}</b>
              <div class="fl left">
                <span>{{ item.amount == 20 ? 20 : '&nbsp;1' }}<label>元</label></span>
              </div>
              <div class="right">
                <p>日期：{{ item.useTime | FormatDate }}</p>
                <p class="text-one-cut">门店：{{ item.corpName }}</p>
              </div>
            </div>
          </div>
        </a>
        <div class="explain" v-html="item.direction"></div>
      </li>
    </ul>
  </div>
</template>

<script>
  import { Toast, Header } from "mint-ui"
  export default{
    name: "myDiscount",

    data(){
      return {
        ticketList: [],
      }
    },
    created(){
      this.axios({
        url: '/activity/couponList/'+localStorage.getItem("ACCESSTOKEN"),
        method: 'get'
      })
        .then(res=>{
          console.log(res);
          if(res.data.code==="000000"){
            this.ticketList=res.data.data
          } else if (res.data.code==="131303"){
            this.$router.go(-1)
            Toast(res.data.status)
          } else {
            Toast(res.data.status)
          }
        })
    }
  }
</script>

<style lang='less' scoped>
  #discount {
    height: calc(100vh);
    background-color: #f8f8f8;
    padding: 45px 15px 15px;
    >ul li {
      margin-bottom: 15px;
      position: relative;
      .shixiao{
        position: absolute;
        z-index: 999;
        width: 80px;
        height: 80px;
        right: 20px;
        top: 35px;
        background: url(/static/img/activity/sx.png) no-repeat center center;
        -webkit-background-size: contain;
        background-size: contain;
      }
      a >div{
        border-radius: 5px;
        color: #000;
        .top {
          color: #fff;
          background: url(../../../assets/img/my/discount.png) repeat-x;
          line-height: 30px;
          padding: 0 15px;
          height: 35px;
          -webkit-background-size: 100% 100%;
          background-size: 100% 100%;
          font-size: 14px;
        }
        .bottom {
          padding: 20px 10px 20px 10px;
          background-color: #fff;
          position: relative;
          b {
            position: absolute;
            bottom: 5px;
            left: 22px;
            font-weight: normal;
            font-size: 14px;
          }
          .left {
            width: 85px;
            span {
              line-height: 40px;
              font-size: 38px;
              border-right: 1px solid #000;
              padding-right: 10px;
              label {
                font-size: 22px;
              }
            }
          }
          .right {
            height: 45px;
            margin-left: 85px;
            p {
              margin: 0;
              line-height: 23px;
              color: #333;
            }
          }
        }
      }
    }
  }
</style>

<style lang='less'>
  #discount {
    .explain {
      padding: 10px;
      background-color: #fff;
      border-radius: 0 0 5px 5px;
      p {
        color: #333;
        margin-bottom: 0 !important;
      }
    }
  }
</style>
