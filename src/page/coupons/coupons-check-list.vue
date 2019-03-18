<template>
    <div class="coupons-check-list">
        <Form class="common-form" id="common-form" :label-width="85" label-position="left" ref="form">
            <FormItem label="优惠券兑换码">

                <Input v-model="code" placeholder="输入优惠券兑换码" class="from-input"></Input>
                <div class="from-button" @click="submit">
                    提交
                </div>
                <div class="scan-button">
                    <img src="/static/img/coupons/scan-code.png" alt="">
                    <p>扫一扫</p>
                </div>
            </FormItem>
        </Form>
        <mt-loadmore :bottom-method="loadMore" :bottom-all-loaded="allLoaded" :autoFill="false"
                     bottomPullText="加载更多" ref="loadmore">
            <ul class="coupons-list">
                <li v-for="item in list" @click="to(item.id)">
                    <div class="content">
                        <div class="left">
                            <p>{{item.name}}</p>
                            <span>有效期：{{item.startDate}}-{{item.endDate}}</span>
                        </div>
                        <i></i>
                        <div class="right">
                            <div class="times">
                                <p>已核销数</p>
                                <span>{{item.number}}</span>
                            </div>
                        </div>
                    </div>
                </li>
            </ul>
        </mt-loadmore>
    </div>
</template>
<script>
    import {MessageBox,Toast,} from 'mint-ui'
    export default {
        name: "coupons-check-list",
        data() {
            return {
                code: '',
                list: [],
                page: 1,
                total: 0,
                allLoaded: false,
            }
        },
        watch: {
            selected(val) {
                // console.log(val)
                // this.allLoaded= false
                this.page = 1
                this.list = []
                this.getList()
            }
        },
        mounted() {
            this.getList(false)
        },
        methods: {
            to(id){
            this.$router.push({path:'/coupons-use-detail',query:{id:id}});
            },
            submit() {
            if(this.code == ''){
                Toast("请输入优惠券兑换码!");
                return;
            }
                this.$router.push({path: '/coupons-employ', query: {code:this.code}})
            },
            getList(flag) {
                let params = {
                    page: this.page - 1,
                    size: 10
                }
                if (this.selected) params.hasRead = this.selected
                this.axios.get('/promotion/consume/coupon/count/company', {params: params}).then(res => {
                    this.total = res.data.totalElements
                    if (res.data.content && res.data.content.length) {
                        this.list = this.list.concat(res.data.content)
                        if (this.list.length >= res.data.totalElements) {
                            this.allLoaded = true
                        } else {
                            this.allLoaded = false
                        }
                        if (flag) this.$refs.loadmore.onBottomLoaded()
                    } else {
                        this.allLoaded = true
                    }
                })
            },
            loadMore() {
                this.page++
                this.getList(true)
            },
        }
    }
</script>

<style scoped lang="less">

    .coupons-check-list {
        height: 100vh;
        overflow: auto;
        background-color: white;
        .common-form {
            border-bottom: 0;
            .ivu-form-item:last-child {
                border-bottom: 1px solid #EEEEEE;
            }
            .common-form .ivu-form-item .ivu-form-item-label {
                color: #333333;
            }

            .from-input {
                width: 100%;
                padding-right: 115px;
                height: 50px;
                line-height: 50px;
            }
            .from-button {
                width: 64px;
                height: 30px;
                background: linear-gradient(90deg, rgba(67, 142, 255, 1) 0%, rgba(80, 204, 255, 1) 100%);
                border-radius: 15px;
                position: absolute;
                top: 10px;
                right: 55px;
                text-align: center;
                line-height: 30px;
                font-size: 14px;
                font-weight: 400;
                color: rgba(255, 255, 255, 1);
            }
            .scan-button {
                position: absolute;
                top: 10px;
                right: 5px;
                width: 50px;
                height: 30px;
                img {
                    width: 15px;
                    height: 15px;
                    margin: 0 auto;
                    display: block;
                }
                p {
                    height: 14px;
                    font-size: 10px;
                    font-weight: 400;
                    color: #9b9b9b;
                    line-height: 14px;
                    text-align: center;
                }
            }
        }
    }

    @import "./coupons.less";

    #common-form {
        .ivu-form-item-content {
            height: 50px;
        }
    }

    .common-form .ivu-form-item .ivu-form-item-content > * {
        margin-top: 0px;
    }

</style>
