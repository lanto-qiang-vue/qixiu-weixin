<template>
  <div id="allmap" >
    <!--<mt-popup v-model="companyTypeVisible" style="border-radius: 10px; overflow: hidden;">-->
      <!--<ul class="mui-table-view company_type_list">-->
        <!--<li class="mui-table-view-cell" @click="chooseCompanyType('164', '维修企业')">维修企业</li>-->
        <!--<li class="mui-table-view-cell" @click="chooseCompanyType('166', '综合检测站')">综合检测站</li>-->
        <!--<li class="mui-table-view-cell" @click="chooseCompanyType('213', '施救牵引企业')">施救牵引企业</li>-->
        <!--<li class="mui-table-view-cell" @click="chooseCompanyType('214', '危运车辆维修')">危运车辆维修</li>-->
        <!--<li class="mui-table-view-cell" @click="chooseCompanyType('215', '新能源汽车维修')">新能源汽车维修</li>-->
      <!--</ul>-->
    <!--</mt-popup>-->
    <!--<mt-header title="维修服务">-->
      <!--<span slot="right" @click="changeCompanyType">{{ searchCompanyName }}</span>-->
    <!--</mt-header>-->
    <ul class="maintain-type">
      <li v-for="(item, index) in maintainType" :class="{on : tagIsOn('is4s', item.value)}"
          @click="select('is4s', item.value)"
      >{{item.name}}</li>
    </ul>

    <div class='search'>
      <!--顶部筛选搜索框开始-->
      <!--<div class="search_wrap">-->
        <!--<span @click='showPopVisible' :class="{on: (type||level||area||brand)?true:false}">筛选</span>-->
        <!--&lt;!&ndash;<form action="javascript:return true;">&ndash;&gt;-->
        <!--<input id='search_repaire' class="mui-input-clear" type="search" v-model.trim='repairName' placeholder="搜索维修站点" @keydown="key($event)">-->
        <!--&lt;!&ndash;</form>&ndash;&gt;-->
        <!--<div class="to_search" @click="key('search')">搜索</div>-->
      <!--</div>-->
      <!--顶部筛选搜索框结束-->
      <div class="fixGuide">
        <img src="/static/img/maintain/location.png"/>
        <div class="fixGuideClick" @click="goLatePoint"></div>
      </div>
      <!-- 地图容器开始 -->
      <div id="container">
      </div>
      <!-- 地图容器结束 -->
    </div>

    <slide-bar @maintainListBlur="maintainListBlur=Math.random()" v-show="show=='maintainList'" :show="show=='maintainList'"
               @toLocation="toMaintainListLocation= $event" :toLocation="toMaintainListLocation" :minHeight="45" >
      <maintain-list :data="list" :blur="maintainListBlur" :total="total" :is4s="query.is4s"
                     slot-scope="maintainList" :height="maintainList.height" :location="maintainList.location"
                     @toLocation="toMaintainListLocation= $event" :clickTouchBar="maintainList.clickTouchBar"
                     @query="queryByList" @goMap="goMap($event)"></maintain-list>
    </slide-bar>

    <slide-bar v-show="show=='maintainDetail'" :show="show=='maintainDetail'" :minHeight="maintainDetailMinHeight"
               @toLocation="toMaintainDetailLocation= $event" :toLocation="toMaintainDetailLocation" :init="initSlide">
      <comp_detail slot-scope="maintainDetail" :height="maintainDetail.height" @toLocation="toMaintainDetailLocation= $event"
                   @minHeight="maintainDetailMinHeight= $event" @init="initSlide= Math.random()"></comp_detail>
    </slide-bar>

    <maintain-bottom  @openMap="sheetVisible=true;companyDetail=$event" @toLocation="toMaintainDetailLocation= $event"
                      :location="toMaintainDetailLocation"></maintain-bottom>



    <mt-actionsheet
      style="z-index: 16"
      :actions="actions"
      v-model="sheetVisible">
    </mt-actionsheet>

  </div>
</template>

