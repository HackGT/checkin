var gulp = require('gulp');
var concat = require('gulp-concat');
var sourcemaps = require('gulp-sourcemaps');
var uglify = require('gulp-uglify');

var jsFiles = ['app/src/**/*.js', 'app/views/**/*.js'];

function swallowError (error) {
    console.log(error.toString());
    this.emit('end');
}

gulp.task('js', function() {
  return gulp.src(jsFiles) // gather all js files
    .pipe(sourcemaps.init()) // set up sourcemaps
    .pipe(concat('app.js')) // combine all js into one file
    .on('error', swallowError) // add error handler
    .pipe(uglify()) // minify js
    .pipe(sourcemaps.write()) // write sourcemaps
    .pipe(gulp.dest('app/build')); // output final file
});

gulp.task('build', ['js'], function() {});

gulp.task('watch', ['js'], function() {
  gulp.watch(jsFiles, ['js']);
});
