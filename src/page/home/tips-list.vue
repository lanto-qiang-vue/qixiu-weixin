<template>
  <div id="government-service-list">
    <mt-header title="爱车小贴士">
      <a @click="$router.go(-1)" slot="left">
        <mt-button icon="back"></mt-button>
      </a>
    </mt-header>
    <div style="overflow: auto; height: calc(100vh - 40px)">
      <mt-loadmore :bottom-method="loadBottom" :bottom-all-loaded="allLoaded" :autoFill="false" bottomPullText="上拉加载更多"  topLoadingText="更新中" ref="loadmore">

        <a :href="item.url" class="msg" v-for="(item, index) in infoPublicList" :key="index">
          <p>{{item.title}}</p>
          <!--<span>{{item.typeName}}-{{ item.publishTime | FormatDate}}</span>-->
          <!--<div>-->
            <!--<img :src="item.photo"/>-->
          <!--</div>-->
        </a>

        <div v-show="allLoaded" style="text-align: center; line-height: 30px; background-color: #f8f8f8; font-size: 14px; color: #999;">已经到底啦...</div>
      </mt-loadmore>
    </div>
  </div>
</template>

<script>
  import { Toast
    // , Header, Navbar, TabItem, Cell
  } from 'mint-ui';
  export default {
    name: "tips-list",
    data () {
      return {
        infoPublicList: [],
        category: '',
        title: this.$route.query.name,
        page: 0,
        count:0,
        allLoaded: false
      }
    },
    created() {
      this.queryData(false)
    },
    methods: {
      loadBottom() {
        this.page++
        this.queryData(true)
      },
      queryData(flag) {
        let self = this

        this.axios({
          method: 'get',
          url: '/weixin/qixiu/material/query?type=news&offset='+this.page+'&count=20',
          headers: {'Content-type': 'application/json'},
        })
          .then(res => {
            if(res.data.item){
              let list= res.data.item
              for(let i in list){
                let news= list[i].content.news_item
                for(let j in news){
                  if(news[j].title.indexOf('爱车小贴士')>=0 && news[j].thumb_url){
                    let imgarr= news[j].content.match( /<img\b.*?(?:\>|\/>)/gi)
                    news[j].headimg= imgarr? imgarr[0].match(/\bsrc\b\s*=\s*[\'\"]?([^\'\"]*)[\'\"]?/i )[1]: ''
                    // console.log(news[j].headimg)
                    this.infoPublicList.push(news[j])
                  }
                }
              }
              this.count+=res.data.item_count
              if(this.count>=res.data.total_count){
                this.allLoaded=true
              }
              if(flag) this.$refs.loadmore.onBottomLoaded()
            } else {
              // Toast(res.data.status);
            }
          })
      },
    }
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang='less'>
  #government-service-list {
    .msg {
      display: block;
      padding: 10px;
      border-bottom: 1px solid #f7f7f7;
      font-size: 14px;
      position: relative;
      p {
        color: #333;
        /*margin-bottom: 5px;*/
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


