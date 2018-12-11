<template>
  <div id="Question">
    <div class="top">
      <div class="quetionsCategory">
        <button @click='chooseCategory($event)' type="button" :data-code='item.code' :class="{'active': item.code==code}" v-for='(item, i) in quetionsCategory' :key="i">{{ item.name }}</button>
      </div>
      <textarea name="" id="" cols="30" rows="5" v-model='text' placeholder="问得好，才能答的好。请描述您的问题，专家门诊会给您最满意的回复！"></textarea>
      <div class="addPic" @click='addClick'></div>

      <div class="imgsWrap mui-content-padded">
        <img v-for="(item, index) in picURL" :key="index" :src="item" data-preview-src=""
             data-preview-group="1"/>
      </div>
    </div>
    <!--<div class="list">-->
      <!--<ul class="mui-table-view">-->
        <!--&lt;!&ndash;<li class="mui-table-view-cell">&ndash;&gt;-->
          <!--&lt;!&ndash;<a class="mui-navigate-right">车辆型号<span>奥迪A6L新能源</span></a>&ndash;&gt;-->
        <!--&lt;!&ndash;</li>&ndash;&gt;-->
        <!--&lt;!&ndash;<li class="mui-table-view-cell">&ndash;&gt;-->
          <!--&lt;!&ndash;<a class="mui-navigate-right">提问类型</a>&ndash;&gt;-->
        <!--&lt;!&ndash;</li>&ndash;&gt;-->
        <!--&lt;!&ndash;<li class="mui-table-view-cell">&ndash;&gt;-->
          <!--&lt;!&ndash;<a class="mui-navigate-right">问题分类</a>&ndash;&gt;-->
        <!--&lt;!&ndash;</li>&ndash;&gt;-->
        <!--<li class="mui-table-view-cell">-->
          <!--<a class="mui-navigate-right">选择专家</a>-->
        <!--</li>-->
      <!--</ul>-->
    <!--</div>-->

    <input type="file" id="file" name="file" accept="image/jpg,image/png,image/bmp" @change="imgPreview($event)" style="display: none"/>

    <button @click='sendProblem($event)' data-loading-text='提交中...' type="button" data-loading-icon="mui-spinner mui-spinner-custom" class="mui-btn sendProblem mui-btn-primary">发布问题</button>
    <mt-actionsheet :actions="actions" v-model="sheetVisible"></mt-actionsheet>
  </div>
</template>

