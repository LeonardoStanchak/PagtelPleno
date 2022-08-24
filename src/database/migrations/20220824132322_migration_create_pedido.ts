import { Knex } from "knex";

export async function up(knex: Knex): Promise<void> {
  return knex.schema.createTable("pedido", (table) => {
    table.increments("id");
    table.text("NumeroPedido").unique().notNullable();
    table.text("DataDoPedido").notNullable();
    table.text("FormaDePagamento").notNullable();
  });
}

export async function down(knex: Knex): Promise<void> {
  return knex.schema.dropTable("pedido");
}
