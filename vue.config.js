// const WebpackBar = require('webpackbar');

module.exports = {
  // 相对路径
  publicPath: '/fms',
  // 打包名称
  outputDir: 'fms',
  // 放置生成的静态资源 (js、css、img、fonts) 的 (相对于 outputDir 的) 目录
  assetsDir: 'static',
  // 生产环境是否开启sourceMap
  productionSourceMap: false,
  //是否在开发环境下通过 eslint-loader 在每次保存时 lint 代码
  lintOnSave: false,
  // 启动多核编译
  parallel: require('os').cpus().length > 1,
  // ant框架主题定制
  css: {
    loaderOptions: {
      less: {
        modifyVars: {
          'primary-color': '#5D6BBA',
          'success-color': '#2AC58B',
          'warning-color': '#F59D2F',
          'error-color': '#ED2E38',
          'border-color-base': '#D3D6E0',
          'progress-default-color': '@primary-color'
        },
        javascriptEnabled: true
      }
    }
  },
  configureWebpack() {
    // return {
    //   plugins: [new WebpackBar({
    //     name: `Persagy的设备设施`,
    //     color: "green",
    //   }), ]
    // }
  },
  chainWebpack: (config) => {
    config.plugins.delete('prefetch');
    config.performance.set('hints', false);

    const svgRule = config.module.rule('svg');

    svgRule.uses.clear();

    svgRule
      .use('babel-loader')
      .loader('babel-loader')
      .end()
      .use('vue-svg-loader')
      .loader('vue-svg-loader');

  },
  // 配置跨域
  devServer: {
    proxy: {
      '/api': {
        // target: 'http://127.0.0.1:9910', // 本地meos
        //target: 'http://192.168.0.246:9910/', // 236 meos
        //target: 'http://101.201.49.1:9910', // 测试环境
        //target: 'http://101.254.183.196:9900', // 新城准生产环境
        // target:'http://192.168.100.124',//124环境 http://39.96.54.33:9960/
        // target:'http://39.96.54.33:9960',
        //target:'http://39.106.182.122:9910',
        //target:'http://192.168.0.246:9910',//
        // target:'http://192.168.100.55:9910',//oa对接测试环境
        // target:'http://39.106.182.122:9910',//
        target:'http://192.168.100.236:9910',//
        changeOrigin: true,
        pathRewrite: {
          // '^/api': 'http://127.0.0.1:9910',
          //'^/api': 'http://192.168.0.246:9910/api',
          //'^/api': 'http://101.254.183.196:9900/api', // 新城准生产
          // '^/api': 'http://192.168.100.124/api',//124测试开发环境
          // '^/api': 'http://39.96.54.33:9960/api',
           //'^/api': 'http://39.106.182.122:9910/api/',
          //'^/api': 'http://192.168.0.246:9910/api/',//o
          //'^/api': 'http://192.168.100.55:9910',//oa对接测试环境
          // '^/api': 'http://39.106.182.122:9910/api',//
          '^/api': 'http://192.168.100.236:9910',//
        }
      }
    }
  }
}