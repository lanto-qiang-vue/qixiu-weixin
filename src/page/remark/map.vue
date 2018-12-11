<template>
<div id="map">
  <div class='search'>
    <div class="search_wrap">
      <!--<form action="javascript:return true;">-->
        <input id='search_repaire' class="mui-input-clear" type="search" v-model='corpName' placeholder="搜索维修站点" @keydown="key($event)">
      <div class="search2" @click="key('search')">搜索</div>
      <!--</form>-->
    </div>
  </div>
  <div style="position: relative">
    <div id="container"></div>
    <div class="fixGuide" @click="goLatePoint()">查找附近维修点<img src="/static/img/position.png" alt=""></div>
  </div>

  <ul class="maplist" v-show="infoVisible">
    <li  v-for="(item, index) in compList" :key="item.corpId" @click="select(item, index, $event)">
      <span>{{item.corpName}}</span>
      <p>{{item.corpAdd}}</p>
      <img class="sight" src="../../assets/img/remark/sight.png"/>
    </li>
  </ul>
  <!--<mt-popup v-model="infoVisible" class="info" model="false" position="right">-->
    <!--<mt-header title="匹配车辆"><mt-button icon="back" slot="left" @click="infoVisible=false"></mt-button></mt-header>-->

  <!--</mt-popup>-->
</div>
</template>

