const utils = require('./utils');

module.exports = app => {
  const requiredProps = ['name', 'email', 'password'];

  const findAll = async (filter = {}) => {
    const users = await app
      .db('users')
      .where(filter)
      .select();
    return users;
  };

  const save = async user => {
    const propValidation = await utils.propsValidation(user, requiredProps);
    if (propValidation) {
      return { error: `${propValidation} is a required property` };
    }

    const userDb = await findAll({ email: 'v@test.com' });
    if (userDb && userDb.length) {
      return { error: 'There is already a user with that email' };
    }

    const userInserted = await app.db('users').insert(user, '*');
    return userInserted;
  };

  return { findAll, save };
};
