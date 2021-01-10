module.exports = app => {
  const create = async (req, res) => {
    const accountInserted = await app.services.accounts.save(req.body);
    if (accountInserted.error) {
      return res.status(400).json(accountInserted);
    }

    return res.status(201).json(accountInserted[0]);
  };

  const update = async (req, res) => {
    const params = req.params ? req.params : {};
    const accountInserted = await app.services.accounts.save(req.body, params);
    if (accountInserted.error) {
      return res.status(400).json(accountInserted);
    }
    return res.status(201).json(accountInserted);
  };

  const findAll = async (req, res) => {
    const params = req.params ? req.params : {};
    const accounts = await app.services.accounts.findAll(params);
    return res.status(200).json(accounts);
  };

  const findById = async (req, res) => {
    const account = await app.services.accounts.findAll({ id: req.params.id });
    if (!account[0]) {
      return res.status(204).json(account[0]);
    }
    return res.status(200).json(account[0]);
  };

  const deleteById = async (req, res) => {
    const account = await app.services.accounts.deleteById({
      id: req.params.id,
    });
    return res.status(204).json(account[0]);
  };

  return { create, update, findAll, findById, deleteById };
};
