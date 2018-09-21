/**
 * 开发模式下的webpack配置
 * 在整个项目开发过程中，几乎99%的时间都是在这个模式下进行的
 * 注意。两种模式的配置有较大差异！！
 */

const path = require('path');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');

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
    devtool: 'cheap-module-eval-source-map', // more info:https://webpack.github.io/docs/build-performance.html#sourcemaps and https://webpack.github.io/docs/configuration.html#devtool
    entry: [
        './src/webpack-public-path',  // 服务器静态资源路径配置，保证首先载入
        'react-hot-loader/patch',
        'webpack-hot-middleware/client?reload=true',
        path.resolve(__dirname, 'src/index.js')
    ],
    target: 'web', // necessary per https://webpack.github.io/docs/testing.html#compile-and-test
    output: {
        chunkFilename: '[name].[chunkhash:8].chunk.js',
        path: `${__dirname}/src`, // Note: Physical files are only output by the production build task `npm run build`.
        publicPath: '/', // 服务器静态资源路径配置
        filename: 'bundle.js'
    },
    externals:{
        'QMap':'qq.maps.Map'
    },
    plugins: [
        new webpack.DefinePlugin({
            'process.env.NODE_ENV': JSON.stringify('development'), // Tells React to build in either dev or prod modes. https://facebook.github.io/react/downloads.html (See bottom)
            __DEV__: true
        }),
        new webpack.HotModuleReplacementPlugin(),
        new webpack.NoEmitOnErrorsPlugin(),
        new HtmlWebpackPlugin({     // Create HTML file that includes references to bundled CSS and JS.
            template: 'src/index.html',
            title: '开发模式',
            favicon: './src/favicon.ico',
            minify: {
                removeComments: true,
                collapseWhitespace: true
            },
            hash: true,
            // 这样每次客户端页面就会根据这个hash来判断页面是否有必要刷新
            // 在项目后续过程中，经常需要做些改动更新什么的，一但有改动，客户端页面就会自动更新！
            inject: 'body'
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
            yun: 'http://massoft-xfz.oss-cn-shanghai.aliyuncs.com'
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
                    'css-loader?modules&importLoaders=1&localIdentName=[path][local]___[hash:base64:5]',
                    'postcss-loader?parser=postcss-scss'
                ]
            },
            // 组件样式，需要私有化，单独配置

            {
                test: /\.scss$/,
                include: path.resolve(__dirname, 'src/styles'),
                use: [
                    'style-loader',
                    'css-loader',
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
                use: ['url-loader']
            },
            {
                test: /\.(gif|jpe?g|png|ico)$/,
                loader: 'url-loader',
                options: {
                    limit:10000,
                    name: '[path][name].[ext]'
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
