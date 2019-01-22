<template>
  <div id="allmap" >

    <div class='search'>

      <div class="fixGuide">
        <img src="/static/img/maintain/center-location.png"/>
        <div class="fixGuideClick" @click="goLatePoint">{{centerName}}</div>
      </div>

      <div id="container"></div>

     </div>

	<maintain-list ref="maintainList" :location="location" :originalLocation="originalLocation" @renderMap="renderMap" @goMap="goMap"></maintain-list>
	<maintain-detail ref="maintainDetail" ></maintain-detail>



  </div>
</template>

<script>
  import { Toast,  Actionsheet, Indicator } from 'mint-ui'
  import maintainDetail from '@/page/service-map/maintainDetail.vue'
  import maintainList from '@/page/service-map/maintainList'
  export default {
    name: 'maintain',
	  components: {maintainDetail,  maintainList},
    data() {
      return {

	      map: null,
	      geolocation: null,
	      markerClustererPoint: [],
	      markerClusterer: null,
	      markers: [],


	      location:{
		      lng: '121.480236',
		      lat: '31.236301'
	      },
	      originalLocation:{
		      lng: '121.480236',
		      lat: '31.236301'
	      }
      }
    },

    computed: {
      show(){
        return this.$store.state.app.slideState.showBody
      },
	    centerName(){
		    let name= '164'
		    switch (this.$route.name){
			    case 'school-map':{
				    name= '查找最近驾校'
				    break
			    }
			    default :{
				    name= '查找最近维修点'
			    }
		    }
		    return name
	    },
    },

    mounted(){
    	this.bodyNoScoll()
	    this.getQuery(true)


	    this.setShowBody()


    },

    methods: {
	    getQuery( mounted){
		    if(this.$route.query &&this.$route.query.lng  &&this.$route.query.lat){
		    	this.location.lng= this.$route.query.lng
		    	this.location.lat= this.$route.query.lat
		    }
		    if(this.$route.query || mounted){
			    this.init()
			    history.replaceState(null, null, window.location.origin + window.location.hash.split('?')[0])
		    }
	    },
    	init(){
		   Indicator.open({
			    text: '请稍候...',
			    spinnerType: 'snake'
		    });
		    this.map= new AMap.Map('container',{
			    center: new AMap.LngLat(this.location.lng, this.location.lat),
			    zoom: 14,
		    });
		    // 同时引入工具条插件，比例尺插件和鹰眼插件
		    AMap.plugin(['AMap.ToolBar',], () => {
			    // 在图面添加工具条控件，工具条控件集成了缩放、平移、定位等功能按钮在内的组合控件
			    let tool= new AMap.ToolBar({
				    locate: false,
				    position: 'LT',
				    offset: new AMap.Pixel(0,55)
			    })
			    tool.on('zoomchanged',(obj) => {
			    	// console.log('zoomchanged.obj', obj)
				    // return false
			    })
			    this.map.addControl(tool);
		    });

		    this.map.on('complete', () => {
			    // 地图图块加载完成后触发
			    // console.log('this.map.on(complete)')
			    this.getLocation()
		    });

		    this.map.on('dragend', () => {
			    let center= this.map.getCenter()
			    this.location.lng= center.lng
			    this.location.lat= center.lat
			    // this.getCompList(false, true)
			    this.$refs.maintainList.dragend()
		    });


		    // console.log(this.$route.query)
		    // this.getArea()
	    },
	    getLocation(){
		    if(this.map){
			    AMap.plugin('AMap.Geolocation', () => {
				    this.geolocation = new AMap.Geolocation({
					    buttonPosition: 'RT',
					    buttonOffset: new AMap.Pixel(10,40),
					    timeout: 2000,
				    });
				    this.map.addControl(this.geolocation);
				    this.geolocation.getCurrentPosition();
				    AMap.event.addListener(this.geolocation, 'complete', (result)=>{
				    	// console.log('result', result)
					    this.map.clearMap()
					    this.map.setCenter(result.position)
					    this.map.add(new AMap.Marker(result.position))
					    this.location.lng= result.position.lng
					    this.location.lat= result.position.lat
					    this.originalLocation.lng= result.position.lng
					    this.originalLocation.lat= result.position.lat
					    this.getCompList(true, true)
				    });//返回定位信息
				    AMap.event.addListener(this.geolocation, 'error', (err)=>{
					    this.map.clearMap()
				    	// console.log('err', err)
					    this.getCity()
				    });      //返回定位出错信息


			    });
		    }
	    },
	    getCity(){
		    AMap.plugin('AMap.CitySearch', () => {
			    let city = new AMap.CitySearch();
			    city.getLocalCity((status, result)=>{
				    console.log('getLocalCity', status, result)
				    if(status== 'complete'){
					    this.map.setCity(result.city, ()=>{
						    let center= this.map.getCenter()
						    // console.log('this.map.getCenter()', center)
						    this.map.add(new AMap.Marker( center))
						    // console.log('this.map.add(new AMap.Marker( center))')
						    this.location.lng= center.lng
						    this.location.lat= center.lat
						    this.getCompList(true, true)
						    // this.initPiontList()
					    })
				    }else{
				    	let center= new AMap.LngLat(this.location.lng, this.location.lat)
					    this.map.panTo(center)
					    this.map.add(new AMap.Marker( {
						    position: center
					    }))
					    this.getCompList(true, true)
				    }
			    })
		    });
	    },

	    getCompList(clearPoint, clearList){
    		this.$refs.maintainList.getCompList(clearPoint, clearList)
		    this.$refs.maintainList.getBase()
	    },



      bodyNoScoll(){
        let overscroll = function(el) {
          el.addEventListener('touchstart', function() {
            let top = el.scrollTop
              ,totalScroll = el.scrollHeight
              ,currentScroll = top + el.offsetHeight;
            if(top === 0) {
              el.scrollTop = 1;
            }else if(currentScroll === totalScroll) {
              el.scrollTop = top - 1;
            }
          });

          el.addEventListener('touchmove', function(evt) {
            if(el.offsetHeight < el.scrollHeight)
              evt._isScroller = true;
          });
        }
        // overscroll(document.querySelector('.slide-bar'));
        document.body.addEventListener('touchmove', this.noscroll, { passive: false })
        // document.getElementById("allmap").addEventListener('touchmove', this.noscroll, { passive: false })
      },
      noscroll(evt) {
        if(!evt._isScroller) {
          evt.preventDefault();
        }
      },

      renderMap(markers, renderMarker){
	      if(this.markerClusterer ) {
		      this.markerClusterer.clearMarkers();
		      this.markerClusterer.setMap(null);
		      this.markerClusterer= null
	      }

	      this.map.clearMap()

	      if(markers){
		      if(renderMarker){
			      //renderMarker为true代表无聚合点，目前学车基地是无聚合点
			      this.markers= markers
		      }else{
			      this.markerClustererPoint= markers
		      }
	      }

	      if(this.markers.length) this.map.add(this.markers)
	      if(this.markerClustererPoint.length){
		      let style={
			      url: '/static/img/position-num.png',
			      size: new AMap.Size(30, 30),
			      imageOffset:new AMap.Pixel(-5,-5),
			      textColor: '#fff',
			      textSize: 14
		      }
		      AMap.plugin(["AMap.MarkerClusterer"],() => {
			      this.markerClusterer= new AMap.MarkerClusterer(this.map, this.markerClustererPoint,{styles:[style, style, style]});
			      // console.log('renderMap() over')
		      });
	      }


      },


      goLatePoint(){
    		if(this.markerClustererPoint.length)
	      this.map.panTo(new AMap.LngLat(this.markerClustererPoint[0].getExtData().lon,
		      this.markerClustererPoint[0].getExtData().lat))

      },


      getCompanyDetail(item) {


        this.$store.commit('setMaintainDetail', item)
        this.$store.commit('setMaintainListHistory', item)
        this.$store.commit('setSlideShowBody', 'maintainDetail')
        this.goMap(item)

      },  // 获取企业详情信息

      goMap(item){


        this.location.lng= item.lon
        this.location.lat= item.lat
	      this.map.panTo(new AMap.LngLat(this.location.lng, this.location.lat))


      },


	    setShowBody(){
		    switch (this.$route.name){
			    case 'school-map':
			    case 'remark-map':{
				    this.$store.commit('setSlideShowBody', 'maintainList')
				    break;
			    }
			    default :{

			    }
		    }
	    }
    },
	  activated(){
		  let self=this
		  this.getQuery()
		  this.setShowBody()
		  this.bodyNoScoll()
		  setTimeout(function () {
			  self.renderMap()
			  // self.bodyNoScoll()
			  // self.toQuery()
		  },500)
	  },
	  deactivated(){
		  document.body.removeEventListener('touchmove', this.noscroll,false)
	  },
	  beforeDestory(){
		  document.body.removeEventListener('touchmove', this.noscroll,false)
	  },
  }
