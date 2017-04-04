import getDb from './database';

describe('database', () => {
  it('should connect', async () => {
    const db = await getDb();
    const result = await db.one("select 'koek' as blik;");
    result.should.deep.equal({ blik: 'koek' });
  });

  it('returns bigint as a numeric type', async () => {
    const db = await getDb();
    const result = await db.one('select 1::bigint as bigint;');
    result.should.deep.equal({ bigint: 1 });
  });
});
