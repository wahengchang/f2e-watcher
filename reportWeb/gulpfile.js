
/* File: gulpfile.js */

// grab our gulp packages
var gulp  = require('gulp')
var resourceUtil  = require('./src/utils/resource')
// var gutil = require('gulp-util')

// // create a default task and just log a message
// gulp.task('default', function() {
//   return gutil.log('Gulp is running ..... by Peter')
// });


gulp.task('default', function() {
  // copy any html files in source/ to public/
  console.log('going to copy ...')
//   gulp.src('source/*.html').pipe(gulp.dest('public'));

    resourceUtil().then(function(data){
        console.log('data.length: ', data.length)
    })

});
