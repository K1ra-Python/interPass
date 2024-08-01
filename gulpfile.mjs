import gulp from 'gulp';
import dartSass from 'sass';
import gulpSass from 'gulp-sass';
const sass = gulpSass(dartSass);
import cleanCSS from 'gulp-clean-css';
import sourcemaps from 'gulp-sourcemaps';
import rename from 'gulp-rename';
import browserSync from 'browser-sync';
const server = browserSync.create();
import concat from 'gulp-concat';
import uglify from 'gulp-uglify';
import plumber from 'gulp-plumber';
import imagemin from 'gulp-imagemin';
import replace from 'gulp-replace';

const paths = {
    styles: {
        src: "src/scss/**/*.scss",
        dest: "dist/css/"
    },
    scripts: {
        src: "src/js/**/*.js",
        dest: "dist/js/"
    },
    images: {
        src: "src/images/**/*",
        dest: "dist/images/"
    },
    html: {
        src: "./*.html"
    }
};

function styles() {
    return gulp.src(paths.styles.src)
        .pipe(sourcemaps.init())
        .pipe(sass().on("error", sass.logError))
        .pipe(cleanCSS())
        .pipe(rename({
            basename: "main",
            suffix: ".min"
        }))
        .pipe(replace('/src/images/', '../images/')) // Заменяет пути в CSS
        .pipe(sourcemaps.write("."))
        .pipe(gulp.dest(paths.styles.dest))
        .pipe(server.stream());
}

function scripts() {
    return gulp.src(paths.scripts.src)
        .pipe(plumber(function (err) {
            console.error("Error in scripts task", err.toString());
            this.emit("end");
        }))
        .pipe(sourcemaps.init())
        .pipe(concat("main.js"))
        .pipe(gulp.dest(paths.scripts.dest))
        .pipe(rename({ suffix: ".min" }))
        .pipe(uglify().on("error", function (e) {
            console.log(e);
        }))
        .pipe(sourcemaps.write("."))
        .pipe(gulp.dest(paths.scripts.dest))
        .pipe(server.stream());
}

function images() {
    return gulp.src(paths.images.src)
        .pipe(imagemin())
        .pipe(gulp.dest(paths.images.dest));
}

function html() {
    return gulp.src(paths.html.src)
        .pipe(replace('/src/images/', 'dist/images/')) // Заменяет пути в HTML
        .pipe(gulp.dest('./'))
        .pipe(server.stream());
}

function watch() {
    server.init({
        server: {
            baseDir: "./"
        }
    });
    gulp.watch(paths.styles.src, styles);
    gulp.watch(paths.scripts.src, scripts);
    gulp.watch(paths.images.src, images);
    gulp.watch(paths.html.src).on('change', server.reload);
}

export { styles, scripts, images, html, watch };

export default gulp.series(styles, scripts, images, html, watch);
