'use strict';
var gulp = require('gulp');
var sass = require('gulp-sass');
var concat = require('gulp-concat');
var minifyCss = require('gulp-minify-css');
var rename = require('gulp-rename');
var browserSync = require('browser-sync').create();
var sourcemaps = require('gulp-sourcemaps');
var autoprefixer = require('gulp-autoprefixer');

var paths = {
  sass: ['./app/scss/**/*.scss'],
  main: ['./app/sass/main.scss']
};


gulp.task('sass', function(done) {
  gulp.src('./app/scss/main.scss')
    .pipe(sourcemaps.init())
      .pipe(sass())
      // .pipe(autoprefixer())
      .on('error', sass.logError)
      // .pipe(gulp.dest('./app/css/'))
      // .pipe(minifyCss({
        // keepSpecialComments: 0
      // }))
      // .pipe(rename({ extname: '.min.css' }))
      .pipe(sourcemaps.write('.'))
      .pipe(gulp.dest('./app/css/'))
      .on('end', done)
      .pipe(browserSync.stream());
});

gulp.task('watch', ['sass'], function() {
  gulp.watch(paths.sass, ['sass']);
  gulp.watch(paths.main, ['sass'])
});

gulp.task('serve', ['sass'], function () {
  browserSync.init({
    server: "./app"
  });
  gulp.watch(paths.sass, ['sass']).on('change', browserSync.reload);
  gulp.watch(paths.main, ['sass']).on('change', browserSync.reload);
  gulp.watch("app/*.html").on('change', browserSync.reload);
  gulp.watch("app/views/*.html").on('change', browserSync.reload);

});

gulp.task('default', ['serve']);
