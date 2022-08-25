import { createPedidoMensagem } from './../messages/pedido/novoPedidoMessageChannel';
import { Request, Response } from "express";
import connection from "../database/connection";

class PedidoController {
  async TrazTodosOsPedidos(request: Request, response: Response) {
    const { cliente_id} = request.query;

    const pedido = connection("pedido");

    if (cliente_id){
      pedido
        .where({ cliente_id})
        .join("cliente", "cliente.id", "=", "pedido.cliente_id")
        .select("pedido.*", "cliente.*");
    }
    const pedidos = await pedido;

    return response.json(pedidos);
  }
  async novoPedido(request: Request, response: Response) {
    const messageChannel = await createPedidoMensagem()
    if(messageChannel){
    const { NumeroPedido, DataDoPedido, FormaDePagamento, cliente_id,produto_id } = request.body;

    const pedido = {
      NumeroPedido,
      DataDoPedido,
      FormaDePagamento,
      cliente_id,
      produto_id
    };

    const pedidoRabbit = pedido
    const pedidoJson = JSON.stringify(pedidoRabbit)
    messageChannel.sendToQueue(process.env.QUEUE_NAME_PEDIDO, Buffer.from(pedidoJson));

   

    return response.json({
      ...pedido,
    });
  }
}

  async deletaPedido(request: Request, response: Response) {
    const { id } = request.params;

    const deletaPedido = await connection("pedido").where({ id }).delete();

    response.json("Pedido já saiu para entrega");
  }
}
export { PedidoController };
