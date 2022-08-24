import { Knex } from "knex";

export async function up(knex: Knex): Promise<void> {
  return knex.schema.createTable("produto", (table) => {
    table.increments("id");
    table.text("NomeProduto").unique().notNullable();
    table.text("Descricao").unique().notNullable();
    table.text("Preco").notNullable();
  });
}

export async function down(knex: Knex): Promise<void> {
  return knex.schema.dropTable("produto");
}