const {merge} = require('webpack-merge')
const  common = require('./webpack.common.js')
const path  = require("path")
const {CleanWebpackPlugin} = require("clean-webpack-plugin")
const  {resolve}  = path
module.exports = merge(common,{
    mode: 'production',
  /*  output: {
        path: resolve(__dirname, '../build/ilb'),
        library: {
            type: "module"
        },
        chunkLoading: "import",
        chunkFormat: "module",
        environment: { module: true },
    },*/
    experiments: {
        outputModule: true
    },
    output: {
        path: resolve(__dirname, '../build/umd'),
       // globalObject: 'this', // 使得在 web node 都可用
      //  umdNamedDefine: true, // 给生成的 umd 模块中的 amd 部分命名
        library: {
            type: 'umd', // 指定输出 的格式，与设置 libraryTarget 一个效果
            name: 'luxHooks', // umd 格式可以给浏览器script 直接引用，这里可以设置一个 浏览器环境的全局变量名称，浏览器环境可以直接通过 WebpackUI.Button 来使用组件
            auxiliaryComment: '这里是插入的注释',
        },
    },
    devtool: 'cheap-module-source-map', // 追踪源代码错误
    plugins:[
        new CleanWebpackPlugin(), // 清除build目录下所有文件
    ],
   /* externals: {
        react: {
            commonjs: 'react',
            commonjs2: 'react',
            amd: 'react',
            root: 'React'
        },
        'react-dom': {
            commonjs: 'react',
            commonjs2: 'react',
            amd: 'react',
            root: 'React'
        }
    }*/
})
