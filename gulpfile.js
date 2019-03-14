const gulp = require('gulp');
const sass = require('gulp-sass');
const pug = require('gulp-pug');
const image = require('gulp-image');
const browserSync = require('browser-sync');
const autoprefixer = require('gulp-autoprefixer');
const uglify = require('gulp-uglify');



gulp.task('sass', function () {  /*для gulp модуля подключаем задачу под название 'sass' */
    return gulp.src('./src/styles/*.scss') /*указываем путь откудо взять файл scss,(мы берем его из папки src т. е исходног кода ) */
      .pipe(sass().on('error', sass.logError))
      .pipe(autoprefixer({
        browsers: ['last 2 versions'],
        cascade: false})) /*Далее говорим через какую задачу провесть под названием sass(это по ходу то что мы задали константу const sass) */
      .pipe(gulp.dest('./build/styles')); /*здесь указываем в какую папку нам нужно отправить отредактированный файл*/
  });


  // gulp.task('pug', function () {
  //   return gulp.src('./src/pages/*.pug')
  //   .pipe(pug({
  //       // Your options in here. 
  //     }))
  //     .pipe(gulp.dest('./build')); 
  // });

  gulp.task('html', function(){
    return gulp.src('./src/pages/*.html')
    .pipe(gulp.dest('./build'))
  })


  gulp.task('image', function () {
    gulp.src('./src/image/**/*')
      .pipe(image())
      .pipe(gulp.dest('./build/image'));
  });


  gulp.task('fonts', function () {
    return gulp.src('./src/fonts/**/*')
       .pipe(gulp.dest('./build/fonts'))
 });


 gulp.task('browserSync', function () {
  browserSync({
     server: {
        baseDir: './build/'
     },
  })
});


gulp.task('compress', function () {
  // returns a Node.js stream, but no handling of error messages
  return gulp.src('./src/js/*.js')
    .pipe(uglify())
    .pipe(gulp.dest('./build/js'));
});


gulp.task('watch', ['sass','fonts','html', 'browserSync', 'compress', ], function () {
  gulp.watch('./src/styles/*.scss', ['sass']);
  gulp.watch('./src/pages/*.html', ['html']);
  gulp.watch('./src/js/*.js', ['compress']);
  gulp.watch('./src/image/*', ['image']);
  gulp.watch('./src/fonts/**/*', ['fonts']);
  gulp.watch('build/*.html', browserSync.reload);
  gulp.watch("./build/css/**/*.css").on("change", browserSync.reload);
  gulp.watch('./build/js/**/*.js').on("change", browserSync.reload);
 
  
});


gulp.task('default', ['watch', 'fonts', 'image']);