// Verificar se o arquivo auth.js está corretamente implementado
const fs = require('fs');

try {
  const authContent = fs.readFileSync('routes/auth.js', 'utf8');
  console.log("Conteúdo da rota de autenticação:");
  console.log(authContent);
} catch (error) {
  console.error("Erro ao ler arquivo:", error);
}
