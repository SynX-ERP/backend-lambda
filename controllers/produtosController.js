const db = require('../db');
const { v4: uuidv4 } = require('uuid');

const listarProdutos = async (req, res, next) => {
  try {
    const result = await db.query(`
      SELECT id_produto, codigo, nome, preco, categoria, descricao, imagem, data_criacao
      FROM produtos
      ORDER BY data_criacao DESC
    `);
    res.status(200).json(result.rows);
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

    await db.query(`
      INSERT INTO produtos (
        id_produto, codigo, nome, preco, categoria, descricao, imagem, data_criacao
      ) VALUES (
        $1, $2, $3, $4, $5, $6, $7, NOW()
      )
    `, [id, codigo, nome, preco, categoria, descricao, imagem]);

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
    const result = await db.query(`
      UPDATE produtos SET
        codigo = $1,
        nome = $2,
        preco = $3,
        categoria = $4,
        descricao = $5,
        imagem = $6,
        ultima_atualizacao = NOW()
      WHERE id_produto = $7
      RETURNING *
    `, [codigo, nome, preco, categoria, descricao, imagem, id]);

    if (result.rowCount === 0) {
      return res.status(404).json({ erro: "Produto n\u00e3o encontrado" });
    }

    res.status(200).json(result.rows[0]);
  } catch (err) {
    next(err);
  }
};

const removerProduto = async (req, res, next) => {
  const { id } = req.params;

  try {
    const result = await db.query('DELETE FROM produtos WHERE id_produto = $1 RETURNING id_produto', [id]);

    if (result.rowCount === 0) {
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

