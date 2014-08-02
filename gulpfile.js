var gulp = require('gulp');
var jade = require('gulp-jade');
var rjs = require('gulp-requirejs');
var clean = require('gulp-clean');

gulp.task('templates', function() {
    gulp.src(['./*.jade'])
        .pipe(jade({
            pretty: true
        }))
        .pipe(gulp.dest('./'));
});

// gulp.task('requirejs', function(){
//     rjs({
//         baseUrl: './js/page/index.js',
//         out: './build/js/page/index.js'
//     })
//         .pipe(gulp.dest('./build/'));
// });

gulp.task('watch', function(){
    gulp.watch(['./*.jade', './include/*.jade'], ['templates']);
});

gulp.task('clean', function(){
    return gulp.src(['dist/*'], {read:false})
    .pipe(clean());
});
gulp.task('build',['clean'], function(){
    gulp.src([
            './*.html',
            './css/*/*',
            './js/*/*',
            './images/*'
        ], { base: './' })
        .pipe(gulp.dest('dist'));
});

gulp.task('default', ['templates', 'watch']);