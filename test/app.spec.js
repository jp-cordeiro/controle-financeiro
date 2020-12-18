import request from 'supertest';

import app from '../src/app';

test('reply on root', async () => {
  return request(app)
    .get('/')
    .then(res => {
      expect(res.status).toBe(200);
    });
});
