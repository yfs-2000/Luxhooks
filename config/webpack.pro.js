const {merge} = require('webpack-merge')
const  common = require('./webpack.common.js')
const path  = require("path")
const {CleanWebpackPlugin} = require("clean-webpack-plugin")
const  {resolve}  = path
module.exports = merge(common,{
    mode: 'production',
    devtool: 'cheap-module-source-map', // 追踪源代码错误
    plugins:[
        new CleanWebpackPlugin(), // 清除build目录下所有文件
    ]
})
