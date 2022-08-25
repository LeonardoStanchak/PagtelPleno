import { createClienteMensagem } from '../messages/cliente/novoClienteMessageChannel';
import { Request, Response } from "express";
import connection from "../database/connection";
import { uptdateClienteMensagem } from '../messages/cliente/UpdateClienteMessageChannel';

class ClienteController {
  async TrazTodosOsClientes(request: Request, response: Response) {
    const results = await connection("cliente");

    return response.json(results);
  }


   async novoCliente(request: Request, response: Response) {
    const messageChannel = await createClienteMensagem()
    if(messageChannel){
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

    const clienteRabbit = cliente
    const clienteJson = JSON.stringify(clienteRabbit)
    messageChannel.sendToQueue(process.env.QUEUE_NAME_CLIENTE, Buffer.from(clienteJson));

    return response.json({
      ...cliente,
    });

  }
}

  async AtualizaCadastro(request: Request, response: Response){
    const messageChannel = await uptdateClienteMensagem()
    if(messageChannel){
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

    const atualizaClienteRabbit = AtualizaCadastro
    const clienteJson = JSON.stringify(atualizaClienteRabbit)
    messageChannel.sendToQueue(process.env.QUEUE_NAME_UPDATE_CLIENTE, Buffer.from(clienteJson));


    return response.json({
        id,
        ...AtualizaCadastro
    });
  }

}
async deletaCliente(request: Request, response: Response){
  const messageChannel = await uptdateClienteMensagem()
    if(messageChannel){
    const {
        id
    } = request.params;

    const deletaCliente = await connection('cliente').where({id}).delete();

    response.json('deletado com sucesso');
}
}

}


export { ClienteController };