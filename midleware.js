import jwt from 'jsonwebtoken';

const authMiddleware = (req, res, next) => {
    let token = req.headers.authorization.split(' ')[1]
  
    if (!token) {
      return res.status(401).json({ message: 'Token de autenticación no proporcionado' });
    }
  
    try {
      const payload = jwt.verify(token, process.env.JWT_secret);
      req.userId = payload.userId; 
      next();
    } catch (error) {
      return res.status(403).json({ message: 'Token inválido' });
    }
  };
  

export default authMiddleware;