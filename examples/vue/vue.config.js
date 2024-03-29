const path = require('path');
const AddAssetHtmlPlugin = require('add-asset-html-webpack-plugin')
const webpack = require('webpack')
const { name } = require('./package');

function resolve(dir) {
  return path.join(__dirname, dir);
}
const port = 7101; // dev port

module.exports = {
  /**
   * You will need to set publicPath if you plan to deploy your site under a sub path,
   * for example GitHub Pages. If you plan to deploy your site to https://foo.github.io/bar/,
   * then publicPath should be set to "/bar/".
   * In most cases please use '/' !!!
   * Detail: https://cli.vuejs.org/config/#publicpath
   */
  outputDir: 'dist',
  assetsDir: 'static',
  filenameHashing: true,
  // tweak internal webpack configuration.
  // see https://github.com/vuejs/vue-cli/blob/dev/docs/webpack.md
  devServer: {
    // host: '0.0.0.0',
    hot: true,
    disableHostCheck: true,
    port,
    overlay: {
      warnings: false,
      errors: true,
    },
    headers: {
      'Access-Control-Allow-Origin': '*',
    },
  },
  configureWebpack: config => {
    config.externals = {
      vue: "Vue",
      "element-ui": "ELEMENT",
      "vue-router": "VueRouter",
      vuex: "Vuex",
      // axios: "axios"
    };
    // let plugins = []
    // if (process.env.NODE_ENV === 'production') {
    //   // 为生产环境修改配置...
    //   // 有几个 dll.js，这里就响应 new 几个 webpack.DllReferencePlugin
    //   plugins = plugins.concat([
    //     new webpack.DllReferencePlugin({
    //       context: process.cwd(),
    //       manifest: require('./public/vendor/vendor-manifest.json')
    //     }),
    //     // 将 dll 注入到 生成的 html 模板中
    //     new AddAssetHtmlPlugin({
    //       // dll文件位置
    //       filepath: resolve('./public/vendor/*.js'),
    //       // dll 引用路径
    //       publicPath: './vendor',
    //       // dll最终输出的目录
    //       outputPath: './vendor'
    //     })
    //   ])
    // } else {
    //   // 为开发环境修改配置...
    // }
    // config.plugins = [...config.plugins, ...plugins]
    Object.assign(config.resolve, {
      alias: {
        '@': resolve('src'),
      },
    }),
    Object.assign(config.output, {
      // 把子应用打包成 umd 库格式
      library: `${name}-[name]`,
      libraryTarget: 'umd',
      jsonpFunction: `webpackJsonp_${name}`,
    })
  },
  chainWebpack: config => {
    const cdn = {
      // 访问https://unpkg.com/element-ui/lib/theme-chalk/index.css获取最新版本
      css: ["//unpkg.com/element-ui@2.10.1/lib/theme-chalk/index.css"],
      js: [
        "//unpkg.com/vue@2.6.10/dist/vue.min.js", // 访问https://unpkg.com/vue/dist/vue.min.js获取最新版本
        "//unpkg.com/vue-router@3.0.6/dist/vue-router.min.js",
        "//unpkg.com/vuex@3.1.1/dist/vuex.min.js",
        "//unpkg.com/axios@0.19.0/dist/axios.min.js",
        "//unpkg.com/element-ui@2.10.1/lib/index.js"
      ]
    };

    // 如果使用多页面打包，使用vue inspect --plugins查看html是否在结果数组中
    config.plugin("html").tap(args => {
      // html中添加cdn
      args[0].cdn = cdn;
      return args;
    });
  }
};
