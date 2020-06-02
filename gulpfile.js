const gulp = require('gulp');
const sass = require('gulp-sass');
const concat = require('gulp-concat');
const browserSync = require('browser-sync').create();

// compile SCSS to CSS
function style() {
	// 1. SCSS root folder
	return (
		gulp
			.src('./scss/**/*.scss')
			// 2. compiling
			.pipe(sass({ outputStyle: 'compressed' }).on('error', sass.logError))
			// concat
			.pipe(concat('main.css'))
			// 3. CSS destination folder
			.pipe(gulp.dest('./css/'))
			// 4. stream changes to all browser
			.pipe(browserSync.stream())
	);
}

function watch() {
	browserSync.init({
		server: {
			baseDir: './',
		},
		notify: true,
	});
	gulp.watch('./scss/**/*.scss', style);
	gulp.watch('./*.php').on('change', browserSync.reload);
	gulp.watch('./*.html').on('change', browserSync.reload);
	gulp.watch('./js/**/*.js').on('change', browserSync.reload);
}

exports.style = style;
exports.watch = watch;
