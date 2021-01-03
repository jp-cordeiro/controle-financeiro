module.exports = app => {
  const findAll = async () => {
    const users = await app.db('users').select();
    return users;
  };

  const save = async user => {
    const userInserted = await app.db('users').insert(user, '*');
    return userInserted;
  };

  return { findAll, save };
};
