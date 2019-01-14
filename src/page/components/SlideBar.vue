<template>
<div class="slide-bar" ref="slide">
  <!--<div class="real-touch-bar"></div>-->
  <div class="touch-bar" @click="clickTouchBar= Math.random()"><i></i></div>
  <div class="slide-body">
    <slot :height="bodyHeight" :location="location" :clickTouchBar="clickTouchBar"></slot>
  </div>
</div>
</template>

<script>
	export default {
		name: "slide-bar",
    props: ['show', 'toLocation', 'minHeight', 'init'],
    data(){
		  return {
        timer: null,
        first: true,
        clickTouchBar: 0,
        moveLocation: {
          'maintainList':[
            {now: false, height: 1},
            {now: true, height: 200},
            {now: false, height: 1000},
          ],
          'maintainDetail':[
            {now: true, height: 1},
            {now: false, height: 1000}
          ],
        },
        minTop: 80,
        bodyHeight: 0,
        location: 0,

	    footerHeight: 50
      }
    },
    computed: {
      // slideState(){
      //   return this.$store.state.slideState
      // },
      // setBodyHeight(){
      //   return this.$store.state.slideState.setBodyHeight
      // },
      showBody(){
        return this.$store.state.app.slideState.showBody
      },
	    // footerHeight(){
      	// console.log('footerHeight')
      	//     let height= 50
      	//     if (this.$route.query.mapType=='remarkMap'){
      	//     	$('.footer').hide()
	    //         height=0
         //    }else{
	    //         height= 50
	    //         $('.footer').show()
         //    }
         //    return height
	    // }
    },
    watch:{

      showBody(){
      	let name= this.moveLocation[this.showBody]
	      for (let i in name){
      		if(name[i].now){
		        this.resize(name[i].height, 10)
	        }
	      }

      },
      // setBodyHeight(val, oldVal){
      //   // console.log('setBodyHeight', val)
      //   if(this.show){
      //     // this.translateSlide(val)
      //     // this.resize(val, 0)
      //     let upOrDown= val- oldVal> 0? 'down': 'up'
      //     this.autoMove(100, upOrDown, val)
      //   }
      // },
      // show(val){
      //   if(val){
      //     let translateY= parseInt($(this.$refs.slide).css('transform').split(',')[5])
      //     this.resize($(document).height()- 50- $('.touch-bar').outerHeight(true)- translateY, 100)
      //   }
      // }
      toLocation(val){
        console.log('slide-bar.toLocation', val)
        this.location= val
      },
      location(val){
        console.log('slide-bar.location', val)
        for (let i in this.moveLocation[this.showBody]){
          this.moveLocation[this.showBody][parseInt(i)].now= false
        }
        this.moveLocation[this.showBody][val].now= true
        this.resize(this.moveLocation[this.showBody][val].height, 10)
        this.$emit('toLocation', val)
      },
      init(){
        this.resize(this.moveLocation[this.showBody][this.location].height, 10)
        this.$emit('toLocation', this.location)
      }
    },
    mounted(){
      this.location= this.toLocation

	    this.needHideFooter()

      this.resize(this.moveLocation[this.showBody][this.location].height, 10)
      // this.$emit('toLocation', this.location)
      let self=this
      let dom= $(this.$refs.slide)
      let docHeight= $(document).height()- this.footerHeight
      let touchBarHeight= $('.touch-bar').outerHeight(true) //bar高度（20）
      let startY= 0
      let endY= 0
      let domY= 0
      let isMove= false
      let moveY=0
      // console.log(touchBarHeight)
      // $(dom).css({transform: 'translateY('+ (docHeight- this.setBodyHeight - touchBarHeight) + 'px)'})
      // $(dom).css({transform: 'translateY('+ this.slideState.minTop+ 'px);'})
      dom.bind('touchstart',function(startE){
        console.log('touchstart')
      // dom.children('.real-touch-bar').bind('touchstart',function(startE){
        startY= startE.originalEvent.targetTouches[0].pageY;
        domY = parseInt(dom.css('transform').split(',')[5])
        isMove= false
        moveY=0
        document.body.addEventListener('touchmove',self.noscroll,{ passive: false });
        $(document).bind('touchmove',function(e){
          console.log('touchmove')
          if(e.originalEvent.targetTouches[0].pageY>startY) isMove= 'down'
          if(e.originalEvent.targetTouches[0].pageY<startY) isMove= 'up'

          // console.log(isMove)
          //移动位置
          let y = e.originalEvent.targetTouches[0].pageY - (startY- domY);
          let height= docHeight- y - touchBarHeight

          if(height> docHeight- self.minTop){
            height= docHeight- self.minTop -touchBarHeight
          }else if(height< self.minHeight){
            height= self.minHeight
          }

          if(y< self.minTop) y= self.minTop
          if(y> docHeight- self.minHeight -touchBarHeight) y= docHeight- self.minHeight -touchBarHeight

          // console.log('touchmove', dom)
          $(dom).css({transform: 'translateY('+ y+ 'px)'})
          self.resize(height, 100, true)
          self.$emit('maintainListBlur')
        });

      });
      $(document).bind('touchend',function(endE){
        // console.log('touchend')
        $(document).off('touchmove');
        endY= endE.originalEvent.changedTouches[0].pageY
        // console.log('move', endY- startY)
        if(isMove){
          console.log('isMove',isMove)
          self.autoMove(endY- startY, isMove, docHeight- parseInt(dom.css('transform').split(',')[5])- touchBarHeight)
          // self.resize(docHeight- self.slideState.minTop -touchBarHeight, 0)
          // self.resize(1, 0)
          isMove=false
        }
        document.body.removeEventListener('touchmove', self.noscroll,false)
      });

      document.body.addEventListener('touchend', this.bodyScrollTop)

      window.onresize = function(){
        if($(document).height()== (docHeight+ self.footerHeight)) self.$emit('maintainListBlur')
        self.resize(docHeight- self.minTop -touchBarHeight)
      }
    },
		activated(){
			this.needHideFooter()
			let name= this.moveLocation[this.showBody]
			for (let i in name){
				if(name[i].now){
					this.resize(name[i].height, 10)
				}
			}
		},
    deactivated(){
      document.body.removeEventListener('touchend', this.bodyScrollTop,false)
    },
    beforeDestory(){
      document.body.removeEventListener('touchend', this.bodyScrollTop,false)
    },
    methods:{
		  bodyScrollTop(){
        if($('body').scrollTop()!= 0 ) $('body').scrollTop(0)
      },
      noscroll(evt) {
        if(!evt._isScroller) {
          if (!this.translateY) event.preventDefault();
        }
      },
      resize(height, time, noToMove){
        // console.log('resize', height)
        let self= this
        let timeout= (time=== undefined? 500: time)
        let docHeight= $(document).height()- this.footerHeight
        let touchBarHeight= $('.touch-bar').outerHeight(true)
        let calcHeight= 0
        if(height> docHeight- this.minTop -touchBarHeight){
          calcHeight= docHeight- this.minTop -touchBarHeight
        }else if(height< this.minHeight){
          calcHeight= this.minHeight
        }else calcHeight= height

        // console.log('calcHeight', calcHeight)
        clearTimeout(this.timer);
        this.timer = setTimeout(function(){
          // self.bodyHeight= height
          // self.$store.commit('setSlideBodyHeight', calcHeight)
          self.bodyHeight= calcHeight
          // self.$store.commit('reSetSlideBodyHeight', height)
        }, timeout);
        if(!noToMove){

          console.log('docHeight- calcHeight- touchBarHeight', docHeight- calcHeight- touchBarHeight)
          $(this.$refs.slide).css({transform: 'translateY('+ (docHeight- calcHeight- touchBarHeight) + 'px)'})
          // self.$store.commit('reSetSlideBodyHeight', calcHeight)
        }
      },
      // translateSlide(val){
      //   let docHeight= $(document).height()- 50
      //   let touchBarHeight= $('.touch-bar').outerHeight(true) //bar高度（20）
      //   let bodyHeight= val
      //   if(bodyHeight> docHeight- this.slideState.minTop-touchBarHeight){
      //     bodyHeight= docHeight- this.slideState.minTop-touchBarHeight
      //     // this.first= false
      //   }
      //   if(bodyHeight< this.slideState.minHeight)
      //     bodyHeight= this.slideState.minHeight
      //   // console.log('translateSlide', $(this.$refs.slide))
      //   $(this.$refs.slide).css({transform: 'translateY('+ (docHeight- bodyHeight- touchBarHeight) + 'px)'})
      //   // $('.slide-bar').css({transform: 'translateY('+ (docHeight- bodyHeight- touchBarHeight) + 'px)'})
      //   this.resize(bodyHeight, 0, true)
      // },

      /**
       * @param {moveNumber} 滑动距离
       * @param {upOrDown} 滑动方向
       * @param {height} 滑动结束高度
       * @returns {}
       * @description 分档滑动
       */
      autoMove(moveNumber, upOrDown, height){
        let arr= this.moveLocation[this.showBody], index= 0
        // console.log(moveNumber, upOrDown, height, arr)
        if(Math.abs(moveNumber)< 50){
          for (let i in arr){
            if(arr[parseInt(i)].now) {
              this.resize(arr[parseInt(i)].height, 10)
              // this.$emit('toLocation', parseInt(i))
              this.location= parseInt(i)
            }
          }
        }else{
          for (let i in arr){
            arr[parseInt(i)].now= false
            if(height> arr[parseInt(i)].height) index= parseInt(i)
          }
          // console.log('index', index)
          if (upOrDown=='up') {
            arr[index+1].now= true
            this.resize(arr[index+1].height, 10)
            // this.$emit('toLocation', index+1)
            this.location= index+1
          }
          else {
            arr[index].now= true
            this.resize(arr[index].height, 10)
            // this.$emit('toLocation', index)
            this.location= index
          }
        }
      },
	    needHideFooter(){
			    let height= 50
			    // console.log('route', route)
			    switch (this.$route.name){
				    case 'remark-map':{
					    $('.footer').hide()
					    height=0;
					    break;
				    }
				    default :{
					    height= 50
					    $('.footer').show()
				    }
			    }
			    // console.log('height', height)
			    this.footerHeight= height
			    // this.resize(this.moveLocation[this.showBody][this.location].height, 10)

	    }
    },

}
</script>

<style scoped lang='less'>
.slide-bar{
  overflow: visible;
  position: absolute;
  width: 100%;
  left: 0;
  top: 0;
  background-color: white;
  z-index: 11;
  border-top-left-radius: 10px;
  border-top-right-radius: 10px;
  box-shadow: 0 -1px 10px #d8d9d8;
  height: 100vh;
  transition: all 0.1s;
  .real-touch-bar{
    width: 100%;
    height: 34px;
    position: absolute;
    left: 0;
    top: -8px;
    z-index: 1;
  }
  .touch-bar{
    width: 100%;
    height: 20px;
    position: relative;
    i{
      display: inline-block;
      width: 40px;
      height: 4px;
      background-color: #f9f9f9;
      border: 1px solid #e4e4e4;
      border-radius: 20px;
      position: absolute;
      left: 0;
      right: 0;
      top: 0;
      bottom: 0;
      margin: auto;
    }
  }
  .slide-body{
    width: 100%;
    height: calc(100% - 20px);
    overflow: visible;
  }
}
</style>
