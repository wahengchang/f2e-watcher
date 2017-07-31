'use strict';

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

require('babel-polyfill');

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _server = require('react-dom/server');

var _server2 = _interopRequireDefault(_server);

var _redux = require('redux');

var _reduxThunk = require('redux-thunk');

var _reduxThunk2 = _interopRequireDefault(_reduxThunk);

var _reducers2 = require('./reducers');

var _reducers3 = _interopRequireDefault(_reducers2);

var _reactRedux = require('react-redux');

var _matchConfig = require('./matchConfig');

var _matchConfig2 = _interopRequireDefault(_matchConfig);

var _reactRouterDom = require('react-router-dom');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function serverRender(req, res) {
  var composeEnhancers = process.env.NODE_ENV !== 'production' && typeof window !== 'undefined' && window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ ? window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ : _redux.compose;

  var store = (0, _redux.createStore)(_reducers3.default, composeEnhancers((0, _redux.applyMiddleware)(_reduxThunk2.default)));

  var initState = void 0;
  _matchConfig2.default.some(function (route) {
    var match = (0, _reactRouterDom.matchPath)(req.url, route);

    if (match) {
      initState = route.initState;
    }

    return match;
  });

  if (initState) {
    return store.dispatch(initState(store, req, res)).then(function () {
      return renderStoreRouter(store, req, res);
    });
  }
}

function renderStoreRouter(store, req, res) {
  var context = {};
  var componentStr = _server2.default.renderToString(_react2.default.createElement(
    _reactRedux.Provider,
    { store: store },
    _react2.default.createElement(
      _reactRouterDom.StaticRouter,
      { location: req.url, context: context },
      _react2.default.createElement(
        _reactRouterDom.Switch,
        null,
        _matchConfig2.default.map(function (route, index) {
          return _react2.default.createElement(_reactRouterDom.Route, _extends({ key: 'route' + index }, route));
        })
      )
    )
  ));
  res.send(renderFullPage(componentStr, store.getState()));
}

function renderFullPage(html, preloadedState) {
  var vendorJS = '';
  var bundleCSS = '';
  if (process.env.NODE_ENV === 'development') {
    // do something
  } else {
    bundleCSS = '/static/bundle.css';
    vendorJS = '/static/vendor.js';
  }
  return '\n    <!DOCTYPE html>\n    <html>\n      <head>\n        <title>Redux Hello World</title>\n        <link rel="stylesheet" type="text/css" href=' + bundleCSS + '>\n      </head>\n      <body>\n        <div id="root">' + (process.env.NODE_ENV === 'production' ? html : '<div>' + html + '</div>') + '</div>\n        <script>\n          // WARNING: See the following for security issues around embedding JSON in HTML:\n          // http://redux.js.org/docs/recipes/ServerRendering.html#security-considerations\n          window.__PRELOADED_STATE__ = ' + JSON.stringify(preloadedState).replace(/</g, '\\u003c') + '\n        </script>\n        <script src=' + vendorJS + '></script>\n        <script src="/static/bundle.js"></script>\n      </body>\n    </html>\n    ';
}

module.exports = serverRender;