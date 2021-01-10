const utils = require('./utils');

module.exports = app => {
  const requiredProps = ['name', 'user_id'];

  const save = async (account, filter = {}) => {
    const propValidation = await utils.propsValidation(account, requiredProps);
    let accountSaved = null;

    if (propValidation) {
      return { error: `${propValidation} is a required property` };
    }

    if (account.id) {
      accountSaved = await app
        .db('accounts')
        .where(filter)
        .update(account, '*');
    } else {
      accountSaved = await app.db('accounts').insert(account, '*');
    }
    return accountSaved;
  };

  const findAll = async (filter = {}) => {
    const accounts = await app
      .db('accounts')
      .where(filter)
      .select();
    return accounts;
  };

  const deleteById = async(filter = {}) => {
    const account = await app.db('accounts').where(filter).delete();
    return account;
  }

  return { save, findAll, deleteById };
};
