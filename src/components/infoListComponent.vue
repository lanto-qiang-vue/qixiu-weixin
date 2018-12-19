<template>
  <div :class="{'infoWrap': topShow}">
      <mt-navbar v-model="selected" :fixed="true" v-if="topShow">
        <mt-tab-item v-for="(item, index) in topList" :id="index" :key="index">{{item.name}}</mt-tab-item>
      </mt-navbar>

      <!-- tab-container -->
      <mt-tab-container v-model="selected" v-if="!isDetail" style="width: calc(100vw); overflow: hidden;">
        <mt-tab-container-item :id="selected">
          <div @click="goOut(item.infoId)" class="msg" v-for="(item, index) in infoPublicList">
            <p>{{item.title}}</p>
            <div>
              <img :src="item.photo"/>
            </div>
            <span>{{item.typeName}}-{{ item.publishTime | FormatDate}}</span>
          </div>
        </mt-tab-container-item>
      </mt-tab-container>

      <div class="msg2" v-html="infoDetail.content" v-else style="width: calc(100vw); overflow: hidden;"></div>

  </div>
</template>

<script>
  import { Navbar, TabItem, Cell } from 'mint-ui';
  import { TabContainer, TabContainerItem } from 'mint-ui';
  export default {
    name: 'infoListComponent',
    data () {
      return {
        selected: 0,
        categoryList: [],
        topList: [],
        infoPublicList: [],
        topShow: true,
        isDetail: false,
        infoDetail: {}
      }
    },
    watch: {
      selected: function (newVal, oldVal) {
        this.queryData(newVal);
      }
    },
    created() {
      this.axios({
        method: 'get',
        url: '/article/category/list/' + localStorage.getItem("SYSTEMTOKEN"),
        headers: {
          'Content-type': 'application/json'
        }
      }).then(res => {
        if (res.data.code === '0') {
          let category = res.data.data;
          for (let j in category[0].children) {
            if (category[0].children[j].isfile === false) {
              this.categoryList.push(category[0].children[j]);
            }
          }
          this.categoryList.push(category[1])
        } else {
        }
        this.topList = this.categoryList[this.$route.query.index].children;

        this.queryData(0);
      }).catch(function (error) {
      })

    },
    methods: {
      queryData(index) {
        this.isDetail = false;
        let id = null;
        let category = this.categoryList[this.$route.query.index];
        let filterCategory = '';
        if (category.code !== '' && category.code !== null) {
          filterCategory = category.code;
          this.topShow = false;
        } else {
          filterCategory = category.children[index].code;
          if(filterCategory !== '' && filterCategory !== null) {
          } else {
            this.isDetail = true;
            id = category.children[index].fileid;
          }
        }

        if(this.isDetail) {
          this.queryDetail(id);
        } else {
          let data = {
            systemToken: localStorage.getItem("SYSTEMTOKEN"),
            category: filterCategory,
            page: 1,
            size: 999999
          }
          this.axios({
            method: 'post',
            url: '/infopublic/list',
            headers: {
              'Content-type': 'application/json'
            },
            data: JSON.stringify(data)
          })
            .then(res => {
              this.infoPublicList = res.data.data.dataList;
            }).catch(function (error) {
          })
        }
      },
      goOut(infoId){
        this.$router.push({ path: '/infoDetail', query: {infoId: infoId}})
      },
      queryDetail(id) {
        this.axios({
          method: 'get',
          url: '/infopublic/article/detail/' + localStorage.getItem("SYSTEMTOKEN") + '/' + id,
          headers: {
            'Content-type': 'application/json'
          }
        }).then(res => {
          this.infoDetail = res.data.data;
        }).catch(function (error) {
        })
      }
    },
    components: {
      mtCell: Cell,
      mtNavbar: Navbar,
      mtTabItem: TabItem,
      mtTabContainer: TabContainer,
      mtTabContainerItem: TabContainerItem
    }
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang='less'>
  .infoWrap {
    margin-top: 50px;
    .mint-navbar {
      height: 47px;
    }
    a {
      .mint-tab-item-label {
        color: #666;
      }
    }
    .is-selected {
      border-bottom: 2px solid #26a2ff !important;
    }
  }

  .msg {
    padding: 10px;
    border-bottom: 1px solid #f7f7f7;
    height: 130px;
    font-size: 14px;
    position: relative;
    p {
      margin-right: 105px;
      color: #333;
    }
    div {
      width: 105px;
      height: 105px;
      /*overflow: hidden;*/
      position: absolute;
      top: 10px;
      right: 10px;
      border-radius: 10px;
      img {
        height: 100%;
        width: auto;
      }
    }
    span {
      display: block;
      font-size: 12px;
      color: #8f8f8f;
      position: absolute;
      bottom: 10px;
    }
  }

  .msg2 {
    tabel {
      width: 100% !important;
    }
  }
</style>

