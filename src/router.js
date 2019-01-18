import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

export default new Router({
	routes: [
		{path: '/', name: 'welcome', component: resolve => require(['@/page/welcome'], resolve)},
		{path: '/index', name: 'index', component: resolve => require(['@/page/index'], resolve), meta: {index: 10, keepAlive: true}, children: [
				{path: '/home', name: 'home', alias: '', component: resolve => require(['@/page/home/home'], resolve), meta: {index: 10, keepAlive: true}},
				{path: '/doctor', name: 'doctor', component: resolve => require(['@/page/doctor/doctor'], resolve), meta: {index: 10}},
				{path: '/maintain', name: 'maintain', component: resolve => require(['@/page/service-map/maintain'], resolve), meta: {index: 10, keepAlive: true}},


				{path: '/my', name: 'my', component: resolve => require(['@/page/my'], resolve), meta: {index: 10}},
				{path: '/carOwner-centre', name: 'carOwnerCentre', component: resolve => require(['@/page/home/carOwner-centre/carOwner-centre'], resolve), meta: {index: 20}},
				{path: '/repair-company', name: 'repairCompany', component: resolve => require(['@/page/home/repair-company/repair-company'], resolve), meta: {index: 20}},
				{path: '/government-service', name: 'governmentService', component: resolve => require(['@/page/home/government-service/government-service'], resolve), meta: {index: 20}},
				{path: '/association-service', name: 'associationService', component: resolve => require(['@/page/home/association-service/association-service'], resolve), meta: {index: 20}},
				{path: '/business-service', name: 'businessService', component: resolve => require(['@/page/home/business-service/business-service'], resolve), meta: {index: 20}},
				{path: '/personnel-service', name: 'personnelService', component: resolve => require(['@/page/home/personnel-service/personnel-service'], resolve), meta: {index: 20}},
				{path: '/big-data', name: 'bigData', component: resolve => require(['@/page/home/big-data/big-data'], resolve), meta: {index: 20}},
				{path: '/public-supervision', name: 'publicSupervision', component: resolve => require(['@/page/home/public-supervision/public-supervision'], resolve), meta: {index: 20}},
				{path: '/about-industry', name: 'aboutIndustry', component: resolve => require(['@/page/home/about-industry/about-industry'], resolve), meta: {index: 20}},
				// 车主中心三级页面
				{path: '/carOwner-centre/renewal', name: 'renewal', component: resolve => require(['@/page/home/carOwner-centre/renewal/renewal'], resolve), meta: {index: 30}},
				{path: '/carOwner-centre/roadHelp', name: 'roadHelp', component: resolve => require(['@/page/home/carOwner-centre/roadHelp/roadHelp'], resolve), meta: {index: 30}},
				{path: '/carOwner-centre/offenceSearch', name: 'offenceSearch', component: resolve => require(['@/page/home/carOwner-centre/offenceSearch/offenceSearch'], resolve), meta: {index: 30}},
				{path: '/carOwner-centre/car-insurance', name: 'carInsurance', component: resolve => require(['@/page/home/carOwner-centre/car-insurance/car-insurance'], resolve), meta: {index: 30}},
				{path: '/carOwner-centre/wash-car', name: 'washCar', component: resolve => require(['@/page/home/carOwner-centre/wash-car/wash-car'], resolve), meta: {index: 30}},
				{path: '/carOwner-centre/used-car', name: 'usedCar', component: resolve => require(['@/page/home/carOwner-centre/used-car/used-car'], resolve), meta: {index: 30}},
				{path: '/carOwner-centre/small-tips', name: 'smallTips', component: resolve => require(['@/page/home/carOwner-centre/small-tips/small-tips'], resolve), meta: {index: 30}},
				// 汽修企业服务中心三级页面
				{path: '/repair-company/personnel-demand', name: 'personnelDemand', component: resolve => require(['@/page/home/repair-company/personnel-demand/personnel-demand'], resolve), meta: {index: 30}},
				{path: '/repair-company/open-business', name: 'openBusiness', component: resolve => require(['@/page/home/repair-company/open-business/open-business'], resolve), meta: {index: 30}},
				{path: '/repair-company/promotion', name: 'promotion', component: resolve => require(['@/page/home/repair-company/promotion/promotion'], resolve), meta: {index: 30}},
				{path: '/repair-company/health-record', name: 'healthRecord', component: resolve => require(['@/page/home/repair-company/health-record/health-record'], resolve), meta: {index: 30}},
				{path: '/repair-company/parts-needing', name: 'partsNeeding', component: resolve => require(['@/page/home/repair-company/parts-needing/parts-needing'], resolve), meta: {index: 30}},
				{path: '/repair-company/maintenance-equipment', name: 'maintenanceEquipment', component: resolve => require(['@/page/home/repair-company/maintenance-equipment/maintenance-equipment'], resolve), meta: {index: 30}},
				{path: '/repair-company/technology-info', name: 'technologyInfo', component: resolve => require(['@/page/home/repair-company/technology-info/technology-info'], resolve), meta: {index: 30}},
				{path: '/repair-company/repair-certificate', name: 'repairCertificate', component: resolve => require(['@/page/home/repair-company/repair-certificate/repair-certificate'], resolve), meta: {index: 30}},
				// 协会服务中心三级页面
				{path: '/association-service/association-introduce', name: 'associationIntroduce', component: resolve => require(['@/page/home/association-service/association-introduce/association-introduce'], resolve), meta: {index: 30}},
				{path: '/association-service/association-duty', name: 'associationDuty', component: resolve => require(['@/page/home/association-service/association-duty/association-duty'], resolve), meta: {index: 30}},
				{path: '/association-service/working-change', name: 'workingChange', component: resolve => require(['@/page/home/association-service/working-change/working-change'], resolve), meta: {index: 30}},
				{path: '/association-service/industry-master', name: 'industryMaster', component: resolve => require(['@/page/home/association-service/industry-master/industry-master'], resolve), meta: {index: 30}},
				{path: '/association-service/industry-party', name: 'industryParty', component: resolve => require(['@/page/home/association-service/industry-party/industry-party'], resolve), meta: {index: 30}},
				{path: '/association-service/experts-list', name: 'experts', component: resolve => require(['@/page/home/association-service/experts/experts-list'], resolve), meta: {index: 30}},
				// {path: '/association-service/industry-show-list', name: 'industryShowList', component: resolve => require(['@/page/home/association-service/industry-show/industry-show-list'], resolve), meta: {index: 30}},
				// 大数据三级页面
				{path: '/big-data/project', name: 'project', component: resolve => require(['@/page/home/big-data/project/project'], resolve), meta: {index: 30}},
				{path: '/big-data/business', name: 'business', component: resolve => require(['@/page/home/big-data/business/business'], resolve), meta: {index: 30}},
				// 公众监督服务中心三级页面
				{path: '/public-supervision/survey-list', name: 'surveyList', component: resolve => require(['@/page/home/public-supervision/survey-list/survey-list'], resolve), meta: {index: 30}},
				{path: '/public-supervision/survey-detail', name: 'surveyDetail', component: resolve => require(['@/page/home/public-supervision/survey-detail/survey-detail'], resolve), meta: {index: 30}},
				{path: '/public-supervision/complaint', name: 'complaint', component: resolve => require(['@/page/home/public-supervision/complaint/complaint'], resolve), meta: {index: 30}},
				// 人才服务中心三级页面
				{path: '/personnel-service/delivery-resume', name: 'deliveryResume', component: resolve => require(['@/page/home/personnel-service/delivery-resume/delivery-resume'], resolve), meta: {requiresAuth: true, index: 30}},
				{path: '/personnel-service/excellent-company', name: 'excellentCompany', component: resolve => require(['@/page/home/personnel-service/excellent-company/excellent-company'], resolve), meta: {index: 30}},
				{path: '/personnel-service/excellent-company-detail', name: 'excellentCompanyDetail', component: resolve => require(['@/page/home/personnel-service/excellent-company/excellent-company-detail'], resolve), meta: {index: 30}},

				// 商务服务中心三级页面
				{path: '/business-service/business-cooperation', name: 'businessCooperation', component: resolve => require(['@/page/home/business-service/business-cooperation/business-cooperation'], resolve), meta: {index: 30}},
			]},


		{path: '/carOwner-centre/add-resume', name: 'addResume', component: resolve => require(['@/page/home/carOwner-centre/resume-manage/add-resume'], resolve), meta: {requiresAuth: true}},
		{path: '/carOwner-centre/edit-info', name: 'editInfo', component: resolve => require(['@/page/home/carOwner-centre/resume-manage/edit-info'], resolve), meta: {requiresAuth: true}},
		{path: '/carOwner-centre/work-hope', name: 'workHope', component: resolve => require(['@/page/home/carOwner-centre/resume-manage/work-hope'], resolve), meta: {requiresAuth: true}},
		{path: '/carOwner-centre/my-advantage', name: 'myAdvantage', component: resolve => require(['@/page/home/carOwner-centre/resume-manage/my-advantage'], resolve), meta: {requiresAuth: true}},
		{path: '/carOwner-centre/working-experience', name: 'workingExperience', component: resolve => require(['@/page/home/carOwner-centre/resume-manage/working-experience'], resolve), meta: {requiresAuth: true}},
		{path: '/carOwner-centre/education-experience', name: 'educationExperience', component: resolve => require(['@/page/home/carOwner-centre/resume-manage/education-experience'], resolve), meta: {requiresAuth: true}},
		{path: '/carOwner-centre/appointment', name: 'appointment', component: resolve => require(['@/page/home/carOwner-centre/appointment/appointment'], resolve), meta: {requiresAuth: true, index: 40}},
		{path: '/carOwner-centre/visitService', name: 'visitService', component: resolve => require(['@/page/home/carOwner-centre/visitService/visitService'], resolve), meta: {requiresAuth: true}},
		{path: '/carOwner-centre/bind-car/bindCar', name: 'bindCar', component: resolve => require(['@/page/home/carOwner-centre/bind-car/bindCar'], resolve)},
		{path: '/carOwner-centre/bind-car/personUpload', name: 'personUpload', component: resolve => require(['@/page/home/carOwner-centre/bind-car/personUpload'], resolve), meta: {requiresAuth: true, index: 50}},
		{path: '/carOwner-centre/bind-car/companyUpload', name: 'companyUpload', component: resolve => require(['@/page/home/carOwner-centre/bind-car/companyUpload'], resolve), meta: {requiresAuth: true, index: 40}},
		{path: '/carOwner-centre/bind-car/bind-other-car', name: 'bindOtherCar', component: resolve => require(['@/page/home/carOwner-centre/bind-car/bind-other-car'], resolve), meta: {requiresAuth: true, index: 40}},



		{path: '/carOwner-centre/carList', name: 'carList', component: resolve => require(['@/page/home/carOwner-centre/carList/carList'], resolve), meta: {requiresAuth: true}},
		// {path: '/carOwner-centre/newCarList', name: 'newCarList', component: resolve => require(['@/page/home/carOwner-centre/carList/newCarList'], resolve), meta: {requiresAuth: true, keepAlive: true}},//新版维修记录
		{path: '/carOwner-centre/carList-manager', name: 'carListManager', component: resolve => require(['@/page/home/carOwner-centre/carList/company-list'], resolve), meta: {requiresAuth: true}},
		{path: '/record-list-manager', name: 'record-list-manager', component: resolve => require(['@/page/home/carOwner-centre/carList/record-list-manager'], resolve), meta: {requiresAuth: true}},
		{path: '/government-service/government-service-list', name: 'governmentServiceList', component: resolve => require(['@/page/home/government-service/government-service-list'], resolve)},
		{path: '/association-service/experts-detail', name: 'expertsDetail', component: resolve => require(['@/page/home/association-service/experts/experts-detail'], resolve), meta: {index: 40}},
		{path: '/carOwner-centre/resume-manage', name: 'resumeManage', component: resolve => require(['@/page/home/carOwner-centre/resume-manage/resume-manage'], resolve), meta: {requiresAuth: true}},
		{path: '/carOwner-centre/resume-detail', name: 'resumeDetail', component: resolve => require(['@/page/home/carOwner-centre/resume-manage/resume-detail'], resolve), meta: {requiresAuth: true}},
		// 我的
		// 我的咨询
		{path: '/my/my-consultation', name: 'myConsultation', component: resolve => require(['@/page/my/my-consultation/my-consultation'], resolve), meta: {requiresAuth: true}},
		// 运营统计
		{path: '/my/operate-manager', name: 'operateManager', component: resolve => require(['@/page/my/operate-manager/operate-manager'], resolve), meta: {requiresAuth: true}},
		// 我的优惠
		{path: '/my/my-discount', name: 'myDiscount', component: resolve => require(['@/page/my/my-discount/my-discount'], resolve), meta: {requiresAuth: true, index: 20}},
		// 我的预约订单
		{path: '/my/my-appointment-order', name: 'appointmentOrder', component: resolve => require(['@/page/my/my-appointment-order/appointment-order'], resolve), meta: {requiresAuth: true, index: 40}},
		// 注册
		// 协议
		{path: '/protocol', name: 'protocol', component: resolve => require(['@/page/my/protocol/protocol'], resolve)},









		{path: '/login', name: 'login', component: resolve => require(['@/page/login'], resolve), meta: {index: 30}},
		{path: '/register', name: 'register', component: resolve => require(['@/page/register'], resolve)},
		{path: '/recordlist', name: 'recordlist', component: resolve => require(['@/page/recordList'], resolve), meta: {requiresAuth: true}},
		{path: '/vehicleDetail', name: 'vehicleDetail', component: resolve => require(['@/page/vehicleDetail-carOwner'], resolve), meta: {requiresAuth: true}},
		{path: '/vehicleDetail-carOwner', name: 'vehicleDetailCarOwner', component: resolve => require(['@/page/vehicleDetail-carOwner'], resolve), meta: {requiresAuth: true}},
		{path: '/repairSearchList', name: 'repairSearchList', component: resolve => require(['@/page/repairSearchList'], resolve), meta: {requiresAuth: true}},
		{path: '/setting', name: 'setting', component: resolve => require(['@/page/setting'], resolve), index: 30},
		{path: '/suggestion', name: 'suggestion', component: resolve => require(['@/page/suggestion'], resolve), meta: {requiresAuth: true, index: 20}},
		{path: '/articleDetail', name: 'articleDetail', component: resolve => require(['@/page/articleDetail'], resolve)},
		{path: '/aboutUs', name: 'aboutUs', component: resolve => require(['@/page/aboutUs'], resolve), meta: {index: 30}},
		{path: '/remark', name: 'remark', component: resolve => require(['@/page/remark'], resolve), meta: {requiresAuth: true, index: 60}},
		{path: '/myQuestion', name: 'myQuestion', component: resolve => require(['@/page/myQuestion'], resolve), meta: {requiresAuth: true, index: 30}},
		{path: '/askQuestions', name: 'askQuestions', component: resolve => require(['@/page/askQuestions'], resolve), meta: {requiresAuth: true}},
		{path: '/myAnswer', name: 'myAnswer', component: resolve => require(['@/page/myAnswer'], resolve), meta: {requiresAuth: true, index: 30}},
		{path: '/question', name: 'question', component: resolve => require(['@/page/question'], resolve)},
		{path: '/questionDetail', name: 'questionDetail', component: resolve => require(['@/page/questionDetail'], resolve), meta: {index: 20}},
		{path: '/myQuestionDetail', name: 'myQuestionDetail', component: resolve => require(['@/page/myQuestionDetail'], resolve), meta: {index: 40}},
		{path: '/professor', name: 'professor', component: resolve => require(['@/page/professor'], resolve)},
		{path: '/professorDetail', name: 'professorDetail', component: resolve => require(['@/page/professorDetail'], resolve)},
		{path: '/changePassword', name: 'changePassword', component: resolve => require(['@/page/changePassword'], resolve), meta: {requiresAuth: true, index: 30}},
		{path: '/changeNickName', name: 'changeNickName', component: resolve => require(['@/page/changeNickName'], resolve), meta: {requiresAuth: true, index: 30}},
		{path: '/changePhoneNum', name: 'changePhoneNum', component: resolve => require(['@/page/changePhoneNum'], resolve), meta: {requiresAuth: true, index: 30}},
		{path: '/bindPhone', name: 'bindPhone', component: resolve => require(['@/page/bindPhone'], resolve), meta: {requiresAuth: true, index: 30}},
		{path: '/infoDetail', name: 'infoDetail', component: resolve => require(['@/page/infoDetail'], resolve)},
		{path: '/askExpert', name: 'askExpert', component: resolve => require(['@/page/askExpert'], resolve), meta: {requiresAuth: true, index: 50}},
		{path: '/forgetPwd', name: 'forgetPwd', component: resolve => require(['@/page/forgetPwd'], resolve)},
		{path: '/resetPassword', name: 'resetPassword', component: resolve => require(['@/page/resetPassword'], resolve)},
		{path: '/myAppointment', name: 'myAppointment', component: resolve => require(['@/page/myAppointment'], resolve), meta: {requiresAuth: true, index: 20}},
		{path: '/myOrder', name: 'myOrder', component: resolve => require(['@/page/myOrder'], resolve), meta: {requiresAuth: true, index: 20}},
		{path: '/myRemark', name: 'myRemark', component: resolve => require(['@/page/remark/myRemark'], resolve), meta: {requiresAuth: true}},
		{path: '/remarkMap', name: 'remark-map', component: resolve => require(['@/page/service-map/maintain'], resolve), meta: {keepAlive: false}},
		{path: '/remarkMatch', name: 'remark-match', component: resolve => require(['@/page/remark/match'], resolve)},
		{path: '/remarkDetail', name: 'remark-detail', component: resolve => require(['@/page/remark/newRemarkDetail'], resolve)},
		{path: '/maintainRemark', name: 'maintainRemark', component: resolve => require(['@/page/maintainRemark'], resolve)},
		{path: '/upComplain', name: 'upComplain', component: resolve => require(['@/page/remark/upComplain'], resolve), meta: {requiresAuth: true}},
		{path: '/myComplaint', name: 'myComplaint', component: resolve => require(['@/page/myComplaint'], resolve), meta: {requiresAuth: true}},
		{path: '/tips-list', name: 'tips-list', component: resolve => require(['@/page/home/tips-list'], resolve)},
		{path: '/school-map', name: 'school-map', component: resolve => require(['@/page/service-map/maintain'], resolve), meta: {index: 10, keepAlive: true}},
		{path: '/base-map', name: 'base-map', component: resolve => require(['@/page/service-map/maintain'], resolve), },
		{path: '/school-detail', name: 'school-detail', component: resolve => require(['@/page/service-map/school-detail'], resolve)},
	]
})
