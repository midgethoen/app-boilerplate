import bunyan from 'bunyan';
import bunyanLogstash from 'bunyan-logstash-tcp';
import config from './config';

const streams = [
  {
    stream: process.stdout,
  },
];

if (config.LOGSTASH_HOSTNAME) {
  streams.push({
    type: 'raw',
    stream: bunyanLogstash.createStream({
      host: config.LOGSTASH_HOSTNAME,
      port: config.LOGSTASH_PORT,
    }),
  });
}

export default bunyan.createLogger({
  name: config.APP_NAME,
  env: config.ENV,
  level: config.LOG_LEVEL,

  streams,
});
