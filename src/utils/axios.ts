import vue from 'vue';
import axios from 'axios';
import store from '../store';
// import { get } from 'lodash';
/**
 * 更改axios默认配置
 */

let  service: any = {};
service = axios.create({
    baseURL: process.env.VUE_APP_HOST, // api的base_url
    timeout: 1000 * 60 * 60 * 24, // 请求超时时间
  });
service.defaults.headers.post['Content-Type'] = 'application/json,charset=utf-8';


const loadingLines: (string | undefined)[] = []
/**
 * 添加请求拦截器
 */
 service.interceptors.request.use((config:any) => {
	if (config.url.indexOf("plan-manager") != -1 || (config.data && config.data.loading)) {
		loadingLines.push(config.url);
		if (loadingLines.length) store.state.loading.spinning = true;
		// config.data && config.data.loading && delete config.data.loading
	}

	const pd = store.state.userInfo.pd;
	const user_id = store.state.userInfo.userId;
	const userId = user_id;
	const person_id = store.state.userInfo.person_id || user_id;
	const project_id = store.state.project_id;
	const operator = {
		personId:store.state.userInfo.person_id || user_id,
		personName:store.state.userInfo.name || store.state.userInfo.userName,
	}
	// 公共参数
	let params :any= { user_id, pd, person_id ,userId};
	// 运维系统需要额外的参数
	if (config.url && config.url.indexOf("EMS_SaaS_Web") !== -1) {
		params.puser = {
			userId: user_id,
			loginDevice: "PC",
			pd,
		};
	}
	if(config.url && config.url.indexOf("examine-service"||"patrol-service") !== -1) {
		params = Object.assign({}, {operator},params);
	}
	if (project_id) {
		params = Object.assign({}, { project_id: project_id }, params);
	}
	// 合并参数
	if (config.headers.mergeParams !== false) {
		config.method === 'post' ?
			config.data = Object.assign(params, config.data)
			: config.params = Object.assign(params, config.params);
	}
	return config;
}, (error: any) => {

	loadingLines.splice(0, 1);
	store.state.loading.spinning = false;
	// 对请求错误做些什么
	return Promise.reject(error);
});

/**
 * 添加响应拦截器
 */
 service.interceptors.response.use((res:any, ...argu: any) => {

	if ((res.config.data &&Object.prototype.toString.call(res.config.data) != '[object FormData]'&& JSON.parse(res.config.data).loading)) {
		loadingLines.splice(0, 1);
		if (!loadingLines.length) {
			// 异步关闭 loading
			setTimeout(() => {
				store.state.loading.spinning = false;
			})
		}
	}	
	// debugger
	// 对响应数据做	些什么
	// 如果responseType='blob'  则是下载文件
	if (res.request.responseType === 'blob') {
		const content = res.data;
		let fileName = '';
		let mimeType = '';
		if (res.config.data) {
			if (Object.prototype.toString.call(res.config.data) === '[Object Object]') {
				res.config.data.fileName ?fileName = res.config.data.fileName
					: "";
				mimeType = res.config.data.mimeType;
			} else {
				let configData = JSON.parse(res.config.data);
				(configData.fileName || configData.filename) ?
					fileName = configData.fileName || configData.filename
					: "";
				mimeType = JSON.parse(res.config.data).mimeType;
			}
		}
		const blob = mimeType ? new Blob([content], { type: mimeType }) : new Blob([content]); // 构造一个blob对象来处理数据
		// 对于<a>标签，只有 Firefox 和 Chrome（内核） 支持 download 属性
		// IE10以上支持blob但是依然不支持download
		if ("download" in document.createElement("a")) {
			// 支持a标签download的浏览器
			const link = document.createElement("a"); // 创建a标签
			link.download = fileName; // a标签添加属性
			link.style.display = "none";
			link.href = URL.createObjectURL(blob);
			document.body.appendChild(link);
			link.click(); // 执行下载
			URL.revokeObjectURL(link.href); // 释放url
			document.body.removeChild(link); // 释放标签
		} else {
			// 其他浏览器
			navigator.msSaveBlob(blob, fileName);
		}
	}

	if (process.env.NODE_ENV == "development") {
		// const Result = get(res, 'data.Result') || get(res, 'data.result') || get(res, 'data.respCode');
		// if (Result !== "success" && Result !== "00000") {
		// 	console.log(res.data);
		// 	//不一定返回值都使用Result 20210227 注释掉 yyk
		// 	//console.error(get(res, 'data.Message', '接口返回错误'))
		// }
	}
	return res;
}, (err: any) => {
	// 对响应错误做些什么
	return Promise.reject(err);
});
//axios添加jsonp
service.jsonp = (url: any) => {
	if (!url) {
		console.error('Axios.JSONP 至少需要一个url参数!')
		return;
	}
	return new Promise((resolve, _reject) => {
		window.jsonCallBack = (result: unknown) => {
			resolve(result)
		}
		var JSONP = document.createElement("script");
		JSONP.type = "text/javascript";
		JSONP.src = `${url}?callback=jsonCallBack`;
		document.getElementsByTagName("head")[0].appendChild(JSONP);
		// setTimeout(() => {
		// 	document.getElementsByTagName("head")[0].removeChild(JSONP)
		// }, 500)
	})
}

/**
 * 配置开发、测试、生产环境 baseURL
 */
console.log(process.env.VUE_APP_HOST);
// vue.prototype.$baseUrl = axios.defaults.baseURL = process.env.VUE_APP_HOST;

// /**
//  * 将封装好的axios挂载到vue原型上
//  */
// vue.prototype.$axios = axios;

export default service;
