const gulp = require('gulp');
const concat = require('gulp-concat');

return gulp
  .src('./src/css/*.css')
  .pipe(concat('index.css'))
  .pipe(gulp.dest('./static/'));
