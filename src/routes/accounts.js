module.exports = app => {
  const create = async (req, res) => {
    const accountInserted = await app.services.accounts.save(req.body);

    return res.status(201).json(accountInserted[0]);
  };

  const findAll = async (req, res) => {
    const accounts = await app.services.accounts.findAll();
    return res.status(200).json(accounts);
  };

  return { create, findAll };
};
