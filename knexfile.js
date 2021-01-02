module.exports = {
  client: 'pg',
  version: '13.1',
  connection: {
    host: 'localhost',
    user: 'postgres',
    password: 'postgres',
    database: 'controle_financeiro',
  },
  migrations: {
    directory: 'src/migrations',
  },
};
