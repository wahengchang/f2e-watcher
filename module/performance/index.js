
// *_*_*_*_*_*_*_*_*_*_*_*_*_*_*_*_*_*_*_*_*_*_*_*_*_*_*_*_*
// *_*_*_*_*_*_*_*_*_*_*_*_* init *_*_*_*_*_*_*_*_*_*_*_*_*
// *_*_*_*_*_*_*_*_*_*_*_*_*_*_*_*_*_*_*_*_*_*_*_*_*_*_*_*_*
var colors = require('colors');
var logSystem = require('./print').logSystem
var printTimeDiff = require('./print').printTimeDiff
var printHeaderFileInfor = require('./print').printHeaderFileInfor
var generatePadding = require('./print').generatePadding

var resourceExists = require('./utils').resourceExists

// var cookie = "AO='u=1'; B=''; F='d='; PH='';";
// var domain = "yahoo.com";
// cookie.split(";").forEach(function(pair){
//     pair = pair.split("=");
//     phantom.addCookie({
//       'name': pair[0],
//       'value': pair[1],
//       'domain': domain
//     });
// });

var casper = require('casper').create({
    verbose: true,
    logLevel: 'error',
    pageSettings: {
        loadImages:  false,        // do not load images
        loadPlugins: false         // do not load NPAPI plugins (Flash, Silverlight, ...)
    }
});


// $ casperjs ./performance/index.js "--url=https://www.waheng.co/"
var url = casper.cli.get('url')
var first = casper.cli.get('first')

// var url = 'https://tw.yahoo.com/'
console.log(colors.magenta(' ========= >  ' + url + ' : ' + first))
casper.start(url);

// *_*_*_*_*_*_*_*_*_*_*_*_*_*_*_*_*_*_*_*_*_*_*_*_*_*_*_*_*
// *_*_*_*_*_*_*_*_*_*_*_*_* END *_*_*_*_*_*_*_*_*_*_*_*_*
// *_*_*_*_*_*_*_*_*_*_*_*_*_*_*_*_*_*_*_*_*_*_*_*_*_*_*_*_*

var imageElementCount = 0 ;
var headerReceivedCount = 0 ;
var headerReceivedSize = 0 ;
var headerReceivedTime = 0 ;
var timeoutCount = 0 ;
var errorCount = 0 ;

var time0 = (new Date()).getTime()
var HTMLReceiveTime
var HTMLRequestTime
var loadFinishTime
var loadStartTime


var resources = []; // a resource contains at least 'url', 'status'
casper.on("resource.received", function(resource){

    if(resource.bodySize) headerReceivedSize += resource.bodySize
    loadInitTime = (new Date()).getTime()
    headerReceivedCount += 1;

    if(resource.stage === "start"){
        resource.startTime = (new Date()).getTime()
        resources.push(resource);
    }

    if (resource.stage == "end") {
        var _index = resources.map(function(_res) {return _res.id; }).indexOf(resource.id)
        var _r = resources[_index]
        _r.finishedTime = (new Date()).getTime()
        _r.durationTime = _r.finishedTime - _r.startTime

        if (resource.status < 200 || resource.status >= 400) {
            _r.errorCode = _r.status;
            _r.errorString = _r.statusText;
        }

    }
});
casper.on("resource.timeout", function(request){

    timeoutCount += 1;

    // console.log(' resource.timeout .......')
    request.status = -1;
    resources.push(request);
});
casper.on("resource.error", function(resourceError){
    // console.log(' resource.error .......')

    errorCount += 1;

    resourceError.status = -2;
    resources.push(resourceError);
});


casper.on("page.initialized", function(msg, trace) {
    HTMLReceiveTime = (new Date()).getTime()
    // logSystem("page.initialized: ");
});
casper.on("page.resource.received", function(msg, trace) {
    // logSystem("page.resource.received: ");
});
casper.on("page.resource.requested", function(msg, trace) {
    HTMLRequestTime = (new Date()).getTime()
    // logSystem("page.resource.requested: ");
});
casper.on("load.started", function(msg, trace) {
    loadStartTime = (new Date()).getTime()
    // logSystem("load.started: ");
});
casper.on("load.failed", function(msg, trace) {
    // logSystem("load.failed: ");
});
casper.on("load.finished", function(msg, trace) {
    loadFinishTime = (new Date()).getTime()
    // logSystem("load.finished: ");
});

casper.then(function() {

    // var elements = this.getElementsInfo("img");
    
    // imageElementCount = elements.length
    
    var fs = require('fs');
    var fileHelperFactory = require('../fileHelper');
    var fileHelper = new fileHelperFactory(fs)
    var timet = (new Date()).getTime()
    printHeaderFileInfor(resources)

    var initTime = printTimeDiff(time0, HTMLRequestTime, 'Init Time              : ')
    var httpResponseTime = printTimeDiff(HTMLRequestTime, HTMLReceiveTime, 'HTML Response          : ')
    var headerJSImageTime = printTimeDiff(HTMLReceiveTime, loadFinishTime, 'Header JS & Images     : ')
    var renderingTime = printTimeDiff(loadFinishTime, timet, 'Scripting              : ')
    var totalTime = printTimeDiff(HTMLRequestTime, timet, 'Total                  : ', 'yellow')

    var HTMLSize = resources[0].fileSize

    var reportData = {
        url: url,
        initTime: initTime,
        httpResponseTime: httpResponseTime,
        headerJSImageTime: headerJSImageTime,
        renderingTime: renderingTime,
        headerReceivedCount: headerReceivedCount,
        headerReceivedSize: headerReceivedSize,
        HTMLSize: HTMLSize,
        totalTime: totalTime
    }

    fileHelper.processReport(reportData, first)
    fileHelper.processResources(url, resources, first)
}); 


casper.run();