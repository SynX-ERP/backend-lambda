const UsuariosModel = require('../models/usuariosModel');
const { v4: uuidv4 } = require('uuid');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const listarUsuarios = async (req, res, next) => {
  try {
    const usuarios = await UsuariosModel.listarUsuarios();
    res.status(200).json(usuarios);
  } catch (err) {
    next(err);
  }
};

const criarUsuario = async (req, res, next) => {
  const {
    nome_completo, email, senha, nivel_acesso = 'user',
    telefone = null, cpf = null, data_nascimento = null,
    genero = null, foto_perfil = null
  } = req.body;

  // ⚠️ Validação dos campos obrigatórios
  if (!nome_completo || !email || !senha) {
    return res.status(400).json({ erro: 'Campos obrigatórios: nome_completo, email, senha' });
  }

  try {
    const existe = await UsuariosModel.buscarUsuarioPorEmail(email);
    if (existe) {
      return res.status(409).json({ erro: 'Email já cadastrado' });
    }

    const id = uuidv4();
    const senha_hash = await bcrypt.hash(senha, 10);

    const novoUsuario = await UsuariosModel.criarUsuario({
      id_usuario: id,
      nome_completo,
      email,
      senha_hash,
      nivel_acesso,
      telefone,
      cpf,
      data_nascimento,
      genero,
      foto_perfil
    });

    res.status(201).json(novoUsuario);

  } catch (err) {
    next(err);
  }
};

const atualizarUsuario = async (req, res, next) => {
  const { id } = req.params;
  const {
    nome_completo, email, senha, nivel_acesso,
    telefone, cpf, data_nascimento, genero, foto_perfil
  } = req.body;

  try {
    const usuarioAtual = await UsuariosModel.buscarUsuarioPorId(id);
    if (!usuarioAtual) {
      return res.status(404).json({ erro: 'Usuário não encontrado' });
    }

    if (email && email !== usuarioAtual.email) {
      const existeEmail = await UsuariosModel.emailEmUsoPorOutroUsuario(email, id);
      if (existeEmail) {
        return res.status(409).json({ erro: 'Email já cadastrado' });
      }
    }

    let senha_hash = usuarioAtual.senha_hash;
    if (senha) {
      senha_hash = await bcrypt.hash(senha, 10);
    }

    const atualizado = await UsuariosModel.atualizarUsuario(id, {
      nome_completo,
      email,
      senha_hash,
      nivel_acesso,
      telefone,
      cpf,
      data_nascimento,
      genero,
      foto_perfil
    });

    res.status(200).json(atualizado);

  } catch (err) {
    next(err);
  }
};

const removerUsuario = async (req, res, next) => {
  const { id } = req.params;

  try {
    const removido = await UsuariosModel.removerUsuario(id);

    if (!removido) {
      return res.status(404).json({ erro: 'Usuário não encontrado' });
    }

    res.status(200).json({ mensagem: 'Usuário removido com sucesso' });

  } catch (err) {
    next(err);
  }
};

const loginUsuario = async (req, res, next) => {
  const { email, senha } = req.body;

  if (!email || !senha) {
    return res.status(400).json({ erro: 'Email e senha são obrigatórios' });
  }

  try {
    const usuario = await UsuariosModel.buscarUsuarioPorEmail(email);

    if (!usuario) {
      return res.status(401).json({ erro: 'Credenciais inválidas' });
    }

    const senhaCorreta = await bcrypt.compare(senha, usuario.senha_hash);

    if (!senhaCorreta) {
      return res.status(401).json({ erro: 'Credenciais inválidas' });
    }

    // Gera o token JWT
    const token = jwt.sign(
      {
        id_usuario: usuario.id_usuario,
        nome_completo: usuario.nome_completo,
        nivel_acesso: usuario.nivel_acesso,
        data_criacao: usuario.data_criacao,
        foto_perfil: usuario.foto_perfil,
        telefone: usuario.telefone,
        genero: usuario.genero,
        cpf: usuario.cpf,
        data_nascimento: usuario.data_nascimento
      },
      process.env.JWT_SECRET,
      { expiresIn: process.env.JWT_EXPIRATION || '1h' }
    );

    res.status(200).json({
      token,
      usuario: {
        id_usuario: usuario.id_usuario,
        nome_completo: usuario.nome_completo,
        email: usuario.email,
        nivel_acesso: usuario.nivel_acesso,
        data_criacao: usuario.data_criacao,
        foto_perfil: usuario.foto_perfil,
        telefone: usuario.telefone,
        genero: usuario.genero,
        cpf: usuario.cpf,
        data_nascimento: usuario.data_nascimento
        // adicione aqui mais campos se quiser
      }
    });

  } catch (err) {
    next(err);
  }
};

const atualizarNivelAcesso = async (req, res, next) => {
  const { id } = req.params;
  const { nivel_acesso } = req.body;

  if (!nivel_acesso) {
    return res.status(400).json({ erro: 'Nível de acesso é obrigatório' });
  }

  try {
    const existe = await UsuariosModel.buscarUsuarioPorId(id);
    if (!existe) {
      return res.status(404).json({ erro: 'Usuário não encontrado' });
    }

    await UsuariosModel.atualizarNivelAcesso(id, nivel_acesso);

    res.status(200).json({ mensagem: 'Nível de acesso atualizado com sucesso' });

  } catch (err) {
    next(err);
  }
};

module.exports = {
  listarUsuarios,
  criarUsuario,
  atualizarUsuario,
  removerUsuario,
  loginUsuario,
  atualizarNivelAcesso
};

