import request from 'supertest';
import app from '../../src/app';

beforeAll(async () => {
  await app.db('users').truncate();
});

test('insert user', async () => {
  const res = await request(app)
    .post('/users')
    .send({ name: 'Vincent', email: 'v@test.com', password: 'test' });

  expect(res.status).toBe(201);
  expect(res.body.name).toBe('Vincent');
});

test('list all users', async () => {
  const res = await request(app).get('/users');
  expect(res.status).toBe(200);
  expect(res.body).toHaveLength(1);
  expect(res.body[0]).toHaveProperty('email', 'v@test.com');
});
