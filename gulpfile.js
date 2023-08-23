const { watch, dest, src, series, parallel } = require('gulp')

const plumber = require('gulp-plumber')
const gulpif = require('gulp-if')
const babel = require('gulp-babel')
const sass = require('gulp-sass')(require('sass'))
const concat = require('gulp-concat')
const uglify = require('gulp-uglify')
const cssnano = require('gulp-cssnano')
const rename = require('gulp-rename')
const autoprefixer = require('gulp-autoprefixer')
const browsersync = require('browser-sync').create()
const clean = require('gulp-clean')
const sourcemaps = require('gulp-sourcemaps')

const paths = {
    scripts: {
        src: './src/js/*.js',
        dest: './assets/js/'
    },
    styles: {
        src: './src/scss/main.scss',
        dest: './assets/css/'
    },
    images: {
        src: './src/img/*',
        dest: './assets/img/'
    }
}

const isProduction = process.env.NODE_ENV === 'production'

function js() {
    return src(paths.scripts.src)
        .pipe(plumber())
        .pipe(gulpif(!isProduction, sourcemaps.init()))
        .pipe(babel())
        .pipe(concat('bundle.js'))
        .pipe(uglify())
        .pipe(rename({
            extname: '.min.js'
        }))
        .pipe(gulpif(!isProduction, sourcemaps.write()))
        .pipe(dest(paths.scripts.dest))
        .pipe(browsersync.stream())
        
}

function css() {
    return src(paths.styles.src)
        .pipe(plumber())
        .pipe(gulpif(!isProduction, sourcemaps.init()))
        .pipe(sass())
        .pipe(autoprefixer({
            overrideBrowserslist: ['last 2 versions'],
            cascade: false
        }))
        .pipe(cssnano())
        .pipe(rename({
            extname: '.min.css'
        }))
        .pipe(gulpif(!isProduction, sourcemaps.write()))
        .pipe(dest(paths.styles.dest))
        .pipe(browsersync.stream())
}

function img() {
    return src(paths.images.src)
        // Imagemin (gulp-imagemin) goes here
        // Handle gif size using gifsicle
        // Handle jpeg size using mozjpeg
        // Handle png size using optipng
        // Handle svg size using svgo
        .pipe(dest(paths.images.dest))
}

function watchFiles() {
    watch('./src/js/*', js)
    watch('./src/scss/*', css)
    watch('./src/img/*', img)
}

function clear() {
    return src('./assets/*', {
        read: false,
    })
    .pipe(clean())
}

function browserSync() {
    browsersync.init({
        server: {
            'baseDir': './',
            'index': 'primo.html'
        },
        open: true,
        port: 3000
    })
}

exports.watch = parallel(watchFiles, browserSync)
exports.default = series(clear, parallel(js, css, img))
