const {src, dest, watch, series} = require('gulp');
const sass = require('gulp-sass')(require('sass'));

function build()
{
    return src('index.scss')
    .pipe(sass())
    .pipe(dest('../src/css'))
}

function watchStyle() 
{
    watch(['*.scss'],build)
}


exports.default = series(build,watchStyle);