<template>
  <div id="moreCitys" style="position: relative; padding-top: 40px;">
    <div class="top" style="position: absolute; left: 0;top: 0; width: 100%; height: 40px; line-height: 40px; border-bottom: 1px solid #ccc; text-align: center; background-color: #f8f8f8;">
      <!--更多城市-->
      <!--<span @click="closePopup" class="mui-icon mui-icon-closeempty" style="position: absolute; right: 10px; top: 50%; transform: translateY(-50%)"></span>-->
      <mt-header fixed title="更多城市">
        <mt-button slot="left" @click="closePopup" icon="back"></mt-button>
      </mt-header>
    </div>
    <div style="height: calc(100vh - 40px); overflow: auto;">
      <div class="title" style="background-color: #f8f8f8; line-height: 30px; text-indent: 10px; color: #999; font-size: 15px;">
        热门城市
      </div>
      <div style="padding: 10px 0;">
        <ul class="mui-row">
          <li v-for="item in hotCitys" class="mui-col-xs-4 mui-col-sm-4" style="height: 50px; text-align: center;">
            <span style="border: 1px solid #eee; font-size: 15px; margin-top: 10px; line-height: 30px; color: #666; display: inline-block; width: 90px; border-radius: 15px" @click="getCity(item)">{{ item }}</span>
          </li>
        </ul>
      </div>

      <div class="title" style="background-color: #f8f8f8; line-height: 30px; text-indent: 10px; color: #999; font-size: 15px;">
        ABCDEF
      </div>
      <div style="padding: 10px 0;">
        <ul class="mui-row">
          <li v-for="item in ABCDEF" class="mui-col-xs-4 mui-col-sm-4" style="height: 50px; text-align: center;">
            <span style="border: 1px solid #eee; font-size: 15px; margin-top: 10px; line-height: 30px; color: #666; display: inline-block; width: 90px; border-radius: 15px">{{ item }}</span>
          </li>
        </ul>
      </div>

      <div class="title" style="background-color: #f8f8f8; line-height: 30px; text-indent: 10px; color: #999; font-size: 15px;">
        GHIJ
      </div>
      <div style="padding: 10px 0;">
        <ul class="mui-row">
          <li v-for="item in GHIJ" class="mui-col-xs-4 mui-col-sm-4" style="height: 50px; text-align: center;">
            <span style="border: 1px solid #eee; font-size: 15px; margin-top: 10px; line-height: 30px; color: #666; display: inline-block; width: 90px; border-radius: 15px">{{ item }}</span>
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script>
  import { Header } from "mint-ui"
  export default{
    name: "moreCitys",

    data(){
      return {
        hotCitys: ["北京","上海","广州","深圳","杭州","南京","武汉","成都","苏州","天津","厦门","长沙","西安"],
        ABCDEF: ["鞍山","蚌埠","保定","北京","长春","成都","重庆","长沙","常熟","朝阳","常州","东莞","大连","东营","佛山","福州"],
        GHIJ: ["桂林","贵阳","广州","哈尔滨","合肥","呼和浩特","海口","杭州","惠州","湖州","金华","江门","济南","济宁","嘉兴","江阴"],
      }
    },
    created(){

    },
    components: {

    },
    methods: {
      closePopup(){
        this.$store.commit('closePopupVisible', false)
      },
      getCity(city){
        this.$store.commit('getCity', city)
      }
    }
  }
</script>

<style lang='less' scoped>
  #moreCitys {

  }
</style>
