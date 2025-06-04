const express = require('express');
const router = express.Router();
const usuariosController = require('../controllers/usuariosController');
const {
  validarUsuarioCriacao,
  validarLogin,
  validarAtualizarNivel
} = require('../validators/usuariosValidators');
const validar = require('../validators/validar');


// Endpoint para login do usuário
router.post('/login', validarLogin, validar, usuariosController.loginUsuario);
// Lista todos os usuários
router.get('/', usuariosController.listarUsuarios);
// Cria um novo usuário
router.post('/', validarUsuarioCriacao, validar, usuariosController.criarUsuario);
// Atualiza um usuário existente
router.put('/:id', usuariosController.atualizarUsuario);
// Remove um usuário
router.delete('/:id', usuariosController.removerUsuario);
// Atualiza o nível de acesso de um usuário
router.put('/:id/nivel', validarAtualizarNivel, validar, usuariosController.atualizarNivelAcesso);
module.exports = router;
