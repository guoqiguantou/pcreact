/**
 * 产品模式下的webpack配置
 *
 * 注意。两种模式的配置有较大差异！！
 */
var path = require('path');
var webpack = require('webpack');

var HtmlWebpackPlugin = require('html-webpack-plugin');// webpack中生成HTML的插件，

//主题处理
const pkg = require(path.resolve(__dirname, 'package.json'));
var theme = {};
if (pkg.theme && typeof(pkg.theme) === 'string') {
    var cfgPath = path.resolve(__dirname, pkg.theme);
    const getThemeConfig = require(cfgPath);
    theme = getThemeConfig();
} else if (pkg.theme && typeof(pkg.theme) === 'object') {
    theme = pkg.theme;
}

module.exports = {
    entry: {
        // 文件入口配置
        index: './src/index',
        vendor: [
            'react',
            'react-dom',
            'react-router'
        ]
        // 为了优化，切割代码，提取第三方库（实际上，我们将会引入很多第三方库）
    },
    // 页面入口文件配置

    output: {
        // 文件输出配置
        chunkFilename: '[name].[chunkhash:8].chunk.js',
        path: path.join(__dirname, 'dist'),
        // 输出目录的配置，模板、样式、脚本、图片等资源的路径配置都相对于它.

        publicPath: '/',
        // 模板、样式、脚本、图片等资源对应的server上的路径

        filename: 'bundle.js'
        // 命名生成的JS
    },

    plugins: [
        new webpack.optimize.OccurrenceOrderPlugin(),
        // webapck 会给编译好的代码片段一个id用来区分
        // 而这个插件会让webpack在id分配上优化并保持一致性。
        // 具体是的优化是：webpack就能够比对id的使用频率和分布来得出最短的id分配给使用频率高的模块

        new webpack.optimize.UglifyJsPlugin({
            // 压缩代码
            compressor: {
                warnings: false,
                drop_debugger: true,
                drop_console: true
            }
        }),

        new webpack.DefinePlugin({
            'process.env.NODE_ENV': JSON.stringify('production'),
            __DEV__: false
        }),
        // 很多库的内部，有process.NODE_ENV的判断语句，
        // 改为production。最直观的就是没有所有的debug相关的东西，体积会减少很多

        new webpack.optimize.CommonsChunkPlugin({name: 'vendor', filename: 'vendor.js'}),
        // 'vendor' 就是把依赖库(比如react react-router, redux)全部打包到 vendor.js中
        // 'vendor.js' 就是把自己写的相关js打包到bundle.js中
        // 一般依赖库放到前面，所以vendor放第一个

        new HtmlWebpackPlugin({
            template: 'src/index.html',
            // html模板的路径

            title: '产品模式',

            filename: 'index.html',
            // 文件名以及文件将要存放的位置

            favicon: './src/favicon.ico',
            // favicon路径

            inject: 'body',
            // js插入的位置，true/'head'  false/'body'

            chunks: ['vendor', 'index'],
            // 指定引入的chunk，根据entry的key配置，不配置就会引入所有页面的资源

            hash: true,
            // 这样每次客户端页面就会根据这个hash来判断页面是否有必要刷新
            // 在项目后续过程中，经常需要做些改动更新什么的，一但有改动，客户端页面就会自动更新！

            minify: {
                // 压缩HTML文件
                removeComments: true,
                // 移除HTML中的注释

                collapseWhitespace: true
                // 删除空白符与换行符
            }
        }),
        new webpack.LoaderOptionsPlugin({
            options: {
                context: __dirname,
                postcss: [
                    require('precss'),
                    require('autoprefixer')
                ]
            }
        })
    ],

    resolve: {
        extensions: ['.web.js', '.js', '.json'],

        // 路径别名, 懒癌福音，别名只能在.js文件中使用。
        alias: {
            js: path.resolve(__dirname, 'src/js'),//代码根目录
            style: path.resolve(__dirname, 'src/styles'),//通用样式根目录
            images: path.resolve(__dirname, 'src/images'),//图片根目录
        }
    },

    module: {
        rules: [
            {
                test: /\.js$/,
                use: ['babel-loader'],
                exclude: /node_modules/
            },
            {
                test: /\.css$/,
                use: [
                    'style-loader',
                    'css-loader',
                    'postcss-loader'
                ]
            },
            {
                test: /\.scss$/,
                include: path.resolve(__dirname, 'src/js'),
                use: [
                    'style-loader',
                    'css-loader?modules&minimize&importLoaders=1&localIdentName=[path][local]___[hash:base64:5]',
                    'postcss-loader?parser=postcss-scss'
                ]
            },
            // 组件样式，需要私有化，单独配置

            {
                test: /\.scss$/,
                include: path.resolve(__dirname, 'src/styles'),
                use: [
                    'style-loader',
                    'css-loader?minimize',
                    'postcss-loader?parser=postcss-scss'
                ]
            },
            {
                test: /.less$/,
                include: path.resolve(__dirname, 'node_modules'),
                use: [
                    'style-loader',
                    'css-loader',
                    'postcss-loader',
                    'less-loader?{"sourceMap":true,"modifyVars":' + JSON.stringify(theme) + '}'
                ]
            },
            // 公有样式，不需要私有化，单独配置
            {
                test: /\.(otf|eot|ttf|woff|woff2).*$/,
                use: ['url-loader?limit=10000']
            },
            {
                test: /\.(gif|jpe?g|png|ico)$/,
                loader: 'url-loader',
                options: {
                    limit:10000,
                    name: 'images/[path][name].[ext]'
                }
            },
            {
                test: /\.(svg)$/i,
                loader: 'svg-sprite-loader',
                exclude: /node_modules/
            }
        ]
    }
};