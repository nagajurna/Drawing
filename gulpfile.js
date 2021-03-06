const gulp = require('gulp');
const babel = require('gulp-babel');
const uglify = require('gulp-uglify');
const concat = require('gulp-concat');
const cleanCSS = require('gulp-clean-css');
const htmlmin = require('gulp-htmlmin');
var sourcemaps = require('gulp-sourcemaps');

const paths = {
	scripts: 'src/javascripts/*.js',
	css: 'src/stylesheets/*.css',
	html: 'src/*.html'
};
 
gulp.task('scripts', () => {
    return gulp.src(paths.scripts)
		.pipe(sourcemaps.init())
			.pipe(babel({
				presets: ['es2015']
			}))
			.pipe(uglify())
			.pipe(concat('script.js'))
		.pipe(sourcemaps.write())
        .pipe(gulp.dest('public/javascripts'));
});

gulp.task('minify-css', () => {
    return gulp.src(paths.css)
        .pipe(cleanCSS())
        .pipe(gulp.dest('public/stylesheets'));
});

gulp.task('minify-html', () => {
    return gulp.src(paths.html)
        .pipe(htmlmin({collapseWhitespace: true}))
        .pipe(gulp.dest('public'));
});

gulp.task('watch', function() {
  gulp.watch(paths.scripts, ['scripts']);
  gulp.watch(paths.css, ['minify-css']);
  gulp.watch(paths.html, ['minify-html']);
});


gulp.task('default', ['watch', 'scripts', 'minify-css', 'minify-html']);
