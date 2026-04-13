const express = require('express');
const cors = require('cors');
require('dotenv').config();

// Connexion Ã  la base de donnÃ©es
const db = require('./config/db');

// Importer les routes
const utilisateursRoutes = require('./routes/utilisateurs');
const filmsRoutes = require('./routes/films');

// CrÃ©ation de l'application Express
const app = express();

// Activer le CORS
app.use(cors());

// Activer JSON
app.use(express.json());

// Route de test
app.get('/', (req, res) => {
  res.send('Serveur Books & Movies');
});

// Test connexion API
app.get('/test-api', async (req, res) => {
  const response = await fetch(`http://www.omdbapi.com/?t=Inception&apikey=${process.env.OMDB_API_KEY}`);
  const data = await response.json();
  res.json(data);
});

// Utiliser les routes utilisateurs
app.use('/api/utilisateurs', utilisateursRoutes);

//utiliser les routes films
app.use('/api/films', filmsRoutes);


// Démarrer le serveur
app.listen(process.env.PORT, () => {
  console.log(`Serveur démarré sur le port ${process.env.PORT} `);
});