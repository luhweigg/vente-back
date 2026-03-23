const jwt = require('jsonwebtoken');

exports.requireAuth = (req, res, next) => {
  const token = req.cookies.jwt;

  if (!token) {
    return res.status(401).json({ message: "Accès refusé. Veuillez vous connecter." });
  }

  jwt.verify(token, process.env.JWT_SECRET, (err, decodedToken) => {
    if (err) {
      return res.status(403).json({ message: "Token invalide ou expiré." });
    } else {
      req.userId = decodedToken.userId; 
      next();
    }
  });
};