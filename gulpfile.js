var gulp       = require('gulp');
var jade       = require('gulp-jade');
var rjs        = require('requirejs');
var clean      = require('gulp-clean');
var jshint     = require('gulp-jshint');
var minifycss  = require('gulp-minify-css');
var uglify     = require('gulp-uglify');
// var prettify   = require('gulp-html-prettify');
var livereload = require('gulp-livereload');
var imagemin   = require('gulp-imagemin');

// 编译jade
gulp.task('templates', function() {
    gulp.src(['src/*.jade'])
        .pipe(jade({pretty: true}))
        // .pipe(prettify({indent_char: ' ', indent_size: 4}))
        .pipe(gulp.dest('src/'));
});

// 监听jade修改，开发时用
gulp.task('templatesWatch', function() {
    gulp.watch([
        'src/*.jade',
        'src/include/*.jade'
    ], ['templates']);
});

// livereload
gulp.task('livereload', function(){
    var server = livereload();
    gulp.watch('src/**/*.*', function(file){
        server.changed(file.path);
    });
});

// 检验js
gulp.task('lint', function() {
    return gulp.src([
            'src/js/global/*',
            'src/js/module/*',
            'src/js/page/*',
            '!src/js/module/jquery.*.js'
        ])
        .pipe(jshint())
        .pipe(jshint.reporter('jshint-stylish'));
});

// 清理build目录
gulp.task('clean', function() {
    return gulp.src(['build'], {read: false})
        .pipe(clean());
});

// 压缩图片
gulp.task('img', ['clean'], function() {
    gulp.src('src/images/**/*.*', {base: 'src'})
        .pipe(imagemin({
            optimizationLevel: 3,
            progressive: true,
            interlaced: true
        }))
        .pipe(gulp.dest('build'));
});

// 处理jade
gulp.task('jade', ['clean'], function() {
    gulp.src('src/*.jade', {base: 'src'})
        .pipe(jade({pretty: true}))
        .pipe(gulp.dest('build'));
});

// 压缩合并css
gulp.task('css', ['clean'], function() {
    gulp.src('src/css/**/*.css', {base: 'src'})
        .pipe(minifycss())
        .pipe(gulp.dest('build'));
});

// 压缩合并js
gulp.task('js', ['clean'], function() {
    rjs.optimize({
        // 源目录和目标目录
        appDir: 'src/js',
        dir: 'build/js',
        // 默认模块路径
        baseUrl: './module',
        // 需要处理合并的文件
        modules: [
            {
                name: '../global/global'
            }
        ],
        // 自定义模块路径
        paths: {
            'jquery': '../lib/jquery-latest'
        },
        // 被合并后的文件是否删除
        removeCombined: false
    });

});

// 开发
gulp.task('default', ['templates', 'templatesWatch', 'livereload']);
// js语法检查
gulp.task('test', ['lint']);
// 打包发布
gulp.task('build', ['jade', 'img', 'css', 'js']);
