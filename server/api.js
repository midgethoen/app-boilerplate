import express from 'express';
import bodyParser from 'body-parser';
import wrap from 'express-async-wrap';
import R from 'ramda';

import auth from './middleware/auth';
import errorMiddleware from './middleware/error';
import * as unwrappedCtrls from './controllers';

const ctrls = R.map(wrap, unwrappedCtrls);

const api = express();

api.use((req, res, next) => {
  res.header('Cache-Control', 'no-cache, no-store');
  next();
});

// simple health check
api.get('/ping', (req, res) => res.send('pong'));

// the endpoints that require authentication
const authenticatedApi = express.Router();
authenticatedApi.use(auth);
// authenticatedApi.get('/secret', ctrls.getSecrets);

api.use(authenticatedApi);
api.use(errorMiddleware);

export default api;
