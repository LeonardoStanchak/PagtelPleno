import { uptdateEntregaMensagem } from './../messages/pedido/updatePedidoMessageChannel';
import { createPedidoMensagem } from './../messages/pedido/novoPedidoMessageChannel';
import { Request, Response } from "express";
import connection from "../database/connection";

class EntregaController{
    async TrazTodasAsEntrega(request: Request, response: Response) {
      const { pedido_id} = request.query;

      const query =  connection("entrega");

      if (pedido_id){
        query
          .where({ pedido_id})
          .join("pedido", "pedido_id", "=", "entrega.pedido_id")
          .select("entrega.*", "pedido.NumeroPedido");
      }
      const results = await query;

      return response.json(results);
      }
      async novaEntrega(request: Request, response: Response) {
        const messageChannel = await createPedidoMensagem()
        if(messageChannel){
        const {
          DataDaEntrega,
          Status,
          pedido_id
        } = request.body;
    
        const entrega = {
            DataDaEntrega,
            Status,
            pedido_id
        };
    
        const entregaRabbit = entrega
        const entregaJson = JSON.stringify(entregaRabbit)
        messageChannel.sendToQueue(process.env.QUEUE_NAME_ENTREGA, Buffer.from(entregaJson));
    
        return response.json({
          ...entrega,
        });
      }
    }
    
      async AtualizaEntrega(request: Request, response: Response){
        const messageChannel = await uptdateEntregaMensagem()
        if(messageChannel){
        const {
            id
        } = request.params;
        const {
            Status
        } = request.body;
    
        const AtualizaStatus = {
            Status
        };
    
        const atualizaEntregaRabbit = AtualizaStatus
        const entregaJson = JSON.stringify(atualizaEntregaRabbit)
        messageChannel.sendToQueue(process.env.QUEU_NAME_UPDATE_ENTREGA, Buffer.from(entregaJson));
    
        return response.json({
            id,
            ...AtualizaStatus
        });
    
      }
    }
    
}

export { EntregaController };