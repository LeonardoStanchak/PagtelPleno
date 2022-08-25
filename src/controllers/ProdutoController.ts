import { updateProdutoMensagem } from "./../messages/produto/updateProdutoMessageChannel";
import { Request, Response } from "express";
import connection from "../database/connection";
import { createProdutoMensagem } from "../messages/produto/novoProdutoMessageChannel";

class ProdutoController {
  async TrazTodosOsProdutos(request: Request, response: Response) {
    const results = await connection("produto");

    return response.json(results);
  }
  async novoProduto(request: Request, response: Response) {
    const messageChannel = await createProdutoMensagem();
    if (messageChannel) {
      const { NomeProduto, Descricao, Preco } = request.body;

      const produto = {
        NomeProduto,
        Descricao,
        Preco,
      };
      const atualizaClienteRabbit = produto;
      const clienteJson = JSON.stringify(atualizaClienteRabbit);
      messageChannel.sendToQueue(
        process.env.QUEUE_NAME_PRODUTO,
        Buffer.from(clienteJson)
      );
      return response.json({
        ...produto,
      });
    }
  }

  async AtualizaProduto(request: Request, response: Response) {
    const messageChannel = await updateProdutoMensagem();
    if (messageChannel) {
      const { id } = request.params;
      const { Preco } = request.body;

      const AtualizaProduto = {
        Preco,
      };

      const atualizaClienteRabbit = AtualizaProduto;
      const clienteJson = JSON.stringify(atualizaClienteRabbit);
      messageChannel.sendToQueue(process.env.QUEUE_NAME_UPDATE_PRODUTO,Buffer.from(clienteJson));

      return response.json({
        id,
        ...AtualizaProduto,
      });
    }
  }
  async deletaProduto(request: Request, response: Response) {
    const { id } = request.params;

    const deletaProduto = await connection("produto").where({ id }).delete();

    response.json("deletado com sucesso");
  }
}

export { ProdutoController };
