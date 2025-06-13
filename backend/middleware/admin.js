const adminMiddleware = (req, res, next) => {
  try {
    // Verificar se user foi definido pelo middleware de auth
    if (!req.user) {
      return res.status(401).json({ message: 'Token de autenticação necessário' });
    }

    // Verificar se é admin
    if (req.user.role !== 'admin') {
      console.log(`⚠️ Acesso negado para usuário: ${req.user.email} (role: ${req.user.role})`);
      return res.status(403).json({ 
        message: 'Acesso negado. Apenas administradores podem realizar esta ação.' 
      });
    }

    console.log(`✅ Acesso admin autorizado para: ${req.user.email}`);
    next();
  } catch (error) {
    console.error('❌ Erro no middleware admin:', error);
    res.status(500).json({ message: 'Erro interno do servidor' });
  }
};

module.exports = adminMiddleware;