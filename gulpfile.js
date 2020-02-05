var gulp = require('gulp');
var browserSync = require('browser-sync').create();
var useref = require('gulp-useref');
var gulpif = require('gulp-if');
var terser = require('gulp-terser');
var minifyCss = require('gulp-csso');
var imagemin = require('gulp-pngquant');
var cache = require('gulp-cache');
var image = require('gulp-image');
var postcss = require('gulp-postcss');
var autoprefixer = require('autoprefixer');
var cssnext = require('cssnext');
var cssnano = require('cssnano');
var pxtorem = require('postcss-pxtorem');
var htmlmin = require('gulp-htmlmin');


gulp.task('allfiles', function () {
   var processors = [
    autoprefixer,
    pxtorem({rootValue: 16, propList: ['*', '!width', '!height']}),
    cssnext, 
    cssnano
 ];
    return gulp.src('app/*.html')
        .pipe(useref())
        .pipe(gulpif('*.js', terser()))
        .pipe(gulpif('*.css', postcss(processors)))
        .pipe(gulp.dest('./'));
});

gulp.task('otherfiles', () => {
     var processors = [
    autoprefixer,
    pxtorem({rootValue: 16, propList: ['*']}),
    cssnext, 
    cssnano
 ];
  return gulp.src('app/css/style_dark.min.css')
    .pipe(postcss(processors))
    .pipe(gulp.dest('./css'));
});

gulp.task('html-min', () => {
  return gulp.src('*.html')
    .pipe(htmlmin({ preserveLineBreaks: true, collapseWhitespace: true, removeComments: true, removeEmptyAttributes: true, minifyJS: true }))
    .pipe(gulp.dest('./'));
});


gulp.task('minify', gulp.series('allfiles', 'otherfiles', 'html-min'));

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

    gulp.watch("app/images").on('change', () => {
      browserSync.reload();
      done();
    });
    gulp.watch("app/css/*.css").on('change', () => {
      browserSync.reload();
      done();
    });
    gulp.watch("app/js/*.js").on('change', () => {
      browserSync.reload();
      done();
    });
    gulp.watch("app/*.html").on('change', () => {
      browserSync.reload();
      done();
    });

    done();
});
