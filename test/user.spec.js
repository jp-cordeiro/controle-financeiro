import request from 'supertest';
import app from '../src/app';

test('list all users', async () => {
  return request(app)
    .get('/users')
    .then(res => {
      expect(res.status).toBe(200);
      expect(res.body).toHaveLength(1);
      expect(res.body[0]).toHaveProperty('name', 'Johnny Silverhand');
    });
});
