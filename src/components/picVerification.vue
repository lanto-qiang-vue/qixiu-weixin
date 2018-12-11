<template>
  <div id="picVerification" style="height: 45px;">
    <div style="width: 120px; height: 35px; float: left; margin-top: 5px;" @click="reGetImg">
      <img :src="imageUrl" alt="" style="width: 100%; height: 100%;" >
    </div>
    <mt-field placeholder="图形验证码" v-model="YZM" style="margin-left: 120px;"></mt-field>
  </div>
</template>

<script>
  export default {
    name: 'picVerification',
    data () {
      return {
        YZM: '',
        imageUrl: '',
        imageToken: ''
      }
    },
    watch: {
      YZM() {
        this.$store.commit('changeYZM', this.YZM.trim())
      },
      imageToken() {
        this.$store.commit('changeImgToken', this.imageToken)
      }
    },
    created(){
      this.getImg()
    },
    methods: {
      getImg() {
        this.axios({
          method: 'get',
          url: "/message/image/getimagecaptcha"
        })
          .then(res=>{
            this.imageUrl=res.data.data.image
            this.imageToken=res.data.data.imageToken
          })
      },
      reGetImg() {
        this.getImg()
      },
    }
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang='less'>
  #picVerification {
    .mint-cell-wrapper {
      background: none;
      input {
        margin-bottom: 0;
        border: none;
      }
    }
  }
</style>
