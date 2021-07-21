const path = require("path")
const {resolve} = path;
module.exports = {
    entry: resolve(__dirname,"../src/index.tsx"),
    output: {
        filename: '[name].js',
        chunkFilename: "[name].js",
        publicPath: '/'
    },

    module: {
        rules: [
            { parser: { requireEnsure: false } },
            {
                test:/\.(js|mjs|jsx|ts|tsx)$/, // jsx/js文件的正则
                exclude: /node_modules/, // 排除 node_modules 文件夹
                use: {
                    // loader 是 babel
                    loader: 'babel-loader',
                    options: {
                        // babel 转义的配置选项
                        presets: [
                            // 添加 preset-react
                            "@babel/typescript",
                            "@babel/preset-react",
                            ['@babel/preset-env', {
                                modules: false,
                                targets: {
                                    ie: "9"
                                },
                                useBuiltIns: 'usage',
                                corejs: { version: 3, proposals: true }
                            }]
                        ],
                        plugins: ["@babel/plugin-transform-runtime","@babel/proposal-class-properties",
                            "@babel/proposal-object-rest-spread"],
                        cacheDirectory: true
                    }
                }
            },

            {
                test: /\.css$/, // 检测文件是否是css文件
                use: [  // 执行顺序：从下到上，从右往左依次执行
                    'style-loader', // 创建style标签，将js中的css代码放进标签内生效
                    'css-loader', // 能将css文件打包到js中（会以commonjs方式整合到js文件中）
                    {
                        loader: 'postcss-loader',
                        options: {
                            ident: 'postcss',
                            plugins: (loader) => [
                                require('postcss-import')({ root: loader.resourcePath }),
                                require('postcss-preset-env')(),
                                require('cssnano')()
                            ]
                        }
                    }
                ]
            },
            {
                test: /\.(png|jpg|gif)$/,
                use: {
                    loader: 'url-loader', // url-loader是基于file-loader使用
                    options: {
                        limit: 8192, // 8 * 1024 = 8 kb   8kb以下的图片会被base64处理
                        outputPath: 'images', // 决定图片的输出路径 （output.path + outputPath）
                        name: '[hash:10].[ext]', // 名称  hash:10 取前面10位hash值  ext 自动补全文件扩展名（文件之前是怎么样的扩展名，之后就是怎么样的）
                    }
                }
            },
            {
                test: /\.(eot|svg|ttf|woff)$/,
                loader: 'file-loader', // 将文件原封不动输出出去
                options: {
                    name: '[hash:10].[ext]',
                    outputPath: 'media'
                }
            }
        ]
    },
    resolve:{

        extensions: [".js", ".jsx" ,".json", ".less" , ".ts", ".tsx"] // 自动解析文件扩展名
    },
    performance: {
        hints: false // 不提示性能问题
    },
    optimization: {
        splitChunks: {
            chunks: 'all',
            name:false,
        },
        // Keep the runtime chunk separated to enable long term caching
        // https://twitter.com/wSokra/status/969679223278505985
        runtimeChunk: {
            name: entrypoint => `runtime-${entrypoint.name}`,
        },
    },
}
