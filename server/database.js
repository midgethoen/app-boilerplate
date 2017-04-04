import Promise from 'bluebird';
import config from './config';

const pgp = require('pg-promise')({
  promiseLib: Promise,
});

// Convert bigserial + bigint (both with typeId = 20) to integer:
pgp.pg.types.setTypeParser(20, value => parseInt(value, 10));

if (!config.POSTGRES_URI) {
  throw new Error('POSTGRES_URI is not configured');
}

let db;
export default async function getDb() {
  if (!db) {
    db = await pgp(config.POSTGRES_URI);
  }
  return db;
}
