const express = require('express');
const { PORT } = require('./config.js');

const app = express();

// Serve arquivos estáticos da pasta wwwroot NO PREFIXO /aps
app.use('/aps', express.static('wwwroot'));

// Rotas API
app.use(require('./routes/auth.js'));
app.use(require('./routes/models.js'));

// (Opcional, mas recomendado) Redireciona raiz /aps para /aps/index.html
app.get('/aps', (req, res) => {
  res.redirect('/aps/index.html');
});

app.listen(PORT, function () {
  console.log(`Server listening on port ${PORT}...`);
});
