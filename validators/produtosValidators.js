const { body } = require('express-validator');

const validarProdutoCriacao = [
  body('codigo').notEmpty().withMessage('codigo é obrigatório'),
  body('nome').notEmpty().withMessage('nome é obrigatório'),
  body('preco').notEmpty().withMessage('preco é obrigatório').isNumeric().withMessage('preco deve ser numérico')
];

const validarProdutoAtualizacao = [
  body('codigo').notEmpty().withMessage('codigo é obrigatório'),
  body('nome').notEmpty().withMessage('nome é obrigatório'),
  body('preco').notEmpty().withMessage('preco é obrigatório').isNumeric().withMessage('preco deve ser numérico')
];

module.exports = {
  validarProdutoCriacao,
  validarProdutoAtualizacao
};
