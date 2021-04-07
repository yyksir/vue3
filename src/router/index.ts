import { createRouter, createWebHistory, RouteLocationNormalized, RouteRecordRaw } from 'vue-router';
import store from '../store/index';
import Vue from 'vue';
// import { getCurrentInstance} from 'vue';
import service from "../utils/axios";

let files = require.context('../router', true, /.(ts|js)$/);
let routes: Array<RouteRecordRaw> = [];
files.keys().forEach(key => {
    if (key !== './index.js' && key !== './index.ts') {
        if (files(key).default == undefined) console.log(key);
        routes = routes.concat(files(key).default)
    }
})

// const routes: Array<RouteRecordRaw> = [
//   {
//     path: '/',
//     name: 'Home',
//     component: Home,
//   },
//   {
//     path: '/about',
//     name: 'About',
//     // route level code-splitting
//     // this generates a separate chunk (about.[hash].js) for this route
//     // which is lazy-loaded when the route is visited.
//     component: () => import(/* webpackChunkName: "about" */ '../views/About.vue'),
//   },
// ];

const router = createRouter({
  history: createWebHistory('/fms'),
  routes,
});
router.beforeEach( (to,from,next)=>{
  console.log(to,from)
     // 如果hash里包含以下值，则直接放行
     if(["#accept-flow","#check-flow","#check-condition"].includes(to.hash)) return next();
     // 判断是否是新开页面或刷新 刷新会保存到sessionStorage
     if (sessionStorage.getItem("maps")) {
        //  try {
        //      const last = _.last(store.state.router.maps);
        //      if (last.fullPath !== to.fullPath) {
        //          store.state.router.maps = [];
        //      }
        //  } catch (error) {
 
        //  }
         sessionStorage.removeItem("maps")
     }
 
     // 记录跳转的路由的用于面包屑导航展示
    //  store.commit('router/add', to);
 
     // 路由进入之前显示  加载中
     store.commit('loading', { spinning: true });
     if (to.query.project_id) {
         store.commit('project_id', to.query.project_id);
     }
 
     if (to.query.loginName) {
 
         store.commit('project_id', to.query.project_id);
         service({
                 url: process.env.VUE_APP_FMS +'/EMS_SaaS_Web/Spring/MVC/entrance/unifier/getPersonByUserNameService',//ctx.$api.login 
                 method: "post",
                 data: {
                     loginName: to.query.loginName,
                     loginDevice: to.query.loginDevice || "PC"
                 }
             })
             .then((res:any) => {
                 if (res.data.result === "success" && res.data.content[0]) {
                     // 用户信息
                     res.data.content[0].person_id = res.data.content[0].person_id || res.data.content[0].userId;
                     store.commit("userInfo", res.data.content[0]);
                     // 权限集合
                      const authId = new Set(
                        res.data.content[0].authorizations
                        .map(( authorizationId: { authorizationId: any; } ) => authorizationId)
                        .filter((item: any) => item)
                    );
                     store.commit("authId", [...authId]);
                     next();
                 } else {
                     console.log("登录失败！");
                 }
             })
             .catch((err: any) => {
                 window.sessionStorage.loginErr = true;
             });
     } else {
         next();
     }
 
  
})
router.onError((error)=>{
  console.error(error);
  
})

router.afterEach((to, from) => {
  sendToAnalytics(to.fullPath)
})

function sendToAnalytics(fullPath: string) {
  store.commit('loading', { spinning: false })
  console.log(fullPath)
}
export default router;


