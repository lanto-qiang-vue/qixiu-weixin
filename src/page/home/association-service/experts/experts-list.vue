<template>
  <div id='expertList_container'>
      <mt-loadmore :top-method="loadTop" :bottom-method="loadBottom" :bottom-all-loaded="allLoaded" :autoFill="false" bottomPullText="上拉加载更多"  topLoadingText="更新中" ref="loadmore">
        <ul>
          <li v-for="(item,index) in expertlist" :key="index">
            <span class="used" @click="askExpert(item.id)">向TA提问</span>
            <div @click='goExpertDetail(item.id)'>
              <div class="zhuanjia">
                <div class="img_left">
                  <img  :src="item.photo"/>
                </div>
                <img class="img_right_list" src="../../../../assets/img/expert/authentication.png"/>
                <div class="userright"><p>{{item.name}}</p><span>{{item.empUnit}}</span></div>
              </div>
              <div class="expert_tag">擅长: {{item.goodAt}}</div>
              <div class="tag">
                <span class="violet" v-for="(item2, index) in item.professor.split(',')" :key="index">{{ item2}}</span>
              </div>
              <div class="tag_right">
                <span>协会专家</span>
              </div>
            </div>
          </li>
        </ul>
        <div v-if="allLoaded" style="text-align: center; line-height: 30px; background-color: #f8f8f8; font-size: 14px; color: #999;">已经到底啦...</div>
      </mt-loadmore>
  </div>
</template>

<script>
  import { Toast, Loadmore } from 'mint-ui'
  export default {
    data(){
      return {
        expertlist: [],
        page: 1,
        allLoaded: false
      }
    },
    created(){
      this.getExpertList(1)
    },
    methods: {
      getExpertList(num){
        let param = {
          systemToken: localStorage.getItem('SYSTEMTOKEN'),
          page: this.page,
          limit: 10
        };
        this.axios({
          method: 'get',
          url: '/expert/nostate/list',
        }).then(response => {
          console.log(response);
          if(num===1){
            this.expertlist=response.data.items
          } else if(num===2){
            this.expertlist=response.data.items
            this.$refs.loadmore.onTopLoaded()
          }
          else{
            this.expertlist = [...this.expertlist,...response.data.items];
            this.$refs.loadmore.onBottomLoaded()
          }
          if(this.expertlist.length==response.data.total){
            this.allLoaded=true
          }
        })
      },

      loadTop(){
        this.page=1
        this.allLoaded=false
        this.getExpertList(2)
      },

      loadBottom(){
        this.page++
        this.getExpertList(3)
      },

      goExpertDetail(expertId) {
        this.$router.push({path: '/association-service/experts-detail', query: {expertId: expertId}})
      },

      askExpert(expertId) {
	      this.$router.push({path: '/askExpert', query: {expertId}})
      }
    }
  }
</script>

<style lang='less' scoped>
  #expertList_container {
    background-color: #f8f8f8;
    /*height: calc(100vh - 50px);*/
    padding-bottom: 50px;
    /*overflow: scroll;*/
    ul{
      /*margin-top: 50px;*/
    }
    li {
      padding: 10px 10px 7px 10px;
      position: relative;
      background-color: #fff;
      margin-bottom: 10px;
      .used {
        color: #5997ff;
        padding: 3px 12px;
        position: absolute;
        right: 10px;
        font-size: 12px;
        border-radius: 30px;
        border: solid 0.5px #5997ff;
      }
      .zhuanjia {
        overflow: hidden;
        .img_left {
          width: 50px;
          height: 50px;
          border-radius: 50%;
          float: left;
          overflow: hidden;
          margin-right: 10px;
          img {
            width: 50px;
          }
        }
        .userright {
          float: left;
          height: 50px;
          line-height: 25px;
          p {
            font-size: 14px;
            margin-bottom: 0;
            color: #333;
          }
          span {
            font-size: 12px;
            color: #9a9a9a;
          }
        }
      }
      .expert_tag {
        padding-top: 8px;
        padding-bottom: 8px;
        margin-bottom: 8px;
        color: #333;
        font-size: 14px;
        border-bottom: 1px solid #efeff4;
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
      }
    }
  }


  .tag {
    font-size: 12px;
    display: inline-block;
    width: 75%;
    span {
      display: block;
      padding: 1px 5px;
      color: white;
      float: left;
      margin-right: 5px;
      border-radius: 2px;
    }
    p {
      margin-left: 55px;
      margin-bottom: 30px;
      color: #666;
    }
    .violet {
      background-color: #ecf3fe;
      color: #599ef9;
      margin-bottom: 5px;
    }
    .gray {
      background-color: #f5f5f5;
      color: #999;
    }
  }

  .tag_right {
    font-size: 12px;
    display: inline-block;
    float: right;
    span {
      display: block;
      padding: 1px 5px;
      color: white;
      margin-right: 5px;
      background-color: #FEC30A;
      border-radius: 2px;
    }
  }

  .img_right_list {
    position: absolute;
    width: 16px !important;
    margin-top: 34px;
    margin-left: -20px;
  }
</style>
<style>
  .mint-loadmore{
    /*overflow: auto!important;*/
  }
</style>
