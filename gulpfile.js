var gulp = require('gulp');
var typescript = require('typescript');
var ts = require('gulp-typescript');

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

gulp.task('build', function () {
       var tsResult = gulp
        .src('./public/**/*.ts')
        .pipe(ts(tsSrcProject));

           tsResult.js
               .pipe(gulp.dest('./'))
});