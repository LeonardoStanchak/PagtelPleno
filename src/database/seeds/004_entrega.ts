import { Knex } from "knex";

export async function seed(knex: Knex): Promise<void> {
    // Deletes ALL existing entries
    await knex("entrega").del();

    // Inserts seed entries
    await knex("entrega").insert([
        { DataDaEntrega: "25/08/2022", Status: "Nao Entregue"}
    ]);
};
