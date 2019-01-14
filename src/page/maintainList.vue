<template>
<div class="maintainList" v-show="maintainListShow">
  <div class="search-input">
    <div class="left" :class="{on: !isFocus&& !search.q}">
      <input v-model="search.q" type="search" placeholder=' 搜索：企业名、地址、品牌、服务内容'
             @focus="focus" @blur="isFocus=false" @keydown="key($event)" ref="searchInput"/>
      <div class="query"  @click="toQuery(true)"></div>
      <img class="close" v-show="search.q" @click="search.q='';toQuery(true)" src="../assets/img/maintain/关闭.png" />
    </div>
    <span @click="cancel" v-show="isFocus || search.q">取消</span>
  </div>
  <div class="button" :class="{show: showBlock=='button'}">
    <div class="area-button"  @click="switchBlock('area-block')"><img src="../assets/img/maintain/区域.png" />
      <p>{{getName('area')|| '区域'}}</p></div>
    <div class="sort-button"  @click="switchBlock( 'sort-block')"><img src="../assets/img/maintain/排序.png" />
      <p>{{getName('sort')|| '排序'}}</p></div>
    <div class="hot-button"  @click="switchBlock( 'hot-block')"><img src="../assets/img/maintain/热搜.png" />
      <p>{{getName('hot')|| '热搜'}}</p></div>
  </div>
  <ul class="area-block" :class="{show: showBlock=='area-block'}">
    <div class="close" @click="switchBlock( 'button')"></div>
    <li v-for="(item, index) in area" :key="index" @click="select('area', item.code)"
        :class="{on : tagIsOn('area', item.code)}">{{item.name}}</li>
  </ul>
  <ul class="sort-block" :class="{show: showBlock=='sort-block'}">
    <div class="close"  @click="switchBlock('button')"></div>
    <li v-for="(item, index) in sort" :key="index" @click="select('sort', item.value)"
        :class="{on : tagIsOn('sort', item.value)}">{{item.name}}</li>
  </ul>
  <ul class="hot-block" :class="{show: showBlock=='hot-block'}">
    <div class="close"  @click="switchBlock('button')"></div>
    <li v-for="(item, index) in hot" :key="index" @click="select('hot', item.value)"
        :class="{on : tagIsOn('hot', item.value)}">{{item.name}}</li>
  </ul>
  <div class="roll" :style="{height: listHeight+'px'}">
    <mt-loadmore :bottom-method="toQuery" :bottom-all-loaded="allLoaded" :autoFill="false"
                 bottomPullText="加载更多"   ref="loadMore">
      <ul class="history" v-show="maintainListHistory.length">
        <div class="head"><span>最近搜索</span><img @click="clearHistory" src="../assets/img/maintain/del.png"/></div>
        <li v-for="(item, index) in maintainListHistory" :key="index" @click="goDetail(item)">
          <div class="picWrap">
            <img src="/static/img/shqxw.jpg" />
            <img class="tag" :src="item.is4s?'/static/img/maintain/tag-4s.png':'/static/img/maintain/tag-normal.png'"/>
          </div>
          <div class="info">
            <!--<span>{{businessStatus(item.status)}}</span>-->
            <span :class="{rest: !isOpenTime(item.openHours)}">{{isOpenTime(item.openHours)?'营业中': '休息中'}}</span>
            <p>{{ item.name }}
              <!--(<span>{{ item.creditLevel }}</span>)-->
            </p>
            <div class=stars>
              <img src="../assets/img/maintain/score_yellow.png"  v-for="index in parseInt(item.rating)||0" :key="'yellow'+index">
              <img src="../assets/img/maintain/score_gray.png"  v-for="index in (5-parseInt(item.rating))||0" :key="'gray'+index">
              <span v-show="item.rating">{{ item.rating }}分</span>
              <span v-show="!item.rating">暂无评分</span>
            </div>
            <div class="address">
              <span class="miles">{{ item.distance.toFixed(1) }}km</span>
              <span class="address_area">{{ item.addr }}</span>
            </div>
          </div>
        </li>
      </ul>
      <ul class="com-list">
        <div class="head"><span>智能推荐</span></div>
        <li v-for="(item, index) in data" :key="index" @click="goDetail(item)">
          <div class="picWrap">
            <img src="/static/img/shqxw.jpg" />
            <img class="tag" :src="item.is4s?'/static/img/maintain/tag-4s.png':'/static/img/maintain/tag-normal.png'"/>
          </div>
          <div class="info">
            <!--<span>{{businessStatus(item.status)}}</span>-->
            <span :class="{rest: !isOpenTime(item.openHours)}">{{isOpenTime(item.openHours)?'营业中': '休息中'}}</span>
            <p>{{ item.name }}
              <!--(<span>{{ item.creditLevel }}</span>)-->
            </p>
            <div class=stars>
              <img src="../assets/img/maintain/score_yellow.png"  v-for="index in parseInt(item.rating)||0" :key="'yellow'+index">
              <img src="../assets/img/maintain/score_gray.png"  v-for="index in (5-parseInt(item.rating))||0" :key="'gray'+index">
              <span v-show="item.rating">{{ item.rating }}分</span>
              <span v-show="!item.rating">暂无评分</span>
            </div>
            <div class="address">
              <span class="miles">{{ item.distance.toFixed(1) }}km</span>
              <span class="address_area">{{ item.addr }}</span>
            </div>
          </div>
        </li>
      </ul>
      <div v-show="allLoaded" style="text-align: center; line-height: 30px; background-color: #f8f8f8; font-size: 14px; color: #999;">已经到底啦...</div>
    </mt-loadmore>
  </div>

