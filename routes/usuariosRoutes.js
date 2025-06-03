const express = require('express');
const router = express.Router();
const usuariosController = require('../controllers/usuariosController');


// Middleware para verificar se o usuário está autenticado
router.post('/login', usuariosController.loginUsuario);
// Lista todos os usuários
router.get('/',  usuariosController.listarUsuarios);
// Cria um novo usuário
router.post('/',  usuariosController.criarUsuario);
// Atualiza um usuário existente
router.put('/:id',  usuariosController.atualizarUsuario);
// Remove um usuário
router.delete('/:id',  usuariosController.removerUsuario);
// Atualiza o nível de acesso de um usuário
router.put('/:id/nivel', usuariosController.atualizarNivelAcesso);
module.exports = router;
