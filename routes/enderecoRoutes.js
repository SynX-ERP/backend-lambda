const express = require('express');
const router = express.Router();
const enderecoController = require('../controllers/enderecoController');
const authenticateToken = require('../middleware/auth');

// 🔍 GET - Listar todos os endereços
router.get('/', enderecoController.listarEndereco);

// ➕ POST - Criar novo endereço
router.post('/', enderecoController.criarEndereco);

// ✏️ PUT - Atualizar endereço existente
router.put('/:id', authenticateToken, enderecoController.atualizarEndereco);

// 🗑️ DELETE - Remover endereço
router.delete('/:id', authenticateToken, enderecoController.deletarEndereco);

// 🔍 GET - Listar endereços por usuário
router.get('/usuario/:id_usuario', enderecoController.listarEnderecoPorUsuario);

// 🔍 GET - Buscar endereço por ID
router.get('/:id', enderecoController.buscarEnderecoPorId);

module.exports = router;
