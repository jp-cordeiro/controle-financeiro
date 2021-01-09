import request from 'supertest';
import app from '../../src/app';

const MAIN_ROUTE = '/accounts';
let user;

beforeAll(async () => {
  await app.db.raw('truncate table users cascade');
  const userInserted = await app.services.users.save({
    name: 'Vincent',
    email: 'v@test.com',
    password: 'test',
  });

  user = { ...userInserted[0] };
});

test('insert account', async () => {
  const res = await request(app)
    .post(MAIN_ROUTE)
    .send({ name: 'Acc 1', user_id: user.id });

  expect(res.status).toBe(201);
  expect(res.body.name).toEqual('Acc 1');
});

test('list all counts', async () => {
  const res = await request(app).get(MAIN_ROUTE);

  expect(res.status).toBe(200);
  expect(res.body.length).toBe(1);
});
