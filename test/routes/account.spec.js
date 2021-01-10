import request from 'supertest';
import app from '../../src/app';

const MAIN_ROUTE = '/accounts';
let user;

beforeAll(async () => {
  await app.db.raw('TRUNCATE TABLE users RESTART IDENTITY CASCADE');

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

test('returns account by account id', async () => {
  const res = await request(app).get(`${MAIN_ROUTE}/1`);

  expect(res.status).toBe(200);
  expect(res.body.id).toBe(1);
  expect(res.body.name).toBe('Acc 1');
});

test('alter an account by id', async () => {
  const accountToUpdate = { id: 1, name: 'Acc altered', user_id: user.id };
  const res = await request(app)
    .put(`${MAIN_ROUTE}/1`)
    .send(accountToUpdate);
  const accountAltered = await request(app).get(`${MAIN_ROUTE}/1`);

  expect(res.status).toBe(201);
  expect(accountAltered.body).toEqual(accountToUpdate);
});

test('delete an account by id', async () => {
  const resUser = await request(app).get(`${MAIN_ROUTE}/1`);

  expect(resUser.status).toBe(200);
  expect(resUser.body.id).toBe(1);

  const res = await request(app).delete(`${MAIN_ROUTE}/1`);
  expect(res.status).toBe(204);
  expect(res.body).toEqual({});

  const resNotUser = await request(app).get(`${MAIN_ROUTE}/1`);
  expect(resNotUser.status).toBe(204);
  expect(resNotUser.body).toEqual({});
});

test('cant insert account without name', async () => {
  const res = await request(app)
    .post(MAIN_ROUTE)
    .send({ user_id: user.id });
  expect(res.status).toBe(400);
  expect(res.body.error).toBe('Name is a required property');
});

test('cant insert account without user_id', async () => {
  const res = await request(app)
    .post(MAIN_ROUTE)
    .send({ name: 'Acc 2' });
  expect(res.status).toBe(400);
  expect(res.body.error).toBe('User_id is a required property');
});
