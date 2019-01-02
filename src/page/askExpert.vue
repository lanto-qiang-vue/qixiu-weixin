<template>
  <div id="Question">
    <div class="top">
      <div class="quetionsCategory">
        <button @click='chooseCategory($event)' type="button" :data-code='item.code' :class="{'active': item.code==code}" v-for='(item, i) in quetionsCategory' :key="i">{{ item.name }}</button>
      </div>
      <textarea name="" id="" cols="30" rows="5" v-model='text' placeholder="问得好，才能答的好。请描述您的问题，专家门诊会给您最满意的回复！"></textarea>
      <div class="addPic"><upload @done="addClick"></upload></div>

      <div class="imgsWrap mui-content-padded">
        <img v-for="(item, index) in picURL" :key="index" :src="item" v-img/>
      </div>

      <div class="checkbox">
        <input type="checkbox" id="checkbox" v-model="isanonymous">
        <label for="checkbox">匿名发布</label>
      </div>
    </div>
    <div class="list">
      <ul class="mui-table-view">
        <!--<li class="mui-table-view-cell">-->
          <!--<a class="mui-navigate-right">车辆型号<span>奥迪A6L新能源</span></a>-->
        <!--</li>-->
        <!--<li class="mui-table-view-cell">-->
          <!--<a class="mui-navigate-right">提问类型</a>-->
        <!--</li>-->
        <!--<li class="mui-table-view-cell">-->
          <!--<a class="mui-navigate-right">问题分类</a>-->
        <!--</li>-->
      </ul>
    </div>
    <button @click='sendProblem($event)' data-loading-text='提交中...' type="button" data-loading-icon="mui-spinner mui-spinner-custom" class="mui-btn sendProblem mui-btn-primary">发布问题</button>

    <input type="file" id="file" name="file" @change="imgPreview($event)" style="display: none"/>
  </div>
</template>

<script>
  import { Toast, Actionsheet } from 'mint-ui'
  import Upload from '@/page/components/compress-upload.vue'
  export default {
	  components: {Upload},
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
        isanonymous:false,
        actions: [
          {name: '拍照', method:function(){
            self.openCamera()
          }},
          {name: '从相册中选择',method:function(){
            self.openPhoto()
          }}
        ]
      }
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
        // if(localStorage.getItem("ACCESSTOKEN") === null){
        //     Toast("请先登录")
        //   this.$router.push({
        //     path: '/login'
        //   })
        //   return ;


        this.axios({
          method: 'post',
          url: '/question/add',
          data: {
	          "anonymous": this.isanonymous,
	          "category": this.code,
	          "content": this.text,
	          "expertId": this.$route.query.expertId || '',
	          "images": this.picURL
          }
        }).then(res => {
            let _this=this
            console.log('res',res)
            if(res.data.code === '0'){

              this.isanonymous = false
              this.text=''
              this.code = '10401001'
              isanonymous:false,
              Toast("发布成功")
              setTimeout(function () {
                _this.$router.push("/myQuestion")
              }, 2000)
            }else if(res.data.code === '310412'){
              Toast('登录过期,请重新登录')
              this.$router.puah('/login')
            } else {
              Toast("发布失败")
            }
          })
      },
      openActionsheet(){
        this.sheetVisible=!this.sheetVisible
      },
      addClick( res) {
      	setTimeout(()=>{
	        this.picURL.push(res.item.path);
        },1000)
      },
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
      /*height: 311px;*/
      line-height: 0;
    }
    .quetionsCategory {
      height: 120px;
      border-bottom: 10px solid #f8f8f8;
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
	    position: relative;
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
    .checkbox{
      margin-top: 20px;
      color:#5a5a5a;
    }
  }
  .imgsWrap {
    margin: 10px 0 10px 0;
    img {
      max-width: 60px;
      max-height: 60px;
      height: 100%;
      margin-right: 10px;
      margin-bottom: 10px;
    }
  }
</style>
