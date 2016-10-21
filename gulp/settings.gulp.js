'use strict';

var lessFolder='./src/less/';
var jsAppFolder = './src/js/app/';
var cssFolder = './src/css/';
var serverFolder = './server/';

var paths = {
    client: './src/',
    cssFolder:cssFolder,
    cssStyles: [cssFolder+'**/*.css'],
    cssFile: cssFolder+'style.css',
    index: './src/index.html',

    allJs : './**/*.js',
    jsAppFiles: [jsAppFolder+'**/*.js'],
    jsFile: jsAppFolder+'app.js',
    compiledJs : './src/js/bundle.js',

    lessStyles: [lessFolder+'*.less'],
    lessFile: lessFolder+ 'style.less'
};

var server = {
    serverApp : serverFolder+'./server.js',
    serverFiles: [serverFolder+'**/*.*'],
    port: 4580
};

module.exports = {
    paths: paths,
    server: server
};
