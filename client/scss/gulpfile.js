const {src, dest, watch, series} = require('gulp');
const sass = require('gulp-sass')(require('sass'));
const purgecss = require('gulp-purgecss');

function build()
{
    return src('index.scss')
    .pipe(sass())
    .pipe(purgecss({ content: ['../src/**/*.js']}))
    .pipe(dest('../src/css'))
}

function watchStyle() 
{
    watch(['*.scss','../src/**/*.js'],build)
}


exports.default = series(build,watchStyle);