const express = require('express');
const router = express.Router();
const enderecoController = require('../controllers/enderecoController');
const {
  validarEnderecoCriacao,
  validarEnderecoAtualizacao
} = require('../validators/enderecoValidators');
const validar = require('../validators/validar');

// 🔍 GET - Listar todos os endereços
router.get('/', enderecoController.listarEndereco);

// ➕ POST - Criar novo endereço
router.post('/', validarEnderecoCriacao, validar, enderecoController.criarEndereco);

// ✏️ PUT - Atualizar endereço existente
router.put('/:id', validarEnderecoAtualizacao, validar, enderecoController.atualizarEndereco);

// 🗑️ DELETE - Remover endereço
router.delete('/:id', enderecoController.deletarEndereco);

// 🔍 GET - Listar endereços por usuário
router.get('/usuario/:id_usuario', enderecoController.listarEnderecoPorUsuario);

// 🔍 GET - Buscar endereço por ID
router.get('/:id', enderecoController.buscarEnderecoPorId);

module.exports = router;
