var gulp      = require('gulp');

var jade      = require('gulp-jade');
var rjs       = require('gulp-requirejs');
var clean     = require('gulp-clean');
var jshint    = require('gulp-jshint');
var minifycss = require('gulp-minify-css');
var concat    = require('gulp-concat');
var uglify    = require('gulp-uglify');

// 编译jade
gulp.task('templates', function() {
    gulp.src(['./*.jade'])
        .pipe(jade({
            pretty: true
        }))
        .pipe(gulp.dest('./'));
});

// 监听jade修改，开发时用
gulp.task('templatesWatch', function(){
    gulp.watch([
            './*.jade',
            './include/*.jade'
        ], ['templates']);
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
            './js/global/*',
            './js/module/*',
            './js/page/*',
        ])
        .pipe(jshint())
        .pipe(jshint.reporter());
});

// 清理dist目录
gulp.task('clean', function(){
    return gulp.src(['dist'], {read:false})
    .pipe(clean());
});

// 复制HTML和图片
gulp.task('htmlimg', ['clean'], function(){
    gulp.src([
            './*.html',
            './images/*'
        ], { base: './' })
        .pipe(gulp.dest('dist'));
});

// 压缩合并css
gulp.task('css', ['clean'], function(){
    gulp.src('./css/*/*.css', { base: './' })
        .pipe(minifycss())
        .pipe(gulp.dest('dist'));

    gulp.src([
            './css/global/reset.css',
            './css/global/common.css',
            './css/module/topbar.css',
            './css/module/header.css',
            './css/footer/header.css'
        ])
        .pipe(minifycss())
        .pipe(concat('global.css'))
        .pipe(gulp.dest('dist/css/global/'));
});

// 压缩css
gulp.task('js', ['clean'], function(){
    gulp.src('./js/*/*.js', { base: './' })
        .pipe(uglify())
        .pipe(gulp.dest('dist'));
});

// 开发
gulp.task('default', ['templates', 'watch']);
// 测试
gulp.task('test', ['lint']);
// 打包发布
gulp.task('build', ['test', 'htmlimg', 'css', 'js']);
