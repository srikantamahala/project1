var gulp = require('gulp');
var concat = require('gulp-concat');
var uglify = require('gulp-uglify');

gulp.task("alertt", function(){
   console.log("alert i m coming");
});

//var less = require('gulp-less');
var path = require('path');
 
gulp.task('less', function () {
  return gulp.src('this/style.less')
    .pipe(less())
    .pipe(gulp.dest('public'));
});

var jsFiles = 'js/**/*.js',  
    jsDest = 'djs';

gulp.task('scripts', function() {  
    return gulp.src(jsFiles)
        .pipe(concat('scripts.js'))
        //.pipe(uglify())
        .pipe(gulp.dest(jsDest));
});