<script>
  import { Toast, Actionsheet } from 'mint-ui'
  export default {
    data(){
      return {
        picURL: [],
        code: '10401001',
        quetionsCategory: [
          {
            name: '发动机',
            code: '10401001'
          },
          {
            name: '变速箱',
            code: '10401002'
          },
          {
            name: '空调',
            code: '10401003'
          },
          {
            name: '传动转向',
            code: '10401004'
          },
          {
            name: '车身车架',
            code: '10401005'
          }
        ],
        text: '',
        sheetVisible: false,
        actions: [
          {name: '拍照', method:function(){
            this.openCamera()
          }},
          {name: '从相册中选择',method:function(){
            this.openPhoto()
          }}
        ]
      }
    },
    created() {
    },
    methods: {
      chooseCategory(e){
        this.code=e.target.getAttribute('data-code')
      },
      sendProblem(e){
        if(this.text.trim() == ''){
          return Toast('请输入提问内容')
        }
        ; //切换为loading状态
        setTimeout(function(){
          ;//切换为reset状态(即重置为原始的button)
          Toast('发布成功')
        },1000)
        this.text=''
      },
      openActionsheet(){
        this.sheetVisible=!this.sheetVisible
      },
      imgPreview(e){
        //获取文件
        let self= this
        let file = e.target.files[0];
        let imageType = /^image\//;
        //是否是图片
        if (!imageType.test(file.type)) {
          alert("请选择图片！");
          return;
        }

        let reader = new FileReader();
        reader.readAsDataURL(file)
        reader.onload = function (ev) {
          let image = new Image();
          let selffile= this
          image.onload=function(){
            let width = image.width;
            let height = image.height;
            self.compress(selffile.result,
              {width: width, height:height, quality: 0.6, type: file.type} ,
              self.pushImg, file.name)
          };
          image.src= ev.target.result;
        }


        // let param = new FormData(); //创建form对象
        // param.append('file',file,file.name);//通过append向form对象添加数据
        // console.log(param.get('file')); //FormData私有类对象，访问不到，可以通过get判断值是否传进去
        // let config = {
        //   headers:{'Content-Type':'multipart/form-data'}
        // };  //添加请求头
        // this.axios.post('/image/add/' + localStorage.getItem('ACCESSTOKEN'),param,config)
        //   .then(response=>{
        //       if(response.data.code === '000000') {
        //           this.picURL.push(response.data.data.picPath);
        //       }
        //   })

        //读取完成
      },
      compress(path, obj, callback, name){
        let img = new Image();
        img.src = path;
        img.onload = function () {
          let that = this;
          // 默认按比例压缩
          let w = that.width,
            h = that.height,
            scale = w / h;
          w = obj.width || w;
          h = obj.height || (w / scale);
          let quality = 0.7;  // 默认图片质量为0.7
          //生成canvas
          let canvas = document.createElement('canvas');
          let ctx = canvas.getContext('2d');
          // 创建属性节点
          let anw = document.createAttribute("width");
          anw.nodeValue = w;
          let anh = document.createAttribute("height");
          anh.nodeValue = h;
          canvas.setAttributeNode(anw);
          canvas.setAttributeNode(anh);
          ctx.drawImage(that, 0, 0, w, h);
          // 图像质量
          if (obj.quality && obj.quality <= 1 && obj.quality > 0) {
            quality = obj.quality;
          }
          // quality值越小，所绘制出的图像越模糊
          let base64 = canvas.toDataURL(obj.type|| 'image/png', quality);
          // console.log(base64)
          // 返回base64的值
          callback(base64, name)
        }
      },
      pushImg(base64, name){
        let self= this
        let formdata = new FormData();
        formdata.append('file' , self.base64ToBlob(base64), name);
        this.axios({
          url: '/image/add/'+localStorage.getItem('ACCESSTOKEN'),
          method: 'post',
          headers: {
            'Content-Type':'multipart/form-data'
          },
          data: formdata
        }).then(res => {
          if(res.data.code==='000000'){
            self.picURL.push(response.data.data.picPath);
          } else {
            Toast(res.data.status)
          }
        })
      },
      base64ToBlob(dataurl) {
        let arr = dataurl.split(','), mime = arr[0].match(/:(.*?);/)[1],
          bstr = atob(arr[1]), n = bstr.length, u8arr = new Uint8Array(n);
        while (n--) {
          u8arr[n] = bstr.charCodeAt(n);
        }
        return new Blob([u8arr], { type: mime });
      },
      addClick() {
        document.getElementById('file').click();
      }
    }
  }
</script>

<style lang='less'>
  #Question {
    background-color: #f8f8f8;
    height: 100vh;
    position: relative;
    >.top {
      background-color: #fff;
      padding: 12px;
      line-height: 0;
    }
    .quetionsCategory {
      height: 120px;
      >button {
        color: #666;
        width: 30%;
        height: 28px;
        padding: 0;
        margin-right: 5%;
        margin-bottom: 12px;
      }
      >button:nth-child(3n) {
        margin-right: 0;
      }
      .active {
        color: #5285f4;
        border-color: #3e87f6;
        background-color: #ecf3fe;
      }
    }
    textarea {
      font-size: 14px;
      padding: 0;
      margin: 10px 0 0 0;
      border: none;
    }
    .addPic {
      width: 50px;
      height: 50px;
      border: 1px dashed #ccc;
      border-radius: 8px;
      background: url(../assets/img/record/add.png) no-repeat center center;
      background-size: 50% 50%;
      line-height: 0px !important;
    }
    .list{
      margin-top: 10px;
      font-size: 14px;
      color: #666;
      padding: 0;
      line-height: 0;
      ul::before, ul::after {
        height: 0;
      }
      ul li {
        height: 42px;
        a {
          margin: 0 -15px;
          span {
            float: right;
            color: #ccc;
            margin-right: 18px;
          }
        }
      }
    }
    .mui-btn-primary {
      width: 100%;
      height: 40px;
      position: fixed;
      bottom: 0;
      border: none;
      border-radius: 0;
    }
  }
  .imgsWrap {
    /*height: 60px;*/
    margin: 10px 0 10px 0;
    img {
      max-width: 90px;
      max-height: 90px;
      height: 100%;
      margin-right: 10px;
      margin-bottom: 10px;
    }
  }
</style>
