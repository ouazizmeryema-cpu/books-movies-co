const express = require('express');
const router = express.Router();
const utilisateursController = require('../controllers/utilisateursController');

router.post('/register', utilisateursController.register);
router.post('/login', utilisateursController.login);
router.get('/', utilisateursController.getUsers);
router.get('/:id', utilisateursController.getUserById);

module.exports = router;
