const express = require('express');
const cors = require('cors');
require('dotenv').config();

// Connexion à la base de données
const db = require('./config/db');

// Création de l'application Express
const app = express();

// Activer le CORS
app.use(cors());

// Activer JSON
app.use(express.json());

// Route de test
app.get('/', (req, res) => {
  res.send('Serveur Books & Movies ');
});

// Démarrer le serveur
app.listen(process.env.PORT, () => {
  console.log(`Serveur démarré sur le port ${process.env.PORT} `);
});



//test conexion de l API 
app.get('/test-api', async (req, res) => {
  const response = await fetch(`http://www.omdbapi.com/?t=Inception&apikey=${process.env.API_KEY}`);
  const data = await response.json();
  res.json(data);
});
