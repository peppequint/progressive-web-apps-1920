const gulp = require('gulp');
const concat = require('gulp-concat');

return gulp
  .src('./public/src/css/*.css')
  .pipe(concat('index.css'))
  .pipe(gulp.dest('./public/static/'));
