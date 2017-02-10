import bunyan from 'bunyan';
import bunyanLogstash from 'bunyan-logstash-tcp';
import config from './config';

const streams = [
  {
    level: 'info',
    stream: process.stdout,
  },
];

if (config.LOGSTASH_HOST) {
  streams.push({
    type: 'raw',
    stream: bunyanLogstash.createStream({
      host: config.LOGSTASH_HOST,
      port: config.LOGSTASH_PORT,
    }),
  });
}

export default bunyan.createLogger({
  name: config.APP_NAME,
  level: config.LOG_LEVEL,
  env: config.ENV,

  streams,
});
