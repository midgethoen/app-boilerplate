'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
/* eslint-disable global-require */

var config = {
  APP_NAME: 'myApp',
  ENV: process.env.NODE_ENV || 'development',
  PORT: process.env.PORT || 3000,
  LOG_LEVEL: process.env.LOG_LEVEL || 'info',
  JWT_SECRET: process.env.JWT_SECRET || 'bad-secret',
  API: {
    PORT: 8000
  }
};

exports.default = Object.assign({}, config, require('./' + config.ENV).default);