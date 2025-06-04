const express = require('express');
const router = express.Router();
const produtosController = require('../controllers/produtosController');
const {
  validarProdutoCriacao,
  validarProdutoAtualizacao
} = require('../validators/produtosValidators');
const validar = require('../validators/validar');

// GET todos os produtos
router.get('/', produtosController.listarProdutos);

// POST novo produto
router.post('/', validarProdutoCriacao, validar, produtosController.criarProduto);

// PUT atualização
router.put('/:id', validarProdutoAtualizacao, validar, produtosController.atualizarProduto);

// DELETE produto
router.delete('/:id', produtosController.removerProduto);

module.exports = router;
