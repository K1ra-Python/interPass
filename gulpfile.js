const gulp = require('gulp');
const sass = require('gulp-sass')(require('sass')); // Указываем компилятор Sass
const cleanCSS = require('gulp-clean-css'); // Минификация CSS
const sourcemaps = require('gulp-sourcemaps'); // Source Maps
const rename = require('gulp-rename'); // Переименование файлов
const browserSync = require('browser-sync').create(); // Обновление браузера

const paths = {
    styles: {
        src: 'src/scss/**/*.scss', // Исходные SCSS файлы
        dest: 'dist/css/' // Папка для скомпилированных CSS файлов
    }
};

function styles() {
    return gulp.src(paths.styles.src) // Исходные файлы SCSS
        .pipe(sourcemaps.init()) // Инициализация source maps
        .pipe(sass().on('error', sass.logError)) // Компиляция SCSS
        .pipe(cleanCSS()) // Минификация CSS
        .pipe(rename({
            basename: 'main', // Имя файла
            suffix: '.min' // Суффикс минифицированного файла
        }))
        .pipe(sourcemaps.write('.')) // Запись source maps
        .pipe(gulp.dest(paths.styles.dest)) // Сохранение в папку dist/css
        .pipe(browserSync.stream()); // Обновление браузера
}

function watch() {
    browserSync.init({
        server: {
            baseDir: './' // Корневая директория для сервера
        }
    });
    gulp.watch(paths.styles.src, styles); // Наблюдение за изменениями в SCSS файлах
}

exports.styles = styles;
exports.watch = watch;
exports.default = gulp.series(styles, watch);
