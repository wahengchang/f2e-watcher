// var child_process = require('child_process');

// var url1 = 'https://tw.yahoo.com'
// var url2 = 'https://www.npmjs.com'
// var url3 = 'https://www.waheng.co/'



var urls = require('../../config.json').urls

var shell = require('./child_helper');


var commandConverter = (_urls) => urls.map( url => 'npm start -- --url=' + url)
var commandList = commandConverter (urls)

commandList[0] += ' --first=true'

commandList.push('npm run report')

shell.series(commandList , function(err){
//    console.log('executed many commands in a row'); 
    console.log('done')
});