</script>
<style scoped>
  body{
   /*touch-action: none*/
  }
</style>

<style lang='less'>
  .mint-indicator {
    position: absolute;
    z-index: 11;
  }
  #allmap {
    position: relative;
    overflow: hidden;
    height: 100vh;
	  .amap-toolbar, .amap-touch-toolbar .amap-zoomcontrol, .amap-logo, .amap-geolocation-con, .amap-copyright{
		  z-index: 10!important;
	  }
    .company_type_list {
      width: 240px;
      background-color: #70b8ef;
      :before, :after {
        height: 0;
      }
      li {
        color: #fff;
        text-align: center;
        font-size: 14px;
        border-bottom: 1px solid #fff;
      }
      li:last-child {
        border: none;
      }
    }

    .search {
      position: relative;
      overflow: hidden;
      height: calc(100% - 50px);
      .search_wrap {
        width: 100%;
        height: 46px;
        overflow: hidden;
        padding: 0 10px;
        position: relative;
        >span {
          float: left;
          /*margin-left: 15px;*/
          height: 46px;
          width: 65px;
          line-height: 46px;
          background: url(~@/assets/img/record/findfix.png) no-repeat;
          background-position: left 55%;
          background-size: 16px 16px;
          background-color: #fff;
          text-indent: 20px;
          font-size: 16px;
        }
        span.on{
          animation: changecolor 1s ease infinite;
        }
        @keyframes changecolor {
          0% {color: blue }
          50% {color: black}
          100% {color: blue }
        }
        input {
          background: url(~@/assets/img/record/search.png) no-repeat 10px 7px;
          font-size: 14px;
          background-color: #eee;
          background-size: 18px 18px;
          text-indent: 20px;
          border-radius: 5px;
          outline: none;
          border: none;
          height: 30px;
          width: calc(100% - 65px - 50px);
          margin: 8px 0 8px;
          text-align: left;
          float: left;
          /*padding-right: 50px;*/
        }
        .to_search{
          display: inline-block;
          width: 45px;
          text-align: center;
          height: 30px;
          margin: 8px 0;
          background-color: #3272F7;
          color: white;
          border-radius: 5px;
          line-height: 30px;
          font-size: 14px;
          float: right;
        }
      }
      .fixGuide {
        position: absolute;
        left: 50%;
        top: 50%;
        transform: translate(-50%, -50%);
        z-index: 10;
        img {
          position: absolute;
          width: 100px;
          top: 0;
          left: 0;
          transform: translate(-50%, -100%);
          pointer-events: none;
        }
        .fixGuideClick{
          width: 100px;
          height: 24px;
	        line-height: 24px;
          position: absolute;
          left: -50px;
          top: -66px;
	        font-size: 12px;
	        color: white;
	        font-weight: 300;
	        text-align: center;
        }
      }


      #container {
        width: 100%;
        height: 100%
      }

    }

  }
</style>
