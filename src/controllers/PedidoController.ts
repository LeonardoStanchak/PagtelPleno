import { Request, Response } from "express";
import connection from "../database/connection";

class PedidoController {
  async TrazTodosOsPedidos(request: Request, response: Response) {
    const results = await connection("pedido");

    return response.json(results);
  }
  async novoPedido(request: Request, response: Response) {
    const { NumeroPedido, DataDoPedido, FormaDePagamento } = request.body;

    const pedido = {
      NumeroPedido,
      DataDoPedido,
      FormaDePagamento,
    };

    const create = await connection("pedido").insert(pedido);

    const id = create[0];

    return response.json({
      id,
      ...pedido,
    });
  }

  async deletaPedido(request: Request, response: Response) {
    const { id } = request.params;

    const deletaPedido = await connection("pedido").where({ id }).delete();

    response.json("Pedido já saiu para entrega");
  }
}
export { PedidoController };
