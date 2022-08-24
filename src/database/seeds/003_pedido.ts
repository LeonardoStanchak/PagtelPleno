import { Knex } from "knex";

export async function seed(knex: Knex): Promise<void> {
    // Deletes ALL existing entries
    await knex("pedido").del();

    // Inserts seed entries
    await knex("pedido").insert([
        { NumeroPedido: "479878441415", DataDoPedido: "15/08/2022", FormaDePagamento: "Cartao de Credito" }
    ]);
};
