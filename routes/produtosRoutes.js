const express = require('express');
const router = express.Router();
const produtosController = require('../controllers/produtosController');
const authenticateToken = require('../middleware/auth');

// GET todos os produtos
router.get('/', produtosController.listarProdutos);

// POST novo produto
router.post('/', produtosController.criarProduto);

// PUT atualização
router.put('/:id', authenticateToken, produtosController.atualizarProduto);

// DELETE produto
router.delete('/:id', authenticateToken, produtosController.removerProduto);

module.exports = router;
