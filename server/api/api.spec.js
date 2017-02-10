import request from 'supertest';
import api from './';

describe('GET /ping', () => {
  it('should respond with pong', async () => {
    const res = await request(api)
      .get('/ping')
      .expect(200);

    res.text.should.equal('pong');
  });
});
