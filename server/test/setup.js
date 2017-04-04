import 'babel-polyfill';
import Promise from 'bluebird';
Promise.config({ warnings: false });
global.Promise = Promise;

import chai from 'chai';
import sinonChai from 'sinon-chai';

chai.use(sinonChai);

/* eslint-disable no-undef */
process.env.NODE_ENV = 'test';

chai.should();
