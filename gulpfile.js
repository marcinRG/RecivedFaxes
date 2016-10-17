var gulp = require('gulp');
var $ = require('gulp-load-plugins')({lazy: true});
var source = require('vinyl-source-stream');
var browserify = require('browserify');

var settings = require('./gulp/settings.gulp');

//kompilacja css z less
gulp.task('less-compile', function () {
    msg("Kompilacja plików less -> css");
    return gulp.src(settings.paths.lessStyles)
        .pipe($.plumber())
        .pipe($.less())
        .pipe($.autoprefixer({browsers: ['last 3 version', '> 3%']}))
        .pipe(gulp.dest(settings.paths.cssFolder));
});

//injectowanie plików css do index.html
gulp.task('inject-css', function(){
    return gulp.src(settings.paths.index)
        .pipe($.inject(gulp.src(settings.paths.cssStyles, {read: false}), {relative: true}))
        .pipe(gulp.dest(settings.paths.client));
});

gulp.task('browserify-inject-js',['browserify'], function(){
    return gulp.src(settings.paths.index)
        .pipe($.inject(gulp.src(settings.paths.compiledJs, {read: false}), {relative: true}))
        .pipe(gulp.dest(settings.paths.client));
});

gulp.task('browserify', function() {
    return browserify(settings.paths.jsFile)
        .bundle()
        .pipe(source(settings.paths.compiledJs))
        .pipe(gulp.dest('./'));
});

function clean(path) {
    var del = require('del');
    $.util.log('Czyszczenie folderu:' + $.util.colors.blue(path));
    del(path).then(function () {
        msg('Udało się usunąć pliki...');
    });
}

function msg(txt) {
    $.util.log($.util.colors.blue(txt));
}



