// gulpfile.js

const gulp         = require('gulp'),
      uglify       = require('gulp-uglify'),
      cssnano      = require('gulp-cssnano'),
      autoprefixer = require('gulp-autoprefixer'),
      sass         = require('gulp-sass'),
      sourcemaps   = require('gulp-sourcemaps'),
      webpack      = require('webpack-stream'),
      babel        = require('gulp-babel'),
      mode         = require('gulp-mode')(),
      connect      = require('gulp-connect'),
      plumber      = require('gulp-plumber'),
      pug          = require('gulp-pug'),
      imagemin     = require('gulp-imagemin');

let styles = () => {
  return gulp.src('source/styles/style.scss')
    .pipe(mode.development(sourcemaps.init()))
    .pipe(sass().on('error', sass.logError))
    .pipe(autoprefixer({
        overrideBrowserslist: ['> 1%']
    }))
    .pipe(cssnano())
    .pipe(mode.development(sourcemaps.write()))
    .pipe(gulp.dest('build/css'))
    .pipe(connect.reload());
}

let scripts = () => {
  return gulp.src('source/js/app.js')
    .pipe(webpack({
      mode: mode.development() ? 'development' : 'production',
      watch: true,
      output: {
        filename: 'app.min.js'
      }
    }))
    .pipe(babel({ presets: ['@babel/env'] }))
    .pipe(mode.development(sourcemaps.init()))
    .pipe(uglify().on('error', (uglify) => {
      console.error(uglify.message);
      this.emit('end');
    }))
    .pipe(mode.development(sourcemaps.write()))
    .pipe(gulp.dest('build/js'));
}

let fonts = () => {
  return gulp.src('source/fonts/**/*.{ttf,woff,eot,svg}')
    .pipe(gulp.dest('build/fonts')); 
}

let images = () => {
  return (
    gulp.src('source/images/**/*')
      .pipe(imagemin())
      .pipe(gulp.dest('build/images'))
      .pipe(imagemin([
        imagemin.gifsicle({interlaced: true}),
        imagemin.mozjpeg({quality: 75, progressive: true}),
        imagemin.optipng({optimizationLevel: 5}),
        imagemin.svgo({
          plugins: [
            {removeViewBox: true},
            {cleanupIDs: false}
          ]
        })
      ]))
      .pipe(connect.reload())
  );
}

let views = () => {
  return (
    gulp.src('source/views/*.pug')
    .pipe(plumber())
    .pipe(pug({
        pretty: true
    }))
    .pipe(gulp.dest('build'))
    .pipe(connect.reload())
  )
}

let server = done => {
  connect.server({
    livereload: true,
    port: 80,
    root: 'build',
  });
  done();
}

let watchTask = done => {
  gulp.watch(
    ['source/styles/*.scss','source/styles/**/*.scss'],
    { ignoreInitial: false },
    styles
  );

  gulp.watch(
    ['source/views/**/*.pug'], 
    { ignoreInitial: false },
    views
  );

  gulp.watch(
    ['source/js/*.js','source/js/*/*.js'],
    { ignoreInitial: false },
    scripts
  );

  gulp.watch(
    ['source/fonts/**'],
    { ignoreInitial: false },
    fonts
  );

  gulp.watch(
    ['source/images/**','source/images/**/**'], 
    { ignoreInitial: true },
    images
  );

  done();
}

exports.default = gulp.parallel(watchTask, server);
