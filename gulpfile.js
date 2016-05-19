var gulp = require('gulp');
var typescript = require('typescript');
var ts = require('gulp-typescript');
var copy = require('gulp-copy');

var tsSrcProject = ts.createProject({
    typescript: typescript,
    out: './public/dest/app.js',
    noImplicitAny: false,
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
            './node_modules/angular/angular.min.js',
            './node_modules/angular-route/angular-route.min.js',
            './node_modules/bootstrap/dist/js/bootstrap.min.js',
            './node_modules/jquery/dist/jquery.min.js',
            './node_modules/angular-google-maps/dist/angular-google-maps.min.js',
            './node_modules/angularfire/dist/angularfire.min.js',
            './node_modules/lodash/lodash.min.js',
            './node_modules/angular-simple-logger/dist/angular-simple-logger.min.js'
        ]
    )
        .pipe(copy('./public/scripts', { prefix: 2 }));
});
gulp.task('copy-styles', function () {
    return gulp.src(
        [
            './node_modules/bootstrap/dist/css/bootstrap.min.css'
        ]
    )
        .pipe(copy('./public/styles', { prefix: 2 }));
});

gulp.task('copy-fonts', function () {
    return gulp.src(
        [
            './node_modules/bootstrap/dist/fonts/**/'
        ]
    )
        .pipe(copy('./public/fonts', { prefix: 2 }));
});

gulp.task('build', ['copy-libs', 'copy-styles', 'copy-fonts'], function () {
       var tsResult = gulp
           .src([
               './public/**/*.ts'
           ])
           .pipe(ts(tsSrcProject));

           tsResult.js
               .pipe(gulp.dest('./'))
});
