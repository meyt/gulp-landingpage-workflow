const del = require('del')
const gulp = require('gulp')
const sass = require('gulp-sass')
const rename = require('gulp-rename')
const autoprefixer = require('gulp-autoprefixer')
const path = require('path')
const concatCss = require('gulp-concat-css')
const cleanCSS = require('gulp-clean-css')
const dependencies = require('gulp-web-dependencies')
const copyAssets = require('gulp-css-copy-assets').default
const minifyHtml = require('gulp-minify-html')
const uglify = require('gulp-uglify')
const nunjucks = require('gulp-nunjucks')
const decache = require('decache')
const server = require('gulp-server-livereload')
const runSequence = require('run-sequence')

var paths = {
  templates: './src/',
  sass: 'src/assets/sass/',
  dist: './dist',
  dataFile: './src/data.js'
}

function getData () {
  decache(paths.dataFile)
  return require(paths.dataFile)()
}

// Compile HTML templates
// ==========================================
gulp.task('compileHtml', function () {
  return gulp.src(path.join(paths.templates, '*.html'))
    .pipe(nunjucks.compile(getData()))
    .pipe(dependencies({
      folders: '',
      dest: paths.dist,
      prefix: './vendor'
    }))
    .pipe(minifyHtml())
    .pipe(rename({
      extname: ''
    }))
    .pipe(rename({
      extname: '.html'
    }))
    .pipe(gulp.dest(paths.dist))
})

//  Sass: compile sass to css task - uses Libsass
// ===========================================
gulp.task('sass', function () {
  return gulp.src(path.join(paths.sass, '*.scss'))
    .pipe(sass({style: 'expanded', sourceComments: 'map', errLogToConsole: true, includePaths: ['./node_modules']}))
    .pipe(concatCss('bundle.css', {includePaths: ['./node_modules']}))
    .pipe(autoprefixer('last 2 version', '> 1%', 'ie 8', 'ie 9'))
    .pipe(cleanCSS({compatibility: 'ie8'}))
    .pipe(copyAssets())
    .pipe(gulp.dest(paths.dist + '/assets/css'))
})

//  Copy source assets
// ===========================================
gulp.task('copyAssets', function () {
  gulp.src(['src/assets/img/*']).pipe(gulp.dest(paths.dist + '/assets/img'))
  gulp.src(['src/assets/js/*.js']).pipe(uglify()).pipe(gulp.dest(paths.dist + '/assets/js'))
})

//  Connect: sever task
// ===========================================
gulp.task('connect', function () {
  return gulp.src('./dist')
    .pipe(server({
      defaultFile: './index.html',
      livereload: true,
      directoryListing: false,
      port: 6868,
      open: false
    }))
})

//  Clean distribution directory
// ===========================================
gulp.task('cleanDist', function () {
  return del([path.join(paths.dist, '/*'), '!' + paths.dist], {force: true})
})

//  Building
// ===========================================
function build (liveReload = false) {
  const args = [
    'cleanDist',
    ['copyAssets', 'compileHtml', 'sass']
  ]
  if (liveReload) args.push('connect')
  runSequence.apply(this, args)
}

gulp.task('default', function () {
  build(true)
  gulp.watch('./src/assets/**/*', ['copyAssets'])
  gulp.watch(path.join(paths.sass, '**/*.scss'), ['sass'])
  gulp.watch([path.join(paths.templates, '**/*.html'), paths.dataFile], ['compileHtml'])
})

gulp.task('build', function () {
  build()
})
