'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

exports.default = function (_str, _max) {
  var max = _max || 50;

  if (_str.length > max) {
    var first23Words = _str.substring(0, 23);
    var last23Words = _str.substring(_str.length - 23, _str.length);
    return first23Words + '...' + last23Words;
  } else {
    return _str;
  }
};

;