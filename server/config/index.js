/* eslint-disable global-require */

const config = {
  APP_NAME: 'myApp',
  ENV: process.env.NODE_ENV || 'development',
  PORT: process.env.PORT || 3000,
  LOG_LEVEL: process.env.LOG_LEVEL || 'info',
  JWT_SECRET: process.env.JWT_SECRET || 'bad-secret',
  API: {
    PORT: 8000,
  },
};

export default Object.assign({}, config, require(`./${config.ENV}`).default);
