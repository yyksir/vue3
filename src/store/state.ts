const initState = {
	userInfo: {}, // 用户信息
	loading: {},  // 全局加载
	authId: [], // 权限Id集合
	project_id: "", // 项目id
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
	taskType: 'task',//确认是节点还是任务
	workDeskRoute: "workDeskDetail",//确认进去的是待执行还是待审核
	workdeskIsreload: true,//true为刷新
	eventMangeObj: {},//事件对象
};

let state;
// 获取session 中的用户信息
if (sessionStorage.getItem('state')) {
	state = Object.assign({}, initState, JSON.parse(sessionStorage.getItem('state')||''));
} else {
	state = {
		router: {},
		userInfo: {},
		loading: {},
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
	};
}


export default state;
