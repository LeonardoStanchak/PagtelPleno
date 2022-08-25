import knex from 'knex';
import path from 'path';

const connection = knex({
    client: 'pg',
    connection: {
      database: "postgres",
      user: "postgres",
      password: "Silvia567890@"
    }
});

export default connection;