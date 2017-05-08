/**
 * @fileOverview
 * @author dezhao
 */


var fs = require('fs');
var inquirer = require('inquirer');
var commander = require('commander');
var appInfo = require('./../package.json');
var webServer = require('./../lib/server');
var path = require('path');
var colors = require('cli-color');
var errorRed = colors.red;
var successGreen = colors.green;
var warnYellow = colors.yellow;
var infoBlue = colors.blue;
var dependencies = ' webpack gulp gulp-uglify del gulp-jshint gulp-inline-source gulp-htmlmin gulp-inline-css gulp-replace jshint underscore gulp-util cli-color br-bid react react-dom redux react-redux redux-thunk';

var Promise = require('promise');
var write = Promise.denodeify(fs.writeFile);
var co = require('co');
var urllib = require('urllib');
var buildInfos = require('../lib/util/getEntry')(null);



commander
    .allowUnknownOption() //不报错误
    .usage('FEDTools前端开发工具')
    .option('-q, --quiet', '安静模式')
    .option('-r, --react', '初始化react工程')
    .action(function(cmd, options) {
        console.log(" _____ _____ ____ _____           _     ");
        console.log("|  ___| ____|  _ \\_   _|__   ___ | |___ ");
        console.log("| |_  |  _| | | | || |/ _ \\ / _ \\| / __|");
        console.log("|  _| | |___| |_| || | (_) | (_) | \\__ \\");
        console.log("|_|   |_____|____/ |_|\\___/ \\___/|_|___/");
    }).parse(process.argv);


commander
    .command('dev')
    .alias('d')
    .description('进行开发')
    .option('-p, --port [type]', '监听端口', '5555')
    .action(function(cmd, options) {
        console.log(cmd, options);
        console.log(successGreen('开启开发者模式'));
        /*webServer.start({
            port: program.args[0].port,
            queit: program.quiet
        });*/

        //gitTools.setConfigVersion(); // 检测git分支，设置config.version

    }).on('--help', function() {
    console.log('  举个栗子:');
    console.log('');
    console.log('    bid dev,开启本地开发者模式');
    console.log('    bid dev -p|--port [端口号]   :   指定端口号');
    console.log('');
    process.exit(1);
});

commander
    .command('build')
    .alias('b')
    .description('进行构建')
    .option('-a, --buildall', '根据build全部页面')
    .option('-d, --publishdaily', '构建并发布发布日常')
    .option('-p, --publishpre', '构建并发布发布ali云预发服务器')
    .option('-o, --publishonline', '构建并发布发布ali云[线上]服务器')
    .action(function(cmd, options) {
        var commands = 'gulp build';
        var inquirerParams = [];
        var entrySet = {
            jsEntry: {},
            htmlEntry: [] // 为空时将迁移全部html
        };
        var getInquirerBuild = function () { // 根据 -a 参数判断对哪些页面进行构建
            inquirerParams.push({
                type: 'checkbox',
                name: 'selectedEntry',
                message: '请选择需要进行构建的页面:',
                choices: buildInfos.autoGetHtml.keys
            });
        };

        getInquirerBuild();

        inquirer.prompt(inquirerParams).then(function (answers) {
            //entrySet.userName = answers.userName ? answers.userName : null;
            if (!program.args[0].buildall) { // 通过选择进行build
                answers.selectedEntry.forEach(function (se, index) {
                    for (var htmlKey in buildInfos.autoGetHtml.jsEntry) {
                        if (htmlKey.split(se).length > 1) {
                            var tmpSrc = './' + htmlKey + '.html';
                            /*if (userConfig.version) {
                             tmpSrc = tmpSrc.replace(userConfig.version + '/', '');
                             }*/
                            if (buildInfos.autoGetHtml.jsEntry[htmlKey]) {
                                entrySet.jsEntry[htmlKey] = buildInfos.autoGetHtml.jsEntry[htmlKey];
                            }

                            entrySet.htmlEntry.push(tmpSrc);
                            return true;
                        }
                    }
                });
            } else { // buildall 自动根据匹配规则（匹配所有src/p/**/index.js）寻找JS入口文件并打包
                entrySet.jsEntry = buildInfos.autoGetEntry;
            }
        });
    }).on('--help', function() {
    console.log('  举个栗子:');
    console.log('');
    process.exit(1);
});