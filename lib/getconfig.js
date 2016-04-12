var path = require('path');
var Webpack = require('webpack');
var webpackDevMiddleware = require('webpack-dev-middleware');
// var LessPluginCleanCSS = require('less-plugin-clean-css');
// var ExtractTextPlugin = require('extract-text-webpack-plugin');
var ROOT_PATH = path.resolve(__dirname);
// EMSGetContext().environment === 'production'
function getConfig(req, res, next) {
	var filePath = req.path;
	console.log("req.pat:", filePath);
	// if (/demo(\/|\\)[^\/\\]+\.js$/.test(filePath) || /(\/|\\)[p|pages](\/|\\)[^\/\\]+(\/|\\)index\.js$/.test(filePath)) {
	if (/((\/p\/)|(\\p\\))[\s\S]*index\.js$/.test(filePath)) {
		var currentBase = process.cwd();
		var entryDir = 'src';
		var outputDir = 'build';

		var context = path.isAbsolute(entryDir) ? entryDir : path.join(currentBase, entryDir);
		// outputDir = path.isAbsolute(outputDir) ? outputDir : path.join(currentBase, outputDir);
		if(path.isAbsolute(outputDir)){
			outputDir = path.resolve(currentBase, outputDir);
		}
		var entryObj = {};
		// pageFile: p/h5list/index.js
		// pageName: p/h5list/index 去掉.js的后缀
		// pageFile = path.relative(entryDir, filePath);
		pageFile = filePath;
		var pageName = pageFile.substring(0, pageFile.length - 3);
		entryObj[pageName] = '.' + pageName + '.js';

		console.log('currentBase:', currentBase);
		console.log('pageName:', pageName);
		console.log(entryObj);
		console.log(outputDir);

		var _config = {
			// 定义全集load 目录; 吧node_modules目录加入到require中;
			// root: [context, currentBase + '/node_modules'],
			entry: entryObj,
			output: {
				path: outputDir,
				filename: '[name].js'
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
				extensions: ['', '.js', '.json', '.html']
			},

			plugins: [
				new Webpack.NoErrorsPlugin()
			]
		};

		_config.devtool = '#inline-source-map';

		var complier = Webpack(_config);
		// var wdm = 
		return new webpackDevMiddleware(complier, {
			publicPath: currentBase + '/build/'
		});
	}

	next()
}

module.exports = getConfig;