<script>
  import { Toast,  Header } from 'mint-ui'
	export default {
		name: "remark-map",
    data(){
		  return{
        Map: null,
        markerClusterer: null,
        currentPoint: {             // 手机定位的位置
          pointX: 121.480236,
          pointY: 31.236301,
        },
        userinfo: {},
        corpName: '',
        points: [],
        compList:[],
        infoVisible: false,
        compinfo: {},

        GeolocationControl: null,
      }
    },
    created(){
      this.getLocation();
    },
    mounted(){
      let that = this
      this.Map = new BMap.Map("container")

      let point = new BMap.Point(that.currentPoint.pointX, that.currentPoint.pointY)           // 创建中心坐标
      that.Map.centerAndZoom(point, 14)                 // 初始化地图，设置中心点坐标和地图级别
      that.Map.addControl(new BMap.NavigationControl())         //添加放大缩小控件
      that.GeolocationControl= new BMap.GeolocationControl()
      that.Map.addControl(that.GeolocationControl);

      that.GeolocationControl.addEventListener('locationSuccess', function (point) {
        // console.log(point)
        that.currentPoint.pointX = point.point.lng
        that.currentPoint.pointY = point.point.lat
        that.corpName=''
        that.sendAjax(false, false)
        // let compname= that.$route.query.compname
        // if(compname){
        //   that.toQuery()
        // }else{
        //   that.sendAjax(false, false)
        // }
      })

      let dragx=0,dragy=0
      this.Map.addEventListener("dragstart", function(e) {
        // console.log('dragstart',e.offsetX, e.offsetY)
        dragx=e.offsetX
        dragy=e.offsetY
      })
      this.Map.addEventListener("dragend", function(e) {
        that.corpName=''
        let drageDistance= that.Map.getDistance(new BMap.Point(e.point.lng, e.point.lat),
          new BMap.Point(that.currentPoint.pointX, that.currentPoint.pointY)
        )
        that.clickMarkerClusterer()
        // console.log(new BMap.Point(that.currentPoint.pointX, that.currentPoint.pointY))
        // console.log(drageDistance)
        if(Math.abs(e.offsetX- dragx)<50 && Math.abs(e.offsetY-dragy)<50 && drageDistance< 2000) return
        that.currentPoint.pointX = that.Map.getCenter().lng;
        that.currentPoint.pointY = that.Map.getCenter().lat;
        that.sendAjax(false, false)
        that.showDetail=false
      })

      this.Map.addEventListener("touchstart", function(e) {
        // console.log(e)
        if(!e.bb && that.infoVisible) {
          that.infoVisible=false
          that.clickMarkerClusterer()
        }
      })
      this.Map.addEventListener("zoomend", function(e) {
        console.log('zoomend')
        setTimeout(function () {
          that.clickMarkerClusterer()

        },500)
      })
    },
    activated(){
		  let self=this
		  setTimeout(function () {
        self.renderMap()
      },500)
    },
    methods: {
      getLocation() {  // 获取当前手机地理位置
        let that = this;
        let geolocation = new BMap.Geolocation();  // 开启SDK辅助定位
        geolocation.getCurrentPosition(function(r){
          if(this.getStatus() == BMAP_STATUS_SUCCESS){
            that.currentPoint.pointX = r.point.lng;
            that.currentPoint.pointY = r.point.lat;
            let point = new BMap.Point(that.currentPoint.pointX, that.currentPoint.pointY)
            let marker = new BMap.Marker(point);    // 创建标注
            let myIcon = new BMap.Icon(that.userinfo.photo?that.userinfo.photo:"/static/img/user.png", new BMap.Size(50,50), {
              offset: new BMap.Size(0, 0)
            });
            that.Map.addOverlay(marker,{icon: myIcon});
            marker.setAnimation(BMAP_ANIMATION_BOUNCE);
            that.Map.panTo(r.point)
            that.sendAjax()
          } else {
            Toast('当前地理位置获取失败')
            that.sendAjax()
          }
        },{enableHighAccuracy: true})
      },
      sendAjax() {
        let self =this;
        let data = {
          companycategory: "",
          corpAreaEq: "",
          corpName: this.corpName,
          distance: 5,
          lat: this.currentPoint.pointY|| 31.236301,
          limit: 20,
          lng: this.currentPoint.pointX|| 121.480236,
          magorBrandsLk: this.brand,
          page: 1,
          searchOption: "2",
          sortField: "",
          starLevel: "",
          systemToken: localStorage.getItem("SYSTEMTOKEN"),
          type: "164"
        }
        // console.log(data)
        this.axios({
          method: 'post',
          url: '/maintain/getRangeCorps',
          headers: {'Content-type': 'application/json'},
          data: JSON.stringify(data)
        })
          .then(res => {
            let datas = res.data.data;
            // let poi=[]
            if(datas && datas.length>0){
              // for (let i in datas) {
              //   poi.push({
              //     lng: datas[i].longitude,
              //     lat: datas[i].latitude,
              //     distance: datas[i].distance,
              //     corpId: datas[i].corpId
              //   })
              // }
              // this.points=poi

              // this.points=datas
              let has_point= false
              for (let i in datas) {
                has_point= false
                for(let j in self.points){
                  if(self.points[j].corpId== datas[i].corpId){
                    has_point= true
                    break
                  }
                }
                if(!has_point) self.points.push({
                  lng: datas[i].longitude,
                  lat: datas[i].latitude,
                  distance: datas[i].distance,
                  corpId: datas[i].corpId,
                  corpName: datas[i].corpName,
                  corpAdd: datas[i].corpAdd,
                  creditLevel: datas[i].creditLevel,
                })
              }

              // this.Map.panTo(new BMap.Point(datas[0].longitude, datas[0].latitude))

              //打开列表
              // if(self.corpName){
              //   self.compList=datas
              //   self.infoVisible=true
              // }
              self.compList=datas
              self.infoVisible=true

              self.currentPoint.pointX = parseFloat(datas[0].longitude);   // 最近的点
              self.currentPoint.pointY = parseFloat(datas[0].latitude);   // 最近的点

              self.renderMap()
            } else {
              self.compList=[]
              self.infoVisible=false
              return Toast('未搜索到')
            }
            // this.currentPoint.pointX = this.points[0].lng;   // 最近的点
            // this.currentPoint.pointY = this.points[0].lat;   // 最近的点
          })
      },
      renderMap(){
        if(this.markerClusterer){
          this.markerClusterer.clearMarkers()
        }
        let that = this
        let pt = null
        //更改红色水滴样式
        let myIcon = new BMap.Icon("/static/img/maintain/icon-normal.png", new BMap.Size(52, 52),
          {imageOffset: new BMap.Size(11, 11), imageSize: new BMap.Size(30, 30)});
        let markers = []
        for (let i = 0; i < that.points.length; i++) {
          pt = new BMap.Point(that.points[i].lng, that.points[i].lat)
          let marker = new BMap.Marker(pt, { icon: myIcon })
          // marker.corpId = that.points[i].corpId
          // marker.distance = that.points[i].distance
          marker.info=that.points[i]
          markers.push(marker)
        }
        this.markerClusterer = new BMapLib.MarkerClusterer(that.Map, {
          markers: markers,
          girdSize: 200,
          styles: [{
            url: '/static/img/position-num.png',
            size: new BMap.Size(40, 40),
            textColor: '#fff',
            textSize: 16
          }]
        })

        if(this.corpName){
          let info= this.compList[0]
          this.Map.panTo(new BMap.Point(info.lng|| info.longitude, info.lat || info.latitude))
        }

        // 点击维修企业图标查看详细信息
        for (let i = 0; i < markers.length; i++) {
          markers[i].addEventListener('click', function() {
            console.log(this.info)
            that.getCompanyDetail(this.info)

          })
        }
        setTimeout(function () {
          that.clickMarkerClusterer()
        },500)
        // this.clickMarkerClusterer()
      },
      clickMarkerClusterer(){
        // console.log(this.Map.getOverlays())
        let self= this
        let overlays= this.Map.getOverlays()
        for (let i in overlays){
          if(overlays[i].constructor.name =='TextIconOverlay'){
            overlays[i].V.addEventListener('touchstart', function(e) {
              console.log(overlays[i])
              self.Map.panTo(overlays[i]._position)
              self.currentPoint.pointX = overlays[i]._position.lng;
              self.currentPoint.pointY = overlays[i]._position.lat;
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
      key(e) {
        if (e==='search' || e.keyCode == '13') {
          if(this.corpName.trim()){
            this.points=[]
            this.sendAjax()
          }
        }
      },
      select(item,index,e){
        console.log(item)
        // for (let i in this.compList){
        //   this.compList[i].on=false
        // }
        // this.compList[index].on=true
        console.log(e)
        $(".maplist li").removeClass('on')
        $(e.target).addClass('on').parents('li').addClass('on')
        this.getCompanyDetail(item)
      },
      getCompanyDetail(info){
        let self=this
        this.Map.panTo(new BMap.Point(info.lng|| info.longitude, info.lat || info.latitude))
        // setTimeout(function () {
        //   self.infoVisible=true
        // },500)
        // self.compinfo= info
        setTimeout(function () {
          self.$router.push({path: '/remarkMatch', query: { corpId: info.corpId }})
        },500)
      },
      goLatePoint(){
        // console.log(this.points[0].lng, this.points[0].lat)
        this.Map.panTo(new BMap.Point(this.currentPoint.pointX, this.currentPoint.pointY))
        // this.showDetail=true
        // this.showDetail=false


        let self=this
        setTimeout(function () {
        // self.clickMarkerClusterer()
          self.renderMap()
        // self.getCompanyDetail(self.nearPoint.corpId, self.nearPoint.distance)
        },500)

      },
    },

	}
</script>

<style scoped lang='less'>
  #map{
    position: relative;
  }
  .search {
    position: relative;
    padding: 0 20px;
    .search_wrap {
      /*margin-left: 60px;*/
      width: 100%;
      position: relative;
      input {
        background: url(../../assets/img/record/search.png) no-repeat 10px 7px;
        font-size: 14px;
        background-color: #eee;
        background-size: 18px 18px;
        text-indent: 20px;
        border-radius: 5px;
        outline: none;
        border: none;
        height: 30px;
        width: 80%;
        margin: 8px 0 8px;
        text-align: left;
        /*padding-right: 50px;*/
      }
      .search2{
        display: inline-block;
        width: 15%;
        text-align: center;
        height: 30px;
        margin: 8px 0 8px 5px;
        background-color: #3272F7;
        color: white;
        border-radius: 5px;
        line-height: 30px;
        font-size: 14px;
        float: right;
      }
      >span {
        position: absolute;
        right: 20px;
        top: 50%;
        transform: translateY(-50%);
        font-size: 16px;
        color: #333;
      }
    }
  }
  #container {
    width: 100%;
    height: calc(100vh - 46px);
    /*height: 100vh;*/
  }
  .fixGuide {
    padding: 5px 8px;
    border-radius: 5px;
    font-size: 14px;
    color: #fff;
    position: fixed;
    left: 50%;
    top: 50%;
    transform: translate(-50%, -140%);
    background-color: #3272F7;
    z-index: 10;
    img {
      position: absolute;
      width: 14px;
      height: 11px;
      top: 30px;
      left: 50%;
      transform: translateX(-50%);
      z-index: -1;
    }
  }
  .maplist{
    width: 100%;
    max-height: 45vh;
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

  /*.info{*/
    /*width: 100%;*/
    /*height: 100vh;*/
  /*}*/
</style>
