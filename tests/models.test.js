const db = require('../db');
jest.mock('../db');

const UsuariosModel = require('../models/usuariosModel');
const EnderecoModel = require('../models/enderecoModel');
const ProdutosModel = require('../models/produtosModel');

describe('Model functions', () => {
  beforeEach(() => {
    db.query.mockReset();
  });

  test('usuariosModel.listarUsuarios retorna lista de usuarios', async () => {
    db.query.mockResolvedValueOnce({ rows: [{ id_usuario: '1' }] });

    const result = await UsuariosModel.listarUsuarios();

    expect(db.query).toHaveBeenCalledWith(expect.stringContaining('SELECT'));
    expect(result).toEqual([{ id_usuario: '1' }]);
  });

  test('enderecoModel.criarEndereco executa insert', async () => {
    db.query.mockResolvedValueOnce({});

    const dados = {
      id_endereco: 'id1',
      id_usuario: 'user1',
      rua: 'Rua A',
      numero: '10',
      complemento: null,
      bairro: 'Centro',
      cidade: 'Cidade',
      estado: 'UF',
      cep: '00000-000'
    };

    await EnderecoModel.criarEndereco(dados);

    expect(db.query).toHaveBeenCalledWith(expect.stringContaining('INSERT INTO enderecos'), [
      dados.id_endereco,
      dados.id_usuario,
      dados.rua,
      dados.numero,
      dados.complemento,
      dados.bairro,
      dados.cidade,
      dados.estado,
      dados.cep
    ]);
  });

  test('produtosModel.removerProduto retorna linha removida', async () => {
    db.query.mockResolvedValueOnce({ rows: [{ id_produto: 'p1' }] });

    const result = await ProdutosModel.removerProduto('p1');

    expect(db.query).toHaveBeenCalledWith('DELETE FROM produtos WHERE id_produto = $1 RETURNING id_produto', ['p1']);
    expect(result).toEqual({ id_produto: 'p1' });
  });
});
