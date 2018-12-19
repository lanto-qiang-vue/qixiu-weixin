import Vue from "vue"
import { formatDate} from "./util"

//格式化日期
Vue.filter("FormatDate", function (value, format) {
  return value?formatDate(value, format) :''
})

//格式化上门服务内容
Vue.filter("FormatService", function (servicetype, serviceContent) {
  var arr = servicetype ? servicetype.split(",") : []
  var newArr=[]
  for(var i = 0; i < arr.length; i++){
    for(var j = 0; j < serviceContent.length; j++){
      if(arr[i]===serviceContent[j].code) {
        newArr.push(serviceContent[j].value)
      }
    }
  }
  return newArr.join("，")
})

Vue.filter("FormatArticle", function (value, title) {
  // console.log(value)
  return (value.replace(/\ +/g,"").replace(/[ ]/g,"").replace(/[\r\n]/g,"").replace(/&nbsp;/ig, "")|| title)
})
