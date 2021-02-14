var themename = '../InsideUp';

// You can declare multiple variables with one statement by starting with var and seperate the variables with a comma and span multiple lines.
// Below are all the Gulp Plugins we're using.
var gulp          = require('gulp'),  
      autoprefixer = require( 'gulp-autoprefixer' ),
      browserSync  = require( 'browser-sync' ).create(),
      reload  = browserSync.reload,      
      sass  = require( 'gulp-sass' ),
      concat  = require( 'gulp-concat' ),
      cleanCSS  = require( 'gulp-clean-css' ),
      sourcemaps  = require( 'gulp-sourcemaps' ),
      uglify  = require( 'gulp-uglify' ),
      lineec  = require( 'gulp-line-ending-corrector' );
        

    var root                 =  './' + themename + '/',
        cssRoot              = root + 'css/', 
        all_css              = cssRoot + '**/*.css',        
        scssRoot             = root + 'scss/',
        all_scss             = scssRoot + '**/*.scss',        
        htmlWatchFiles         = root + '**/*.html',
        phpWatchfiles         = root + '**/*.php';
     
  
     function convert_scss() {
      return gulp.src(scssRoot+'style.scss')           
      .pipe(sass({
        outputStyle: 'expanded'
      }).on('error', sass.logError))
      .pipe(autoprefixer('last 2 versions'))       
      .pipe(lineec())
      .pipe(gulp.dest([cssRoot]));
    }

    function concatCSS() {
      return gulp.src(all_css)        
      .pipe(concat('all_min.css'))      
      .pipe(cleanCSS())       
      .pipe(lineec()) 
      .pipe(gulp.dest([root]));
    }    
     

function watch() {
    browserSync.init({
      open: 'external',
      proxy: 'http://localhost/HTML/InsideUp/',
    });

    gulp.watch(all_scss, gulp.series([convert_scss, concatCSS])); // Scss to Css and then Css to minify
    
    gulp.watch([htmlWatchFiles, phpWatchfiles, root+'all_min.css']).on('change', reload);
}

exports.css = convert_scss;
exports.concatCSS = concatCSS;
exports.watch = watch;

//const build = gulp.series(watch);
var build = gulp.parallel(watch);
gulp.task('default', build);
