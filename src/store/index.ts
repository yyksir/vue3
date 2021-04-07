import { createStore } from 'vuex';
import {
	USER_INFO, LOADING, AUTHID, PROJECTID, EVENTMANGEFUN
} from './mutation-types'
// import state from './state';
export default createStore({
  state: {
    test: {
      a: 1
    },
  	router: {},
		userInfo: {
			userId:'57bc6b657b524ea989425cd265621002',
			pd:'46f94c8de14fb36680850768ff1b7f2a',
			person_id:'RY55da78b7c4624b65b6e9ff598f76ddf4',
			name:'',
			userName:'baike',
			

		},
		loading: {
			spinning:false,
		},
		authId: [],
		project_id: "",
		// 任务
		task: {
			tabKey: '1',
		},
		// 中间键
		keyConfig: {
			// 字段表格编辑状态
			editState: false,
			// 新建字段状态
			addState: false,
			// 完成项编辑状态
			complateEditState: false,
			// 业务模块名称
			configName: '',
		},
		isShowErrhandle: false,
		isSelectTaskType: {},
		taskdynamic_config: [],
		taskType: 'task',
		workDeskRoute: "workDeskDetail",
		workdeskIsreload: true,
		saasConfig: {},
		eventMangeObj: {},
  },
  mutations: {
    setTestA(state, value) {
      state.test.a = value
    },
    	// 修改用户信息
	[USER_INFO](state, params) {
		state.userInfo = params
	},
	// 修改加载中参数
	[LOADING](state, params) {
		state.loading = params
	},
	[AUTHID](state, params) {
		state.authId = params
	},
	[PROJECTID](state, params) {
		state.project_id = params
	},
	[EVENTMANGEFUN](state, params) {
		state.eventMangeObj = params
	},
	// 修改任务管理中tab组件key值
	setTaskTabKey: (state, params) => state.task.tabKey = params,
	changeIsshowErrHandle(state, params) {
		state.isShowErrhandle = params;
	},
	// 设置是否重新加载数据
	// changeReload: (state, params) => state.task.isReload = params,
	// 设置中间键字段编辑状态
	setKeyConfigEditState: (state, params) => state.keyConfig.editState = params,

	handleSelectTaskType: (state, params) => state.isSelectTaskType = params,
	// 储存左侧任务的动态字段
	handleSavetaskdynamic_config: (state, params) => state.taskdynamic_config = params,
	//确认是节点还是任务
	handlechangetaskType: (state, params) => state.taskType = params,


	// 设置中间键完成项编辑状态
	setKeyConfigComplateEditState: (state, params) => state.keyConfig.complateEditState = params,
	// 设置中间键新建字段显隐状态
	setKeyConfigAddState: (state, params) => state.keyConfig.addState = params,
	// 设置中间键业务名称
	setKeyConfigConfigName: (state, params) => state.keyConfig.configName = params,
	//设置进去工作台的路由
	setWorkDeskRoute: (state, params) => state.workDeskRoute = params,
	//判断工作台缓存是否需要刷新
	setWorkDeskIsreload: (state, params) => state.workdeskIsreload = params,
	// 存储saasiframe里的配置信息
	// setSaasConfigInfo: (state, params) => state.saasConfig = params,
  },
  actions: {
  },
  modules: {
  },
 });   
