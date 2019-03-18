<template>
<div class="school-qa" id="school-qa">
	<div class="button" @click="goRule"><i class="fa fa-question-circle-o"></i></div>
	<div v-show="showRule" class="rules">
		<div class="block">
			<p class="q">请问地图上有两种图标代表了什么？</p>
			<p class="a">您好，地图上显示的两种图标， <img src="/static/img/maintain/icon-base.png"/>代表日常学车时所进的训练基地； <img src="/static/img/maintain/icon-school.png"/>代表驾校公司所在地，同时也是学车报名地点。可以通过在地图上点击不同的图标，将在地图下方的驾校列表中展示地图上驾校或基地内入驻的驾校。</p>
		</div>
		<div class="block">
			<p class="q">请问为什么有的训练基地写了自用训练场，有的则写了合用训练场？</p>
			<p class="a">您好，标明自用训练场的，表示该训练场由该驾校独享，没有和其他驾校共用训练场地。而标了合用训练场的，就表示该基地入驻了多个驾校，共用训练场地。</p>
		</div>
		<div class="block">
			<p class="q">请问看到的驾校有AAA级，也有AA级，代表了什么？</p>
			<p class="a">您好，汽修平台上的每家驾校都是经过机动车驾驶员培训机构质量信誉考核的，并且显示真实的评级。有助您更好地选择驾校，请参考以下评级说明：<br/> AAA级：质量信誉优良企业； <br/>AA级：质量信誉合格企业； <br/>A级：质量信誉基本合格企业； <br/>B级：质量信誉不合格企业；</p>
		</div>
		<div class="block">
			<p class="q">请问每家驾校都有自动挡轿车培训吗？</p>
			<p class="a">您好，每家驾校都有不同的培训驾驶证类型，您可以使用培训驾照类型的筛选条件来搜索您需要的驾校，同时，请参考以下代号及准驾车型对应表：<br/>
				大型客车（A1）：<span> 大型载客汽车</span>
				牵引车（A2）：<span> 重型、中型全挂、半挂汽</span>
				城市公交车（A3）：<span> 核载10人以上的城</span>
				中型客车（B1）：<span> 中型载客汽车（含核载10人以上、19人以下的城市公共汽车）</span>
				大型货车（B2）：<span> 重型、中型载货汽车；重型、中型专项作业车</span>
				小型汽车（C1）： <span> 小型、微型载客汽车以及轻型、微型载货汽车；轻型、微型专项作业车</span>
				小型自动挡汽车（C2）： <span> 小型、微型自动挡载客汽车以及轻型、微型自动挡载货汽车</span>
				残疾人专用小型自动挡载客汽车（C5）： <span> 残疾人专用小型、微型自动挡载客汽车（允许上肢、右下肢或者双下肢残疾人驾驶）</span>
				普通三轮摩托车（D）： <span> 发动机排量大于50ml或者最大设计车速大于50km/h的三轮摩托车</span>
				普通二轮摩托车（E）： <span> 发动机排量大于50ml或者最大设计车速大于50km/h的二轮摩托车 </span>
				轻便摩托车（F）： <span> 发动机排量小于等于50ml，最大设计车速小于等于50km/h的摩托车</span>
			</p>
		</div>
	</div>
</div>
</template>

<script>
export default {
	name: "school-qa",
	data(){
		return{
			showRule: false
		}
	},
	watch:{
		'$route'(to){
			if(to.query.show=='showRule') this.showRule=true
			else this.showRule=false
		},
	},
	mounted(){
		document.getElementById("school-qa").addEventListener("touchmove",function(){
			event.stopImmediatePropagation();
		},true);
	},
	methods:{
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
	.rules{
		position: fixed;
		width: 100%;
		height: 100vh;
		overflow: auto;
		z-index: 20;
		background-color: white;
		.block{
			padding: 15px 15px 10px;
			border-bottom: 10px solid #F8F8F8;
			position: relative;
			&:last-child{
				border: 0;
			}
			p{
				padding-left: 35px;
				margin-bottom: 10px;
				position: relative;
				line-height: 24px;
				color: #333333;
				&:before{
					content: 'Q';
					display: block;
					width: 24px;
					height: 24px;
					line-height: 24px;
					text-align: center;
					color: white;
					background-color: #4285F4;
					border-radius: 100%;
					position: absolute;
					top: -1px;
					left: 0;
				}
				&.a:before{
					content: 'A';
					background-color: #BDBDBD;
				}
				img{
					width: 21px;
					margin-right: 5px;
				}
				span{
					color: #999999;
					display: block;
				}
			}
		}
	}
}
</style>
