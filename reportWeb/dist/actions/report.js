'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _actionType = require('../config/actionType');

var actionCreator = {
  setReport: function setReport(_report) {
    return function (dispatch, getState) {
      return dispatch({
        type: _actionType.SET_REPORT,
        report: _report
      });
    };
  }
};

exports.default = actionCreator;