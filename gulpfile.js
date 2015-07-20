//include gulp
var gulp = require('gulp');

//include plug-ins
var autoprefix = require('gulp-autoprefixer');
var changed = require('gulp-changed');
var concat = require('gulp-concat');
var jshint = require('gulp-jshint');
var minifyCSS = require('gulp-minify-css');
var override = require('gulp-rev-css-url');
var rev = require('gulp-rev');
var sass = require('gulp-sass');

//paths
var jsBuild = "";
var jsSrc = "'./src/scripts/*.js";
var sassSrc = "./src/styles/SASS/*.scss";
var stylesBuild = "./build/styles/";
var stylesSrc = "./src/styles/*.css";

//JS hint task
gulp.task('jshint', function(){
	gulp.src(jsSrc)
		.pipe(jshint())
		.pipe(jshint.reporter('default'))
});

//SASS stuff
'use strict';
gulp.task('sass', function () {
  gulp.src(sassSrc)
    .pipe(sass().on('error', sass.logError))
    .pipe(autoprefix('last 2 versions'))
    .pipe(minifyCSS())
    .pipe(rev())
    .pipe(override())
    .pipe(gulp.dest(stylesBuild))
    .pipe(rev.manifest())
    .pipe(gulp.dest(stylesBuild));
});

// Automatic tasks
gulp.task('sass:watch', function () {
  gulp.watch(sassSrc, ['sass']);
});