/* eslint: no-shadow */
import 'babel-polyfill';

import path from 'path';
import webpack from 'webpack';
import express from 'express';
import WebpackDevMiddleware from 'webpack-dev-middleware';
import historyApiFallback from 'connect-history-api-fallback';
import bunyanMiddleware from 'bunyan-middleware';


import webpackConfig from '../webpack.config';
import config from './config';
import log from './logger';

import api from './api';

const server = express();
server.use(bunyanMiddleware({
  logger: log,
  obscureHeaders: ['Authorization'],
  requestStart: true,
}));
server.use('/api', api);

if (config.ENV === 'development') {
  const devServer = new WebpackDevMiddleware(webpack(webpackConfig), {
    contentBase: '/build/',
    proxy: {
      '/api/**': {
        target: `http://localhost:${config.API.PORT}`,
        pathRewrite: { '^/api': '/' },
      },
    },
    stats: { colors: true },
    noInfo: true,
    hot: true,
    historyApiFallback: true,
  });
  server.use('/', devServer);
} else if (config.ENV === 'production') {
  server.use(historyApiFallback());
}

server.use('/', express.static(path.join(__dirname, '../build')));
server.listen(
    config.PORT,
    () => log.info('Server is listening on port %s', config.PORT)
  );
