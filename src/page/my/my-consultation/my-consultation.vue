<template>
  <div id="myConsultation">
    <mt-header title="我的咨询">
      <router-link to="/my" slot="left">
        <mt-button icon="back"></mt-button>
      </router-link>
    </mt-header>
    <div class="consultation_list">
      <ul>
        <li>
          <div>dsds</div>
          <p class="foot clearfix">
            <span class="date">2017.12.26</span>
            <span class="view">审核通过</span>
          </p>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
  export default{
    name: "myConsultation",

    data(){
      return {

      }
    },
    created(){

    },
    components: {

    },
    methods: {

    }
  }
</script>

<style lang='less' scoped>
  #myConsultation {
    .consultation_list {
      height: calc(100vh - 40px);
      overflow: scroll;
      ul li {
        padding: 10px;
        border-bottom: 10px solid #f8f8f8;
        background-color: #fff;
        >p {
          color: #333;
        }
        .foot {
          width: 100%;
          margin-top: 10px;
          margin-bottom: 0;
          color: #999;
          .date {
            float: right;
          }
          .view {
            float: left;
            color: #26a2ff;
          }
        }
      }
    }
  }
</style>
