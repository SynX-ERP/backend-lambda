const EnderecoModel = require('../models/enderecoModel');
const { v4: uuidv4 } = require('uuid');

// 🔍 Listar todos os endereços
const listarEndereco = async (req, res, next) => {
    try {
        const enderecos = await EnderecoModel.listarEnderecos();
        res.status(200).json(enderecos);
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
        await EnderecoModel.criarEndereco({
            id_endereco,
            id_usuario,
            rua,
            numero,
            complemento,
            bairro,
            cidade,
            estado,
            cep
        });

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
        const result = await EnderecoModel.atualizarEndereco(id, {
            rua,
            numero,
            complemento,
            bairro,
            cidade,
            estado,
            cep
        });

        if (!result) {
            return res.status(404).json({ erro: 'Endereço não encontrado.' });
        }

        res.status(200).json(result);
    } catch (err) {
        next(err);
    }
};

// 🗑️ Deletar endereço
const deletarEndereco = async (req, res, next) => {
    const { id } = req.params;

    try {
        const result = await EnderecoModel.deletarEndereco(id);

        if (!result) {
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
    const enderecos = await EnderecoModel.listarEnderecosPorUsuario(id_usuario);

    res.status(200).json(enderecos);
  } catch (err) {
    next(err);
  }
};

// 🔍 Buscar endereço por ID
const buscarEnderecoPorId = async (req, res, next) => {
  const { id } = req.params;

  try {
    const endereco = await EnderecoModel.buscarEnderecoPorId(id);

    if (!endereco) {
      return res.status(404).json({ erro: 'Endereço não encontrado.' });
    }

    res.status(200).json(endereco);
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

