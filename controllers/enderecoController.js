const db = require('../db');
const { v4: uuidv4 } = require('uuid');

// 🔍 Listar todos os endereços
const listarEndereco = async (req, res) => {
    try {
        const result = await db.query(`
            SELECT id_endereco, id_usuario, rua, numero, complemento, bairro, cidade, estado, cep
            FROM enderecos
            ORDER BY id_endereco DESC
        `);
        res.status(200).json(result.rows);
    } catch (err) {
        console.error('Erro ao listar endereços:', err.message);
        res.status(500).json({ erro: 'Erro interno no servidor' });
    }
};

// ➕ Criar novo endereço
const criarEndereco = async (req, res) => {
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
        console.error('Erro ao cadastrar endereço:', err.message);
        res.status(500).json({ erro: 'Erro interno no servidor' });
    }
};

// ✏️ Atualizar endereço
const atualizarEndereco = async (req, res) => {
    const { id } = req.params;
    const { rua, numero, complemento, bairro, cidade, estado, cep } = req.body;

    try {
        await db.query(`
            UPDATE enderecos SET 
                rua = $1,
                numero = $2,
                complemento = $3,
                bairro = $4,
                cidade = $5,
                estado = $6,
                cep = $7
            WHERE id_endereco = $8
        `, [rua, numero, complemento, bairro, cidade, estado, cep, id]);

        res.status(200).json({ mensagem: 'Endereço atualizado com sucesso.' });
    } catch (err) {
        console.error('Erro ao atualizar endereço:', err.message);
        res.status(500).json({ erro: 'Erro interno no servidor' });
    }
};

// 🗑️ Deletar endereço
const deletarEndereco = async (req, res) => {
    const { id } = req.params;

    try {
        await db.query(`DELETE FROM enderecos WHERE id_endereco = $1`, [id]);
        res.status(200).json({ mensagem: 'Endereço excluído com sucesso.' });
    } catch (err) {
        console.error('Erro ao excluir endereço:', err.message);
        res.status(500).json({ erro: 'Erro interno no servidor' });
    }
};

module.exports = {
    listarEndereco,
    criarEndereco,
    atualizarEndereco,
    deletarEndereco
};
