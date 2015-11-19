var elixir = require('laravel-elixir');
var minifyHTML = require('gulp-minify-html');
var gulp = require('gulp');

/*
 |--------------------------------------------------------------------------
 | Elixir Asset Management
 |--------------------------------------------------------------------------
 |
 | Elixir provides a clean, fluent API for defining some basic Gulp tasks
 | for your Laravel application. By default, we are compiling the Sass
 | file for our application, as well as publishing vendor resources.
 |
 */

var task = elixir.Task;

elixir.extend('html', function() {
    new task('html', function() {
        var opts = {
            empty: false, 
            cdata: false, 
            comments: false,
            conditionals: false, 
            spare: false, 
            quotes: true, 
            loose: false
        };

        return gulp.src('./resources/assets/html/backend/**/*.html')
            .pipe(minifyHTML(opts))
            .pipe(gulp.dest('./public/partials/backend'));
    })
    .watch('./resources/assets/html/backend/**/*.html');
});

elixir(function(mix) {
    mix
        .html()
        .less('backend/app.less', 'public/css/backend')
        .scripts('backend', 'public/js/backend/app.js')
        // .scripts([
        //     '../../../vendor/bower_components/lodash/lodash.min.js', 
        //     '../../../vendor/bower_components/jquery/dist/jquery.min.js', 
        //     '../../../vendor/bower_components/bootstrap/dist/js/bootstrap.min.js', 
        //     '../../../vendor/bower_components/jquery-placeholder/jquery.placeholder.min.js', 
        //     '../../../vendor/bower_components/jquery-scrollLock/jquery-scrollLock.min.js', 
        //     '../../../vendor/bower_components/remarkable-bootstrap-notify/dist/bootstrap-notify.min.js', 
        //     '../../../vendor/bower_components/slimScroll/jquery.slimscroll.min.js', 
        //     '../../../vendor/bower_components/Chart.js/Chart.min.js', 
        //     '../../../vendor/bower_components/moment/min/moment-with-locales.min.js', 
        //     '../../../vendor/bower_components/fullcalendar/dist/fullcalendar.min.js', 
        //     '../../../vendor/bower_components/angular/angular.min.js', 
        //     '../../../vendor/bower_components/angular-route/angular-route.min.js', 
        //     '../../../vendor/bower_components/angular-sanitize/angular-sanitize.min.js',  
        //     '../../../vendor/bower_components/angular-strap/dist/angular-strap.min.js',  
        //     '../../../vendor/bower_components/angular-strap/dist/angular-strap.tpl.min.js',  
        //     '../../../vendor/bower_components/angular-chart.js/dist/angular-chart.min.js', 
        //     '../../../vendor/bower_components/angular-ui-calendar/src/calendar.js', 
        //     ], 
        //     'public/js/backend/app-libs.js')
        ;

});
