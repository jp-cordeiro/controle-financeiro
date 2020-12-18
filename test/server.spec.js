import supertest from 'supertest';
const request = supertest('http://localhost:3001');

test('reply on port 3001', async () => {
  const res = await request.get('/');
  expect(res.status).toBe(200);
});
