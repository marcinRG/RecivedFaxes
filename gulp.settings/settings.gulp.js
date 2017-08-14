'use strict';

var devFolder = './src/';

var lessFolder = devFolder + 'less/';
var jsAppFolder = devFolder + 'js/app/';
var cssFolder = devFolder + 'css/';

var serverFolder = './server/';
var buildPath = './build/';

var paths = {
    client: './src/',
    cssFolder: cssFolder,
    cssStyles: [cssFolder + '**/*.css'],
    cssFile: cssFolder + 'style.css',
    index: devFolder + 'index.html',

    allJs: ['./*.js', serverFolder + '**/*.js', jsAppFolder + '**/*.js'],
    jsAppFiles: [jsAppFolder + '**/*.js'],
    jsFile: jsAppFolder + 'app.js',
    compiledJs: devFolder + 'bundle.js',
    fontsSrc: devFolder + 'fonts/**/*.*',
    imageSrc: devFolder + 'images/**/*.*',


    lessStyles: [lessFolder + '*.less'],
    lessFile: lessFolder + 'style.less'
};

var build = {
    path: buildPath,
    cssPath: buildPath + 'css',
    jsPath: buildPath + 'js',
    fontsPath: buildPath + 'fonts',
    imagesPath: buildPath + 'images'
};

var server = {
    serverApp: serverFolder + 'server.js',
    serverFiles: [serverFolder + 'server.js', serverFolder + '**/*.js'],
    port: 4580
};

module.exports = {
    app: paths,
    server: server,
    build: build
};
