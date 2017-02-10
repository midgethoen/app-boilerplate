import express from 'express';
import bodyParser from 'body-parser';
import wrap from 'express-async-wrap';
import R from 'ramda';

// import auth from './middleware/auth';
// import error from './middleware/error';
// import contextUtils from './middleware/contextUtilsMiddleware';
// import * as unwrappedControllers from './controllers';

// const controllers = R.map(wrap, unwrappedControllers);

const api = express();

// simple health check
api.get('/ping', (req, res) => res.send('pong'));

export default api;
