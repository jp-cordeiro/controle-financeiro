module.exports = app => {
  const findAll = (req, res) => {
    const users = [
      {
        name: 'Johnny Silverhand',
        email: 'johnny@test.com',
      },
    ];
    res.json(users);
  };

  const create = (req, res) => {
    res.status(201).json(req.body);
  };

  return { findAll, create };
};
