module.exports = app => {
  const findAll = async (req, res) => {
    const users = await app.db('users').select();
    res.status(200).json(users);
  };

  const create = async (req, res) => {
    const user = req.body;
    const userInserted = await app.db('users').insert(user,'*');
    res.status(201).json(userInserted[0]);
  };

  return { findAll, create };
};
