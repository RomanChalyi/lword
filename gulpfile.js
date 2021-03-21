const gulp = require("gulp");
const sass = require("gulp-sass");
const concat = require("gulp-concat");
const autoprefixer = require("autoprefixer");
const cleanCSS = require("gulp-clean-css");
const uglify = require("gulp-uglify-es").default;
const browserSync = require("browser-sync").create();
const postcss = require("gulp-postcss");

gulp.task("sass", () => {
  return gulp
    .src("./src/**/*.scss")
    .pipe(sass().on("error", sass.logError))
    .pipe(gulp.dest("./src/css"));
});

gulp.task("styles", () => {
  return gulp
    .src("./src/css/**/*.css")
    .pipe(concat("style-min.css"))
    .pipe(postcss([autoprefixer()]))
    .pipe(
      cleanCSS({
        level: 2,
      })
    )
    .pipe(gulp.dest("./build/css"))
    .pipe(browserSync.stream());
});

gulp.task("scripts", () => {
  return gulp
    .src("./src/js/**/*.js")
    .pipe(concat("js-min.js"))
    .pipe(uglify())
    .pipe(gulp.dest("./build/js"))
    .pipe(browserSync.stream());
});

gulp.task("watch", () => {
  browserSync.init({
    server: {
      baseDir: "./",
      directory: true,
    },
  });
  gulp.watch("./src/**/*.scss", gulp.series(["sass", "styles"]));
  gulp.watch("./src/js/**/*.js", gulp.series(["scripts"]));
  gulp.watch("./**/*.html").on("change", browserSync.reload);
});
