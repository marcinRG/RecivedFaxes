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
    return gulp.src(settings.app.lessStyles)
        .pipe($.plumber())
        .pipe($.less())
        .pipe($.autoprefixer({browsers: ['last 3 version', '> 3%']}))
        .pipe(gulp.dest(settings.app.cssFolder));
});

//injectowanie plików css do index.html
gulp.task('inject-css', ['less-compile'], function () {
    return gulp.src(settings.app.index)
        .pipe($.inject(gulp.src(settings.app.cssFile, {read: false}), {relative: true}))
        .pipe(gulp.dest(settings.app.client));
});

gulp.task('browserify-inject-js', ['browserify-compil'], function () {
    return gulp.src(settings.app.index)
        .pipe($.inject(gulp.src(settings.app.compiledJs, {read: false}), {relative: true}))
        .pipe(gulp.dest(settings.app.client));
});

gulp.task('browserify-compil', ['code-check'], function () {
    return browserify(settings.app.jsFile)
        .bundle()
        .pipe(source(settings.app.compiledJs))
        .pipe(gulp.dest('./'));
});

gulp.task('code-check', function () {
    return gulp.src(settings.app.allJs)
        .pipe($.jscs({configPath: './.jscsrc'}))
        .pipe($.jscs.reporter())
        .pipe($.jshint())
        .pipe($.jshint.reporter('jshint-stylish'));
});

gulp.task('build-dev', ['browserify-inject-js', 'inject-css'], function () {
});

gulp.task('tests', function (done) {
    var Server = require('karma').Server;
    new Server({
        configFile: __dirname + '/karma.conf.js'
    }, testCompleted).start();

    function testCompleted(results) {
        msg('Testy zakończone');
        if (results === 1) {
            done('Zakończone bledem');
        }
        else {
            done();
        }
    }
});

gulp.task('help', $.taskListing);
gulp.task('default', ['help']);

gulp.task('clean-styles', function (done) {
    var files = settings.app.cssFolder + '*.css';
    clean(files, done);
});

gulp.task('less-watcher', function () {
    gulp.watch(settings.app.lessStyles, ['less-compile', 'inject-css']);
});

gulp.task('js-watcher', function () {
    gulp.watch(settings.app.jsAppFiles, ['browserify-inject-js']);
});

gulp.task('serve-build', ['build-create'], function () {
    serve(false);
});

gulp.task('serve-dev', ['build-dev'], function () {
    serve(true);
});

gulp.task('build-prepare', ['build-dev'], function (done) {
    var files = settings.build.path;
    clean(files, done);
});

gulp.task('build-create', ['copyToBuild-css'], function () {
});

gulp.task('copyToBuild-css', ['copyToBuild-fonts'], function () {
    msg('Kopiowanie arkusza stylów');
    return gulp.src(settings.app.cssFile)
        .pipe($.plumber())
        .pipe($.csso())
        .pipe(gulp.dest(settings.build.cssPath));
});

gulp.task('copyToBuild-js', ['build-prepare'], function () {
    msg('Kopiowanie skryptu');
    return gulp.src(settings.app.compiledJs)
        .pipe($.uglify())
        .pipe(gulp.dest(settings.build.jsPath));
});

gulp.task('copyToBuild-fonts', ['copyToBuild-images'], function () {
    msg('Kopiowanie fontów');
    return gulp.src(settings.app.fontsSrc)
        .pipe(gulp.dest(settings.build.fontsPath));
});

gulp.task('copyToBuild-images', ['copyToBuild-mainPage'], function () {
    msg('Kopiowanie obrazów');
    return gulp.src(settings.app.imageSrc)
        .pipe(gulp.dest(settings.build.imagesPath));
});

gulp.task('copyToBuild-mainPage', ['copyToBuild-js'], function () {
    msg('Kopiowanie index.html');
    return gulp.src(settings.app.index)
        .pipe(gulp.dest(settings.build.path));
});

function clean(path, done) {
    $.util.log('Czyszczenie folderu:' + $.util.colors.blue(path));
    del(path).then(function () {
        done();
    });
}

function msg(txt) {
    $.util.log($.util.colors.blue(txt));
}

function serve(isDev) {
    var nodeOptions = {
        script: settings.server.serverApp,
        ext : 'js',
        delay: 2500,
        env: {
            'PORT': settings.server.port,
            'NODE_ENV': isDev ? 'dev' : 'build'
        },
        watch: settings.server.serverFiles
    };
    return $.nodemon(nodeOptions)
        .on('start', function () {
            msg('...start servera ...');
        })
        .on('restart', function () {
            msg('...restart servera...');
        })
        .on('exit', function () {
        })
        .on('crash', function () {
            msg('!!!Wystąpiły bęłdy');
        });
}
