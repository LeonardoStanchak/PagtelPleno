import { Request, Response } from "express";
import connection from "../database/connection";

class EntregaController{
    async TrazTodasAsEntrega(request: Request, response: Response) {
        const results = await connection("entrega");
    
        return response.json(results);
      }
      async novaEntrega(request: Request, response: Response) {
        const {
          DataDaEntrega,
          Status,
        } = request.body;
    
        const entrega = {
            DataDaEntrega,
          Status
        };
    
        const create = await connection("entrega").insert(entrega);
    
        const id = create[0];
    
        return response.json({
          id,
          ...entrega,
        });
      }
    
      async AtualizaEntrega(request: Request, response: Response){
        const {
            id
        } = request.params;
        const {
            Status
        } = request.body;
    
        const AtualizaStatus = {
            Status
        };
    
        const Atualiza = await connection('entrega').where({id}).update(AtualizaStatus);
    
        return response.json({
            id,
            ...AtualizaStatus
        });
    
    
    }
    
}

export { EntregaController };