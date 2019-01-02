<template>
  <div id='questionDetail'>
    <div class="block">
      <div class="user">
        <div class="img_wrap">
          <img :src="questionDetail.photo || '/static/img/home/user.png'"/>
        </div>
        <div class="userright"><p>{{questionDetail.userName || '匿名'}}</p>
          <span>{{questionDetail.createTime | FormatDate}}</span></div>
      </div>
      <p class="question" v-html="questionDetail.content"></p>

      <div class="imgsWrap mui-content-padded">
        <img v-for="(item, index) in questionDetail.questionPhoto" :key="index" :src="item" v-img/>
      </div>

      <!--<div class="answer">-->
        <!--<span class="violet">{{questionDetail.questionPhoto}}</span>-->
      <!--</div>-->
      <div class="foot">{{questionDetail.viewNumber}}浏览 · {{ questionDetail.answerCount }}回答</div>
    </div>
    <div class="answers">
      <ul>
        <li v-for="item in questionDetail.answerDetailDtos" >
          <span class="used" v-if="item.adopt === true">已采纳</span>
	        <mt-button type="primary" size="small" class="toAdopt" v-if="questionDetail.login &&!isAdopt"
	                   @click="toAdopt(item.id)">采纳</mt-button>
          <div class="zhuanjia">
           <div class="img_wrap">
             <img :src="item.answerHeadPhoto || '/static/img/home/user.png'"/>
           </div>
            <div class="userright"><p>{{item.answerName || '匿名'}}</p>
              <span>{{item.answerTime | FormatDate}}</span></div>
          </div>
          <div class="answer_text" v-html="item.answerContent"></div>
        </li>
      </ul>
    </div>
    <div class="iAnswer" v-if="canAnswer">
      <button @click="goMyAnswer">我要回答</button>
    </div>
  </div>
</template>

<script>
  import { Toast, MessageBox} from "mint-ui"
  import defaultImage from '@/assets/img/my/photo.png'
  import avatar from '@/assets/img/my/photo.png'
  export default {
    data(){
      return {
        questionDetail: {},
        picURL: [
          "http://static.shanghaiqixiu.org/images/2017/11/8/pic_1512726836942.jpg",
          "http://mpic.tiankong.com/1b6/f9f/1b6f9f722eb791cfbf22d2133dacd6c9/640.jpg",
          "http://mpic.tiankong.com/6d2/a9a/6d2a9af50ae64f13c226110e17792d9b/640.jpg"
        ],
        defaultImage: defaultImage,
        avatar: avatar,
	      isAdopt: false
      }
    },

    created(){
     this.getData()
    },
	  computed:{
    	canAnswer(){
    		let can= false
		    if(localStorage.getItem('USERINFO')){
			    let userRoleId= JSON.stringify(JSON.parse(localStorage.getItem('USERINFO')).roles)
			    if(userRoleId.indexOf('zhuanjia')>=0){
				    can= true
			    }
		    }
		    return can
	    }
	  },
    methods: {
	    getData(){
		    this.axios({
			    method: "get",
			    url: "/question/detail/"  + this.$route.query.questionId,
		    }).then(res => {
			    let list= res.data.item.answerDetailDtos, isAdopt= false
			    for(let i in list){
				    if(list[i].adopt) isAdopt= true
			    }
			    this.questionDetail = res.data.item;
			    this.isAdopt= isAdopt
		    })
	    },
	    toAdopt(id){
		    MessageBox.confirm('确定采纳此回答吗?').then(action => {
		        // console.log('action',action)
			    this.axios.post('/question/cnanswer/'+id,{}).then((res) => {
				    if (res.code == '0') {
					    Toast('采纳成功')
					    this.getData()
				    }
			    })
		    },err => {
			    // console.log('err',err)
		    });
	    },
      goMyAnswer(){
	        this.$router.push({
	          path: "/myAnswer",
	          query: {
	            questionId: this.$route.query.questionId
	          }
	        })
      },
    }
  }
</script>

<style lang='less'>
  #questionDetail {
    height: 100vh;
    padding-bottom: 60px;
    overflow: scroll;
    .block {
      width: 100%;
      overflow: hidden;
      padding: 10px;
      position: relative;
      .user {
        overflow: hidden;
	      position: relative;
        .img_wrap {
          width: 50px;
          height: 50px;
          border-radius: 50%;
          overflow: hidden;
          float: left;
          img {
            width: 50px;
	          height: 50px;
          }
        }
        .userright {
          position: absolute;
          padding-left: 60px;
          line-height: 25px;
	        width: 100%;
	        overflow: hidden;
          p {
            font-size: 14px;
            margin-bottom: 0;
            color: #333;
          }
          span {
            font-size: 12px;
            color: #9a9a9a;

          }
        }
      }
      .question {
        font-size: 14px;
        margin: 10px 0;
        color: #333;
      }
      .imgsWrap {
        max-height: 60px;
        margin: 0 0 20px 0;
        overflow: hidden;
        img {
          max-width: 80px;
          height: 60px;
          margin-right: 10px;
        }
      }
      .answer {
        font-size: 12px;
        span {
          display: block;
          padding: 1px 5px;
          color: white;
          float: left;
          margin-right: 5px;
        }
        p {
          margin-left: 55px;
          margin-bottom: 30px;
          color: #666;
        }
        .violet {
          background-color: #ecf3fe;
          color: #599ef9;
        }
        .gray {
          background-color: #f5f5f5;
          color: #999;
        }
      }
      .foot {
        font-size: 12px;
        color: #999999;
        position: absolute;
        right: 10px;
        bottom: 10px;
      }
    }
    .answers {
      border-top: 10px solid #efeff4;
      padding: 0 10px;
      li {
        padding-top: 10px;
        position: relative;
        .used {
          background-color: #5997ff;
          color: #fff;
          padding: 3px 5px;
          position: absolute;
          right: 0;
          font-size: 12px;
        }
	      .toAdopt{
		      position: absolute;
		      top: 10px;
		      right: 0;
	      }
        .zhuanjia {
          overflow: hidden;
          .img_wrap {
            width: 50px;
            height: 50px;
            border-radius: 50%;
            float: left;
            overflow: hidden;
            margin-right: 10px;
          }
          img {
            width: 50px;
          }
          .userright {
            float: left;
            height: 50px;
            line-height: 25px;
            p {
              font-size: 14px;
              margin-bottom: 0;
              color: #333;
            }
            span {
              font-size: 12px;
              color: #9a9a9a;

            }
          }
        }
        .answer_text {
          margin-left: 60px;
          color: #333;
          font-size: 14px;
          border-bottom: 1px solid #efeff4;
          padding-bottom: 15px;
        }
      }
    }
    .iAnswer {
      position: fixed;
      left: 0;
      bottom: 0;
      background-color: #fff;
      width: 100%;
      height: 60px;
      border-top: 1px solid #efeff4;
      button {
        display: block;
        width: 90%;
        height: 40px;
        margin: 10px auto;
        border: none;
        background: linear-gradient(to right, #78b9fe, #3882f5);
        color: #fff;
      }
    }
  }
</style>
