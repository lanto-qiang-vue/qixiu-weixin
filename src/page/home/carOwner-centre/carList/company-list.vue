<template>
  <div id="carList">
    <div class='search'>
      <form action="javascript:return true;">
        <input type="search" placeholder="查询企业名称" class="mui-input-clear" v-model='name' @keydown="getData($event,false, true)" style="padding-left: 35px; text-indent: 0;">
      </form>
    </div>
    <div style="margin-top: 40px">
      <mt-loadmore  :bottom-method="loadBottom" :bottom-all-loaded="allLoaded" :autoFill="false" bottomPullText="上拉加载更多"  topLoadingText="更新中" ref="loadmore">
        <ul>
          <li @click="goRecordList( item.companyName)"  class="block" v-for='(item, index) in carList' :key='index'>
            <div class="title">
              <img width="15" height="15" src="../../../../assets/img/record/list.png"/>
              <span>{{ item.companyName }}</span>
              <img class="arrow" src="../../../../assets/img/my/right-arrow.png" width="7px" height="14px">
            </div>
            <div class="info">
              <p>经营地址：{{ item.businessAddress }}</p>
              <p>经营类别：{{ item.category }}</p>
              <p>经营范围：{{ item.businessScope }}</p>
              <p>营业状态：{{ item.businessStatus }}</p>
              <p>所在区域：{{ item.shortName }}</p>
            </div>
          </li>
        </ul>
	      <div v-show="allLoaded" style="text-align: center; line-height: 30px; background-color: #f8f8f8; font-size: 14px; color: #999;">已经到底啦...</div>
      </mt-loadmore>
    </div>
  </div>
</template>

<script>
import { Toast, Loadmore, Button, MessageBox } from 'mint-ui'
export default {
  name: 'carList',
  data() {
    return {
      carList: [],
      lastPage: false,
      pageNo: 1,
	    name: '',
      loadMoreBtn: false,
      userRoleId: null,
      allLoaded: false
    }
  },

  created(){
	  this.getData(true, false)
  },

  methods: {

    goRecordList(name) {
        this.$router.push({
          path: '/record-list-manager',
          query: {name}
        })
    },

    getData(e, flag, clear){

	    if(e=== true){
		    this.req(flag)
	    }
	    if (e &&e.keyCode == '13') {
		    // e.target.blur()
		    if (this.name.trim() == '') {
			    Toast('请输入企业名称')
			    return
		    }
		    if(clear){
			    this.pageNo= 1
		    }
		    this.req(flag)
	    }

    },

	  req(flag){
		  this.axios({
			  method: 'post',
			  url: '/vehicle/repair/query',
			  data: {
				  pageNo: this.pageNo,
				  pageSize: 10,
				  companyName: this.name,
			  }
		  }).then(res=>{

			  this.carList=this.carList.concat(res.data.items)
			  // this.list=res.data.comments
			  if(this.carList.length>=res.data.total){
				  this.allLoaded=true
			  }
			  if(flag) this.$refs.loadmore.onBottomLoaded()
		  })
	  },

    // 上拉加载更多
    loadBottom() {
      this.pageNo++
      this.getData(true,true)
    },



  }
}
</script>

<style scoped lang='less'>
  #carList {
  height: 100vh;
  background-color: #f8f8f8;
  /*position: relative;*/
	  overflow: auto;
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
	    position: relative;
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
	      position: absolute;
	      padding-left: 20px;
	      width: 100%;
	      overflow: hidden;
	      text-overflow: ellipsis;
	      padding-right: 20px;
	      left: 0;
	      top: 0;
	      white-space: nowrap;
      }
    }
    .info {
      padding: 5px 10px;
      color: #676767;
      margin: 0;
      p {
        height: 30px;
        line-height: 30px;
        font-size: 14px;
        margin-bottom: 0;
	      width: 100%;
	      white-space: nowrap;
	      overflow: hidden;
	      text-overflow: ellipsis;
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
