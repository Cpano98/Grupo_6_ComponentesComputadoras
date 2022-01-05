// Initialize modules
// Importing specific gulp API functions lets us write them
// below as series() insted of gulp.series()

const { src, dest, watch, series, parallel } = require('gulp');
const dest_file = 'public/css/'

// Importing all the gulp-related packages we want to use
const sass = require('gulp-sass')(require('sass')),
	uglify = require('gulp-uglify'),
	postcss = require('gulp-postcss'),
	sourcemaps = require('gulp-sourcemaps'),
	autoprefixer = require('autoprefixer'),
	cssnano = require('cssnano'),
	merge = require('merge-stream'),
	rename = require('gulp-rename'),
	babel = require('gulp-babel');

// Source files paths (scss, js)
const src_files = {
	scss_path: 'src/scss/**/*.scss',
}

// SASS Task: compile the styles.scss file into the styels.css
function Scss_Task() {
	return src(src_files.scss_path)
		.pipe(sourcemaps.init())
		.pipe(sass())
		.pipe(postcss([autoprefixer('last 2 versions'), cssnano() ]))
		.pipe(sourcemaps.write())
		.pipe(dest(dest_file));
}

// Watch Task: watch the SCSS files for changes
// If any changes, run scss tasks
function Watch_Task() {
	watch([src_files.scss_path], parallel(Scss_Task));
}

// Export the default gulp task so it can be run
// Runs the scss tasks
// the run cacheBust, the watch task
exports.full = series(parallel(Scss_Task));

exports.watch = series(parallel(Scss_Task), Watch_Task);

exports.styles = Scss_Task;

exports.default = Scss_Task