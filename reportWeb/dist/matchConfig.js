'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _PreloadHelloWorld = require('./containers/PreloadHelloWorld');

var _PreloadHelloWorld2 = _interopRequireDefault(_PreloadHelloWorld);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var matchConfig = [{
  path: '/preload',
  component: _PreloadHelloWorld2.default,
  initState: _PreloadHelloWorld2.default.initState,
  exact: false
}];

exports.default = matchConfig;