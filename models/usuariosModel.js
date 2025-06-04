const db = require('../db');

const listarUsuarios = async () => {
  const result = await db.query(`
    SELECT
      id_usuario,
      nome_completo,
      email,
      nivel_acesso,
      data_criacao
    FROM usuarios
    ORDER BY data_criacao DESC
  `);
  return result.rows;
};

const criarUsuario = async (usuario) => {
  const {
    id_usuario,
    nome_completo,
    email,
    senha_hash,
    nivel_acesso,
    telefone,
    cpf,
    data_nascimento,
    genero,
    foto_perfil
  } = usuario;

  const result = await db.query(
    `INSERT INTO usuarios (
      id_usuario, nome_completo, email, senha_hash, nivel_acesso,
      data_criacao, telefone, cpf, data_nascimento, genero, foto_perfil
    ) VALUES (
      $1, $2, $3, $4, $5,
      NOW(), $6, $7, $8, $9, $10
    )
    RETURNING id_usuario, nome_completo, email, nivel_acesso, data_criacao`,
    [
      id_usuario,
      nome_completo,
      email,
      senha_hash,
      nivel_acesso,
      telefone,
      cpf,
      data_nascimento,
      genero,
      foto_perfil
    ]
  );

  return result.rows[0];
};

const atualizarUsuario = async (id, dados) => {
  const {
    nome_completo,
    email,
    senha_hash,
    nivel_acesso,
    telefone,
    cpf,
    data_nascimento,
    genero,
    foto_perfil
  } = dados;

  const result = await db.query(
    `UPDATE usuarios SET
      nome_completo = $1,
      email = $2,
      senha_hash = $3,
      nivel_acesso = $4,
      telefone = $5,
      cpf = $6,
      data_nascimento = $7,
      genero = $8,
      foto_perfil = $9,
      ultima_atualizacao = NOW()
    WHERE id_usuario = $10
    RETURNING id_usuario, nome_completo, email, nivel_acesso, telefone, cpf, data_nascimento, genero, foto_perfil, data_criacao`,
    [
      nome_completo,
      email,
      senha_hash,
      nivel_acesso,
      telefone,
      cpf,
      data_nascimento,
      genero,
      foto_perfil,
      id
    ]
  );

  return result.rows[0];
};

const removerUsuario = async (id) => {
  const result = await db.query(
    'DELETE FROM usuarios WHERE id_usuario = $1 RETURNING id_usuario',
    [id]
  );
  return result.rows[0];
};

const buscarUsuarioPorEmail = async (email) => {
  const result = await db.query('SELECT * FROM usuarios WHERE email = $1', [email]);
  return result.rows[0];
};

const buscarUsuarioPorId = async (id) => {
  const result = await db.query('SELECT * FROM usuarios WHERE id_usuario = $1', [id]);
  return result.rows[0];
};

const emailEmUsoPorOutroUsuario = async (email, id) => {
  const result = await db.query(
    'SELECT 1 FROM usuarios WHERE email = $1 AND id_usuario <> $2',
    [email, id]
  );
  return result.rows.length > 0;
};

const atualizarNivelAcesso = async (id, nivel_acesso) => {
  await db.query(
    `UPDATE usuarios SET nivel_acesso = $1, ultima_atualizacao = NOW() WHERE id_usuario = $2`,
    [nivel_acesso, id]
  );
};

module.exports = {
  listarUsuarios,
  criarUsuario,
  atualizarUsuario,
  removerUsuario,
  buscarUsuarioPorEmail,
  buscarUsuarioPorId,
  emailEmUsoPorOutroUsuario,
  atualizarNivelAcesso
};