</div>
</template>

<script>
	export default {
		name: "maintain-list",
    props: ['data', 'blur', 'total', 'is4s', 'height', 'location', 'clickTouchBar'],
    data(){
		  return{
        maintainListShow: true,
        isFocus: false,
		    search:{
          q:'',
          area: '',
          sort: '',
          hot: ''
        },
        area: [{name: '全部', value: ''}],
        sort:[
          {name: '默认', value: ''},
          {name: '距离优先', value: 'distance'},
          {name: '好评优先', value: 'rating desc,distance asc'},
          // {name: '距离优先', value: 'distance'},
        ],
        hot:[
          {name: '默认', value: ''},
          {name: '宝马', value: '宝马'},
          {name: '奥迪', value: '奥迪'},
          {name: '迈巴赫', value: '迈巴赫'},
          {name: '保时捷', value: '保时捷'},
          {name: '玛莎拉蒂', value: '玛莎拉蒂'},
          {name: '年检', value: '年检'},
          {name: '保养', value: '保养'},
          {name: '车轮', value: '车轮'},
          {name: '发动机', value: '发动机'},
          {name: '汽车美容', value: '汽车美容'},
        ],
        showBlock: '',
        compList:[],
        listHeight: 0,
        timer: null,
        allLoaded: false,
        clearList: true
      }
    },
    computed: {
      q(){
        return this.search.q
      },
      show(){
        return this.$store.state.app.slideState.showBody
      },
      maintainListHistory(){
        // console.log('maintainListHistory')
        return this.$store.state.app.maintainListHistory
      },
    },
    watch:{
      q(val){
        let flag= true
        // this.search.hot=''
        for (let i in this.hot){
          if(val && this.hot[i].value== val) flag= false
        }
        if (flag) this.search.hot=''
      },
      location(val){
        // if(val!=2) this.showBlock = ''
      },
      clickTouchBar(){
        this.$refs.searchInput.focus()
      },
      height(val){
        // console.log('bodyHeightList', val)
        if (this.show=='maintainList') this.calcHeight(val)
        // if (val> $(document).height()*.6 && !document.querySelector(".show")) {
        //   // this.showBlock= 'button'
        //   // setTimeout(()=>{
        //   //   this.calcHeight(val)
        //   // },500)
        // }else{
        //   this.showBlock = ''
        //   setTimeout(()=>{
        //     this.calcHeight(val)
        //   },500)
        // }
      },
      // show(val){
      //   if(val=== 'maintainList'){
      //   //   // this.compList= this.data
      //   //   this.switchBlock('button')
      //   //   this.maintainListShow= true
      //   //   // this.$store.commit('setSlideBodyHeight', 300)
      //   //   this.$store.commit('reSetSlideBodyHeight', 300)
      //     this.$store.commit('setSlideMinHeight', 45)
      //   //   // $(".maintainList .roll").scrollTop(0)
      //   // }else{
      //   //   this.maintainListShow= false
      //   }
      // },
      data(datas){
        // console.log('changedata')
        if(this.clearList) $(".maintainList .roll").scrollTop(0)
        else this.$refs.loadMore.onBottomLoaded()
        if (datas.length>= this.total){
          this.allLoaded= true
        }else this.allLoaded= false
        this.calcHeight(this.height)
      },
      is4s(){
        this.clearList= true
        $(".maintainList .roll").scrollTop(0)
      },
      blur(){
        $('.search-input input').blur()
      }
    },
    mounted(){
		this.getArea()
      this.calcHeight(this.height)
      $(".roll").bind('touchmove',function(e){
        e.stopPropagation();
      })
    },
    activated(){
		  // this.calcHeight(this.height)
    },
    methods:{
		  calcHeight(height){
        let lh= parseInt(height -
	        (document.querySelector(".search-input")?document.querySelector(".search-input").offsetHeight:0) -
          (document.querySelector(".show")?document.querySelector(".show").offsetHeight: 0))
        this.listHeight= (lh<0 ? 0 : lh)
      },
		  tagIsOn( arrName, val ){
        if (this.search[arrName]==val)  return true
        else return false
      },
      switchBlock(val){
		    this.showBlock= val
        let self= this
        setTimeout(function () {
          // console.log(document.querySelector(".show").offsetHeight)
          self.calcHeight(self.height)
        },100)
      },
      select( arrName, val ){
        this.search[arrName]= val
        if(arrName== 'hot') this.search.q= val
        this.showBlock= 'button'
        setTimeout(()=>{
          this.calcHeight(this.height)
        },500)
        this.toQuery(true)
      },
      toQuery(clearList){
		    // console.log(clearList)
        this.clearList= clearList|| false
        this.$emit('query', this.search, this.clearList);
      },
	    getArea(){
		    this.axios.get('/area/query').then( (res) => {
			    this.area.push(...res.data.items)
		    })
	    },
      key(e) {
        if ( e.keyCode == 13 || e=='search') {
         this.toQuery(true)
        }
      },
      cancel(){
        this.$emit('toLocation', 0);
        this.search.q='';
        this.search.area= ''
        this.search.sort= ''
        this.search. hot= ''
        this.toQuery(true)
      },
      clearHistory(){
        this.$store.commit('setMaintainListHistory', false)
      },
      goDetail(item){
		    // console.log(item)
        // this.$store.commit('setMaintainListHistory', false)
	      if (this.$route.query.mapType=='remarkMap'){
		      this.$router.push({path: '/remarkMatch', query: { corpId: item.sid }})
	      }else{
		      this.$emit('goMap', item)
		      this.$store.commit('setMaintainDetail', item)
		      // this.$store.commit('setMaintainListHistory', item)
		      this.$store.commit('setSlideShowBody', 'maintainDetail')
	      }

      },
      focus(){
        this.showBlock= 'button'
		    this.isFocus=true
        // this.showBlock= 'button'
        // setTimeout(()=>{
        //   this.$store.commit('reSetSlideBodyHeight', $(document).height())
        // },200)

        this.$emit('toLocation', 2)
        setTimeout(()=>{
          this.calcHeight(this.height)
          $("body").scrollTop(0)
        },500)
      },
      isOpenTime(timeStr){
		    let sTime=0, eTime=0, now=0;
		    if(!timeStr) return true
        let timeStrs= timeStr.replace(/~/g,'-')
        timeStrs= timeStrs.replace(/ /g,'')
        timeStrs= timeStrs.replace(/：/g,':')
        timeStrs= timeStrs.replace(/;/g,':')
        // console.log(timeStrs)
        if(timeStrs.indexOf('-')<0 ||timeStrs.indexOf(':')<0) return true
        sTime= parseInt(timeStrs.split('-')[0].split(':')[0])*60+ parseInt(timeStrs.split('-')[0].split(':')[1])
        eTime= parseInt(timeStrs.split('-')[1].split(':')[0])*60+ parseInt(timeStrs.split('-')[1].split(':')[1])
        now= (new Date()).getHours()* 60+ (new Date()).getMinutes()
        // console.log(sTime, eTime, now)
        if(sTime <= now && now<= eTime) return true
        else return false
      },
      businessStatus(status){
        switch (status){
          case 1: return '营业中';
          case 2: return '停业';
          case 3: return '注销';
          case 4: return '空壳';
        }
      },
      getName(type){
		    if(!this.search[type]) return ''
		    for (let i in this[type]){
		      if(this.search[type]== (this[type][i].value || this[type][i].code)){
		        return this[type][i].name
          }
        }
      }
    }
	}
