const {merge} = require('webpack-merge')
const  common = require('./webpack.common.js')
const path  = require("path")
const HtmlWebpackPlugin = require("html-webpack-plugin")
const  {resolve}  = path
module.exports = merge(common,{
    mode: 'development',
    devtool: 'cheap-module-source-map', // 追踪源代码错误
    entry: resolve(__dirname,"../example/index.js"),
    devServer: {   //开启服务器运行构建后的代码
        contentBase: resolve(__dirname, "../build"),//运行代码的路径
        compress: true,//开启gzip压缩  服务器传过来的数据经过压缩 这样会更快
        port: 8000,//端口号
        open:true,//自动打开浏览器
        hot:true//开启热更新
    },
    module:{
        rules:[
            {
                test: /\.html$/,
                /*use: {
                  loader: 'html-loader'
                }*/
                loader: 'html-loader' // 解决html中img问题
            },
        ]
    },
    plugins: [
        new HtmlWebpackPlugin(
            {
                template: resolve(__dirname,"../example/index.html"),
            }
        )
    ]

})
