'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _actionType = require('../config/actionType');

var actionCreator = {
  setResource: function setResource(_resource) {
    return function (dispatch, getState) {
      return dispatch({
        type: _actionType.SET_RESOURCE,
        resource: _resource
      });
    };
  }
};

exports.default = actionCreator;