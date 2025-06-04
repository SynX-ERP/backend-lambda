const ProdutosModel = require('../models/produtosModel');
const { v4: uuidv4 } = require('uuid');

const listarProdutos = async (req, res, next) => {
  try {
    const produtos = await ProdutosModel.listarProdutos();
    res.status(200).json(produtos);
  } catch (err) {
    next(err);
  }
};

const criarProduto = async (req, res, next) => {
  const { codigo, nome, preco, categoria, descricao, imagem } = req.body;

  if (!codigo || !nome || !preco) {
    return res.status(400).json({ erro: "Código, nome e preço são obrigatórios" });
  }

  try {
    const id = uuidv4();

    await ProdutosModel.criarProduto({
      id_produto: id,
      codigo,
      nome,
      preco,
      categoria,
      descricao,
      imagem
    });

    res.status(201).json({ mensagem: "Produto criado com sucesso" });
  } catch (err) {
    next(err);
  }
};

const atualizarProduto = async (req, res, next) => {
  const { id } = req.params;
  const { codigo, nome, preco, categoria, descricao, imagem } = req.body;

  if (!codigo || !nome || !preco) {
    return res.status(400).json({ erro: "Código, nome e preço são obrigatórios" });
  }

  try {
    const result = await ProdutosModel.atualizarProduto(id, {
      codigo,
      nome,
      preco,
      categoria,
      descricao,
      imagem
    });

    if (!result) {
      return res.status(404).json({ erro: "Produto n\u00e3o encontrado" });
    }

    res.status(200).json(result);
  } catch (err) {
    next(err);
  }
};

const removerProduto = async (req, res, next) => {
  const { id } = req.params;

  try {
    const result = await ProdutosModel.removerProduto(id);

    if (!result) {
      return res.status(404).json({ erro: "Produto n\u00e3o encontrado" });
    }

    res.status(200).json({ mensagem: "Produto removido com sucesso" });
  } catch (err) {
    next(err);
  }
};

module.exports = {
  listarProdutos,
  criarProduto,
  atualizarProduto,
  removerProduto
};

