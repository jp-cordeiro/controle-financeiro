const utils = require('./utils');

module.exports = app => {
  const requiredProps = ['name', 'email', 'password'];

  const findAll = async () => {
    const users = await app.db('users').select();
    return users;
  };

  const save = async user => {
    const propValidation = await utils.userValidation(user, requiredProps);
    if (propValidation) {
      return { error: `${propValidation} is a required property` };
    }
    const userInserted = await app.db('users').insert(user, '*');
    return userInserted;
  };

  return { findAll, save };
};
