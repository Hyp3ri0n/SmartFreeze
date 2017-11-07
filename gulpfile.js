/********************************************/
/*                                          */
/*                  GulpFile                */
/*                                          */
/*       Author : Hyp3ri0n                  */
/*       Date   : 14/09/2017                */
/*                                          */
/********************************************/

var gulp = require('gulp');
var concat = require('gulp-concat');
var del = require('del');
var tsc = require('gulp-typescript');
var sourcemaps = require('gulp-sourcemaps');
var runSequence = require('run-sequence');
var uglify = require('gulp-uglify');
var cleanCSS = require('gulp-clean-css');
var tsProject = tsc.createProject('tsconfig.json');
var tslint = require('gulp-tslint');
var sass = require('gulp-sass');
var rename = require('gulp-rename');


/**
 * Remove dist/www/cordova/electron directories.
 */
gulp.task('clean-all', function (cb) {
    return del(['dist'], cb);
});
gulp.task('clean-web', function (cb) {
    return del(['dist/www'], cb);
});
gulp.task('clean-cordova', function (cb) {
    return del(['dist/cordova'], cb);
});
gulp.task('clean-electron', function (cb) {
    return del(['dist/electron'], cb);
});

/**
 * Copy all resources for electron/cordova.
 */
gulp.task('copy-electron', function () {
    return gulp.src(['dist/www/**/*', 'resources/electron/**/*'])
        .pipe(gulp.dest('dist/electron/www'));
});
gulp.task('copy-www-cordova', function () {
    return gulp.src(['dist/www/**/*'])
        .pipe(gulp.dest('dist/cordova/www'));
});
gulp.task('copy-cordova', function () {
    return gulp.src(['resources/cordova/**/*'])
        .pipe(gulp.dest('dist/cordova'));
});

/**
 * Copy all resources that are not TypeScript or CSS files into dist directory.
 */
gulp.task('resources', function () {
    return gulp.src(['src/**/*', '!src/app/**/*.ts', '!**/*.css', '!**/*.scss'])
        .pipe(gulp.dest('dist/www'));
});

/**
 * Copy all themes "*.scss" after compiling them.
 */
gulp.task('scss', function () {
    return gulp.src('src/**/*.scss')
        .pipe(sass().on('error', sass.logError))
        .pipe(concat('style.css'))
        .pipe(cleanCSS())
        .pipe(gulp.dest('dist/www/assets/styles/'));
});

/**
 * Copy all ".css" files and minify them.
 */
gulp.task('style', ['scss'], function () {
    return gulp.src('src/**/*.css')
        .pipe(cleanCSS())
        .pipe(gulp.dest('dist/www'));
});

/**
 * Lint all TypeScript files.
 */
gulp.task('tslint', function () {
    return gulp.src('src/**/*.ts')
        .pipe(tslint({
            formatter: 'prose'
        }))
        .pipe(tslint.report());
});

/**
 * Compile TypeScript sources and uglify them.
 */
gulp.task('compile', ['tslint'], function () {
    var tsResult = gulp.src('src/app/**/*.ts')
        .pipe(sourcemaps.init())
        .pipe(tsProject());
    return tsResult.js
        .pipe(sourcemaps.write(".", {sourceRoot: '/src'}))
        .pipe(gulp.dest('dist/www/app/'));
});

/**
 * Copy all required libraries into build directory.
 */
gulp.task("libs_js", function () {
    return gulp.src([
        'core-js/client/shim.min.js',
        'systemjs/dist/system-polyfills.js',
        'systemjs/dist/system.src.js',
        'reflect-metadata/Reflect.js',
        'rxjs/**/*.js',
        'zone.js/dist/**',
        '@angular/**/bundles/**',
        'hammerjs/hammer.min.js',
        'bootstrap/dist/js/bootstrap.bundle.min.js'
    ], {cwd: "node_modules/**"}) /* Glob required here. */
        .pipe(gulp.dest("dist/www/assets/vendors/libs/"));
});

/**
 * Copy all required libraries into build directory.
 */
gulp.task("libs_css", function () {
    return gulp.src([
        'bootstrap/dist/css/bootstrap.min.css',
        'font-awesome/css/**/*.min.css'
    ], {cwd: "node_modules/**"}) /* Glob required here. */
        .pipe(rename({dirname:''}))
        .pipe(gulp.dest("dist/www/assets/styles/"));
});

/**
 * Watch for changes in TypeScript, HTML and style files.
 */
gulp.task('watchers', function () {
    gulp.watch(['src/**/*.ts'], ['compile']).on('change', function (e) {
        console.log('TypeScript file ' + e.path + ' has been changed. Compiling.');
    });
    gulp.watch(['src/**/*.html', 'src/**/*.js'], ['resources']).on('change', function (e) {
        console.log('Resource file ' + e.path + ' has been changed. Updating.');
    });
    gulp.watch(['src/**/*.css', 'src/**/*.scss'], ['style']).on('change', function (e) {
        console.log('Style file ' + e.path + ' has been changed. Updating.');
    });
});

/**
 * [WEB] Build the project.
 */
gulp.task('build-web', function (callback) {
    runSequence('clean-web', 
                'resources', 
                'style', 
                'compile', 
                'libs_js', 
                'libs_css',
                callback);
    console.log('Project web built.');
});

/**
 * [ELECTRON] Build the project.
 */
gulp.task('build-electron', function (callback) {
    runSequence('clean-electron',
                'build-web',
                'copy-electron',
                callback);
    console.log('Project Electron built.');
});

/**
 * [CORDOVA] Build the project.
 */
gulp.task('build-cordova', function (callback) {
    runSequence('clean-cordova',
                'build-web',
                'copy-www-cordova',
                'copy-cordova',
                callback);
    console.log('Project Cordova built.');
});


/**
 * Launch watchers.
 */
gulp.task('watch-web', function (callback) {
    runSequence('build-web', 
                'watchers',
                callback);
    console.log('Watchers launched ...');
});