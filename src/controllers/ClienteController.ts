import { Request, Response } from "express";
import connection from "../database/connection";

class ClienteController {
  async TrazTodosOsClientes(request: Request, response: Response) {
    const results = await connection("cliente");

    return response.json(results);
  }
  async novoCliente(request: Request, response: Response) {
    const {
      NomeCompleto,
      Cpf,
      DataNascimento,
      Cep,
      Endereco,
      Numero,
      Complemento,
      Referencia,
    } = request.body;

    const cliente = {
      NomeCompleto,
      Cpf,
      DataNascimento,
      Cep,
      Endereco,
      Numero,
      Complemento,
      Referencia,
    };

    const create = await connection("cliente").insert(cliente);

    const id = create[0];

    return response.json({
      id,
      ...cliente,
    });
  }

  async AtualizaCadastro(request: Request, response: Response){
    const {
        id
    } = request.params;
    const {
        Cep,
      Endereco,
      Numero,
      Complemento,
      Referencia,
    } = request.body;

    const AtualizaCadastro = {
        Cep,
      Endereco,
      Numero,
      Complemento,
      Referencia,
    };

    const Atualiza = await connection('cliente').where({id}).update(AtualizaCadastro);

    return response.json({
        id,
        ...AtualizaCadastro
    });


}
async deletaCliente(request: Request, response: Response){
    const {
        id
    } = request.params;

    const deletaCliente = await connection('cliente').where({id}).delete();

    response.json('deletado com sucesso');
}
}


export { ClienteController };