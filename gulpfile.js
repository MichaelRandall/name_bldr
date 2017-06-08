var gulp = require('gulp')
var useref = require('gulp-useref')
var gulpIf = require('gulp-if')
var uglify = require('gulp-uglify')
var prefix = require('gulp-prefix')
var clean = require('gulp-clean')

var babel = require('gulp-babel');

//moves all files to a safe directory
gulp.task('move_collats', function(){
	return gulp.src('app_custom/**')
		.pipe(gulp.dest('dist/app_custom'));
});

//transpiles from ES6 to early JavaScript
gulp.task('transpile', function(){
	//return gutil.log('Gulp is running');
	return gulp.src('dist/app_custom/js/*.js')
	  .pipe(babel({
	    presets: ['es2015']
	  }))
	  .pipe(gulp.dest('dist/app_custom/js/'));
});

//concatenates all JS files and minifies
gulp.task('concat', function(){
	return gulp.src('dist/app_custom/*.html')
		.pipe(useref())
		//uncomment to minify the js scripts
		//.pipe(gulpIf('*.js', uglify()))
		.pipe(gulp.dest('dist/app_custom'));
});

//prefixes the urls for local testing with URL for distribution
gulp.task('prefixurl', function(){
	var prefixUrl = "https://staging-team.usace.army.mil/sites/sandbox/WW/MR/Custom%20Code/app_custom";
	gulp.src('dist/app_custom/snbApp.html')
		.pipe(prefix(prefixUrl, [{ match: "script[src]", attr: "src" },{ match: "link[href]", attr: "href" }], '{{'))
		.pipe(gulp.dest('dist/app_custom'));
});

gulp.task('remove_xtra', function(){
	return gulp.src(['dist/app_custom/js/*','!dist/app_custom/js/main.min.js'], {read:false})
		.pipe(clean())
		.pipe(gulp.dest('dist/app_custom/js'));
});