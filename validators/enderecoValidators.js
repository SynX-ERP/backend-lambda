const { body } = require('express-validator');

const validarEnderecoCriacao = [
  body('id_usuario').notEmpty().withMessage('id_usuario é obrigatório'),
  body('rua').notEmpty().withMessage('rua é obrigatória'),
  body('numero').notEmpty().withMessage('numero é obrigatório'),
  body('bairro').notEmpty().withMessage('bairro é obrigatório'),
  body('cidade').notEmpty().withMessage('cidade é obrigatória'),
  body('estado').notEmpty().withMessage('estado é obrigatório'),
  body('cep').notEmpty().withMessage('cep é obrigatório')
];

const validarEnderecoAtualizacao = [
  body('rua').notEmpty().withMessage('rua é obrigatória'),
  body('numero').notEmpty().withMessage('numero é obrigatório'),
  body('bairro').notEmpty().withMessage('bairro é obrigatório'),
  body('cidade').notEmpty().withMessage('cidade é obrigatória'),
  body('estado').notEmpty().withMessage('estado é obrigatório'),
  body('cep').notEmpty().withMessage('cep é obrigatório')
];

module.exports = {
  validarEnderecoCriacao,
  validarEnderecoAtualizacao
};
