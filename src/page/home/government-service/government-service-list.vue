<template>
  <div id="government-service-list">
    <mt-header :title="title">
      <a @click="$router.go(-1)" slot="left">
        <mt-button icon="back"></mt-button>
      </a>
    </mt-header>
    <div style="overflow: auto; height: calc(100vh - 40px)">
      <mt-loadmore :bottom-method="loadBottom" :bottom-all-loaded="allLoaded" :autoFill="false" bottomPullText="上拉加载更多"  topLoadingText="更新中" ref="loadmore">

      <div @click="goOut(item.id)" class="msg" v-for="(item, index) in infoPublicList">
        <p>{{item.title}}</p>
        <span>{{item.category.name}}-{{ item.publishTime | FormatDate}}</span>
        <!--<div>-->
          <!--<img :src="item.photo"/>-->
        <!--</div>-->
      </div>

        <div v-show="allLoaded" style="text-align: center; line-height: 30px; background-color: #f8f8f8; font-size: 14px; color: #999;">已经到底啦...</div>
      </mt-loadmore>
    </div>
  </div>
</template>

<script>
  import { Toast
    // , Header, Navbar, TabItem, Cell
  } from 'mint-ui';
  // import { TabContainer, TabContainerItem } from 'mint-ui';
  export default {
    name: 'governmentServiceList',
    data () {
      return {
        infoPublicList: [],
        category: '',
        title: this.$route.query.name,
        page: 1,
        allLoaded: false
      }
    },
    created() {
      this.queryData(false)
    },
    methods: {
      loadBottom(){
        this.page++
        this.queryData(true)
      },
      queryData(flag) {
        let self= this
        this.category= this.$route.query.id
          // if(this.$route.query.id==="1"){
          //   this.category="10281001"
          // }else if(this.$route.query.id==="2"){
          //   this.category="10281002"
          // }else if(this.$route.query.id==="3"){
          //   this.category="10281003"
          // }else if(this.$route.query.id==="4"){
          //   this.category="10281004"
          // }else if(this.$route.query.id==="5"){
          //   this.category="10281005"
          // }else if(this.$route.query.id==="6"){
          //   this.category="10281006"
          // }else if(this.$route.query.id==="7"){
          //   this.category="10281007"
          // }else if(this.$route.query.id==="8"){
          //   this.category="10281010"
          // }else if(this.$route.query.id==="9"){
          //   this.category="10281009"
          // }else if(this.$route.query.id==="10"){
          //   this.category="10281017"
          // }else if(this.$route.query.id==="11"){
          //   this.category="10281016"
          // }
          this.axios({
            method: 'post',
            url: '/infopublic/home/all',
            data: {
	            "infoType": this.category,
	            "pageNo": this.page,
	            "pageSize": 10
            }
          })
          .then(res => {
            // this.infoPublicList = res.data.data.dataList;

              // console.log(res.data)
              self.infoPublicList =self.infoPublicList.concat(res.data.items)
              // self.list=self.list.concat(res.data.comments)
              // self.list=res.data.comments
              if(self.infoPublicList.length>=res.data.total){
                self.allLoaded=true
              }
              if(flag) self.$refs.loadmore.onBottomLoaded()

          })
      },
      goOut(infoId){
        this.$router.push({ path: '/infoDetail', query: {infoId: infoId}})
      },
      // queryDetail(id) {
      //   this.loadingShow = true;
      //   this.axios({
      //     method: 'get',
      //     url: '/infopublic/article/detail/' + localStorage.getItem("SYSTEMTOKEN") + '/' + id,
      //     headers: {
      //       'Content-type': 'application/json'
      //     }
      //   }).then(res => {
      //     this.infoDetail = res.data.data;
      //
      //   }).catch(function (error) {
      //   })
      // }
    },
    // components: {
    //   mtCell: Cell,
    //   mtNavbar: Navbar,
    //   mtTabItem: TabItem,
    //   mtTabContainer: TabContainer,
    //   mtTabContainerItem: TabContainerItem
    // }
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang='less'>
  #government-service-list {
    .msg {
      padding: 10px;
      border-bottom: 1px solid #f7f7f7;
      font-size: 14px;
      position: relative;
      p {
        color: #333;
        margin-bottom: 5px;
      }
      div {
        width: 50px;
        height: 50px;
        overflow: hidden;
        position: absolute;
        top: 10px;
        right: 10px;
        border-radius: 10px;
        img {
          height: 100%;
          width: auto;
        }
      }
      span {
        display: block;
        font-size: 12px;
        color: #8f8f8f;
        bottom: 10px;
      }
    }
  }
</style>

