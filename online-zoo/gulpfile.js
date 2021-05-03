"use strict";

var gulp = require("gulp");
var plumber = require("gulp-plumber");
var sourcemap = require("gulp-sourcemaps");
var sass = require("gulp-sass");
var postcss = require("gulp-postcss");
var autoprefixer = require("autoprefixer");
var server = require("browser-sync").create();
var csso = require("gulp-csso");
var rename = require("gulp-rename");
var imagemin = require("gulp-imagemin");
var webp = require("gulp-webp");
var svgstore = require("gulp-svgstore");
var posthtml = require("gulp-posthtml");
var include = require("posthtml-include");
var del = require("del");

var ghPages = require("gh-pages");
var path = require("path");

var pages = ['index', 'map', 'zoos-panda', 'zoos-eagle', 'zoos-crocodile', 'zoos-gorilla'];

gulp.task("css", async function () {
  return pages.map((page) => {
    gulp.src(`source/pages/${page}/${page}-style.scss`)
      .pipe(plumber())
      .pipe(sourcemap.init())
      .pipe(sass())
      .pipe(postcss([autoprefixer()]))
      .pipe(gulp.dest(`build/pages/${page}`))
      .pipe(csso())
      .pipe(rename(`${page}-style.min.css`))
      .pipe(sourcemap.write("."))
      .pipe(gulp.dest(`build/pages/${page}`))
      .pipe(server.stream());
  });
});

gulp.task("server", async function () {
  server.init({
    files: ["build/pages/index/index.html", "build/pages/map/map.html",
      "build/pages/zoos-panda/zoos-panda.html",
      "build/pages/zoos-panda/zoos-eagle.html",
      "build/pages/zoos-panda/zoos-crocodile.html",
      "build/pages/zoos-panda/zoos-gorilla.html"
    ],
    server: {
      baseDir: "build",
      directory: true
    },
    notify: false,
    open: true,
    cors: true,
    ui: false
  });

  gulp.watch("source/sass/**/*.{scss,sass}", gulp.series("css"));
  gulp.watch("source/assets/icons/icon-*.svg", gulp.series("sprite", "html", "refresh"));
  gulp.watch("source/pages/**/*.html", gulp.series("html", "refresh"));
  gulp.watch("source/pages/**/*.js", gulp.series("js", "refresh"));
  gulp.watch("source/assets/images/*.{png,jpg,svg}", gulp.series("images", "refresh"));
  gulp.watch("source/assets/images/slider-pets-in-zoo-new/*.{png,jpg,svg}", gulp.series("images", "refresh"));
});

gulp.task("refresh", async function (done) {
  server.reload();
  done();
});

gulp.task("images", async function () {
  return gulp.src("source/assets/images/**/*.{png,jpg,svg}")
    .pipe(imagemin([
      imagemin.optipng({
        optimizationLevel: 3
      }),
      // imagemin.mozjpeg({
      //   quality: 75,
      //   progressive: true
      // }),
      imagemin.jpegtran({
        progressive: true
      }),
      imagemin.svgo()
    ]))
    .pipe(gulp.dest("build/assets/images"));
});

// gulp.task("webp", async function () {
//   return gulp.src("source/assets/images/**/*.{png,jpg}")
//     .pipe(webp({
//       quality: 85
//     }))
//     .pipe(gulp.dest("source/assets/images"));
// });

gulp.task("sprite", function () {
  return gulp.src("source/assets/icons/*.svg")
    .pipe(svgstore({
      inlineSvg: true
    }))
    .pipe(rename("sprite.svg"))
    .pipe(gulp.dest("build/assets/icons"));
});

gulp.task("html", async function () {
  return pages.map((page) => {
    gulp.src(`source/pages/${page}/*.html`)
      .pipe(posthtml([
        include()
      ]))
      .pipe(gulp.dest(`build/pages/${page}`));
  });
});

gulp.task("js", async function () {
  return pages.map((page) => {
    gulp.src(`source/pages/${page}/*.js`)
      .pipe(gulp.dest(`build/pages/${page}`));
  });
});

gulp.task("copy", async function () {
  return gulp.src([
      "source/assets/fonts/**/*.{woff,woff2}",
      "source/assets/images/**",
      "source/assets/icons/**",
      "source//*.ico"
    ], {
      base: "source"
    })
    .pipe(gulp.dest("build"));
});

gulp.task("clean", async function () {
  return del("build");
});

// to run task "npx gulp deploy"
function deploy(cb) {
  ghPages.publish(path.join(process.cwd(), "./build"), cb);
}
exports.deploy = deploy;

gulp.task("build", gulp.series("clean", "copy", "css", "sprite", "html", "js"));
gulp.task("start", gulp.series("build", "server"));
