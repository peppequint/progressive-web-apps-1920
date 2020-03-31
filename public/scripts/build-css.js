const gulp = require('gulp');
const concat = require('gulp-concat');
const clean = require('gulp-clean-css');

return gulp
  .src('./public/src/css/*.css')
  .pipe(concat('index.css'))
  .pipe(clean())
  .pipe(gulp.dest('./public/static/'));
