<template>
  <div id="articleDeatil" v-html="content"></div>
</template>

<script>
export default {
  name: "",
  data(){
    return{
      content: ""
    }
  },
  created(){
    this.axios({
      method: "get",
      url: "/article/writing/queryDetail/"+localStorage.getItem("SYSTEMTOKEN")+"/"+this.$route.query.articleId,
      headers: {
        "Content-type": "application/json"
      }
    })
      .then(res=>{
        this.content=res.data.data.content
      })
  },
  methods:{

  }
}
</script>

<style lang='less'>
  #articleDeatil {
    width: 100%;
    /*max-width: calc(100vw);*/
    min-height: calc(100vh);
    overflow: hidden;
    padding: 10px;
    img {
      max-width: 80%;
    }
  }
</style>
