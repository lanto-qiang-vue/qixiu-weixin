<template>
<div class="discounts-list">
    <div class="head">
		<div class="area" >核销日期</div>
	</div>
    <div class="menu">
        <div class="use-header">
            <span class="use-header-left">修车抵用券</span>
        </div>
        <Form class="common-form " :label-width="90" :model="detail" label-position="left" ref="form">
            <FormItem label="有效期">
                <Input v-model="detail.date" placeholder="" :readonly="true"></Input>
            </FormItem>
            <FormItem label="优惠券兑换码">
                <Input v-model="detail.code" placeholder="输入优惠券兑换码" class="form-input"></Input>
            </FormItem>
            <FormItem label="核销时间">
                <Input v-model="detail.date" placeholder="" :readonly="true"></Input>
            </FormItem>
        </Form>
    </div>
    <div class="menu">
        <div class="use-header">
            <span class="use-header-left">修车抵用券</span>
        </div>
        <Form class="common-form" :label-width="90" :model="detail" label-position="left" ref="form">
            <FormItem label="有效期">
                <Input v-model="detail.date" placeholder="" :readonly="true"></Input>
            </FormItem>
            <FormItem label="优惠券兑换码">
                <Input v-model="detail.code" placeholder="输入优惠券兑换码" class="form-input"></Input>
            </FormItem>
            <FormItem label="核销时间">
                <Input v-model="detail.date" placeholder="" :readonly="true"></Input>
            </FormItem>
        </Form>
    </div>
	


</div>
</template>

<script>
import { MessageBox } from 'mint-ui';
export default {
	name: "coupons-use-detail",
	data(){
		return{
			detail: {
				code: '',
                date:'2019.03.15-2019.03.18'
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
		
	}
}
</script>

<style scoped lang="less">
.ivu-form-item-label{
                    color: #666  !important;
                }
.discounts-list{
	height: 100vh;
	overflow: auto;
	background-color: #F3F3F3;
	.head{
		padding: 7px 15px;
		width: 100%;
		background-color: white;
        overflow:hidden;
        margin-bottom:8px;
		.area{
			color: #333333;
			font-size: 14px;
			position: relative;
			float: left;
			padding-right: 12px;
			line-height: 26px;
			margin-right: 20px;
			&:after{
				position: absolute;
				right: 0;
				top: 10px;
				content: '';
				width: 0;
				height: 0;
				border-width: 4px;
				border-style: solid;
				border-color: #9A9A9A transparent transparent;
			}
		}
	}
    .menu{
        background: #fff;
        margin-bottom: 8px;
        .common-form{
            border-bottom: 0;
            .ivu-form-item:last-child{
                border-bottom: none;
            }
            
                .ivu-form-item-label{
                    color: #666  !important;
                }
            
            
            
            .form-input{
                width: 100%;
                padding-right: 82px;
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
    }

}

</style>
<style lang="less">

.discounts-list{
    .common-form .ivu-form-item .ivu-form-item-label{
        color: #666;
    }
}

</style>
