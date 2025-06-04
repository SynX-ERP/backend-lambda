const ProdutosModel = require('../models/produtosModel');
const { v4: uuidv4 } = require('uuid');

const listarProdutos = async (req, res) => {
  try {
    const produtos = await ProdutosModel.listarProdutos();
    res.status(200).json(produtos);
  } catch (err) {
    console.error("Erro ao listar produtos:", err.message);
    res.status(500).json({ erro: "Erro interno no servidor" });
  }
};

const criarProduto = async (req, res) => {
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
    console.error("Erro ao criar produto:", err.message);
    res.status(500).json({ erro: "Erro ao criar produto" });
  }
};

const atualizarProduto = async (req, res) => {
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
    console.error("Erro ao atualizar produto:", err.message);
    res.status(500).json({ erro: "Erro ao atualizar produto" });
  }
};

const removerProduto = async (req, res) => {
  const { id } = req.params;

  try {
    const result = await ProdutosModel.removerProduto(id);

    if (!result) {
      return res.status(404).json({ erro: "Produto n\u00e3o encontrado" });
    }

    res.status(200).json({ mensagem: "Produto removido com sucesso" });
  } catch (err) {
    console.error("Erro ao excluir produto:", err.message);
    res.status(500).json({ erro: "Erro ao excluir produto" });
  }
};

module.exports = {
  listarProdutos,
  criarProduto,
  atualizarProduto,
  removerProduto
};
