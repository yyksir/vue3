// import { keys, values, isUndefined } from 'lodash';

const files = require.context('../api', true, /.(ts|js)$/);

// 合并所有的API
const $api = files.keys().reduce((con: any, src, index, content) => {

    const obj = files(src).default;
    // 公共接口特殊处理 common 不用加fms
    if (['./common.js', './common.ts'].indexOf(src) === -1) {
        for (const i in obj) {
            if (obj.hasOwnProperty(i)) {
                obj[i] = process.env.VUE_APP_FMS + obj[i];
                
            }
        }
    }
    if (['./index.js', './index.ts'].indexOf(src) === -1) {
       // const val = values(con);
        for (const key in obj) {
            if (obj.hasOwnProperty(key)) {
                
                const item = obj[key];
                // 判断Key 是否已经存在
                // if (!isUndefined(con[key])) {
                //     console.log(`key:${key}已经存在与API中，请检查是否重复`);
                // }
                // // 检查值是否已经重复
                // if (val.indexOf(item) !== -1) {
                //     console.log(`value:${item}已经存在与API中，请检查是否重复`);
                // }
                // 附加对应的值
                con[key] = item;
            }
        }
    }
    return con;
}, {});

// console.log($api)
// const store= {
//     namespaced: true,
//     state: $api,
// };

export default $api;