</script>

<style scoped lang='less'>
  @blue-color: #008bff;
  @bottom-border-color: #f2f2f2;
.maintainList>ul *{
  transition: all .5s;
}
.search-input{
  padding: 0 15px 15px 15px;
  border-bottom: 1px solid @bottom-border-color;
  position: relative;
  >*{
    font-size: 0;
  }
  .left{
    width: calc(100% - 40px);
    display: inline-block;
    position: relative;
    input{
      height: 30px;
      width: 100%;
      padding: 5px 10px 5px 28px;
      margin: 0;
      background: #f9f9f9 url("../assets/img/maintain/放大镜.png") no-repeat 6px center;
      background-size: 20px;
      border: 1px solid #e7e7e7;
      border-radius: 20px;
      font-size: 14px;
      text-align: left;
      /*caret-color:@blue-color;*/
      color:@blue-color;
      /*transition: all .2s;*/
    }
    input:focus{
      /*border-color: @blue-color; */
    }
    input::-webkit-input-placeholder{
      color: #dddddd;
      font-size: 12px;
    }
    .query{
      width: 28px;
      height: 30px;
      position: absolute;
      left: 15px;
      top: 0;
    }
    .close{
      width: 16px;
      position: absolute;
      right: 10px;
      top: 7px;
    }
  }
  .left.on{
    width: 100%;
  }
  span{
    line-height: 30px;
    float: right;
    color: @blue-color;
    font-size: 16px;
    width: 40px;
    text-align: center;
  }
}
  .button{
    display: none;
    padding: 5px 30px 0 30px;
    border-bottom: 1px solid @bottom-border-color;
    width: 100%;
    text-align: center;
    >div{
      width: 25%;
      display: inline-block;
      img{
        height: 30px;
      }
    }
    .area-button{
      float: left;
    }
    .hot-button{
      float: right;
    }
  }
  .area-block, .sort-block, .hot-block{
    display: none;
    padding: 10px 10px 0 10px;
    border-bottom: 1px solid @bottom-border-color;
    min-height: 57px;
    .close{
      width: 24px;
      height: 24px;
      background: url("../assets/img/maintain/关闭2.png") no-repeat center center;
      background-size: 100% 100%;
      margin: 0 10px 10px 10px;
      display: inline-block;
      vertical-align: middle;
    }
    li{
      font-size: 12px;
      line-height: 24px;
      padding: 0 10px;
      border: 1px solid #c3c3c3;
      color: #888888;
      border-radius: 5px;
      display: inline-block;
      margin: 0 10px 10px 0;
      vertical-align: middle;
    }
    li.on{
      border-color: @blue-color;
      color: @blue-color;
    }
  }
  .show{
    display: block;
  }
  .roll{
    overflow: auto;
    position: relative;
  }
  .history, .com-list{
    padding: 10px 0 0 15px;
    .head{
      padding-right: 15px;
      line-height: 16px;
      font-size: 13px;
      color: #989898;
      vertical-align: middle;
      img{
        width: 12px;
        float: right;
      }
    }
    li {
      width: 100%;
      overflow: hidden;
      font-size: 13px;
      padding: 15px 15px 15px 0;
      border-bottom: 1px solid @bottom-border-color;
      .picWrap {
        float: left;
        width: 70px;
        height: 70px;
        border-radius: 5px;
        overflow: hidden;
        position: relative;
        img {
          width: 100%;
          height: 100%;
        }
        .tag{
          width: 24px;
          height: auto;
          position: absolute;
          top: -1px;
          left: 10px;
        }
      }
      .info {
        margin-left: 80px;
        position: relative;
        >span{
          font-weight: 300;
          font-size: 12px;
          line-height: 19px;
          padding: 0 4px;
          color: white;
          background-color: @blue-color;
          position: absolute;
          top: 0;
          right: -4px;
          border-radius: 2px;
        }
        >span.rest{
          background-color: #bebec0;
        }
        p {
          font-size: 14px;
          margin-bottom: 0;
          margin-right: 42px;
          color: #000;
          overflow: hidden;
          text-overflow:ellipsis;
          white-space: nowrap;
          span {
            /*color: red;*/
          }
        }
        .stars {
          line-height: 14px;
          vertical-align: middle;
          margin: 6px 0;
          img {
            width: 14px;
            height: 14px;
            margin-right: 3px;
            float: left;
          }
          span {
            color: #989898;
            margin-left: 4px;
          }
        }
        .address {
          color: #666666;
          font-size: 12px;
          .miles {
            float: right;
          }
          .address_area {
            display: block;
            margin-right: 35px;
            overflow: hidden;
            text-overflow:ellipsis;
            white-space: nowrap;
          }
        }
      }
    }
    li:last-child{
      border: 0;
    }
  }
  .history{
    border-bottom: 14px solid @bottom-border-color;
  }
</style>
