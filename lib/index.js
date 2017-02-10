'use strict';

require('babel-polyfill');

var _path = require('path');

var _path2 = _interopRequireDefault(_path);

var _webpack = require('webpack');

var _webpack2 = _interopRequireDefault(_webpack);

var _express = require('express');

var _express2 = _interopRequireDefault(_express);

var _webpackDevMiddleware = require('webpack-dev-middleware');

var _webpackDevMiddleware2 = _interopRequireDefault(_webpackDevMiddleware);

var _connectHistoryApiFallback = require('connect-history-api-fallback');

var _connectHistoryApiFallback2 = _interopRequireDefault(_connectHistoryApiFallback);

var _bunyanMiddleware = require('bunyan-middleware');

var _bunyanMiddleware2 = _interopRequireDefault(_bunyanMiddleware);

var _webpack3 = require('../webpack.config');

var _webpack4 = _interopRequireDefault(_webpack3);

var _config = require('./config');

var _config2 = _interopRequireDefault(_config);

var _logger = require('./logger');

var _logger2 = _interopRequireDefault(_logger);

var _api = require('./api');

var _api2 = _interopRequireDefault(_api);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var server = (0, _express2.default)(); /* eslint: no-shadow */

server.use((0, _bunyanMiddleware2.default)({
  logger: _logger2.default,
  obscureHeaders: ['Authorization'],
  requestStart: true
}));
server.use('/api', _api2.default);

if (_config2.default.ENV === 'development') {
  var devServer = new _webpackDevMiddleware2.default((0, _webpack2.default)(_webpack4.default), {
    contentBase: '/build/',
    proxy: {
      '/api/**': {
        target: 'http://localhost:' + _config2.default.API.PORT,
        pathRewrite: { '^/api': '/' }
      }
    },
    stats: { colors: true },
    noInfo: true,
    hot: true,
    historyApiFallback: true
  });
  server.use('/', devServer);
} else if (_config2.default.ENV === 'production') {
  server.use((0, _connectHistoryApiFallback2.default)());
}

server.use('/', _express2.default.static(_path2.default.join(__dirname, '../build')));
server.listen(_config2.default.PORT, function () {
  return _logger2.default.info('Server is listening on port %s', _config2.default.PORT);
});