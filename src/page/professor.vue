<template>
  <div id="professor_list">
    <ul>
      <li v-for="(item, index) in professorList" :key="index">
      <div class="top_pro clearfix">
        <img :src="item.photo ? item.photo : 'http://static.dev.shanghaiqixiu.org/images/2017/11/27/pic_1514370600988.png'" width=60 height=60 alt="">
        <div class="name_wrap">
          <p class="name">{{ item.name }}</p>
          <span>{{ item.empUnit }}</span>
        </div>
      </div>
      <p class="shanchang"><span>擅长:</span>{{ item.goodAt }}</p>
      <div class="biaoqian clearfix">
        <span>高级技师</span>
        <span>注册工程师</span>
        <span class="zhuanjia">协会专家</span>
      </div>
      <div class="TA" @click="goDetail(item.ownerId)">向TA提问</div>
    </li>
    </ul>
  </div>
</template>

<script>
export default {
  name: "professor",
  data(){
    return{
      professorList: []
    }
  },
  created(){
    let sysTok = localStorage.getItem("SYSTEMTOKEN")
    this.axios({
      method: 'get',
      url: '/cdf/queryexpertlist/' + sysTok,
    }).then(res=>{
      console.log(res.data.data);
      this.professorList=res.data.data
    })
  },
  methods:{
    goDetail(id){
      this.$router.push({
        path: "/professorDetail",
        query: {
          id
        }
       })
    }
  }
}
</script>

<style lang='less' scoped>
  #professor_list {
    ul li {
      padding: 10px;
      border-bottom: 10px solid #f8f8f8;
      position: relative;
      &:last-child {
        border-bottom: 0;
      }
      .top_pro {
        img {
          border-radius: 50%;
          float: left;
        }
        .name_wrap {
          margin-left: 70px;
          height: 60px;
          padding-top: 5px;
          box-sizing: border-box;
          .name {
            color: #333;
            font-size: 16px;
            margin-bottom: 5px;
          }
          span {
            display: block;
            font-size: 14px;
            color: #666;
            overflow: hidden;
            text-overflow: ellipsis;
            white-space: nowrap;
          }
        }
      }
      .shanchang {
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
        color: #666;
        line-height: 30px;
        margin-bottom: 0;
        span {
          color: #333;
          margin-right: 5px;
        }
      }
      .biaoqian {
        border-top: 1px solid #eee;
        padding-top: 8px;
        span {
          float: left;
          color: #4285f4;
          font-size: 14px;
          background-color: #ebf2fd;
          margin-right: 5px;
          border-radius: 5px;
          padding: 2px 8px;
        }
        .zhuanjia {
          float: right;
          color: #fff;
          background-color: #fc0;
          border-radius: 3px;
        }
      }
      .TA {
        position: absolute;
        right: 15px;
        top: 15px;
        border: 1px solid #4285f4;
        padding: 2px 10px;
        border-radius: 15px;
        font-size: 14px;
        color: #4285f4;
      }
    }
    .clearfix {
      zoom: 1;
      &:after {
        content: '';
        height: 0;
        display: block;
        clear: both;
      }
    }
  }
</style>