<script>
  import { Toast,  Actionsheet, Indicator } from 'mint-ui'
  import comp_detail from './maintainDetail.vue'
  import SlideBar from './components/SlideBar'
  import maintainList from './maintainList'
  import maintainBottom from './maintainBottom'
  export default {
    name: 'maintain',
    data() {
      let _this  = this
      return {
        companyTypeVisible: false,
        searchCompanyType: '164',    // 企业类型
        searchCompanyName: '维修企业',
        points: [],
        currentPoint: {             // 手机定位的位置
          pointX: 121.480236,
          pointY: 31.236301,
        },
        nearPoint:{},
        sheetVisible: false,
        actions: [{
          name: '高德地图',
          method(){
            let name= _this.companyDetail.name
            window.location.href = `http://uri.amap.com/marker?position=${_this.companyDetail.lon},${_this.companyDetail.lat}&name=${name}&src=上海汽修平台&coordinate=wgs84&callnative=1`
          }
        },
        {
          name: '百度地图',
          method(){
            let name= _this.companyDetail.name
            let address= _this.companyDetail.addr
            window.location.href = `http://api.map.baidu.com/marker?location=${_this.companyDetail.lat},${_this.companyDetail.lon}&title=${name}&content=${address}&output=html&src=上海汽修平台`
          }
        }],

        userinfo: {},
        popupVisible: false,   // 筛选框显示隐藏
        repairName: '',   // 搜索框维修企业名称
        compList: [],  // 搜索维修站点列表
        showSmallList: false,
        isShowCropList: false,
        value: '',
        companyType: [
          {
            name: '全部',
            value: ''
          },
          {
            name: '一类维修企业',
            value: '43'
          },
          {
            name: '二类维修企业',
            value: '44'
          },
          {
            name: '三类维修企业',
            value: '45'
          },
          {
            name: '摩托车维修厂',
            value: '46'
          },
          {
            name: '汽车快修厂',
            value: '47'
          }
        ],
        type: '',    // 企业类型的标志

        level: '',   // 星级评分标志

        carBrand: [],
        brand: '',
        allLoaded: false,
        companyDetail: {},  // 企业详情
        companyDetailAll: {},
        corpId: null,    // 企业ID
        distance: 0,    // 企业ID
        score: 0,   // 企业综合评分
        yellowStars: 0,  // 黄星
        grayStars: 5,     // 灰星
        isShowBrandList: false,
        isShowAllList: true,
        ShowBottomButton: true,
        showDetail: false,
        random: 0,

        GeolocationControl: null,

        maintainType:[
	        {name: '全部', value: ''},
	        {name: '4S店', value: 'yes'},
	        {name: '维修厂', value: 'no'},
        ],
        query:{
          "area": '',
          "is4s": '',
          "lon": 121.480236,
          "lat": 31.236301,
          "page": 1,
          "limit": 20,
          "q": "",
          "sort": ""
        },

	      search:{
		      type: '164',
		      q: '',
		      sort:'',
		      area: '',
		      is4s: '',
		      hot: '',
		      lng: '121.480236',
		      lat: '31.236301'
	      },
	      total: 0,
	      limit: 10,
	      page: 1,

	      list:[],
	      pointList: [],

	      map: null,
	      geolocation: null,
	      markerClusterer: null,
	      markers: null,

	      indicator: null,

        showList: false,
        maintainListBlur: false,
        // maintainListLocation: 0,
        toMaintainListLocation: 1,
        // maintainDetailLocation: 0,
        toMaintainDetailLocation: 0,
        maintainDetailMinHeight: 0,
        initSlide: null
      }
    },
    components: {comp_detail, SlideBar, maintainList, maintainBottom},
    computed: {
      show(){
        return this.$store.state.app.slideState.showBody
      },
    },
    created(){
      if(this.$route.query.type){
        if(this.$route.query.type==="166"){
          this.searchCompanyName="综合检测站"
          this.searchCompanyType='166'
        }else if(this.$route.query.type==="213"){
          this.searchCompanyName="施救牵引企业"
          this.searchCompanyType='213'
        }else if(this.$route.query.type==="214"){
          this.searchCompanyName="危运车辆维修企业"
          this.searchCompanyType='214'
        }else if(this.$route.query.type==="215"){
          this.searchCompanyName="新能源汽车维修"
          this.searchCompanyType='215'
        }else if(this.$route.query.type==="164"){
          this.searchCompanyName="维修企业"
          this.searchCompanyType='164'
        }
      }else {
        this.searchCompanyName="维修企业"
        this.searchCompanyType='164'
      }
      if(localStorage.getItem("USERINFO")){
        this.userinfo = JSON.parse(localStorage.getItem("USERINFO"))
      }

    },

    mounted(){
		this.init()

	    this.setShowBody()


    },
    activated(){
      let self=this
	    this.setShowBody()
      setTimeout(function () {
        self.renderMap()
        // self.bodyNoScoll()
        // self.toQuery()
      },500)
    },
    deactivated(){
      // document.body.removeEventListener('touchmove', this.noscroll,false)
    },
    beforeDestory(){
      // document.body.removeEventListener('touchmove', this.noscroll,false)
    },
    methods: {
    	init(){
		   Indicator.open({
			    text: '请稍候...',
			    spinnerType: 'snake'
		    });
		    this.map= new AMap.Map('container',{
			    center: new AMap.LngLat(this.search.lng, this.search.lat),
			    zoom: 10,
		    });
		    // 同时引入工具条插件，比例尺插件和鹰眼插件
		    AMap.plugin(['AMap.ToolBar',], () => {
			    // 在图面添加工具条控件，工具条控件集成了缩放、平移、定位等功能按钮在内的组合控件
			    this.map.addControl(new AMap.ToolBar({
				    locate: false,
				    position: 'LT',
				    offset: new AMap.Pixel(0,25)
			    }));
		    });

		    this.map.on('complete', () => {
			    // 地图图块加载完成后触发
			    // console.log('this.map.on(complete)')
			    this.getLocation()
		    });

		    this.map.on('dragend', () => {
			    let center= this.map.getCenter()
			    this.search.lng= center.lng
			    this.search.lat= center.lat
			    this.getCompList(false, true)
		    });

		    for(let key in this.$route.query){
			    this.search[key]= this.$route.query[key]
		    }
		    // console.log(this.$route.query)
		    // this.getArea()
	    },
	    getLocation(){
		    if(this.map){
			    AMap.plugin('AMap.Geolocation', () => {
				    this.geolocation = new AMap.Geolocation({
					    buttonPosition: 'RT',
					    buttonOffset: new AMap.Pixel(10,10),
					    timeout: 2000,
				    });
				    this.map.addControl(this.geolocation);
				    this.geolocation.getCurrentPosition();
				    AMap.event.addListener(this.geolocation, 'complete', (result)=>{
				    	// console.log('result', result)
					    this.map.clearMap()
					    this.map.setCenter(result.position)
					    this.map.add(new AMap.Marker(result.position))
					    this.search.lng= result.position.lng
					    this.search.lat= result.position.lat
					    this.getCompList()
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
						    this.search.lng= center.lng
						    this.search.lat= center.lat
						    this.getCompList()
						    // this.initPiontList()
					    })
				    }else{
				    	let center= new AMap.LngLat(this.search.lng, this.search.lat)
					    this.map.panTo(center)
					    this.map.add(new AMap.Marker( {
						    position: center
					    }))
					    this.getCompList()
				    }
			    })
		    });
	    },
      toQuery(){
        let compname= this.$route.query.compname
        if(compname){
          this.query.q= compname
          // this.key('search')
          this.getList(false, true)
        }
      },
	    getCompList(clearPoint, clearList){
		    if(clearList) this.page=1
		    else this.page++
		    let query= this.calcQuery()
		    this.axios({
			    baseURL: '/repairproxy',
			    url: '/micro/search/company'+ query,
			    method: 'get',
		    }).then( (res) => {
		    	let datas= res.data.content
			    if(clearList){
				    this.list= res.data.content
				    // 最近的点
				    if(res.data.content.length){
					    this.search.lng = parseFloat(res.data.content[0].lon);
					    this.search.lat = parseFloat(res.data.content[0].lat);
				    }

			    }else{
				    this.list= this.list.concat(res.data.content)
			    }
			    if(clearPoint){
				    this.pointList= []
				    for( let i in datas){
					    if(datas[i].kw.indexOf('4s')>=0) datas[i].is4s= true
					    this.pointList.push(datas[i])
				    }
			    }else{
				    let hasPoint= false
				    for (let i in datas) {
					    if(datas[i].kw.indexOf('4s')>=0) datas[i].is4s= true
					    hasPoint= false
					    for(let j in this.pointList){
						    if(this.pointList[j].sid== datas[i].sid){
							    hasPoint= true
							    break
						    }
					    }
					    if(!hasPoint) this.pointList.push(datas[i])
				    }
			    }

			    // this.calcPointList(res.data.content)
			    this.total= res.data.totalElements
			    this.renderMap()
		    })
	    },
	    calcQuery(limit){
		    let is164= this.search.type== 164
		    let query='?fl=type,sid,name,addr,tel,distance,kw,lon,lat,bizScope,brand,category,openHours,rating'+
			    '&q='+ this.search.q +
			    '&page='+ (this.page-1) +','+ (limit ||this.limit)
		    if(is164) query+= ('&sort=_score desc,'+ (this.search.sort||'distance'))
		    if(this.search.lng) query+=('&point='+this.search.lat+','+this.search.lng)
		    let fq='&fq=status:1+AND+type:'+ this.search.type, is4s=''
		    if(this.search.area && is164) fq+= '+AND+areaKey:'+ this.search.area
		    if(this.search.is4s && is164){
			    is4s= (this.search.is4s=='yes' ? 'kw:4s': '-kw:4s')
			    fq+= '+AND+' + is4s
		    }
		    query += fq

		    return query
	    },
	    // initPiontList(){
		 //    let query= this.calcQuery(20)
		 //    this.axios({
			//     baseURL: '/repair',
			//     url: '/micro/search/company'+ query,
			//     method: 'get',
		 //    }).then( (res) => {
			//     this.calcPointList(res.data.content)
		 //    })
	    // },
	    // calcPointList(list){
		 //    let hasPoint= false
		 //    let points= this.pointList
		 //    for(let i in list){
			//     if(list[i].kw.indexOf('4s')>=0) list[i].is4s= true
			//     hasPoint= false
			//     for(let j in points){
			// 	    if(points[j].sid == list[i].sid){
			// 		    hasPoint= true
			// 		    break
			// 	    }
			//     }
			//     if(!hasPoint) this.pointList.push(list[i])
		 //    }
		 //    this.renderMap()
	    // },

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
        document.getElementById("allmap").addEventListener('touchmove', this.noscroll, { passive: false })
      },
      noscroll(evt) {
        if(!evt._isScroller) {
          evt.preventDefault();
        }
      },


      openMap(){
        this.sheetVisible = !this.sheetVisible
      },


      getList( clearPoint, clearList){
        if(clearList) this.query.page=1
        else this.query.page++
        this.axios({
          method: 'post',
          url: '/maintain/v2/getRangeCorps',
          headers: {
            'Content-type': 'application/json'
          },
          data: JSON.stringify(this.query)
        }).then(res => {
          let datas = res.data.data;
          this.total= res.data.totalCount
          if(clearList){
            this.compList= datas
            // 最近的点
	          if(datas.length){
		          this.query.lon = parseFloat(datas[0].lon);
		          this.query.lat = parseFloat(datas[0].lat);
	          }

          }else{
            this.compList= this.compList.concat(datas)
          }
          if(clearPoint){
            this.points= []
            for( let i in datas){
              this.points.push(datas[i])
            }
          }else{
            let hasPoint= false
            for (let i in datas) {
              hasPoint= false
              for(let j in this.points){
                if(this.points[j].sid== datas[i].sid){
                  hasPoint= true
                  break
                }
              }
              if(!hasPoint) this.points.push(datas[i])
            }
          }
          this.renderMap()
        })
      },

      queryByList(query, clearList){
        this.search.q= query.q
        this.search.area= query.area
        this.search.sort= query.sort
        this.getCompList(clearList, clearList)
      },

      renderMap(){
	      if(this.markerClusterer ) {
		      this.markerClusterer.clearMarkers();
		      this.markerClusterer.setMap(null);
		      this.markerClusterer= null
	      }
	      let iconNormal = new AMap.Icon({
		      image: "/static/img/maintain/icon-normal.png",
		      size: new AMap.Size(52, 52),
		      imageOffset: new AMap.Size(11, 11),
		      imageSize: new AMap.Size(30, 30),
	      });
	      let icon4s = new AMap.Icon({
		      image: "/static/img/maintain/icon-4s.png",
		      size: new AMap.Size(52, 52),
		      imageOffset: new AMap.Size(11, 11),
		      imageSize: new AMap.Size(30, 30),
	      });
	      this.markers= []
	      for (let i in this.pointList){
		      let lngLat= new AMap.LngLat(this.pointList[i].lon|| this.search.lng, this.pointList[i].lat|| this.search.lat)
		      let marker= new AMap.Marker({
			      icon: this.pointList[i].is4s? icon4s: iconNormal,
			      position: lngLat,
			      extData: this.pointList[i]
		      })
		      marker.on('click', (e) => {
			      switch (this.$route.name){
				      case 'remark-map':{
					      this.$router.push({path: '/remarkMatch', query: { corpId: e.target.getExtData().sid }})
					      break;
				      }
				      default :{
					      this.getCompanyDetail(e.target.getExtData())
				      }
			      }
		      })
		      this.markers.push(marker)
	      }

	      let style={
		      url: '/static/img/position-num.png',
		      size: new AMap.Size(40, 40),
		      textColor: '#fff',
		      textSize: 14
	      }
	      AMap.plugin(["AMap.MarkerClusterer"],() => {
		      this.markerClusterer = new AMap.MarkerClusterer(this.map, this.markers,{styles:[style, style, style]});
		      // console.log('renderMap() over')
	      });


        // if(this.markerClusterer){
        //   this.markerClusterer.clearMarkers()
        // }
        // let that = this
        // let pt = null
        //
        // let iconNormal = new BMap.Icon("/static/img/maintain/icon-normal.png", new BMap.Size(52, 52),
        //   {imageOffset: new BMap.Size(11, 11), imageSize: new BMap.Size(30, 30)});
        // let icon4s = new BMap.Icon("/static/img/maintain/icon-4s.png", new BMap.Size(52, 52),
        //   {imageOffset: new BMap.Size(11, 11), imageSize: new BMap.Size(30, 30)});
        // let markers = []
        // for (let i = 0; i < that.points.length; i++) {
        //   pt = new BMap.Point(that.points[i].lon, that.points[i].lat)
        //   let marker = new BMap.Marker(pt, { icon: that.points[i].is4s? icon4s: iconNormal })
        //   // marker.corpId = that.points[i].corpId
        //   // marker.distance = that.points[i].distance
        //   marker.compDetail = that.points[i]
        //   markers.push(marker)
        // }
        //
        //
        // // 点击维修企业图标查看详细信息
        // for (let i = 0; i < markers.length; i++) {
        //   markers[i].addEventListener('click', function(e) {
        //     // console.log('getCompanyDetail',this.compDetail)
        //
        //     that.getCompanyDetail(this.compDetail)
        //
        //   })
        // }
        //
        // this.markerClusterer = new BMapLib.MarkerClusterer(that.Map, {
        //   markers: markers,
        //   girdSize: 200,
        //   styles: [{
        //     url: '/static/img/position-num.png',
        //     // maxZoom: 10,
        //     size: new BMap.Size(40, 40),
        //     // offset: new BMap.Size(5, 5),
        //     // imageSize: new BMap.Size(34, 34),
        //     textColor: '#fff',
        //     textSize: 14
        //   }]
        // })
        // this.clickMarkerClusterer()
      },

      clickMarkerClusterer(){

        let self= this
        let overlays= this.Map.getOverlays()
        for (let i in overlays){
          if(overlays[i].constructor.name =='TextIconOverlay'){
            overlays[i].V.addEventListener('touchstart', function(e) {
              console.log('clickMarkerClusterer', overlays[i])
              // self.Map.zoomIn()
              self.Map.panTo(overlays[i]._position)
              self.query.lon = overlays[i]._position.lng;
              self.query.lat = overlays[i]._position.lat;
              // self.sendAjax()
              setTimeout(function () {
                self.Map.zoomIn()
                self.clickMarkerClusterer()
                // setTimeout(function () {
                //   self.renderMap()
                // },200)
              }, 300)
            })
          }
        }
      },

      goLatePoint(){
	      this.map.panTo(new AMap.LngLat(this.search.lng, this.search.lat))


      },


      getCompanyDetail(item) {
        // let that=this
        // that.corpId = id
        // that.distance = distance
        // this.random= Math.random()
        // this.showDetail=true

        this.$store.commit('setMaintainDetail', item)
        this.$store.commit('setMaintainListHistory', item)
        this.$store.commit('setSlideShowBody', 'maintainDetail')
        this.goMap(item)

      },  // 获取企业详情信息

      key(e) {
        if ( e.keyCode == 13 || e=='search') {
          $('#search_repaire').blur()
          // if(this.repairName.trim())
            // this.sendAjax(true, true)
        }
      },   // 搜索维修站点

      loadBottom(){
        this.page++
        // this.sendAjax(false, true, true)
      },

      goMap(item){
        // console.log(item)
        // let point= [{
        //   lng: item.lng,
        //   lat: item.lat,
        //   corpId: item.corpId,
        //   distance: item.distance
        // }]
        // this.corpId = item.corpId
        // this.distance = item.distance
        // this.getCompanyDetail(item)
        // this.showDetail=true

        // this.points = point
        // this.currentPoint.pointX = item.lng
        // this.currentPoint.pointY = item.lat
        // this.showSmallList=false
        // this.isShowCropList=false
        // this.renderMap();
        // console.log(this.points);
        // console.log(this.currentPoint);

        this.search.lng= item.lon
        this.search.lat= item.lat
	      this.map.panTo(new AMap.LngLat(this.search.lng, this.search.lat))


      },

      closeFilter() {  // 关闭筛选框
        this.popupVisible = !this.popupVisible
      },  // 侧边点击关闭筛选框
      getCompanyType(e, v) {
        this.type = v
        this.addclass(e)
      },  // 获得企业类型
      getStarLevel(e, v) {      // 获取星级评分
        this.level = v
        this.addclass(e)
      },  // 获得星级评分
      getArea(e, v) {              // 获取区域范围
        this.area = v
        this.addclass(e)
      },  // 获得区域


      complete(){
        this.isShowBrandList = false;
        this.isShowAllList = true;
        this.ShowBottomButton = true;
      },    // 关闭车辆品牌(完成)
      addclass(e) {
        let ele = e.target
        let brothers = ele.parentNode.children
        for (let i = 0; i < brothers.length; i++) {
          brothers[i].className = ''
        }
        ele.className = 'active'
      },  // 添加类

      businessStatus(status){
        switch (status){
          case 1: return '营业';
          case 2: return '停业';
          case 3: return '注销';
          case 4: return '空壳';
        }
      },
      tagIsOn( arrName, val ){
        if (this.search[arrName]===val)  return true
        else return false
      },
      select( arrName, val ){
        if(this.search[arrName]!== val){
          this.search[arrName]= val
          this.getCompList( true, true)
        }
      },
	    setShowBody(){
		    switch (this.$route.name){
			    case 'remark-map':{
				    this.$store.commit('setSlideShowBody', 'maintainList')
				    break;
			    }
			    default :{

			    }
		    }
	    }
    }
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
    .maintain-type{
      width: 100%;
      height: 30px;
      line-height: 30px;
      font-size: 14px;
      border-bottom: 1px solid #f0f0f0;
      li{
        width: 33%;
        height: 100%;
        text-align: center;
        color:  #9d9d9d;
        display: inline-block;
      }
      li.on{
        color: black;
      }
    }
    .search {
      position: relative;
      overflow: hidden;
      height: calc(100% - 80px);
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
          background: url(../assets/img/record/findfix.png) no-repeat;
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
          background: url(../assets/img/record/search.png) no-repeat 10px 7px;
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
          position: absolute;
          left: -50px;
          top: -66px;
        }
      }


      #container {
        width: 100%;
        height: 100%
      }

    }
    #popover {
      z-index: 1000;
      width: 90%;
      height: 450px;
      border-radius: 15px;
      left: 5% !important;
      top: 50% !important;
      transform: translateY(-50%);
      background-color: #fff;
      .mui-popover-arrow {
        height: 0;
      }
      .close_btn {
        position: absolute;
        left: 50%;
        bottom: -50px;
        width: 35px;
        height: 35px;
        transform: translateX(-50%);
        background: url(../assets/img/maintain/close.png) no-repeat;
        background-size: contain;
      }
      >#top {
        height: 130px; // line-height: 20px;
        border-radius: 15px 15px 0 0;
        background: linear-gradient(to right, #67aafb, #3b83f6);
        overflow: hidden;
        .title {
          height: 60px;
          margin-top: 25px;
          .img {
            width: 60px;
            height: 60px;
            background-color: #fff;
            margin: 0 13px;
            float: left;
          }
          span {
            color: #fff;
            font-size: 16px;
            line-height: 26px;
            font-family: 'PingFang-SC-Medium';
            overflow: hidden;
            text-overflow: ellipsis;
            display: -webkit-box;
            -webkit-line-clamp: 2;
            -webkit-box-orient: vertical;
          }
        }
        @media screen and (min-width: 320px) {
          .address {
            font-size: 12px;
          }
        }
        @media screen and (min-width: 375px) {
          .address {
            font-size: 14px;
          }
        }
        .address {
          height: 20px;
          color: #fff;
          margin-top: 15px;
          margin-left: 15px;
          .name {
            height: 20px;
            width: 79%;
            float: left;
            position: relative;
            em {
              width: 15px;
              height: 15px;
              background: url(../assets/img/maintain/address.png) no-repeat;
              background-size: contain;
              position: absolute;
              top: 2px;
            }
            span {
              margin-left: 18px;
              display: inline-block;
              width: 92%;
              overflow: hidden;
              text-overflow: ellipsis;
              white-space: nowrap;
            }
          }
          .mile {
            float: right;
            margin-right: 10px;
            position: relative;
            i {
              position: absolute;
              border: none;
              width: 15px;
              height: 15px;
              background: url(../assets/img/maintain/mile.png) no-repeat;
              background-size: contain;
              top: -15px;
              left: 50%;
              transform: translateX(-50%);
            }
          }
        }
      }
      >.content {
        >.top {
          height: 50px;
          color: #666;
          >.left {
            float: left;
            border-bottom: 1px solid #eee;
            border-right: 1px solid #eee;
            width: 50%;
            height: 100%;
            box-sizing: border-box;
            >p {
              text-align: center;
              color: red;
              margin-bottom: 0;
              margin-top: 5px;
              width: 100%;
              height: 18px;
              line-height: 22px;
            }
            span {
              display: block;
              text-align: center;
              font-size: 14px;
              line-height: 24px;
            }
          }
          >.right {
            border-bottom: 1px solid #eee;
            height: 100%;
            float: right;
            width: 50%;
            position: relative;
            .stars {
              position: absolute;
              font-size: 1px;
              width: 88px;
              height: 14px;
              left: 50%;
              transform: translateX(-50%);
              top: 8px;
              img {
                width: 14px;
                height: 14px;
                margin-right: 3px;
                float: left;
              }
            }
            p {
              text-align: center;
              margin-top: 22px;
              color: #666;
              width: 100%;
              line-height: 26px;
            }
          }
        }
        >.middle {
          height: 230px;
          padding: 17px 12px;
          font-size: 12px;
          color: #333;
          overflow: auto;
          .hehe {
            min-height: 31px;
            .left {
              float: left;
              width: 70px;
              padding-bottom: 10px;
              position: relative;
              img {
                position: absolute;
                width: 22px;
                height: 22px;
                right: 0;
                top: 0;
                transform: translate(50%, 0);
                border-radius: 50%;
              }
            }
            .right {
              margin-left: 70px;
              padding-left: 20px;
              border-left: 1px solid #eee;
              padding-bottom: 10px;
              display: block;
              min-height: 31px;
            }
          }
        }
        >.bottom {
          text-align: center;
          line-height: 40px;
          border-radius: 0 0 15px 15px;
          color: #4285f4;
          border-top: 1px solid #eee;
          >div {
            width: 33.2%;
            float: left;
            border-right: 1px solid #ccc;
          }
          >div:last-child {
            border-right: none;
          }
        }
      }
    }
    .filter {
      background-color: rgba(0, 0, 0, 0);
      width: 100%;
      height: 100%;
      .closeFilter {
        position: absolute;
        width: 20px;
        height: 20px;
        background-color: #f00;
        left: 0;
        top: 0;
      }
      .contentAside {
        width: 12%;
        height: calc(100vh);
        float: left;
      }
      .contentWrap {
        margin-left: 12%;
        background-color: #fff;
        height: 100%;
        overflow: auto;
        .content {
          position: relative;
          color: #2d2d2d;
          padding-bottom: 50px;
          >ul {
            >li::after {
              height: 0;
            }
            >li:last-child {}
            >li {
              border-bottom: 10px solid #f8f8f8;
              a {
                border-bottom: 1px solid #eee;
                transition: all 50s;
              }
              .mui-collapse-content {
                margin-top: 15px;
                border-bottom: 1px solid #eee;
                padding: 15px 0 3px;
                >ul {
                  margin: 0 auto;
                  width: 94%;
                  overflow: hidden;
                  >li {
                    padding: 0 3px;
                    float: left;
                    border: 1px solid #ddd;
                    border-radius: 5px;
                    width: 31%;
                    height: 35px;
                    line-height: 35px;
                    margin-right: 3.5%;
                    box-sizing: border-box;
                    font-size: 12px;
                    text-align: center;
                    margin-bottom: 12px;
                    color: #666;
                  }
                  >li:nth-child(3n) {
                    margin-right: 0;
                  }
                  .active {
                    /* 被选中的样式 */
                    background-color: #ecf3fe;
                    color: #4285f4;
                    border: 1px solid #3e87f6 !important;
                  }
                }
              }
              .carBrandChoose {
                padding: 0 0 3px;
              }
            }
            .mui-active {
              background-color: #fff;
              margin-top: 0;
            }
          }
          >ul::before,
          >ul::after {
            height: 0;
          }
          .carBrand {
            height: 100%;
            overflow: auto;
            .mint-indexlist-navlist {
              overflow: auto;
            }
            .mint-indexsection-index {
              padding: 5px 10px;
            }
            .mint-cell-title {
              flex: 0;
            }
            .mint-cell-wrapper {
              position: relative;
              .mint-cell-value {
                width: 100%;
                span {
                  margin-left: 15px;
                  color: #333;
                }
                .mui-radio {
                  width: 100%;
                  position: static;
                  label {
                    color: #333;
                  }
                  input {
                    position: absolute;
                    right: 35px;
                    top: 10px;
                  }
                  input[type=radio]::before {
                    content: ''
                  }
                  input[type=radio]:checked::before {
                    content: '\e442'
                  }
                }
              }
            }
          }
        }
        .content_brand {
          padding-top: 40px;
          .brand_header {
            width: 88%;
            height: 40px;
            background-color: #f7f7f7;
            border-bottom: 1px solid #ddd;
            position: fixed;
            top: 0;
            right: 0;
            z-index: 10000;
            h1 {
              margin: 0;
              font-size: 16px;
              text-align: center;
              line-height: 40px;
              font-weight: normal;
            }
            a {
              width: 50px;
              height: 100%;
              position: absolute;
              right: 0;
              top: 0;
              line-height: 40px;
              text-align: center;
            }
          }
          .mint-indexlist {
            height: calc(100vh - 40px);
            >ul {
              height: 100% !important;
              li {
                ul li {
                  border-bottom: 1px solid #eee;
                  &:last-child {
                    border-bottom: none;
                  }
                  .mint-cell-wrapper {
                    img {
                      margin-right: 5px;
                    }
                    .mui-input-row input::before {
                      content: ''
                    }
                    .mui-input-row .choosed::before {
                      content: '\e442';
                    }
                  }
                }
              }
            }
            .mint-indexlist-navlist {
              overflow: scroll;
              li {
                padding: 1px 6px;
              }
            }
          }
        }
        .confirm {
          height: 50px;
          width: 100%;
          transform: translateZ(0);
          -webkit-transform: translateZ(0);
          border-top: 1px solid #eee;
          position: fixed;
          left: 12%;
          bottom: 0;
          padding: 0 6%;
          font-size: 0;
          z-index: 3000;
          background-color: #fff;
          button {
            font-size: 16px;
            width: 40%;
            margin-right: 6%;
            height: 35px;
            margin-top: 7px;
            background-color: #fff;
            border-radius: 6px;
            border: none;
            border: 1px solid #ddd;
            outline: none;
          }
          button:nth-child(2) {
            background: linear-gradient(to right, #77b9fe, #3882f5);
            color: #fff;
          }
        }
      }
    }
    .company_list {
      border-top: 1px solid #f6f6f6;
      width: 100%;
      height: calc(100vh - 135px);
      background-color: #fff;
      position: absolute;
      top: 85px;
      left: 0;
      z-index: 15;
      overflow: scroll;
      /*ul{margin-bottom: 50px}*/
      ul li {
        padding: 10px;
        border-bottom: 1px solid #f6f6f6;
        .picWrap {
          float: left;
          width: 80px;
          height: 80px;
          border-radius: 5px;
          overflow: hidden;
          img {
            width: 100%;
            height: 100%;
          }
        }
        .info {
          height: 80px;
          margin-left: 90px;
          p {
            font-size: 16px;
            margin-bottom: 0;
            color: #000;
            overflow: hidden;
            text-overflow:ellipsis;
            white-space: nowrap;
            span {
              color: red;
            }
          }
          .stars {
            height: 20px;
            margin: 6px 0 10px;
            img {
              width: 15px;
              height: 15px;
              margin-top: 2px;
              margin-right: 3px;
              float: left;
            }
            span {
              color: #999;
              margin-left: 10px;
              font-size: 14px;
            }
          }
          .address {
            color: #666;
            font-size: 14px;
            .miles {
              float: right;
            }
            .address_area {
              display: block;
              margin-right: 60px;
              overflow: hidden;
              text-overflow:ellipsis;
              white-space: nowrap;
            }
          }
        }
      }
    }
    .maplist{
      width: 100%;
      max-height: 40vh;
      position: absolute;
      left: 0;
      bottom: 0;
      background: white;
      overflow: auto;
      padding: 0 10px;
      /*border-top: 10px solid white;*/
      li{
        padding: 10px 0;
        border-bottom: 1px solid #eeeeee;
        position: relative;
        p{
          margin-top: 5px;
          margin-bottom: 0;
        }
        .sight{
          width: 20px;
          position: absolute;
          top: 0;
          bottom: 0;
          right: 0;
          margin: auto 5px;
          display: none;
        }
      }
      li.on .sight{
        display: block;
      }
    }

  }
</style>
