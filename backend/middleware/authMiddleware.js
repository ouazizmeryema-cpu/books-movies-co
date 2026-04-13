// authMiddleware.js
const jwt = require('jsonwebtoken');

module.exports = (req, res, next) => {
    // Récupération du token dans le header Authorization
    const authHeader = req.headers['authorization'];

    if (!authHeader) {
        return res.status(401).json({ error: 'Token manquant' });
    }

    // Format attendu : "Bearer <token>"
    const token = authHeader.split(' ')[1];

    if (!token) {
        return res.status(401).json({ error: 'Token invalide' });
    }

    // Vérification du token
    jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
        if (err) return res.status(403).json({ error: 'Token expiré ou invalide' });

        // On attache les infos du token à la requête
        req.user = decoded;
        next();
    });
};