var gulp = require('gulp');
var es = require('event-stream');

var concat = require('gulp-concat');
var sourcemaps = require('gulp-sourcemaps');
var uglify = require('gulp-uglify');
var minifyCss = require('gulp-minify-css');

var shell = require('gulp-shell');
var del = require('del');

var libFiles = {
  js: {
    angular: [
      'app/bower_components/angular/angular.min.js',
      'app/bower_components/angular-ui-router/release/angular-ui-router.min.js',
      'app/bower_components/ngInfiniteScroll/build/ng-infinite-scroll.min.js',
    ],
    ui: [
      'app/bower_components/jquery/dist/jquery.min.js',
      'app/bower_components/semantic/dist/semantic.min.js',
    ],
  },
  css: [
    'app/bower_components/semantic/dist/semantic.min.css',
    'app/bower_components/semantic/dist/components/message.min.css',
  ],
  assets: [
    'app/bower_components/semantic/dist/**/*.woff2',
    'app/bower_components/semantic/dist/**/*.woff',
    'app/bower_components/semantic/dist/**/*.ttf',
  ],
};

var jsFiles = [
  'app/src/**/*.js',
  'app/views/**/*.js',
  'app/config/config.js',
];

var cssFiles = [
  'app/stylesheets/*.css',
];

var buildDest = 'app/build';

function swallowError (error) {
    console.log(error.toString());
    this.emit('end');
}

gulp.task('libs', function() {
  return es.merge([
    gulp.src(libFiles.js.angular)
      .pipe(concat('angulars.min.js'))
      .pipe(gulp.dest(buildDest)),
    gulp.src(libFiles.js.ui)
      .pipe(concat('ui.min.js'))
      .pipe(gulp.dest(buildDest)),
    gulp.src(libFiles.css)
      .pipe(concat('ui.min.css'))
      .pipe(gulp.dest(buildDest)),
    gulp.src(libFiles.assets)
      .pipe(gulp.dest(buildDest)),
  ]);
});

gulp.task('js', function() {
  return gulp.src(jsFiles) // gather all js files
    .pipe(sourcemaps.init()) // set up sourcemaps
    .pipe(concat('app.min.js')) // combine all js into one file
    .on('error', swallowError) // add error handler
    .pipe(uglify()) // minify js
    .pipe(sourcemaps.write()) // write sourcemaps
    .pipe(gulp.dest(buildDest)); // output final file
});

gulp.task('css', function() {
  return gulp.src(cssFiles)
    .pipe(sourcemaps.init())
    .pipe(concat('app.min.css'))
    .pipe(minifyCss())
    .pipe(sourcemaps.write())
    .pipe(gulp.dest(buildDest));
});

gulp.task('build', ['libs', 'js', 'css'], function() {});

gulp.task('watch', ['build'], function() {
  gulp.watch(jsFiles, ['js']);
  gulp.watch(cssFiles, ['css']);
});

gulp.task('clean', function() {
  return del([buildDest + "/**/*"]);
});

gulp.task('deploy', shell.task([
  'sh push-to-ghpages.sh',
]));
