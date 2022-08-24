import { Router, Request, Response } from 'express';
import { ClienteController } from './../controllers/ClienteController';
import {ProdutoController} from './../controllers/ProdutoController';

const router = Router();

const cliente = new ClienteController();

router.post('/novo/cliente', cliente.novoCliente);
router.put('/atualiza/cliente/:id', cliente.AtualizaCadastro);
router.get('/clientes', cliente.TrazTodosOsClientes);
router.delete("/cliente/:id", cliente.deletaCliente);

const produto = new ProdutoController();
router.post('/novo/produto', produto.novoProduto);
router.put('/atualiza/produto/:id', produto.AtualizaProduto);
router.get('/produtos', produto.TrazTodosOsProdutos);
router.delete("/produto/:id", produto.deletaProduto);
export default router;