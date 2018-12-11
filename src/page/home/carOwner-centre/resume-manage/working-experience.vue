<template>
  <div id="workingExperience" style="position: relative;">
    <div>
      <ul class="mui-table-view">
        <li class="mui-table-view-cell">
          <a class="mui-navigate-right">
            <div class="fr" style="margin-right: 20px; color: #999;">
              <span @click="chooseStartDate">请选择</span>
              <span style="color: #000;margin: 0 5px;">至</span>
              <span @click="chooseEndDate">请选择</span>
            </div>
            <label>时间段</label>
          </a>
        </li>
        <li class="mui-table-view-cell">
          <a class="mui-navigate-right">
            <div class="fr" style="margin-right: 20px; color: #999;">蓝途新能源汽车(上海)有限公司</div>
            <label>公司名称</label>
          </a>
        </li>
        <li class="mui-table-view-cell">
          <a class="mui-navigate-right">
            <div class="fr" style="margin-right: 20px; color: #999;">开发工程师</div>
            <label>职位名称</label>
          </a>
        </li>
        <li class="mui-table-view-cell">
          <a class="mui-navigate-right">
            <div class="fr" style="margin-right: 20px; color: #999;">技术开发部</div>
            <label>所属部门</label>
          </a>
        </li>
        <li class="mui-table-view-cell">
          <a class="mui-navigate-right">
            <div class="fr" style="margin-right: 20px; color: #999;">网站开发</div>
            <label>工作描述</label>
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


    <mt-popup
      v-model="popupVisible"
      popup-transition="popup-fade"
      style="width: 90%; height: 50%; border-radius: 10px"
      position="bottom">
        <mt-datetime-picker
          ref="picker"
          type="date"
          v-model="pickerValue">
        </mt-datetime-picker>
    </mt-popup>

  </div>
</template>

<script>
  import { Picker, Popup } from 'mint-ui';
  export default{
    name: "workingExperience",

    data(){
      return {
        popupVisible: false,
        pickerValue: "2015-09-01",
        isWatch: this.$route.query.watch==="watch"
      }
    },
    created(){

    },
    components: {

    },
    methods: {
      chooseStartDate(){
        this.popupVisible=true
        this.$refs.picker.open();
      },
      chooseEndDate(){
        this.popupVisible=true
        this.$refs.picker.open();
      },
    }
  }
</script>

<style lang='less' scoped>
  #workingExperience {
    height: calc(100vh);
    background-color: #f8f8f8;
    ul li a:after {
      color: #26a2ff;
    }
  }
</style>
