const utils = require('./utils');

module.exports = app => {
  const requiredProps = ['name', 'user_id'];

  const save = async account => {
    const propValidation = await utils.propsValidation(account, requiredProps);

    if (propValidation) {
      return { error: `${propValidation} is a required property` };
    }

    const accountInserted = await app.db('accounts').insert(account, '*');

    return accountInserted;
  };

  const findAll = async account => {
    const accounts = await app.db('accounts');
    return accounts;
  };

  return { save, findAll };
};
