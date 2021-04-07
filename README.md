# 项目说明
```
vue3 and typescript 
```
## 安装依赖
```
npm install  
or
cnpm install
```

### 启动项目
```
npm run serve
```

### 打包项目
```
npm run build    // 正式环境
or
npm run test    // 测试环境
```
  
### ant-design-vue框架首页地址
```
https://vue.ant.design
```

### 项目Gitlab地址
```
http://101.254.183.198:5580/poems_web/fms/fm.git

```

### 目录说明
```
├── dist                                       	// 项目打包路径
├── node_modules								// 项目的依赖模块
├── public                                 		// 项目的静态目录
│	└── index.html                    			// 项目首页地址
├── src                                         // 源码目录
│   ├── api                             		// 项目的所有的api接口
│   │   ├── index.ts                           	// 导出所有的api接口，以及axios、qs模块
│   │   ├── common.ts                           // node公用的api(登录、上传等)
│   │   ├── base.ts                             // 接口公用的api 例如(部门，建筑，系统类型等公用接口)
│   │   ├── workOrder.ts                        // 各个业务线的API,例如sop,workOrder,task.... (文件名称需要保持统一)
│   │   ├── sop.ts                              // 各个业务线的API,例如sop,workOrder,task.... (文件名称需要保持统一)
│   │   └── task.ts                             // 各个业务线的API,例如sop,workOrder,task.... (文件名称需要保持统一)
│   ├── assets                             		// 该文件会经过webpack编译处理（img,js）
│   ├── components                             	// 项目的公用组件
│   │   ├── workOrder                           // 工单通用模块的文件夹 (文件夹名称需要保持统一)
│   │   │   ├── workOrderComponent1.vue         // 工单中通用模块1
│   │   │   └── workOrderComponent2.vue         // 工单中通用模块2
│   │   ├── sop                           		// SOP通用模块的文件夹 (文件夹名称需要保持统一)
│   │   │   ├── workOrderComponent1.vue         // SOP中通用模块1
│   │   │   └── workOrderComponent2.vue         // SOP中通用模块2
│   │   ├── task                           		// 任务通用模块的文件夹 (文件夹名称需要保持统一)
│   │   │   ├── workOrderComponent1.vue         // 任务中通用模块1
│   │   │   └── workOrderComponent2.vue         // 任务中通用模块2
│   │   └── common                 // 全局的通用模块文件夹
│   │   │   ├── workOrderComponent1.vue         // 全局的通用模块
│   │   │   └── workOrderComponent2.vue         // 全局的通用模块
│   ├── router                             		// 项目的所有的路由
│   │   ├── index.ts                            // 导出所有的路由对象
│   │   ├── workOrder.ts                        // 放自己的路由信息（keepAlive是否缓存，keepVerify是否登录验证判断） (文件名称需要保持统一)
│   │   ├── sop.ts                              // 放自己的路由信息（keepAlive是否缓存，keepVerify是否登录验证判断） (文件名称需要保持统一)
│   │   └── task.ts                             // 放自己的路由信息（keepAlive是否缓存，keepVerify是否登录验证判断） (文件名称需要保持统一)
│   ├── store                             		// Vuex状态管理目录
│   │   ├── index.ts                         	// 我们组装模块并导出 store 的地方
│   │   ├── state.ts                         	// Vuex的单一状态树
│   │   ├── mutations.ts                      	// mutation，更改 Vuex 的 store 中的状态
│   │   ├── mutation-types.ts                	// 使用常量替代 mutation 事件类型
│   │   ├── actions.ts                       	// 异步逻辑都应该封装到action里
│   │   └── getters.ts                       	// state 的过滤器
│   ├── style                             		// 样式目录
│   │   ├── common.css                          // 公共样式
│   │   ├── workOrder                           // 工单通用样式的文件夹 (文件夹名称需要保持统一)
│   │   │   ├── workOrder1.css         			// 工单通用样式1
│   │   │   └── workOrder2.css         			// 工单通用样式2
│   │   ├── sop                           		// SOP通用样式的文件夹  (文件夹名称需要保持统一)
│   │   │   ├── sop1.css         				// SOP通用样式1
│   │   │   └── sop2.css         				// SOP通用样式2
│   │   └─── task                           	// 任务通用样式的文件夹 (文件夹名称需要保持统一)
│   │       ├── task1.css         				// 任务通用样式1
│   │       └── task2.css         				// 任务通用样式2
│   ├── views                             		// 页面目录
│   │   └─── workOrder                        	// 模块对应的目录文件夹 (文件夹名称需要保持统一)
│   │       ├── page1.vue               		// 页面1
│   │       └── page2.vue               		// 页面2
│   ├── app.vue                             	// 主组件
│   └── main.ts                             	// 程序入口文件（初始化vue实例，加载公共插件等）
├── .env.development                            // 开发环境下定义的一些变量
├── .env.production                             // 生产环境下定义的一些变量
├── .env.test                             		// 测试环境下定义的一些变量
├── .gitignore                           		// git提交时要忽略的一些文件
├── tsconfig.json                             	// typescript配置JSON
├── tslint.json                             	// 严格模式配置
└──vue.config.js                            	// 可选的配置文件，严格遵照 JSON 的格式

```

#### 文件夹命名统一
上面树形图标注的 (文件(夹)名称需要保持统一) 的文件或者文件夹，在命名的时候需要保持统一，全部采用驼峰命名



## 公用方法说明：

**关于登录**
```
@使用说明： 在url拼接上loginName="xx"

```

**loading全局加载**
```
@使用说明： 组件内通过 this.$store.commit('loading',params) 
@参数：  同Spin组件参数 (Object)

```

**关于权限**
```
@使用说明： 所有权限的ID在登录后会存入store->authId里。可以通过全局方法  $api.hasAuth(authId:string) 进行权限判断。（返回true/false）

```

**使用旧框架的icon**
```
@使用说明： 项目中已经继承了旧项目的icon，使用时    <my-icon type="xx" />
@iconfont地址：需要加入iconfont之后才可以查看

```

**新旧框架之间iframe通信**
```
新框架---->旧版本
@使用说明： parent.postMessage(params, '*')   [注：如果需要清空页面数据的话，在前边加 this.$router.go(0)]
@参数：@params= callback:[{fn:string, data:{}}], // iframe之间跳转之后的回调函数

旧版本---->新框架
@使用说明：通过postMessageToiFrame全局函数
@参数：@params= {
	 route:'', // 路由（必须）
	 query:'', // 跳转到新版本对应的get参数 （如果需要刷新页面，路由定义时keep-alive = false,或者穿个时间戳参数，在组件里监听）
	 callback: {} // 回调函数

@例子：
 var iframe = postMessageToiFrame({
            route: 'fmOrderSub',
            callback: {
                cancelnotice: function () {
                    $(iframe).hide();
                }
            }
        });

        $(iframe).css({
            position: 'absolute',
            top: 0,
            height: '100%',
            width: '100%',
            zIndex: 999
        }) 
```     


