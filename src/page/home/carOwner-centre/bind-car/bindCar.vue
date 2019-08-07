<template>
  <div id="bind_car">
    <ul>
      <li>
        <h4>个人车辆</h4>
        <span>添加您自己的车辆</span>
        <div @click="goBindMy">去添加</div>
      </li>
      <li>
        <h4>企业车辆</h4>
        <span>添加您企业的车辆</span>
        <div @click="goBindCompany">去添加</div>
      </li>
    </ul>
  </div>
</template>

<script>
  export default{
    name: "bindCar",

    data(){
      return {

      }
    },

    methods: {
      goBindMy(){
        this.$router.push('/bind-my-car')
      },
      goBindCompany(){
        this.$router.push('/bind-my-com-car')
      }
    }
  }
</script>

<style lang='less' scoped>
  #bind_car{
    height: 100vh;
    ul {
      padding: 0 15px;
      border-bottom: 1px solid #eee;
      li {
        border-bottom: 1px solid #eee;
        padding: 15px 5px;
        position: relative;
        h4 {
          font-size: 18px;
          margin-bottom: 15px;
        }
        span {
          color: #999;
          font-size: 16px;
        }
        >div {
          position: absolute;
          right: 0;
          top: 50%;
          transform: translateY(-50%);
          background: linear-gradient(to right, #73b0fd, #4d90f7);
          padding: 6px 20px;
          color: #fff;
          font-size: 16px;
          border-radius: 33px;
        }
      }
      li:last-child {
        border: none;
      }
    }
  }
</style>
