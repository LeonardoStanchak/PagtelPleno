import { Knex } from "knex";

export async function up(knex: Knex): Promise<void> {
  return knex.schema.createTable("cliente", (table) => {
    table.increments("id");
    table.text("NomeCompleto").notNullable();
    table.text("Cpf").unique().notNullable();
    table.text("DataNascimento").notNullable();
    table.text("Cep").notNullable();
    table.text("Endereco").notNullable();
    table.text("Numero").notNullable();
    table.text("Complemento").notNullable();
    table.text("Referencia").notNullable();
  });
}

export async function down(knex: Knex): Promise<void> {
  return knex.schema.dropTable("cliente");
}