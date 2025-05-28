const express = require('express');
const router = express.Router();
const enderecoController = require('../controllers/enderecoController');

// 🔍 GET - Listar todos os endereços
router.get('/', enderecoController.listarEndereco);

// ➕ POST - Criar novo endereço
router.post('/', enderecoController.criarEndereco);

// ✏️ PUT - Atualizar endereço existente
router.put('/:id', enderecoController.atualizarEndereco);

// 🗑️ DELETE - Remover endereço
router.delete('/:id', enderecoController.deletarEndereco);

// 🔍 GET - Listar endereços por usuário
router.get('/usuario/:id_usuario', enderecoController.listarEnderecoPorUsuario);

module.exports = router;
