'use strict';

var fs = require('fs');

var fileList = function fileList(filePath) {
    return new Promise(function (resolve, reject) {
        fs.readdir(filePath, function (err, files) {
            if (err) resolve([]);else resolve(files);
        });
    });
};

var _read = function _read(fullFileName) {
    return new Promise(function (resolve, reject) {
        fs.readFile(fullFileName, 'utf8', function (err, data) {
            if (err) reject(err);else resolve(data);
        });
    });
};

var fetchResourceData = function fetchResourceData() {
    return new Promise(function (resolve, reject) {
        var resourcePath = '../resources/';
        return fileList(resourcePath).then(function (list) {
            Promise.all(list.map(function (fileName) {
                return _read(resourcePath + fileName);
            }));
        }).then(function (readResult) {
            return resolve(readResult);
        });
    });
};

module.exports = fetchResourceData;