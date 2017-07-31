'use strict';

require('babel-register');

var app = new (require('express'))();
var port = 3000;

require('css-modules-require-hook')({
  generateScopedName: '[name]__[local]___[hash:base64:5]'
});

// initalize webpack dev middleware if in development context
if (process.env.NODE_ENV === 'development') {
  var webpack = require('webpack');
  var config = require('../webpack.config');

  var devMiddleware = require('webpack-dev-middleware');
  var hotDevMiddleware = require('webpack-hot-middleware');
  var compiler = webpack(config);
  var devMiddlewareConfig = {
    noInfo: true,
    stats: { colors: true },
    publicPath: config.output.publicPath
  };

  app.use(devMiddleware(compiler, devMiddlewareConfig));
  app.use(hotDevMiddleware(compiler));
}

app.use(require('express').static(__dirname + '/public'));

var serverRender = require('./serverRender');

app.get("*", serverRender);

app.listen(port, function (error) {
  if (error) {
    console.error(error);
  } else {
    console.info("==> 🌎  Listening on port %s. Open up http://localhost:%s/ in your browser.", port, port);
  }
});