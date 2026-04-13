const express = require('express');
const router = express.Router();
const filmsController = require('../controllers/filmsController');

router.get('/db/:id',       filmsController.getFilmByDbId);
router.get('/:id/sync',     filmsController.syncFilm);
router.get('/:id/note',     filmsController.getNoteByFilmAndUser);
router.get('/',             filmsController.getALLFilms);
router.get('/:id',          filmsController.getFilmByid);
router.post('/:id/noter',   filmsController.noterFilm);

module.exports = router;