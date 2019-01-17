<template>
<div class="school-detail">
	<div class="banner">
		<div class='dummy'></div>
		<div class='content'>
			<mt-swipe :auto="3000">
				<mt-swipe-item v-for="(item, index) in bannerList" :key="index">
					<img :src="item" v-img="{group: 'school-img'}"/>
				</mt-swipe-item>
			</mt-swipe>
		</div>
	</div>
	<div class="head">
		<div class="title">{{info.name}}</div>
		<div class="level">{{info.creditLevel=="N" ? "未评" :info.creditLevel}}级</div>
		<div class="address">
			<span class="miles">{{ $route.query.distance }}km</span>
			<span class="address_area">{{ info.address }}</span>
		</div>
	</div>
</div>
</template>

<script>
import {  Swipe, SwipeItem } from 'mint-ui';
export default {
	name: "school-detail",
	data(){
		return{
			info :{}
		}
	},
	computed: {
		bannerList(){
			let arr= this.info.pic? this.info.pic.split(','): ['/static/img/shqxwbig.png']
			return arr
		}
	},
	mounted(){
		this.getInfo()
	},
	methods:{
		getInfo(){
			this.axios.get('/training/driving/school/'+ this.$route.query.id).then( (res) => {
				this.info= res.data
			})
		}
	}
}
</script>

<style scoped lang="less">
.school-detail{
	.banner {
		position: relative;
		overflow: hidden;
		.dummy {
			margin-top: 45%;
		}
		.content{
			position: absolute;
			left: 0;
			right: 0;
			top: 0;
			bottom: 0;
			img {
				width: 100%;
				height: 100%;
			}
		}
	}
	.head{
		padding: 15px;
		.title{
			font-size: 18px;
			font-weight: 600;
		}
		.level{
			font-size: 12px;
			color: #FF7E1E;
		}
	}
}
</style>
