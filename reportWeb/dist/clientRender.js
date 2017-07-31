'use strict';

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

require('babel-polyfill');

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _reactDom = require('react-dom');

var _reactRedux = require('react-redux');

var _redux = require('redux');

var _reduxThunk = require('redux-thunk');

var _reduxThunk2 = _interopRequireDefault(_reduxThunk);

var _reducers2 = require('./reducers');

var _reducers3 = _interopRequireDefault(_reducers2);

var _matchConfig = require('./matchConfig');

var _matchConfig2 = _interopRequireDefault(_matchConfig);

var _reactRouterDom = require('react-router-dom');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var composeEnhancers = process.env.NODE_ENV !== 'production' && typeof window !== 'undefined' && window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ ? window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ : _redux.compose;

var initState = window.__PRELOADED_STATE__;
delete window.__PRELOADED_STATE__;

var store = (0, _redux.createStore)(_reducers3.default, initState, composeEnhancers((0, _redux.applyMiddleware)(_reduxThunk2.default)));

(0, _reactDom.render)(_react2.default.createElement(
  _reactRedux.Provider,
  { store: store },
  _react2.default.createElement(
    _reactRouterDom.StaticRouter,
    { location: window.location.pathname, context: {} },
    _react2.default.createElement(
      _reactRouterDom.Switch,
      null,
      _matchConfig2.default.map(function (route, index) {
        return _react2.default.createElement(_reactRouterDom.Route, _extends({ key: 'route' + index }, route));
      })
    )
  )
), document.getElementById('root'));