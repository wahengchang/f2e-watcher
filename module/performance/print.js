
var colors = require('colors');
var getFieldMaxLength = require('./utils').getFieldMaxLength
var fieldConverter = require('./utils').fieldConverter


var logSystem = function(message){
    console.log(colors.green(message))
}

var printTimeDiff = function(t0, t1, message, _color){
    var _time = (t1 - t0)/1000
    var _message = message || ' Spend : '
    var _c = colors[_color] || colors.blue
     
    console.log(_c(_message + _time + 's'))

    return t1 - t0
}

var generatePadding = function(_n){
    var n = _n || 10
    var space = ' '
    var returnStr = ''

    for(var i =0 ; i<n ; i++){
        returnStr += space
    }

    return (returnStr)
}

var printHeaderFileInfor = function(_resources) {
    console.log(colors.green('*_*_*_*_*_* Header File *_*_*_*_*_*'))
    var _maxFileName = getFieldMaxLength(_resources, 'fileName')
    var _maxFileSize = getFieldMaxLength(_resources, 'fileSize')
    var _maxDurationTime = getFieldMaxLength(_resources, 'durationTime')

    for(var i=0; i<_resources.length; i++){
        var res = _resources[i]
        var fileName = (generatePadding(_maxFileName) + fieldConverter(res, 'fileName')).slice( -1 * _maxFileName)
        var fileSize = (generatePadding(_maxFileSize) + fieldConverter(res, 'fileSize')).slice( -1 * _maxFileSize)
        var durationTime = (generatePadding(_maxDurationTime) + fieldConverter(res, 'durationTime')).slice( -1 * _maxDurationTime)
        console.log(colors.green(fileName, ' : ', fileSize, ' : ', durationTime))
    }

}

module.exports = {
    logSystem: logSystem,
    generatePadding: generatePadding,
    printHeaderFileInfor: printHeaderFileInfor,
    printTimeDiff: printTimeDiff
}