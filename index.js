require('dotenv').config();
const express = require('express');
const cors = require('cors');
const app = express();

// Middlewares
app.use(cors());
app.use(express.json());

// Rotas
const usuariosRoutes = require('./routes/usuariosRoutes');
app.use('/usuarios', usuariosRoutes);

const enderecoRoutes = require('./routes/enderecoRoutes');
app.use('/enderecos', enderecoRoutes);

const produtosRoutes = require('./routes/produtosRoutes');
app.use('/produtos', produtosRoutes);

// Middleware de tratamento de erros
const errorHandler = require('./middlewares/errorHandler');

// Rota padrão
app.get('/', (req, res) => {
  res.send('✅ API do projeto está rodando com sucesso!');
});

// Middleware 404
app.use((req, res, next) => {
  res.status(404).json({ erro: 'Rota não encontrada' });
});

// Middleware de tratamento de erros - precisa vir após todas as rotas
app.use(errorHandler);

if (require.main === module) {
  const PORT = process.env.PORT || 3000;
  app.listen(PORT, () => {
    console.log(`🚀 Servidor rodando na porta ${PORT}`);
  });
}

module.exports = app;
