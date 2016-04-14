var path = require('path');
var Webpack = require('webpack');
var webpackDevMiddleware = require('webpack-dev-middleware');

var currentBase = process.cwd();
var entryDir = 'src';
var outputDir = 'build';
var context = path.isAbsolute(entryDir) ? entryDir : path.join(currentBase, entryDir);

module.exports = {
	// 定义全集load 目录; 吧node_modules目录加入到require中;
	root: [context, currentBase + '/node_modules'],
	entry: {
		'p/index': './src/p/index.js'
	},
	output: {
		path: 'build',
		filename: '[name].js'
	},
	// webpack server 相关配置
	devServer: {
		historyApiFallback: true,
		hot: true,
		inline: true,
		progress: true,
	},

	module: {
		loaders: [{
			test: /\.js$/,
			loaders: ["babel"],
			exclude: /node_modules/
		}, {
			test: /\.less$/,
			loader: "style!css!less"
		}, {
			test: /\.(woff|eot|ttf)$/i,
			loader: 'url?limit=10000&name=fonts/[hash:8].[name].[ext]'
		}]
	},

	resolve: {
		//require时候自动补全扩展名;
		extensions: ['', '.js', '.json']
	},

	plugins: [
		new Webpack.NoErrorsPlugin()
	]
};