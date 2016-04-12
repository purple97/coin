var http = require('http');
var path = require('path');
var fs = require('fs');
var express = require('express');
//var Webpack = require('webpack');
//var webpackDevMiddleware = require('webpack-dev-middleware');
var GetCatalog = require('./getCatalog.js'); // 获取并展示目录结构 中间件
var myConfig = require('./getconfig.js');
var rootPath = process.cwd();
var app = new express();
var port = 4445;


app.use(myConfig);
app.use('/', GetCatalog);
app.use(express.static(rootPath));

var server = app.listen(port, function() {
	console.log('Example app listening at http://127.0.0.0:'+port);
});