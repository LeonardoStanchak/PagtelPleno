import { Request, Response } from "express";
import connection from "../database/connection";

class ProdutoController{
    async TrazTodosOsProdutos(request: Request, response: Response) {
        const results = await connection("produto");
    
        return response.json(results);
      }
      async novoProduto(request: Request, response: Response) {
        const {
          NomeProduto,
          Descricao,
          Preco
        } = request.body;
    
        const produto = {
            NomeProduto,
            Descricao,
            Preco
        };
    
        const create = await connection("produto").insert(produto);
    
        const id = create[0];
    
        return response.json({
          id,
          ...produto,
        });
      }
    
      async AtualizaProduto(request: Request, response: Response){
        const {
            id
        } = request.params;
        const {
            Preco
        } = request.body;
    
        const AtualizaProduto = {
            Preco
        };
    
        const Atualiza = await connection('produto').where({id}).update(AtualizaProduto);
    
        return response.json({
            id,
            ...AtualizaProduto
        });
    
    
    }
    async deletaProduto(request: Request, response: Response){
        const {
            id
        } = request.params;
    
        const deletaProduto = await connection('produto').where({id}).delete();
    
        response.json('deletado com sucesso');
    }
}

export { ProdutoController };