

//This is a gulp file I wrote for RHINOAPI that eneded up getting scrapped for nodemon
// It does several things - it babelfies code in order to use ES7 and *ES6 goodness(*not required for most node versions now)
// It also has git-hooks, which I found extremely helpful when initiating saves and pre-compliing my code before push.
// There are mocha tests included as well - you might want to remove that if you aren't doing test-driven dev
// There is also nodemon but I forgot for what....
//Gulp file cache caches changes during babelfication so build times aren't annoyingly long.



// eslint-disable-next-line
import gulp from 'gulp';
// eslint-disable-next-line
import babel from 'gulp-babel';
// eslint-disable-next-line
import eslint from 'gulp-eslint';
// eslint-disable-next-line
import shell from 'gulp-shell';
// eslint-disable-next-line
import duration from 'gulp-duration';
// eslint-disable-next-line
import gutil from 'gulp-util';
// eslint-disable-next-line
import mocha from 'gulp-mocha';
// eslint-disable-next-line
import nodemon from 'gulp-nodemon';
// eslint-disable-next-line
import Cache from 'gulp-file-cache';

const cache = new Cache();

gulp.task('start', ['build', 'linter', 'watcher']);


// Githooks for pre-commit
gulp.task('gitHook', ['build']);
gulp.task('pre-commit', ['gitHook']);

// Build/complier task
gulp.task('build', () => {
  const stream = gulp.src(['src/**/*.js'])
    .pipe(cache.filter())
    .pipe(babel().on('error', gutil.log))
      .pipe(duration('Buildling library...'))
      .pipe(cache.cache())
      .pipe(gulp.dest('./lib'));
  return stream;
});

// Eslinter task
gulp.task('linter', () => {
  const stream =  gulp.src('src/**/*.js')
    .pipe(duration('Running linter...'))
    .pipe(eslint())
    .pipe(eslint.format());
  return stream;
});
// Watcher task
gulp.task('watcher', ['build'], () => {
  nodemon({
    script: 'lib/serve.js',
    watch:  'src',
    tasks:   ['build'],
  });
});

// Tests - using for pre-commit
// gulp.task('tests', ['build'], shell.task('mocha -c --recursive lib/tests'));



// gulp.task('tests', ['build'], () => {
//   const stream = gulp.src(['./lib/tests/**/*.js'], { read: false })
//     .pipe(mocha({
//       globals: ['expect', 'sinon'],
//       require: ['./test/mocha.conf.js'],
//     }))
//     .on('error', gutil.log);
//   return stream;
// });
