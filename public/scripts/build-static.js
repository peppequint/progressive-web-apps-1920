const gulp = require('gulp');
const concat = require('gulp-concat');

return gulp
.src(['./public/src/manifest.json','./public/src/service-worker.js', './public/src/img/**/*.*'])
.pipe(gulp.dest('./public/static/'));
