'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _actionType = require('../config/actionType');

var resource = function resource() {
  var state = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : [];
  var action = arguments[1];

  switch (action.type) {
    case _actionType.SET_RESOURCE:
      return Object.assign([], state, action.resource);
    default:
      return state;
  }
};

exports.default = resource;