<template>
<div>
    <div class="use-header">
        <span class="use-header-left">修车抵用券</span>
        <span class="use-header-right">未使用</span>

    </div>
	<Form class="common-form" :label-width="90" :model="detail" label-position="left" ref="form">
		<FormItem label="有效期">
			<Input v-model="detail.code" placeholder="输入优惠券有效期" :readonly="true"></Input>
		</FormItem>
        <FormItem label="提示">
			<!--<Input v-model="detail.code" placeholder="输入优惠券兑换码" style="width: 60%"></Input>-->
            <div class="popup">此券不适用本门店</div>
		</FormItem>
        <FormItem label="优惠券兑换码">
			<Input v-model="detail.code" placeholder="输入优惠券兑换码" class="form-input"></Input>
            <div class="form-button"><span>重新校验</span></div>
		</FormItem>
	</Form>
	<div class="use-direction">
        <h1>使用细则</h1>
        <p>1､ 优惠券有使用期限限制，过了有效期不能使用；</p>
        <p>2､ 订单中包含特价商品时不能使用优惠券，优惠券不能与其他优惠（如促销活动）同时使用；</p>
        <p>3､ 优惠券只能抵扣订单金额，优惠金额超出订单金额部分不能再次使用，不能兑换现金；</p>
        <p>4､ 每个订单只能使用一张优惠券；</p>
    </div>
    <div class="use-button" @click="submitFun">
        确认核销
    </div>


</div>
</template>

<script>
import { MessageBox } from 'mint-ui';
export default {
	name: "coupons-employ",
	data(){
		return{
			detail: {
				code: ''
			},
			list:[],
			page: 1,
			total: 0,
			allLoaded: false,
		}
	},
	watch:{
		
	},
	mounted(){
		
	},
	methods:{
		submitFun(){
            MessageBox('提示', '此验证码已被核销,不可重复核销');
        }
	}
}
</script>

<style scoped lang="less">
.common-form{
    border-bottom: 0;
    .ivu-form-item:last-child{
        border-bottom:1px solid #EEEEEE;
    }
    .common-form .ivu-form-item .ivu-form-item-label{
        color: #333333;
    }
    .form-input{
        width: 100%;
        padding-right: 82px;
    }
    .form-button{
        position: absolute;
        top: 4px;
        right: 5px;
        width:80px;
            height:30px;
            background:rgba(236,245,255,1);
            border-radius:3px;
            border:1px solid rgba(179,216,255,1);
            font-size:14px;
            font-weight:400;
            color:rgba(24,144,255,1);
            line-height:30px;
            text-align: center;
            margin: 0 auto;
    }
    .popup{
        height:36px;
        font-size:14px;
        font-weight:400;
        color:rgba(244,51,60,1);
        line-height:36px;
        padding-left: 10px;
    }
}
.use-header{
    overflow: hidden;
    padding: 10px 15px 5px 15px;
    span{
        font-weight:400;
        height:22px;
        line-height:22px;
    }
    .use-header-left{
        float: left;
        font-size:16px;
        color:rgba(51,51,51,1);
    }
    .use-header-right{
        float: right;
        font-size:14px;
        color:rgba(102,102,102,1);
    }
}
.use-direction{
    padding: 0 15px;
    h1{
        height:41px;
        font-size:14px;
        font-weight:400;
        color:#666;
        line-height:41px;
    }
    p{
        font-size:12px;
        font-weight:400;
        color:#999;
        line-height:22px;
    }
}
.use-button{
    width:290px;
    height:36px;
    background:linear-gradient(90deg,rgba(67,142,255,1) 0%,rgba(80,204,255,1) 100%);
    border-radius:18px;
    /*display: inline-block;*/
    font-size:14px;

    font-weight:400;
    color:#fff;
    line-height: 36px;
    text-align: center;
    margin: 54px auto;
}

</style>
