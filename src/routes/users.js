module.exports = app => {
  const usersService = app.services.users;

  const findAll = async (req, res) => {
    const users = await usersService.findAll();
    res.status(200).json(users);
  };

  const create = async (req, res) => {
    const user = req.body;
    const userInserted = await usersService.save(user);
    res.status(201).json(userInserted[0]);
  };

  return { findAll, create };
};
