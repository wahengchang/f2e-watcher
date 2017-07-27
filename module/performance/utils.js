
var resourceExists = function (url){
    // console.log(' url: ', url)
    resources.forEach(function(res){
        if (res.url.indexOf(url) !== -1) {
            return res;
        }
    });
    return null;
}

var fieldConverter = function(_res, _field){
    if(_field === 'fileName')
        return (_res.url.split('/').pop())
    else if(_field === 'fileSize')
        return ((_res.bodySize / 1000 ) + 'kb')
    else if(_field === 'durationTime')
        return ((_res.durationTime / 1000) + 's')
}

var getFieldMaxLength = function(_resources, _field){
    var MAX = 0
    for(var i=1; i<_resources.length; i++){
        var res = _resources[i]

        var _l = fieldConverter(res, _field).length

        MAX = (MAX > _l) ? MAX : _l
    }
    return MAX
}

var onlyCharNumber = function(str) {
  var t = str.replace(/[^a-zA-Z0-9_]/g, '')
  return t
}

module.exports = {
    resourceExists: resourceExists,
    fieldConverter: fieldConverter,
    onlyCharNumber: onlyCharNumber,
    getFieldMaxLength: getFieldMaxLength
}