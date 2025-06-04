const db = require('../db');
const { v4: uuidv4 } = require('uuid');

// 🔍 Listar todos os endereços
const listarEndereco = async (req, res, next) => {
    try {
        const result = await db.query(`
            SELECT id_endereco, id_usuario, rua, numero, complemento, bairro, cidade, estado, cep
            FROM enderecos
            ORDER BY id_endereco DESC
        `);
        res.status(200).json(result.rows);
    } catch (err) {
        next(err);
    }
};

// ➕ Criar novo endereço
const criarEndereco = async (req, res, next) => {
    const { id_usuario, rua, numero, complemento, bairro, cidade, estado, cep } = req.body;

    if (!id_usuario || !rua || !numero || !bairro || !cidade || !estado || !cep) {
        return res.status(400).json({ erro: 'Campos obrigatórios não preenchidos.' });
    }

    try {
        const id_endereco = uuidv4();
        await db.query(`
            INSERT INTO enderecos (
                id_endereco, id_usuario, rua, numero, complemento, bairro, cidade, estado, cep
            ) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9)
        `, [id_endereco, id_usuario, rua, numero, complemento, bairro, cidade, estado, cep]);

        res.status(201).json({ mensagem: 'Endereço cadastrado com sucesso.' });
    } catch (err) {
        next(err);
    }
};

// ✏️ Atualizar endereço
const atualizarEndereco = async (req, res, next) => {
    const { id } = req.params;
    const { rua, numero, complemento, bairro, cidade, estado, cep } = req.body;

    try {
        const result = await db.query(`
            UPDATE enderecos SET
                rua = $1,
                numero = $2,
                complemento = $3,
                bairro = $4,
                cidade = $5,
                estado = $6,
                cep = $7,
                ultima_atualizacao = NOW()
            WHERE id_endereco = $8
            RETURNING *
        `, [rua, numero, complemento, bairro, cidade, estado, cep, id]);

        if (result.rowCount === 0) {
            return res.status(404).json({ erro: 'Endereço não encontrado.' });
        }

        res.status(200).json(result.rows[0]);
    } catch (err) {
        next(err);
    }
};

// 🗑️ Deletar endereço
const deletarEndereco = async (req, res, next) => {
    const { id } = req.params;

    try {
        const result = await db.query(
            `DELETE FROM enderecos WHERE id_endereco = $1 RETURNING id_endereco`,
            [id]
        );

        if (result.rowCount === 0) {
            return res.status(404).json({ erro: 'Endereço não encontrado.' });
        }

        res.status(200).json({ mensagem: 'Endereço excluído com sucesso.' });
    } catch (err) {
        next(err);
    }
};

const listarEnderecoPorUsuario = async (req, res, next) => {
  const { id_usuario } = req.params;

  try {
    const result = await db.query(
      `SELECT * FROM enderecos WHERE id_usuario = $1 ORDER BY id_endereco DESC`,
      [id_usuario]
    );

    res.status(200).json(result.rows);
  } catch (err) {
    next(err);
  }
};

// 🔍 Buscar endereço por ID
const buscarEnderecoPorId = async (req, res, next) => {
  const { id } = req.params;

  try {
    const result = await db.query(
      `SELECT * FROM enderecos WHERE id_endereco = $1`,
      [id]
    );

    if (result.rows.length === 0) {
      return res.status(404).json({ erro: 'Endereço não encontrado.' });
    }

    res.status(200).json(result.rows[0]);
  } catch (err) {
    next(err);
  }
};

module.exports = {
    listarEndereco,
    criarEndereco,
    atualizarEndereco,
    deletarEndereco,
    listarEnderecoPorUsuario,
    buscarEnderecoPorId
};

