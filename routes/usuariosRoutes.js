const express = require('express');
const router = express.Router();
const usuariosController = require('../controllers/usuariosController');
const authenticateToken = require('../middleware/auth');


// Endpoint para login do usuário
router.post('/login', usuariosController.loginUsuario);
// Lista todos os usuários
router.get('/',  usuariosController.listarUsuarios);
// Cria um novo usuário
router.post('/',  usuariosController.criarUsuario);
// Atualiza um usuário existente
router.put('/:id', authenticateToken, usuariosController.atualizarUsuario);
// Remove um usuário
router.delete('/:id', authenticateToken, usuariosController.removerUsuario);
// Atualiza o nível de acesso de um usuário
router.put('/:id/nivel', authenticateToken, usuariosController.atualizarNivelAcesso);
module.exports = router;
