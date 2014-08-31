var gulp       = require('gulp');
var jade       = require('gulp-jade');
var rjs        = require('gulp-requirejs');
var clean      = require('gulp-clean');
var jshint     = require('gulp-jshint');
var minifycss  = require('gulp-minify-css');
var concat     = require('gulp-concat');
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

// gulp.task('requirejs', function(){
//     rjs({
//         baseUrl: './js/page/index.js',
//         out: './build/js/page/index.js'
//     })
//         .pipe(gulp.dest('./build/'));
// });


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

    gulp.src([
        'src/css/global/reset.css',
        'src/css/global/common.css',
        'src/css/module/topbar.css',
        'src/css/module/header.css',
        'src/css/module/footer.css'
    ])
        .pipe(minifycss())
        .pipe(concat('global.css'))
        .pipe(gulp.dest('build/css/global/'));
});

// 压缩js
gulp.task('js', ['clean'], function() {
    gulp.src('src/js/**/*.js', {base: 'src'})
        .pipe(uglify())
        .pipe(gulp.dest('build'));
});

// 开发
gulp.task('default', ['templates', 'templatesWatch', 'livereload']);
// 测试
gulp.task('test', ['lint']);
// 打包发布
gulp.task('build', ['test', 'jade', 'img', 'css', 'js']);
