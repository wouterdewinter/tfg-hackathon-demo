var gulp = require('gulp');
var sass = require('gulp-sass');
var log = require('fancy-log');
var PluginError = require('plugin-error');
var webpack = require('webpack');

var config = require('./config');

gulp.task('scripts', function(done) {
  webpack(config.webpack, function(error, stats) {
    if (error) throw new PluginError('webpack:build', error);

    log('[webpack:build]', '\n' + stats.toString({
      colors: true
    }));

    done();
  });
});

gulp.task('watch:scripts', function(done) { //eslint-disable-line no-unused-vars
  var watchConfig = { ...config.webpack, watch: true };
  var compiler = webpack(watchConfig);

  compiler.watch({}, function(error, stats) {
    if (error) throw new PluginError('webpack:build', error);

    log('[webpack:build]', stats.toString({
      colors: true
    }));

    log('[webpack:build]', 'Built scripts');
  });
});

gulp.task('styles', function () {
  return gulp.src(config.sass.src)
    .pipe(sass({
      includePaths: config.sass.includePaths
    }).on('error', function(error) {
      throw new PluginError('sass:build', error);
    }))
    .pipe(gulp.dest(config.sass.dest));
});

gulp.task('watch:styles', function () {
  gulp.watch(config.sass.src, ['styles']);
});

gulp.task('build', ['scripts', 'styles']);

gulp.task('watch', ['watch:scripts', 'watch:styles']);
