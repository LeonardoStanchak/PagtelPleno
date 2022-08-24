import { Knex } from "knex";

export async function seed(knex: Knex): Promise<void> {
    // Deletes ALL existing entries
    await knex("produto").del();

    // Inserts seed entries
    await knex("produto").insert([
        { NomeProduto: "Trizeta", Descricao: "Trizeta Ford Focus 2009", Preco: "145,38"}
    ]);
};