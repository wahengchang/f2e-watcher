
var onlyCharNumber = require('../performance/utils').onlyCharNumber

var fileHelper = function (fs){
  this.fs = fs
}

fileHelper.prototype.processReport = function (reportData, first){
    var fs = this.fs
    var reportFilePath = './report.json'
    var _existed 
    if(first) {
        //delete ./report.json
        _existed = []
        fs.write(reportFilePath, [] ,"w");
    } else {
        //append ./report.json
        _existed = JSON.parse(fs.read(reportFilePath))
    }
    _existed.push(reportData)
    fs.write(reportFilePath, JSON.stringify(_existed) ,"w")
}


// fileHelper.prototype.processResources = function (resourceName, resourceData){
//     var fs = this.fs
//     var resourceFilePath = './resources/'+onlyCharNumber(resourceName) +'.json'

//     fs.write(resourceFilePath, JSON.stringify(resourceData) ,"w")
// }

fileHelper.prototype.processResources = function (resourceUrl, resourceData, first){
    var fs = this.fs
    var resourceFilePath = './resources.json'

    var _existed 
    if(first) {
        //delete ./report.json
        _existed = []
        fs.write(resourceFilePath, [] ,"w");
    } else {

        //append ./report.json
        _existed = JSON.parse(fs.read(resourceFilePath))
    }

    _existed.push({
        url : resourceUrl,
        data : resourceData
    })

    fs.write(resourceFilePath, JSON.stringify(_existed) ,"w")
}

module.exports = fileHelper