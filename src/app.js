import express from 'express';
import consign from 'consign';
const app = express();

consign({ cwd: 'src', verbose: 'false' })
  .include('./config/middlewares.js')
  .into(app);

app.get('/', (req, res) => {
  res.status(200).send();
});

app.get('/users', (req, res) => {
  const users = [
    {
      name: 'Johnny Silverhand',
      email: 'johnny@test.com',
    },
  ];

  res.json(users);
});

app.post('/users', (req, res) => {
  res.status(201).json(req.body);
});

module.exports = app;
