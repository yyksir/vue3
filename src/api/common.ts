
export default {
	// 公共--api
	host: process.env.VUE_APP_HOST + '/', //新框架的上传下载接口的host
	login: process.env.VUE_APP_FMS + '/EMS_SaaS_Web/Spring/MVC/entrance/unifier/getPersonByUserNameService', // 根据用户名称获取账号人员信息(V1.2.0)
	upload: process.env.VUE_APP_HOST + process.env.VUE_APP_UPLOAD, // 上传接口
	download: process.env.VUE_APP_HOST + process.env.VUE_APP_DOWNLOAD, // 下载接口 ($api.download/key?filename="xx"  (filename对下载的文件重命名))
	downloadbyparams: process.env.VUE_APP_HOST + process.env.VUE_APP_DOWNLOADBYPARAMS, // 通过参数下载接口
	downloadpdf: process.env.VUE_APP_DOWNLOADPDF, // 导出pdf
	// 查询部门-岗位-人员树形结构
	personTree: "/fms/saas/restDeptService/queryDeptPositionPersonTree",
	// 所属部门树形结构
	queryDeptTree: "/fms/saas/restDeptService/queryDeptTree",

	userInfo: process.env.VUE_APP_FMS + '/userInfo'
};
