import httpMocks from 'node-mocks-http';
import { expect } from 'chai';
import authMiddleware from './auth';
import { createAccessToken } from '../test/utils';

describe('authMiddleware', () => {
  let request;
  let response;
  const token = createAccessToken();

  beforeEach(async () => {
    request = httpMocks.createRequest({
      method: 'GET',
      url: '/user/42',
      params: {
        id: 42,
      },
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    response = httpMocks.createResponse();
  });

  it('should check if a valid auth-token is present', (done) => {
    authMiddleware(request, response, () => {
      done();
    });
  });

  it('should reply 401 if a valid auth-token is absent', async () => {
    request = httpMocks.createRequest({});
    await authMiddleware(request, response);
    response.statusCode.should.equal(401);
  });

  it('should reply 401 if a valid auth-token is invalid', async () => {
    request = httpMocks.createRequest({
      headers: {
        Authorization: 'JWT invalid',
      },
    });
    await authMiddleware(request, response);
    response.statusCode.should.equal(401);
  });

  it('should augment the req-object with the requesting user', (done) => {
    authMiddleware(request, response, () => {
      // next
      expect(request.user).to.be.ok;
      request.user.id.should.equal(123);
      request.user.username.should.equal('midge');
      done();
    });
  });
});
