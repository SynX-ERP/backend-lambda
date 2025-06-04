function errorHandler(err, req, res, next) {
  console.error(err);
  if (res.headersSent) {
    return next(err);
  }
  res.status(500).json({ erro: 'Erro interno no servidor' });
}

module.exports = errorHandler;

