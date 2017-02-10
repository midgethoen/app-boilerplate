import bunyan, { TRACE } from 'bunyan';

import config from './config';

export default bunyan.createLogger({
  name: config.APP_NAME,
  level: config.LOG_LEVEL,

  env: config.ENV,
});
