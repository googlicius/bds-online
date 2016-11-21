var gulp = require('gulp');
var concat = require('gulp-concat');
var uglify = require('gulp-uglify');
var pump = require('pump');
var cleanCSS = require('gulp-clean-css');
const del = require('del');

gulp.task('minify_and_concat_css', function(cb){
	var files = [
		'src/assets/templates/flatlab/css/bootstrap.min.css',
		'src/assets/templates/flatlab/css/bootstrap-reset.css',
		'src/assets/templates/flatlab/css/slidebars.css',
		'src/assets/templates/flatlab/css/style.css',
		'src/assets/templates/flatlab/css/style-responsive.css',
	];
	pump([
		gulp.src(files),
		concat('style.min.css'),
		cleanCSS({compatibility: 'ie8'}),
		gulp.dest('src/assets/templates/flatlab/dist/')
	],cb)
});

/**
 * This task to concat and uglify javascript files of the template
 * And these javascript files are not aparts of Angular project.
 */
gulp.task('concat_and_uglify_js', function(cb){
	var files = [
		'src/assets/templates/flatlab/js/jquery.js',
		'src/assets/templates/flatlab/js/bootstrap.min.js',
		'src/assets/templates/flatlab/js/jquery.dcjqaccordion.2.7.js',
		'src/assets/templates/flatlab/js/jquery.scrollTo.min.js',
		'src/assets/templates/flatlab/js/slidebars.min.js',
		'src/assets/templates/flatlab/js/jquery.nicescroll.js',
		'src/assets/templates/flatlab/js/respond.min.js',
		'src/assets/templates/flatlab/js/common-scripts.js',
	];

	pump([
		gulp.src(files),
		concat('scripts.js'),
		uglify(),
		gulp.dest('src/assets/templates/flatlab/dist/')
	],cb)
});

gulp.task('default', ['minify_and_concat_css','concat_and_uglify_js']);