import { Knex } from "knex";

export async function up(knex: Knex): Promise<void> {
  return knex.schema.createTable("entrega", (table) => {
    table.increments("id");
    table.text("DataDaEntrega").unique().notNullable();
    table.text("Status").notNullable();
  });
}

export async function down(knex: Knex): Promise<void> {
  return knex.schema.dropTable("entrega");
}
