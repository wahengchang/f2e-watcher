'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _actionType = require('../config/actionType');

var report = function report() {
  var state = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : [];
  var action = arguments[1];

  switch (action.type) {
    case _actionType.SET_REPORT:
      return Object.assign([], state, action.report);
    default:
      return state;
  }
};

exports.default = report;