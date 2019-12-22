var gulp = require('gulp');
var browserSync = require('browser-sync').create();
var useref = require('gulp-useref');
var gulpif = require('gulp-if');
var terser = require('gulp-terser');
var minifyCss = require('gulp-csso');
var imagemin = require('gulp-pngquant');
var cache = require('gulp-cache');
var image = require('gulp-image');
 


gulp.task('allfiles', function () {
    return gulp.src('app/*.html')
        .pipe(useref())
        .pipe(gulpif('*.js', terser()))
        .pipe(gulpif('*.css', minifyCss()))
        .pipe(gulp.dest('./'));
});

gulp.task('otherfiles', () => {
  return gulp.src('app/css/style_dark.min.css')
    .pipe(minifyCss())
    .pipe(gulp.dest('./css'));
});

gulp.task('minify', gulp.parallel('allfiles', 'otherfiles'));

gulp.task('min-imgs', function(){
  return gulp.src('app/images/**/*.+(png|jpg|jpeg|gif|svg)')
  .pipe(cache(image()))
  .pipe(gulp.dest('./images'))
});

gulp.task('clear', () =>
    cache.clearAll()
);




gulp.task('watch', function(done) {

    browserSync.init({
        server: "app/"
    });

    gulp.watch("app/images");
    gulp.watch("app/css/*.css");
    gulp.watch("app/js/*.js");
    gulp.watch("app/*.html").on('change', () => {
      browserSync.reload();
      done();
    });

    done();
});
