import { Knex } from "knex";

export async function up(knex: Knex): Promise<void> {
  return knex.schema.createTable("pedido", (table) => {
    table.increments("id");
    table.text("NumeroPedido").unique().notNullable();
    table.text("DataDoPedido").notNullable();
    table.text("FormaDePagamento").notNullable();

    table.integer('cliente_id').references('cliente.id').notNullable();
    table.integer('produto_id').references('produto.id').notNullable();
  });
}

export async function down(knex: Knex): Promise<void> {
  return knex.schema.dropTable("pedido");
}
