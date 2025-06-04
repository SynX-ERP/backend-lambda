const { body } = require('express-validator');

const validarUsuarioCriacao = [
  body('nome_completo').notEmpty().withMessage('nome_completo é obrigatório'),
  body('email').isEmail().withMessage('email inválido'),
  body('senha').notEmpty().withMessage('senha é obrigatória')
];

const validarLogin = [
  body('email').isEmail().withMessage('email inválido'),
  body('senha').notEmpty().withMessage('senha é obrigatória')
];

const validarAtualizarNivel = [
  body('nivel_acesso').notEmpty().withMessage('nivel_acesso é obrigatório')
];

module.exports = {
  validarUsuarioCriacao,
  validarLogin,
  validarAtualizarNivel
};
