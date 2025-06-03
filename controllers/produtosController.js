const db = require('../db');
const { v4: uuidv4 } = require('uuid');

const listarProdutos = async (req, res) => {
  try {
    const result = await db.query(`
      SELECT id_produto, nome, preco, categoria, descricao, imagem, data_criacao
      FROM produtos
      ORDER BY data_criacao DESC
    `);
    res.status(200).json(result.rows);
  } catch (err) {
    console.error("Erro ao listar produtos:", err.message);
    res.status(500).json({ erro: "Erro interno no servidor" });
  }
};

const criarProduto = async (req, res) => {
  const { nome, preco, categoria, descricao, imagem } = req.body;

  if (!nome || !preco) {
    return res.status(400).json({ erro: "Nome e preço são obrigatórios" });
  }

  try {
    const id = uuidv4();

    await db.query(`
      INSERT INTO produtos (
        id_produto, nome, preco, categoria, descricao, imagem, data_criacao
      ) VALUES (
        $1, $2, $3, $4, $5, $6, NOW()
      )
    `, [id, nome, preco, categoria, descricao, imagem]);

    res.status(201).json({ mensagem: "Produto criado com sucesso" });
  } catch (err) {
    console.error("Erro ao criar produto:", err.message);
    res.status(500).json({ erro: "Erro ao criar produto" });
  }
};

const atualizarProduto = async (req, res) => {
  const { id } = req.params;
  const { nome, preco, categoria, descricao, imagem } = req.body;

  try {
    const result = await db.query(`
      UPDATE produtos SET
        nome = $1,
        preco = $2,
        categoria = $3,
        descricao = $4,
        imagem = $5,
        ultima_atualizacao = NOW()
      WHERE id_produto = $6
    `, [nome, preco, categoria, descricao, imagem, id]);

    res.status(200).json({ mensagem: "Produto atualizado com sucesso" });
  } catch (err) {
    console.error("Erro ao atualizar produto:", err.message);
    res.status(500).json({ erro: "Erro ao atualizar produto" });
  }
};

const removerProduto = async (req, res) => {
  const { id } = req.params;

  try {
    await db.query('DELETE FROM produtos WHERE id_produto = $1', [id]);
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
