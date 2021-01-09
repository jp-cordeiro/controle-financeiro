import request from 'supertest';
import app from '../../src/app';

async function truncateUsers() {
  await app.db.raw('truncate table users cascade');
}

beforeAll(async () => {
  await truncateUsers();
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

test('cant insert user without name', async () => {
  const res = await request(app)
    .post('/users')
    .send({ email: 'v@test.com', password: 'test' });
  expect(res.status).toBe(400);
  expect(res.body.error).toBe('Name is a required property');
});

test('cant insert user without email', async () => {
  const res = await request(app)
    .post('/users')
    .send({ name: 'Vincent', password: 'test' });
  expect(res.status).toBe(400);
  expect(res.body.error).toBe('Email is a required property');
});

test('cant insert user without password', async () => {
  const res = await request(app)
    .post('/users')
    .send({ name: 'Vincent', email: 'v@test.com' });
  expect(res.status).toBe(400);
  expect(res.body.error).toBe('Password is a required property');
});

test('cant insert duplicate user email', async () => {
  const res = await request(app)
    .post('/users')
    .send({ name: 'Vincent', email: 'v@test.com', password: 'test' });

  expect(res.status).toBe(400);
  expect(res.body.error).toBe('There is already a user with that email');
});
