module.exports = app => {
  const create = async (req, res) => {
    const accountInserted = await app.services.accounts.save(req.body);

    return res.status(201).json(accountInserted[0]);
  };

  const findAll = async (req, res) => {
    const params = req.params ? req.params : {};
    const accounts = await app.services.accounts.findAll(params);
    return res.status(200).json(accounts);
  };

  const findById = async (req, res) => {
    const account = await app.services.accounts.findAll({ id: req.params.id });
    console.log(account);
    return res.status(200).json(account[0]);
  };

  return { create, findAll, findById };
};
