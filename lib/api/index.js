'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _express = require('express');

var _express2 = _interopRequireDefault(_express);

var _bodyParser = require('body-parser');

var _bodyParser2 = _interopRequireDefault(_bodyParser);

var _expressAsyncWrap = require('express-async-wrap');

var _expressAsyncWrap2 = _interopRequireDefault(_expressAsyncWrap);

var _ramda = require('ramda');

var _ramda2 = _interopRequireDefault(_ramda);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// import auth from './middleware/auth';
// import error from './middleware/error';
// import contextUtils from './middleware/contextUtilsMiddleware';
// import * as unwrappedControllers from './controllers';

// const controllers = R.map(wrap, unwrappedControllers);

var api = (0, _express2.default)();

// simple health check
api.get('/ping', function (req, res) {
  return res.send('pong');
});

exports.default = api;