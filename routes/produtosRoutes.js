const express = require('express');
const router = express.Router();
const produtosController = require('../controllers/produtosController');

// GET todos os produtos
router.get('/', produtosController.listarProdutos);

// POST novo produto
router.post('/', produtosController.criarProduto);

// PUT atualização
router.put('/:id', produtosController.atualizarProduto);

// DELETE produto
router.delete('/:id', produtosController.removerProduto);

module.exports = router;
