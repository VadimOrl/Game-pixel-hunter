const {src, dest} = require("gulp");

//Конфигурация
const path =require("../config/path.js");
const app =require("../config/app.js");

//Плагины
const plumber = require("gulp-plumber");
const notify = require("gulp-notify");
// const babel = require("gulp-babel");
const webpack = require("webpack-stream");
const rigger = require("gulp-rigger");
const concat = require("gulp-concat");
const rollup = require(`gulp-better-rollup`);
const sourcemaps = require(`gulp-sourcemaps`);



const js = ()=> {
  return src(path.js.src, {sourcemaps: app.isDev})
    .pipe(plumber({
      errorHandler: notify.onError(error => ({
        title: "JS",
        message: error.message
      }))
    }))
    // .pipe(babel())
    .pipe(rigger())
    // .pipe(concat('main.js'))
    .pipe(sourcemaps.init())
    .pipe(rollup({}, `iife`))
    .pipe(sourcemaps.write(``))

    // .pipe(webpack(app.webpack))
    .pipe(dest(path.js.dest, {sourcemaps: app.isDev}));
};

module.exports = js;