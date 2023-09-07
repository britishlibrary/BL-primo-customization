require('dotenv').config()
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
const imagemin = require('gulp-imagemin')
const zip = require('gulp-zip')
const handlebars = require('gulp-compile-handlebars')
const hb = require('handlebars')

/**
 * Set the name of the zip file
 */
const ZIP_FILENAME = process.env.ZIP_FILENAME || 'default_name'

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
    },
    templates: {
        src: './src/templates/*.hbs',
        dest: './assets/'
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
        .pipe(imagemin([
            imagemin.gifsicle({ interlaced: true }),
            imagemin.mozjpeg({ quality: 75, progressive: true }),
            imagemin.optipng({ optimizationLevel: 5 }),
            imagemin.svgo({
                plugins: [
                    { removeViewBox: true },
                    { cleanupIDs: false }
                ]
            })
        ]))
        .pipe(dest(paths.images.dest))
        .pipe(browsersync.stream())
}

function markup() {
    return src(paths.templates.src)
        .pipe(handlebars())
        .pipe(dest(paths.templates.dest))
        .pipe(browsersync.stream())
}

function watchFiles() {
    watch('./src/js/*', js)
    watch('./src/scss/*', css)
    watch('./src/img/*', img)
    watch('./src/templates/*', markup)
}

function clear() {
    return src(['./assets/*', './*.zip'], {
        read: false,
    })
        .pipe(clean())
}
// TODO: ensure middleware/injecting style changes
function proxy() {
    browsersync.init({
        proxy: process.env.PROXY_URL,
        serveStatic: [paths.styles.dest],
        injectChanges: true,
        files: [paths.styles.dest + '*.css'],
        middleware: function (req, res, next) {
            if (/\.html$/.test(req.url)) {
                res.setHeader('Content-Type', 'text/html')
                res.end(`<link rel="stylesheet" type="text/css" href="${paths.styles.dest}main.min.css">`)
            } else {
                next()
            }
        },
        open: true,
        port: 3000
    })
}

function serve() {
    browsersync.init({
        server: {
            baseDir: './assets'
        },
        open: true,
        port: 3000
    });
}

function createZip() {
    return src([
        './assets/**/*'
    ])
        .pipe(zip(`${ZIP_FILENAME}.zip`))
        .pipe(dest('./'));
}

exports.proxy = parallel(watchFiles, proxy)
exports.serve = parallel(watchFiles, serve)
exports.default = series(clear, parallel(js, css, img, markup), createZip);
