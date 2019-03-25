const maintainListHistory = () => {
	const val = localStorage.getItem('maintainListHistory')
	return val ? JSON.parse(val) : []
}

export default {
	state: {
		picVerification: {   // 图形验证码信息
			YZM: '',
			imageToken: ''
		},
		resumeDetail: {
			popupVisible: false,
			city: '上海'
		},
		slideState:{
			showBody: 'maintainList',
			setBodyHeight: 200,
			bodyHeight: 200,
			minTop: 80,
			minHeight: 45,
		},
		maintainDetail: {},
		maintainListHistory: maintainListHistory(),
		nowRole: 'chezhu',
		location:{
			lng: '',
			lat: ''
		}
	},
	getters: {
		// getLocation: state => {
		// 	return state.location
		// }
	},
	mutations: {
		changeYZM(state,YZM) {
			state.picVerification.YZM = YZM
			console.log("YZM修改了", YZM);
		},
		changeImgToken(state, imageToken) {
			state.picVerification.imageToken = imageToken
			console.log("imageToken改变了");
		},
		closePopupVisible(state, popupVisible){
			state.resumeDetail.popupVisible = popupVisible
		},
		getCity(state, city){
			state.resumeDetail.popupVisible=false
			state.resumeDetail.city = city
		},
		setSlideBodyHeight(state, val){
			state.slideState.bodyHeight= val
		},
		reSetSlideBodyHeight(state, val){
			state.slideState.setBodyHeight= val
		},
		setSlideMinTop(state, val){
			state.slideState.minTop= val
		},
		setSlideMinHeight(state, val){
			state.slideState.minHeight= val
		},
		setSlideShowBody(state, val){
			state.slideState.showBody= val
		},
		setMaintainDetail(state, item){
			state.maintainDetail= item
		},
		setMaintainListHistory(state, item){
			if(item){
				if(state.maintainListHistory.length &&
					state.maintainListHistory[state.maintainListHistory.length-1].corpId== item.corpId) {
					state.maintainListHistory[state.maintainListHistory.length-1]= item
				}else{
					if(state.maintainListHistory.length>=2){
						state.maintainListHistory.splice(0,1)
					}
					state.maintainListHistory.push(item)
				}
			} else state.maintainListHistory=[]
			localStorage.setItem('maintainListHistory', JSON.stringify(state.maintainListHistory))
		},
		setNowRole(state, val){
			state.nowRole= val
		},
		setLocation(state, obj){
			state.location.lng= obj.lng
			state.location.lat= obj.lat
		},
	},
	actions:{

	},
}
