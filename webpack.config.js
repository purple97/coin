/**
 * @fileOverview
 * @author dezhao
 */

var path = require('path');
var Webpack = require('webpack');
var currentBase = process.cwd();
var entryDir = 'src';
var outputDir = 'build/';
var context = path.isAbsolute(entryDir) ? entryDir : path.join(currentBase, entryDir);

var rootPath = path.join(__dirname, '../../'); // bid工具全局root path
var cwdPath = process.cwd(); // 工程项目root path
module.exports = {
    entry: {},
    output: {
        path: path.resolve(currentBase, outputDir),
        filename: '[name].js'
    },
    resolveLoader: {
        root: path.join(__dirname, "./node_modules")
    },
    externals: {
        'zepto': 'webpack-zepto',
        'react': 'react',
        'react-dom': 'react-dom',
        'react-redux': 'react-redux',
        'redux-thunk': 'redux-thunk',
        'redux': 'redux',
        'underscore': 'underscore',
        '@br': path.join(cwdPath, "./src/c/")
    },
    module: {
        loaders: [
            // { test: /\.js?$/, loaders: ['react-hot', 'babel'], exclude: /node_modules/},
            {
                test: /\.jsx$/,
                loader: 'babel-loader!jsx-loader?harmony'
            }, {
                test: /\.js$/,
                loaders: ['babel-loader']
                // exclude: path.join(envPath.rootPath, './node_modules')
            }, {
                test: /\.ejs$/,
                loader: "ejs-loader?variable=data",
                exclude: path.join(rootPath, './node_modules')
            }, {
                test: /\.less$/,
                loader: "style!css!less-loader"
            }, {
                test: /\.css$/,
                loader: 'style-loader!css-loader'
            }, {
                test: /\.(woff|eot|ttf)$/i,
                loader: 'url?limit=10000&name=fonts/[hash:8].[name].[ext]'
            }
        ],
        resolve: {
            root: 'node_modules',
            alias: {
                zepto: 'node_modules/zepto/zepto.min.js',
                underscore: 'node_modules/underscore/underscore-min.js'
            }
        }
    },

    resolve: {
        //require时候自动补全扩展名;
        extensions: ['', '.js', '.json', '.html']
    },

    plugins: [
        //
        new Webpack.DefinePlugin({
            'process.env.NODE_ENV': '"development"'
        }),
        new Webpack.HotModuleReplacementPlugin(),
        new Webpack.NoErrorsPlugin()
    ]
};
