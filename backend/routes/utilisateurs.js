const express = require('express');
const router = express.Router();

const utilisateursController = require('../controllers/utilisateursController');

// Route inscription 
router.post('/register', utilisateursController.register);

// Route connexion
router.post('/register', utilisateursController.login);


module.exports = router;