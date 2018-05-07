//此处代码都是由node执行
//载入gulp模块
var gulp = require('gulp');
//载入less编译模块
var less = require('gulp-less');
var path = require('path');
//载入css压缩模块
var cleanCss = require('gulp-clean-css');
//载入创建本地服务器模块
var connect = require('gulp-connect');
//载入文件合并模块
var concat = require('gulp-concat');
//载入js压缩混淆模块
var uglify = require('gulp-uglify');
//载入html压缩模块
var htmlmin = require('gulp-htmlmin')

//注册一个任务
gulp.task('copy',function(){
    //当gulp执行copy任务时，会自动执行该函数
    gulp.src('src/index.html')//取文件
        .pipe(gulp.dest('dist/')/*文件传输的目的文件夹dist*/)//pipe将此处需要的操作传递进去
})

gulp.task('watch',function(){
    gulp.watch('src/index.html',['copy']);//当src下index.html文件发生变化时，就执行copy任务 
    gulp.watch('src/styles/*.less',['style']);//当src/styles下所有less文件发生变化时，就执行style任务
})

gulp.task('style',function(){
    gulp.src(['src/styles/*.less','!src/styles/_*.less'])//在demo.less里导包，然后采用这种方式也可以进行文件合并
        .pipe(less({
            paths: [ path.join(__dirname, 'less', 'includes') ]
          }))
        .pipe(cleanCss())
        .pipe(gulp.dest('dist/css/'));
})

gulp.task('connect', function() {
    connect.server({
        port:3000
    });
  });

gulp.task('concat',function(){
    gulp.src('src/styles/*.less')
        .pipe(concat('all.less'))
        .pipe(less())
        .pipe(cleanCss())
        .pipe(gulp.dest('dist/css/'))
})

//js文件的合并、压缩、混淆
gulp.task('js',function(){
    gulp.src('src/script/*.js')
        .pipe(concat('all.js'))
        .pipe(uglify())
        .pipe(gulp.dest('dist/script/'))
})

//图片的复制
gulp.task('image',function(){
    gulp.src('src/images/*.*')
        .pipe(gulp.dest('dist/images/'))
})

//载入html压缩模块
var htmlmin = require('gulp-htmlmin')
//html的压缩
gulp.task('html',function(){
    gulp.src('src/*.html')
        .pipe(htmlmin({collapseWhitespace: true}))
        .pipe(gulp.dest('dist/'))
})