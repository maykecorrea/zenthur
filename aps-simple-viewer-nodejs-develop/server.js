const express = require('express');
const { PORT } = require('./config.js');

const app = express();

app.use('/aps', express.static('wwwroot')); // arquivos estáticos
app.use('/aps/api/auth', require('./routes/auth.js'));
app.use('/aps/api/models', require('./routes/models.js'));

app.get('/aps', (req, res) => {
    res.redirect('/aps/index.html');
});

app.listen(PORT, function () {
    console.log(`Server listening on port ${PORT}...`);
});
