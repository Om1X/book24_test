/**
 * Подключение плагинов
 * @type {Gulp}
 */
const gulp = require('gulp');
const less = require('gulp-less');
const browserify = require('gulp-browserify');
const uglify = require('gulp-uglify');
const del = require('del');
const rename = require("gulp-rename");
const browserSync = require('browser-sync').create();

/**
 * Константы директорий исходников и сборки
 * @type {string}
 */
const SRC = './src';
const BUILD = './build';
const PATH = {
  src: {
    less: `${SRC}/less`,
    js: `${SRC}/js`,
  },
  build: {
    css: `${BUILD}/css`,
    js: `${BUILD}/js`,
  }
};

gulp.task('html', function () {
  return gulp.src(`${SRC}/*.html`)
    .pipe(gulp.dest(BUILD))
});


gulp.task('css', function () {
  return gulp.src(`${PATH.src.less}/style.less`)
    .pipe(less())
    .pipe(gulp.dest(PATH.build.css));
});

gulp.task('js', function () {
  return gulp.src(`${PATH.src.js}/index.js`)
    .pipe(browserify({transform: ['babelify']}))
    .pipe(rename('main.js'))
    .pipe(uglify())
    .pipe(gulp.dest(PATH.build.js));
});

gulp.task('clr', function () {
  return del('./build/*')
});

gulp.task('build', gulp.series(
  'clr',
  gulp.parallel('css', 'js', 'html'))
);

gulp.task('watch', function () {
  gulp.watch(`${PATH.src.less}/**/*.less`, gulp.series('css'));
  gulp.watch(`${PATH.src.js}/**/*.js`, gulp.series('js'));
  gulp.watch(`${SRC}/*.html`, gulp.series('html'));
});

gulp.task('server', function () {
  browserSync.init({
    server: {
      baseDir: BUILD,
      index: "index.html"
    }
  });

  browserSync.watch(`${BUILD}/**/*.*`).on('change', browserSync.reload);
});


gulp.task('dev', gulp.series('build', gulp.parallel('watch', 'server')));
