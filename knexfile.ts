import path  from "path";

module.exports = {
  development: {
    client: 'pg',
    connection: {
      database: "postgres",
      user: "postgres",
      password: "Silvia567890@"
    },
    migrations: {
      tableName: 'knex_migrations',
      directory: `${__dirname}/src/database/migrations`
    },
    seeds: {
      directory: `${__dirname}/src/database/seeds`
    }
  },
};