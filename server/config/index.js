/* eslint-disable global-require */

const config = {
  APP_NAME: 'docs',
  ENV: process.env.NODE_ENV || 'development',
  PORT: process.env.PORT || 3000,
  API_PORT: process.env.API_PORT || 3001,
  LOG_LEVEL: process.env.LOG_LEVEL || 'info',

  LOGSTASH_HOSTNAME: process.env.LOGSTASH_HOSTNAME,
  LOGSTASH_PORT: process.env.LOGSTASH_PORT || 5000,

  POSTGRES_URI: process.env.POSTGRES_URI,
};

export default Object.assign({}, config, require(`./${config.ENV}`).default);
