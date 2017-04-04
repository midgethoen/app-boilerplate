/* eslint: no-shadow */
import 'babel-polyfill';

import path from 'path';
import webpack from 'webpack';
import express from 'express';
import WebpackDevServer from 'webpack-dev-server';
import historyApiFallback from 'connect-history-api-fallback';
import bunyanMiddleware from 'bunyan-middleware';
import Promise from 'bluebird';

import config from './config';
import log from './logger';

import api from './api';

Promise.config({ warnings: false });
global.Promise = Promise;

express.static.mime.define({ 'text/cache-manifest': ['appcache'] });

const logger = bunyanMiddleware({
  logger: log,
  obscureHeaders: ['Authorization'],
  requestStart: true,
});

if (config.ENV === 'development') {
  const webpackConfig = require('../webpack.config');
  const apiServer = express();
  apiServer.use(logger);
  apiServer.use('/', api);
  apiServer.listen(config.API_PORT, () => log.info(`ApiServer is listening on port ${config.API_PORT}`));

  const devServer = new WebpackDevServer(webpack(webpackConfig), {
    contentBase: '/build/',
    proxy: {
      '/api/**': {
        target: `http://localhost:${config.API_PORT}`,
        pathRewrite: { '^/api': '/' },
      },
    },
    stats: { colors: true },
    hot: true,
    historyApiFallback: true,
  });
  devServer.use('/', express.static(path.join(__dirname, '../build')));
  devServer.listen(config.PORT, () => log.info(`Dev-server is listening on port ${config.PORT}`));
} else {
  const server = express();
  server.use('/api', api);
  server.use(historyApiFallback());
  server.use('/', express.static(
    path.join(__dirname, '../build'),
    { dotfiles: 'allow' }
  ));
  server.listen(config.PORT, () => log.info(`Server is listening on port ${config.PORT}`));
}
