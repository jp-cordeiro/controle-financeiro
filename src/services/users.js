module.exports = app => {
  const findAll = async () => {
    const users = await app.db('users').select();
    return users;
  };

  const save = async user => {
    if (!user.name) {
      return { error: 'Name is a required property' };
    }
    const userInserted = await app.db('users').insert(user, '*');
    return userInserted;
  };

  return { findAll, save };
};
