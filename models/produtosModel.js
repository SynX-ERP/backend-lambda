const db = require('../db');

const listarProdutos = async () => {
  const result = await db.query(`
    SELECT id_produto, codigo, nome, preco, categoria, descricao, imagem, data_criacao
    FROM produtos
    ORDER BY data_criacao DESC
  `);
  return result.rows;
};

const criarProduto = async (dados) => {
  const { id_produto, codigo, nome, preco, categoria, descricao, imagem } = dados;
  await db.query(
    `INSERT INTO produtos (
      id_produto, codigo, nome, preco, categoria, descricao, imagem, data_criacao
    ) VALUES (
      $1, $2, $3, $4, $5, $6, $7, NOW()
    )`,
    [id_produto, codigo, nome, preco, categoria, descricao, imagem]
  );
};

const atualizarProduto = async (id, dados) => {
  const { codigo, nome, preco, categoria, descricao, imagem } = dados;
  const result = await db.query(
    `UPDATE produtos SET
      codigo = $1,
      nome = $2,
      preco = $3,
      categoria = $4,
      descricao = $5,
      imagem = $6,
      ultima_atualizacao = NOW()
    WHERE id_produto = $7
    RETURNING *`,
    [codigo, nome, preco, categoria, descricao, imagem, id]
  );
  return result.rows[0];
};

const removerProduto = async (id) => {
  const result = await db.query('DELETE FROM produtos WHERE id_produto = $1 RETURNING id_produto', [id]);
  return result.rows[0];
};

module.exports = {
  listarProdutos,
  criarProduto,
  atualizarProduto,
  removerProduto
};
