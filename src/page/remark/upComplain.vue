<template>
<div>
  <mt-header title="反馈凭证" style="position: fixed;top: 0;width: 100%;z-index: 100"><mt-button icon="back" slot="left" @click="$router.go(-1)"></mt-button></mt-header>
  <div class="above">
    <div class="title"><i></i>请上传维修凭证（必填）<i></i></div>
    <div class="picblock">
      <div class="pic mui-content-padded">
      <!--<div class="pic">-->
        <img v-show="!!img" :src="img" data-preview-src="" data-preview-group="1"/>
      </div>
      <p @click="$refs.toupload.clickBox()">拍摄/上传照片</p>

    </div>
  </div>
  <div class="under">
    <div class="title"><i></i>上传要求<i></i></div>
    <div class="content">
      <p>维修凭证可以是维修企业开具的《结算单》的清晰照片，或是必须包含以下信息的维修单据的清晰、完整的照片：</p>
      <p> 1、维修企业名称</p>
      <p> 2、车牌号码</p>
      <p> 3、结算日起</p>
      <p> 4、维修项目</p>
      <p> 5、维修配件</p>
    </div>
  </div>
  <div :class="{on: true, submit:true}" @click="submit">提交</div>
	<upload @done="getPic" ref="toupload"></upload>
</div>
</template>

<script>
  import { Toast, MessageBox} from 'mint-ui'
  import Upload from '@/page/components/compress-upload.vue'
	export default {
		name: "up-complain",
		components: {Upload},
    data(){
      return{
        img:'',
        ACCESSTOKEN: localStorage.getItem('ACCESSTOKEN')
        // img:'/static/img/shqxw.jpg',
      }
    },
    created(){

    },
    methods:{
	    getPic(res){
	    	console.log('res', res)
		    this.img= res.item.path
	    },

      submit(){
        let self= this
        if(this.img) this.upComplain(true)
        else Toast('请上传维修凭证')
      },
      upComplain(jump){
        let self= this
        let url= '/comment/complaint/maintain'
        let param={
	        "details": "",
	        "photoUrl": this.img,
        }
        if(this.$route.query.id) param.cmId= this.$route.query.id
        switch (this.$route.query.type){
          case 0: break;
          case 1: {
            url= '/comment/complaint/maintain/repairId'
            param={
              "repairId": this.$route.query.repairId,
            }
            break
          }
        }
        this.axios({
          url: url,
          method: 'post',
          data: param
        }).then(res => {
            console.log(res.data)
            if(jump) {
              Toast('提交成功')
                if(self.ACCESSTOKEN){
                  self.$router.replace({path:'/myComplaint', query:{type: this.$route.query.type} })
                }else{
                  setTimeout(function () {
                    this.$router.go(-1)
                  },1000)
                }
            }
        })
      }
    }
	}
</script>

<style scoped lang='less'>
.above, .under{
  padding: 20px 0;
  .title{
    /*text-align: center;*/
    font-size: 18px;
    font-weight: 300;
    height: 24px;
    line-height: 24px;
    display: flex;
    justify-content: center;
    align-items: center;
    i{
      display: inline-block;
      width: 40px;
      height: 2px;
      background-color: #f1f2f4;
      padding: 0 5px;
      margin: 0 10px;
      position: relative;
    }
    i:first-child::after,i:last-child::before{
      content: '';
      width: 6px;
      height: 6px;
      display: block;
      background-color: #d1d6dc;
      position: absolute;
      top: -2px;
      border-radius: 100%;
    }
    i:first-child::after{
      right: 0;
    }
    i:last-child::before{
      left: 0;
    }
  }
}
.above{
  margin-top: 40px;
  .picblock{
    width: 70%;
    margin: 20px auto 0 auto;
    border-radius: 5px;
    overflow: hidden;
    .pic{
      margin: 0;
      width: 100%;
      min-height: 150px;
      overflow: hidden;
      background: #f2f7fd url("../../assets/img/remark/nopic.png") center center no-repeat;
      background-size: 50% ;
      img{
        width: 100%;
      }
    }
    p{
      margin: 0;
      text-align: center;
      color: white;
      height: 30px;
      line-height: 30px;
      font-size: 16px;
      background-color: #5795fc;
      position: relative;
      input{
        width: 100%;
        height: 100%;
        position: absolute;
        left: 0;
        top: 0;
        opacity: 0;
      }
    }
  }
}
.under{
  border-top: 15px solid #f8f8f8;
  margin-bottom: 40px;
  .content{
    width: 80%;
    margin: 20px auto 0 auto;
    overflow: hidden;
    p{
      font-size: 13px;
      color: #999999;
      margin-bottom: 5px;
    }
  }
}
.submit{
  width: 100%;
  height: 40px;
  line-height: 40px;
  text-align: center;
  font-size: 14px;
  color: white;
  background-color: #c4dffe;
  position: fixed;
  left: 0;
  bottom: 0;
}
.submit.on{
  background-color: #438eff;
}

</style>
