const gulp = require('gulp')
const plumber = require('gulp-plumber')
const compass = require('gulp-compass')
const fancyLog = require('fancy-log')
const browserSync = require('browser-sync').create()
const autoprefixer = require('gulp-autoprefixer')
const webpack = require('webpack-stream')
const htmlmin = require('gulp-htmlmin')
const cleanCSS = require('gulp-clean-css')

const onError = err => {
    fancyLog(err)
}

let distBaseDir = './../static/'
let srcBaseDir = './'

gulp.task('scss', () => {
    return gulp
        .src('css/source/styles.scss')
        .pipe(plumber({ errorHandler: onError }))
        .pipe(
            compass({
                config_file: 'css/config.rb',
                css: 'css/compiled',
                sass: 'css/source'
            })
        )
        .pipe(
            autoprefixer({
                grid: true
            })
        )
        .pipe(gulp.dest('css/compiled'))
        .pipe(browserSync.reload({ stream: true }))
})
gulp.task('bs-reload', () => {
    browserSync.reload()
})
gulp.task('webpack:dist', () => {
    return gulp
        .src(srcBaseDir + 'js/main.js')
        .pipe(webpack(require('./webpackpro.config')))
        .pipe(gulp.dest(distBaseDir + 'js/'))
})
gulp.task('webpack:dev', () => {
    return gulp
        .src('js/main.js')
        .pipe(webpack(require('./webpackdev.config')))
        .pipe(gulp.dest('js/'))
        .pipe(browserSync.reload({ stream: true }))
})
gulp.task('html:dist', () => {
    return gulp
        .src(srcBaseDir + 'index.html')
        .pipe(
            htmlmin({
                collapseWhitespace: true
            })
        )
        .pipe(gulp.dest(distBaseDir))
})
gulp.task('minify-css', ['copy-css:dist'], () => {
    return gulp.src(srcBaseDir + 'css/compiled/styles.css')
        .pipe(cleanCSS())
        .pipe(gulp.dest(distBaseDir + 'css/compiled/'))
})
gulp.task('copy-css:dist', () => {
    return gulp
        .src(srcBaseDir + 'css/compiled/**/*')
        .pipe(gulp.dest(distBaseDir + 'css/compiled'))
})
gulp.task('copy-js:dist', () => {
    return gulp
        .src(srcBaseDir + 'js/libs/**/*')
        .pipe(gulp.dest(distBaseDir + 'js/libs/'))
})
gulp.task('copy-img:dist', () => {
    return gulp
        .src(srcBaseDir + 'img/**/*')
        .pipe(gulp.dest(distBaseDir + 'img/'))
})
gulp.task('dev', ['scss', 'webpack:dev'], () => {
    browserSync.init({
        server: {
            baseDir: './',
            index: 'index.html'
        }
    })
    gulp.watch('css/source/**/*', ['scss'])
    gulp.watch('js/main.js', ['webpack:dev'])
    gulp.watch('./index.html', ['bs-reload'])
})

gulp.task(
    'dist',
    [
        'minify-css',
        'copy-img:dist',
        'copy-js:dist',
        'webpack:dist',
        'html:dist'
    ],
    () => {
        browserSync.init({
            server: {
                baseDir: distBaseDir,
                index: 'index.html'
            }
        })
    }
)