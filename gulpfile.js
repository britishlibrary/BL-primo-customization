const { src, dest, watch, series } = require('gulp')
const sass = require('gulp-sass')(require('sass'))
const concat = require('gulp-concat')
const browserSync = require('browser-sync')

function buildStyles() {
    return src([
        './scss/main.scss'
    ])
        .pipe(sass())
        .pipe(concat('styles.css'))
        .pipe(dest('css'))
        .pipe(browserSync.stream())
        .pipe(browserSync.reload())
}

function serve() {
    browserSync.init({
        server: {
            baseDir: './',
            index: 'primo.html'
        }
    })
    watch(['./scss/*.scss'], buildStyles);
    watch(['./primo.html'], browserSync.reload);
    // Docs watch method.
    // watch('./primo.html').on('change', browserSync.reload);
}

exports.default = series(buildStyles, serve)