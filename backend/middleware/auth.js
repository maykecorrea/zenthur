const jwt = require('jsonwebtoken');

const authenticateToken = (req, res, next) => {
  try {
    const authHeader = req.headers.authorization;
    
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      return res.status(401).json({
        success: false,
        message: 'Token de acesso requerido'
      });
    }
    
    const token = authHeader.substring(7);
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    
    req.user = {
      id: decoded.sub,
      sub: decoded.sub,
      email: decoded.email,
      role: decoded.role
    };
    
    next();
    
  } catch (error) {
    return res.status(401).json({
      success: false,
      message: error.name === 'TokenExpiredError' ? 'Token expirado' : 'Token inválido'
    });
  }
};

module.exports = authenticateToken;
