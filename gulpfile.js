var gulp = require('gulp');
var typescript = require('typescript');
var ts = require('gulp-typescript');
var copy = require('gulp-copy');

var tsSrcProject = ts.createProject({
    typescript: typescript,
    out: './public/dest/app.js',
    noImplicitAny: true,
    sortOutput: true,
    removeComments: false,
    target: 'es5',
    declarationFiles: true,
    experimentalDecorators: true,
    noImplicitReturns: true,
    noFallthroughCasesInSwitch: true,
    stripInternal: true
});

gulp.task('copy-libs', function () {
    return gulp.src(
        [
            './node_modules/angular/angular.js'
        ]
    )
        .pipe(copy('./public/scripts', { prefix: 2 }));
});

gulp.task('build', ['copy-libs'], function () {
       var tsResult = gulp
           .src([
               './public/**/*.ts'
           ])
           .pipe(ts(tsSrcProject));

           tsResult.js
               .pipe(gulp.dest('./'))
});