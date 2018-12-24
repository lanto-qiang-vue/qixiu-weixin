<template>
 <div class="aboutUs">
     <div class="logo">
         <em></em>
         <h1>上海汽修平台</h1>
     </div>
     <div class="content">
         <p>本系统由<a href="javascript:void(0)">蓝速衡富新能源汽车(上海)有限公司</a>搭建，此版本适合于ios操作系统、Android操作系统系列手机，对于在其他操作系统平台使用本软件出现的任何问题，蓝速衡富不承担任何责任。</p>
         <p>本软件的下载，安装和使用完全免费，使用过程中产生的数据流浪费用，由运营商收取。</p>
     </div>
     <div class="other">
         <ul>
             <li>
                 <span class="left">平台官网</span>
                  <a class="right" href="javascript:;" style='float:right; color: #7d7d7d' @click='copy("shanghaiqixiu.org")'>shanghaiqixiu.org</a>
             </li>
             <li>
                 <span class="left">微信公众号</span>
                 <span class="right">上海汽修平台</span>
             </li>
         </ul>
     </div>
     <div class="version">
         <p>当前版本号：V1.0</p>
         <p>Copyright 2016-2017 蓝速衡富新能源汽车(上海)有限公司</p>
     </div>
 </div>
</template>

<script>
import { Toast } from 'mint-ui'
export default {
    methods: {
    		copy(content){
            // 创建元素用于复制
            var aux = document.createElement("input");
            // 设置元素内容
            aux.setAttribute("value", content);
            // 将元素插入页面进行调用
            document.body.appendChild(aux);
            // 复制内容
            aux.select();
            // 将内容复制到剪贴板
            document.execCommand("copy");
            // 删除创建元素
            document.body.removeChild(aux);
            Toast('网址已复制到剪贴板')
        }
    }
}
</script>

<style lang='less'>
    body {
        /*background-color: #f8f8f8;*/
        >input {
          height: 0;
        }
    }
    .aboutUs{
        margin-top: 10px;
        em {
            display: inline-block;
            width: 40px;
            height: 40px;
            background: url(../assets/img/record/logo.png) no-repeat;
            background-size: contain;
            margin-left: 50%;
            margin-top: 35px;
            transform: translateX(-50%);
        }
        h1{
            font-size: 14px;
            text-align: center;
            color: #333;
            margin-top: 10px;
        }
        .content {
            padding: 40px 15px;
            p {
                text-indent: 1em;
                line-height: 25px;
                color: #666;
            }
        }
        .other {
            border-top: 10px solid #f8f8f8;
            li {
                height: 40px;
                line-height: 40px;
                padding: 0 15px;
                color: #2d2d2d;
                font-size: 15px;
                span:last-child {
                    float: right;
                    color: #7d7d7d;
                }
            }
            li:first-child {
                border-bottom: 1px solid #f8f8f8;
            }
        }
        .version {
            /*background-color: #f8f8f8;*/
            color: #b2b2b2;
            position: absolute;
            width: 100%;
            bottom: 0;
            p {
                text-align: center;
                line-height: 12px;
                font-size: 12px;
            }
        }
    }
</style>
