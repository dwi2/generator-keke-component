'use strict';
var gulp = require('gulp');
var eslint = require('gulp-eslint');
var notify = require('gulp-notify');
var bower = require('gulp-bower');
var babel = require('gulp-babel');
var concat = require('gulp-concat');
var browserSync = require('browser-sync');
var del = require('del');
var Server = require('karma').Server;
var runSequence = require('run-sequence');

var JS_FILES = ['src/**/*.js'];
var OUTPUT_NAME = 'script.js';
var MODULARIZE_TASK_NAMES = ['common', 'umd', 'amd'];
var createModularizeTask = function(name) {
  var babelOptions = {
    modules: name,
    moduleId: name === 'amd' ? undefined : '<%= capitalizedCamelCaseComponentName %>'
  };
  gulp.task(name, function() {
    return gulp.src(JS_FILES)
      .pipe(babel(babelOptions))
      .pipe(concat(OUTPUT_NAME))
      .pipe(gulp.dest('./dist/' + name))
      .pipe(gulp.dest('./examples/' + name));
  });
};

gulp.task('clean',
  del.bind(null, [
    'examples/lib',
    'bower_components',
    'dist',
    'examples/common',
    'examples/umd',
    'examples/amd'
  ])
);

gulp.task('test', ['compile'], function (done) {
  var server = new Server({
    configFile: __dirname + '/karma.conf.js',
    singleRun: true
    }, done);
  server.start();
});

gulp.task('lint', function() {
  return gulp.src(JS_FILES)
    .pipe(eslint())
    .pipe(eslint.format());
});

MODULARIZE_TASK_NAMES.forEach(function(name) {
  createModularizeTask(name);
});

gulp.task('compile', MODULARIZE_TASK_NAMES, function() {
  return bower().pipe(gulp.dest('examples/lib'));
});

gulp.task('clean-build', function(callback) {
  runSequence('clean', ['build'], callback);
});

gulp.task('build', function(callback) {
  runSequence('lint', 'test', callback);
});

gulp.task('serve', ['build'], function() {
  browserSync.init({
    server: {
      baseDir: 'examples',
      index: 'index.html'
    }
  });

  gulp.watch(JS_FILES, ['compile']);
  gulp.watch(['examples/**/*']).on('change', browserSync.reload);
});

gulp.task('default', ['clean-build']);
