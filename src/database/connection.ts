import knex from 'knex';

const connection = knex({
    client: 'pg',
    connection: {
      database: "postgres",
      user: "postgres",
      password: "Silvia567890@"
    }
});

export default connection;