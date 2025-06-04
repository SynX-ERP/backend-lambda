const db = require('../db');

const listarEnderecos = async () => {
  const result = await db.query(`
    SELECT id_endereco, id_usuario, rua, numero, complemento, bairro, cidade, estado, cep
    FROM enderecos
    ORDER BY id_endereco DESC
  `);
  return result.rows;
};

const criarEndereco = async (dados) => {
  const { id_endereco, id_usuario, rua, numero, complemento, bairro, cidade, estado, cep } = dados;
  await db.query(
    `INSERT INTO enderecos (
      id_endereco, id_usuario, rua, numero, complemento, bairro, cidade, estado, cep
    ) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9)`,
    [id_endereco, id_usuario, rua, numero, complemento, bairro, cidade, estado, cep]
  );
};

const atualizarEndereco = async (id, dados) => {
  const { rua, numero, complemento, bairro, cidade, estado, cep } = dados;
  const result = await db.query(
    `UPDATE enderecos SET
      rua = $1,
      numero = $2,
      complemento = $3,
      bairro = $4,
      cidade = $5,
      estado = $6,
      cep = $7,
      ultima_atualizacao = NOW()
    WHERE id_endereco = $8
    RETURNING *`,
    [rua, numero, complemento, bairro, cidade, estado, cep, id]
  );
  return result.rows[0];
};

const deletarEndereco = async (id) => {
  const result = await db.query(
    'DELETE FROM enderecos WHERE id_endereco = $1 RETURNING id_endereco',
    [id]
  );
  return result.rows[0];
};

const listarEnderecosPorUsuario = async (id_usuario) => {
  const result = await db.query(
    `SELECT * FROM enderecos WHERE id_usuario = $1 ORDER BY id_endereco DESC`,
    [id_usuario]
  );
  return result.rows;
};

const buscarEnderecoPorId = async (id) => {
  const result = await db.query(
    `SELECT * FROM enderecos WHERE id_endereco = $1`,
    [id]
  );
  return result.rows[0];
};

module.exports = {
  listarEnderecos,
  criarEndereco,
  atualizarEndereco,
  deletarEndereco,
  listarEnderecosPorUsuario,
  buscarEnderecoPorId
};
