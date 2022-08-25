import { Knex } from "knex";

export async function seed(knex: Knex): Promise<void> {
    // Deletes ALL existing entries
    await knex("cliente").del();

    // Inserts seed entries
    await knex("cliente").insert([{
        NomeCompleto: "Leonardo",
		Cpf: "47987844861",
		DataNascimento: "08/06/2001",
		Cep: "04254010",
		Endereco: "Rua Solemar",
		Numero: "94",
		Complemento: "Nao ha",
		Referencia: "Drogaria Sao Paulo",
    }
    ]);
};