require('dotenv').config();
const express = require('express');
const app = express();

// Middlewares
app.use(express.json());

// Rotas
const usuariosRoutes = require('./routes/usuariosRoutes');
app.use('/usuarios', usuariosRoutes);

// Rota padrão
app.get('/', (req, res) => {
  res.send('✅ API do projeto está rodando com sucesso!');
});

// Inicializa o servidor
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`🚀 Servidor rodando na porta ${PORT}`);
});
