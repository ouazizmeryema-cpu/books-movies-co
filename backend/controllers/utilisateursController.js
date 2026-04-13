// utilisateursController.js
const db = require('../config/db');
const jwt = require('jsonwebtoken');

// POST /api/utilisateurs/register — Inscription
exports.register = (req, res) => {
    const { nom, prenom, ville, adress, email, mdp } = req.body;

    if (!nom || !prenom || !email || !mdp) {
        return res.status(400).json({ error: 'Champs obligatoires manquants' });
    }

    const utilisateur = { nom, prenom, ville, adress, email, mdp };

    db.query('INSERT INTO utilisateurs SET ?', utilisateur, (err, result) => {
        if (err) {
            if (err.code === 'ER_DUP_ENTRY') {
                return res.status(409).json({ error: 'Email déjà utilisé' });
            }
            return res.status(500).json({ error: err.message });
        }
        res.status(201).json({ message: 'Utilisateur créé', id: result.insertId });
    });
};

// POST /api/utilisateurs/login — Connexion
exports.login = (req, res) => {
    const { email, mdp } = req.body;

    if (!email || !mdp) {
        return res.status(400).json({ error: 'Email et mot de passe requis' });
    }

    db.query('SELECT * FROM utilisateurs WHERE email = ? AND mdp = ?', [email, mdp], (err, results) => {
        if (err) return res.status(500).json({ error: err.message });
        if (results.length === 0) return res.status(401).json({ error: 'Identifiants incorrects' });

        const user = results[0];
        const token = jwt.sign(
            { id: user.id, email: user.email },
            process.env.JWT_SECRET,
            { expiresIn: '24h' }
        );
        res.json({ message: 'Connexion réussie', token, user });
    });
};

// GET /api/utilisateurs — Tous les utilisateurs
exports.getUsers = (req, res) => {
    db.query('SELECT * FROM utilisateurs', (err, results) => {
        if (err) return res.status(500).json({ error: err.message });
        res.json(results);
    });
};

// GET /api/utilisateurs/:id — Un utilisateur
exports.getUserById = (req, res) => {
    db.query('SELECT * FROM utilisateurs WHERE id = ?', [req.params.id], (err, results) => {
        if (err) return res.status(500).json({ error: err.message });
        if (results.length === 0) return res.status(404).json({ error: 'Utilisateur non trouvé' });
        res.json(results[0]);
    });
};