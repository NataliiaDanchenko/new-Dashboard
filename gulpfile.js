import gulp from 'gulp'; 
import imagemin from 'gulp-imagemin';
import minify from 'gulp-minify';
import GulpCleanCss from 'gulp-clean-css';
import minifyCSS from 'gulp-minify-css';

const buildFolder = `./dist`;
const srcFolder = `./src`;
const path = {
  build: {
    minjs: `${buildFolder}/files/`,
    style: `${buildFolder}/files/`,
    images: `${buildFolder}/files/`,
    files: `${buildFolder}/files`,
  },
  src: {
    minjs: `${srcFolder}/files/**/*.js`,
    style: `${srcFolder}/files/**/*.css`,
    images: `${srcFolder}/files/**/*.{jpg, jpeg, png, gif, webp}`,
    files: `${srcFolder}/files/**/*.*`,
  },
  watch: {
    minjs: `${srcFolder}/files/**/*.js`,
    style: `${srcFolder}/files/**/*.css`,
    images: `${srcFolder}/files/**/*.{jpg, jpeg, png, gif, webp}`,
    files: `${srcFolder}/files/**/*.*`,
  },
  buildFolder: buildFolder,
  srcFolder: srcFolder,
}

global.app = {
  path: path,
  gulp: gulp,
}

const copy = () => {
  return app.gulp.src(app.path.src.files)
    .pipe(app.gulp.dest(app.path.build.files))
}

const images = () => {
  return app.gulp.src(app.path.src.files)
    .pipe(app.gulp.src(app.path.src.files))
    .pipe(app.gulp.dest(app.path.build.files))
    .pipe(imagemin({
      progressive: true,
      interlaced: true,
      optimizationLevel: 3,
    }))
    .pipe(app.gulp.dest(app.path.build.files))
}

const style = () => {
  return app.gulp.src(app.path.src.files)
    .pipe(app.gulp.src(app.path.src.files))
    .pipe(app.gulp.dest(app.path.build.files))
    .pipe(minify())
    .pipe(app.gulp.dest(app.path.build.files))
    .pipe(GulpCleanCss())
    .pipe(app.gulp.dest(app.path.build.files))
}

const minJs = () => {
  return app.gulp.src(app.path.src.files)
    .pipe(app.gulp.src(app.path.src.files))
    .pipe(app.gulp.dest(app.path.build.files))
    .pipe(minify())
    .pipe(app.gulp.dest(app.path.build.files))
}

const dev = gulp.series(copy, images, style, minJs, watcher)

gulp.task('default', dev)

function watcher() {
  gulp.watch(path.watch.files, images, style, minJs);
}



