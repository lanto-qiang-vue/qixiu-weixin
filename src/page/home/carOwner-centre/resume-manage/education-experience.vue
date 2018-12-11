<template>
  <div id="educationExperience" style="position: relative;">
    <div>
      <ul class="mui-table-view">
        <li class="mui-table-view-cell">
          <a class="mui-navigate-right">
            <div class="fr" style="margin-right: 20px; color: #999;">复旦大学</div>
            <label>学校名称</label>
          </a>
        </li>
        <li class="mui-table-view-cell">
          <a class="mui-navigate-right">
            <div class="fr" style="margin-right: 20px; color: #999;">本科</div>
            <label>学历/学位</label>
          </a>
        </li>
        <li class="mui-table-view-cell">
          <a class="mui-navigate-right">
            <div class="fr" style="margin-right: 20px; color: #999;">软件工程</div>
            <label>专业描述</label>
          </a>
        </li>
        <li class="mui-table-view-cell">
          <a class="mui-navigate-right">
            <div class="fr" style="margin-right: 20px; color: #999;">
              <span>请选择</span>
              <span style="color: #000;margin: 0 5px;">至</span>
              <span>请选择</span>
            </div>
            <label>时间段</label>
          </a>
        </li>
      </ul>
    </div>
    <div v-if="!isWatch" style="position: absolute; left: 0; bottom: 0; width: 100%; padding: 10px 15px; background-color: #fff;">
      <mt-button type="primary" style="width: 100%;" size="large">保存</mt-button>
    </div>
    <div v-if="isWatch" style="position: absolute; left: 0; bottom: 0; width: 100%; padding: 10px 15px; background-color: #fff;">
      <mt-button type="default" class="fl" style="width: 30%; border: 1px solid #26a2ff; color: #26a2ff; background-color: #fff;">删除本条</mt-button>
      <mt-button type="primary" class="fr" style="width: 65%;">保存</mt-button>
    </div>
  </div>
</template>

<script>
  export default{
    name: "educationExperience",

    data(){
      return {
        isWatch: this.$route.query.watch==="watch"
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
  #educationExperience {
    height: calc(100vh);
    background-color: #f8f8f8;
    ul li a:after {
      color: #26a2ff;
    }
  }
</style>
