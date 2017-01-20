const gulp = require('gulp');
const babel = require('gulp-babel');
const uglify = require('gulp-uglify');
const concat = require('gulp-concat');

const paths = {
	scripts: 'src/javascripts/*.js'
};
 
gulp.task('scripts', () => {
    return gulp.src(paths.scripts)
        .pipe(babel({
            presets: ['es2015']
        }))
        .pipe(uglify())
        .pipe(concat('all.js'))
        .pipe(gulp.dest('public/javascripts'));
});

gulp.task('watch', function() {
  gulp.watch(paths.scripts, ['scripts']);
});


gulp.task('default', ['watch', 'scripts']);
