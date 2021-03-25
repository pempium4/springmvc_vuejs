const gulp = require('gulp');
const gulpConcat = require('gulp-concat');
const gulpCleanCSS = require('gulp-clean-css');
const gulpUglify = require('gulp-uglify');
const del = require('del');
const gulpSass = require('gulp-sass');
const gulpSourceMaps = require('gulp-sourcemaps');
const gulpRename = require('gulp-rename');

gulp.task('del', () => {
    return del(['./src/main/resources/static/build*']);
});
gulp.task('styles', () =>{
    return gulp.src('./src/main/resources/static/scss/**/*.scss')
        .pipe(gulpSourceMaps.init())
        .pipe(gulpSass().on('Error', gulpSass.logError))
        .pipe(gulpConcat('style.css'))
        .pipe(gulpCleanCSS())
        .pipe(gulpRename({
            suffix: '.min'
        }))
        .pipe(gulpSourceMaps.write('./'))
        .pipe(gulp.dest('./src/main/resources/static/build/'));
});
gulp.task('scripts', () => {
    return gulp.src('./src/main/resources/static/js/**/*.js')
        .pipe(gulpConcat('main.js'))
        .pipe(gulpUglify({
            toplevel: true
        }))
        .pipe(gulpRename({
            suffix: '.min'
        }))
        .pipe(gulp.dest('./src/main/resources/static/build/'));
});
gulp.task('watch', () => {
    gulp.watch('./src/main/resources/static/scss/**/*.scss', gulp.series('styles'));
    gulp.watch('./src/main/resources/static/js/**/*.js', gulp.series('scripts'));
})
gulp.task('default', gulp.series('del', gulp.parallel('styles', 'scripts'), 'watch'));