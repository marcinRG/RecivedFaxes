'use strict';
var gulp = require('gulp');
var $ = require('gulp-load-plugins')({lazy: true});
var source = require('vinyl-source-stream');
var browserify = require('browserify');
var del = require('del');

var settings = require('./gulp/settings.gulp');

//kompilacja css z less
gulp.task('less-compile', ['clean-styles'], function () {
    msg('Kompilacja plików less -> css');
    return gulp.src(settings.paths.lessStyles)
        .pipe($.plumber())
        .pipe($.less())
        .pipe($.autoprefixer({browsers: ['last 3 version', '> 3%']}))
        .pipe(gulp.dest(settings.paths.cssFolder));
});

//injectowanie plików css do index.html
gulp.task('inject-css', function () {
    return gulp.src(settings.paths.index)
        .pipe($.inject(gulp.src(settings.paths.cssFile, {read: false}), {relative: true}))
        .pipe(gulp.dest(settings.paths.client));
});

gulp.task('browserify-inject-js', ['browserify'], function () {
    return gulp.src(settings.paths.index)
        .pipe($.inject(gulp.src(settings.paths.compiledJs, {read: false}), {relative: true}))
        .pipe(gulp.dest(settings.paths.client));
});

gulp.task('browserify', function () {
    return browserify(settings.paths.jsFile)
        .bundle()
        .pipe(source(settings.paths.compiledJs))
        .pipe(gulp.dest('./'));
});

gulp.task('code-check', function () {
    return gulp.src(settings.paths.allJs)
        .pipe($.jscs({configPath: './.jscsrc'}))
        .pipe($.jscs.reporter())
        .pipe($.jshint())
        .pipe($.jshint.reporter('jshint-stylish'));
});

gulp.task('tests', function () {

});

gulp.task('help', $.taskListing);
gulp.task('default', ['help']);

gulp.task('clean-styles', function (done) {
    var files = settings.paths.cssFolder + '*.css';
    clean(files, done);
});

gulp.task('less-watcher', function () {
    gulp.watch(settings.paths.lessStyles, ['less-compile', 'inject-css']);
});

gulp.task('js-watcher', function () {
    gulp.watch(settings.paths.jsAppFiles, ['browserify-inject-js']);
});

gulp.task('server-dev', function () {
    var isDev = true;
    var nodeOptions = {
        script: settings.server.serverApp,
        delay: 1,
        env: {
            'PORT': settings.server.port,
            'NODE_ENV': isDev ? 'dev' : 'build'
        },
        watch : settings.server.serverFiles
    };
    return $.nodemon(nodeOptions);
});


function clean(path, done) {
    $.util.log('Czyszczenie folderu:' + $.util.colors.blue(path));
    del(path).then(function () {
        done()
    });
}

function msg(txt) {
    $.util.log($.util.colors.blue(txt));
}
