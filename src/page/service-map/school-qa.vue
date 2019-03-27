<template>
<div class="school-qa" id="school-qa">
	<div class="button" @click="goRule"><i class="fa fa-question-circle-o"></i></div>
	<qa v-show="showRule"></qa>
</div>
</template>

<script>
import Qa from '@/page/service-map/qa.vue'
export default {
	name: "school-qa",
	components: { Qa},
	data(){
		return{
			showRule: false
		}
	},
	watch:{
		'$route'(to){
			this.show(to)
		},
	},
	mounted(){
		document.getElementById("school-qa").addEventListener("touchmove",function(){
			event.stopImmediatePropagation();
		},true);
		this.show(this.$route)
	},
	methods:{
		show(route){
			if(route.query.show=='showRule') this.showRule=true
			else this.showRule=false
		},
		goRule(){
			this.$router.push({path: this.$route.path, query: { show: 'showRule' }})
		}
	}
}
</script>

<style scoped lang="less">
.school-qa{
	.button{
		width: 36px;
		height: 36px;
		position: absolute;
		right: 55px;
		top: 40px;
		background-color: white;
		border-radius: 4px;
		border:1px solid #ccc;
		z-index: 20;
		i{
			font-size: 22px;
			position: absolute;
			left: 50%;
			top: 50%;
			transform: translate(-50%, -50%);
			color: #469EFF;
		}
	}
}
</style>
